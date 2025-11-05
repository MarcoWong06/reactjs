import React, { useEffect } from "react";
import {
  useTop10,
  type DataSource,
  SortOrder,
  CalculateFunction,
} from "@cap-view/hooks";
import { Top10Widget } from "@cap-view/components";

const MyExample: React.FC = () => {
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
      widgetName: "Top 10 Fundraisers",
      chartTitle: "籌款排行榜",
      sortOrder: SortOrder.DESC,
      calculateFunction: CalculateFunction.SUM,
      thousandSeparator: ",",
      prefix: "HKD$ ",
      suffix: "",
      buttonUri: "https://example.com/xxx",
      buttonText: "立即捐款",
      buttonIcon:
        '<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M20 17q.86 0 1.45.6t.58 1.4L14 22l-7-2v-9h1.95l7.27 2.69q.78.31.78 1.12q0 .47-.34.82t-.86.37H13l-1.75-.67l-.33.94L13 17zM16 3.23Q17.06 2 18.7 2q1.36 0 2.3 1t1 2.3q0 1.03-1 2.46t-1.97 2.39T16 13q-2.08-1.89-3.06-2.85t-1.97-2.39T10 5.3q0-1.36.97-2.3t2.34-1q1.6 0 2.69 1.23M.984 11H5v11H.984z"/></svg>',
      nameLabel: "",
      valueLabel: "籌款額：",
      championIndexColor: "#ffffff",
      runnerUpIndexColor: "#ffffff",
      thirdPlaceIndexColor: "#ffffff",
      otherIndexColor: "#ffffff",
      championIndexBackgroundColor: "#f57c00",
      runnerUpIndexBackgroundColor: "#9e9e9e",
      thirdPlaceIndexBackgroundColor: "#b5966e",
      otherIndexBackgroundColor: "#214083",
      championValueColor: "#f57c00",
      runnerUpValueColor: "#333",
      thirdPlaceValueColor: "#333",
      otherValueColor: "#333",
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
        // Replace ${param} placeholders with actual values from the item
        let uri = dataSource.metaData.buttonUri;

        // Replace all ${key} patterns with corresponding values from the item
        uri = uri.replace(/\$\{(\w+)\}/g, (match, key) => {
          const value = (item as any)[key];
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

export default MyExample;
