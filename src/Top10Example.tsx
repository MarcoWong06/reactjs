import React, { useEffect } from "react";
import {
  useTop10,
  type DataSource,
  SortOrder,
  CalculateFunction,
  type DataSourceItem,
} from "@cap-view/hooks";
import { Top10Widget } from "@cap-view/components";

const Top10Example: React.FC = () => {
  const { setData, loading, getResult, Events } = useTop10();

  const dataSource: DataSource = {
    resultType: "SUCCESS",
    resultMessage: "Data fetched successfully",
    dataContent: [
      { id: "A001", name: "Alice", value: 10 },
      { id: "A001", name: "Alice", value: 20 },
      { id: "A001", name: "Alice", value: 15 },
      { id: "A002", name: "Bob", value: 25 },
      { id: "A002", name: "Bob", value: 30 },
      { id: "A003", name: "Charlie", value: 5 },
      { id: "A004", name: "David", value: 50 },
      { id: "A005", name: "Eve", value: 40 },
      { id: "A006", name: "Frank", value: 35 },
      { id: "A007", name: "Grace", value: 45 },
      { id: "A008", name: "Heidi", value: 55 },
      { id: "A009", name: "Ivan", value: 60 },
      { id: "A010", name: "Judy", value: 70 },
    ],
    metaData: {
      widgetName: "",
      chartTitle: undefined,
      sortOrder: SortOrder.DESC,
      calculateFunction: CalculateFunction.SUM,
      thousandSeparator: undefined,
      prefix: undefined,
      suffix: undefined,
      buttonUri: undefined,
      buttonText: undefined,
      buttonIcon: undefined,
      nameLabel: undefined,
      valueLabel: undefined,
      championIndexColor: undefined,
      runnerUpIndexColor: undefined,
      thirdPlaceIndexColor: undefined,
      otherIndexColor: undefined,
      championIndexBackgroundColor: undefined,
      runnerUpIndexBackgroundColor: undefined,
      thirdPlaceIndexBackgroundColor: undefined,
      otherIndexBackgroundColor: undefined,
      championValueColor: undefined,
      runnerUpValueColor: undefined,
      thirdPlaceValueColor: undefined,
      otherValueColor: undefined,
      championValueBackgroundColor: undefined,
      runnerUpValueBackgroundColor: undefined,
      thirdPlaceValueBackgroundColor: undefined,
      otherValueBackgroundColor: undefined,
      championBackgroundColor: undefined,
      runnerUpBackgroundColor: undefined,
      thirdPlaceBackgroundColor: undefined,
      otherBackgroundColor: undefined,
      version: "1.2.1",
      redis: false,
    },
  };

  useEffect(() => {
    setData(dataSource);

    Events.onSelection((result) => {
      const item = result.dataContent;
      if (item) {
      }
    });

    Events.onButtonClick((result) => {
      const item = result.dataContent;
      if (item && dataSource.metaData.buttonUri) {
        let uri = dataSource.metaData.buttonUri.toString();
        uri = uri.replace(/\$\{(\w+)\}/g, (match, key) => {
          const value = (item as DataSourceItem)[key];
          return value !== undefined ? String(value) : match;
        });

        window.open(uri, "_blank");
      }
    });
  }, [setData, Events]);

  const result = getResult();
  const data = result.dataContent;
  const metadata = dataSource.metaData;

  return (
    <div>
      <Top10Widget
        data={data}
        loading={loading}
        onItemSelect={(item) => {
          Events.triggerSelection(item);
        }}
        onButtonClick={(item) => {
          Events.triggerButtonClick(item);
        }}
        metadata={metadata}
      />
    </div>
  );
};

export default Top10Example;
