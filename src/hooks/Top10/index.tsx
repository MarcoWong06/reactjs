import { useCallback, useState, useMemo } from "react";
import type {
  Top10Item,
  DataSource,
  Top10Data,
  UseTop10Return,
  DataSourceItem,
} from "./types";
import { CalculateFunction, SortOrder } from "./types";

export * from "./types";

export class Events {
  private selectionCallback:
    | ((resultset: ResultObject<Top10Item>) => void)
    | null = null;
  private buttonClickCallback:
    | ((resultset: ResultObject<Top10Item>) => void)
    | null = null;

  onSelection(callback: (resultset: ResultObject<Top10Item>) => void): void {
    this.selectionCallback = callback;
  }
  onButtonClick(callback: (resultset: ResultObject<Top10Item>) => void): void {
    this.buttonClickCallback = callback;
  }
  triggerSelection(item: Top10Item): void {
    if (this.selectionCallback) {
      const resultset: ResultObject<Top10Item> = {
        resultType: "SUCCESS",
        resultMessage: `Selected item: ${item.name}`,
        dataContent: item,
        metaData: { version: "1.0.0" },
      };
      this.selectionCallback(resultset);
    }
  }
  triggerButtonClick(item: Top10Item): void {
    if (this.buttonClickCallback) {
      const resultset: ResultObject<Top10Item> = {
        resultType: "SUCCESS",
        resultMessage: `Button clicked for item: ${item.name}`,
        dataContent: item,
        metaData: { version: "1.0.0" },
      };
      this.buttonClickCallback(resultset);
    }
  }
}

const calculateValue = (
  values: number[],
  calculateFunction: CalculateFunction
): number => {
  switch (calculateFunction) {
    case CalculateFunction.SUM:
      return values.reduce((acc, val) => acc + val, 0);
    case CalculateFunction.MAX:
      return Math.max(...values);
    case CalculateFunction.MIN:
      return Math.min(...values);
    case CalculateFunction.AVG:
      return values.reduce((acc, val) => acc + val, 0) / values.length;
    case CalculateFunction.COUNT:
      return values.length;
    default:
      return values.reduce((acc, val) => acc + val, 0);
  }
};

const processDataItems = (
  items: Array<DataSourceItem>,
  calculateFunction: CalculateFunction,
  sortOrder: SortOrder
): Top10Item[] => {
  // Group by ID
  const userMap = new Map<
    string,
    { id: string; name: string; values: number[] }
  >();

  items.forEach((item) => {
    const existing = userMap.get(item.id);
    if (existing) {
      existing.values.push(item.value);
    } else {
      userMap.set(item.id, {
        id: item.id,
        name: item.name,
        values: [item.value],
      });
    }
  });

  const processedItems = Array.from(userMap.values()).map((user) => ({
    id: user.id,
    name: user.name,
    value: calculateValue(user.values, calculateFunction),
    rank: 0,
  }));

  processedItems.sort((a, b) =>
    sortOrder === SortOrder.ASC ? a.value - b.value : b.value - a.value
  );

  return processedItems.slice(0, 10).map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};

export const useTop10 = (): UseTop10Return => {
  const [data, setDataState] = useState<Top10Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<any>({});

  const events = useMemo(() => new Events(), []);

  const setData = useCallback((datasource: DataSource) => {
    setLoading(true);
    try {
      const items = datasource.dataContent || [];
      const meta = datasource.metaData;
      const calculateFunction = meta.calculateFunction || CalculateFunction.SUM;
      const sortOrder = meta.sortOrder || SortOrder.DESC;
      const top10Items = processDataItems(items, calculateFunction, sortOrder);
      setDataState(top10Items);
      setMetaData({
        widgetName: meta.widgetName,
        version: meta.version,
        redis: meta.redis,
      });
    } catch (error) {
      console.error("Failed to set data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getResult = useCallback((): Top10Data => {
    return {
      resultType: "SUCCESS",
      resultMessage: "Top 10 data retrieved successfully",
      dataContent: data,
      metaData: {
        widgetName: metaData.widgetName,
        version: metaData.version,
        redis: metaData.redis,
      },
    };
  }, [data, metaData]);

  return {
    setData,
    loading,
    getResult,
    Events: events,
  };
};
