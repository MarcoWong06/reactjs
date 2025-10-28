import React, { useEffect } from "react";
import { useTop10, type DataSource, SortOrder, CalculateFunction } from "@cap-view/hooks";
import { Top10Widget } from "@cap-view/components";

const Top10Example: React.FC = () => {
  const { setData, loading, getResult, Events } = useTop10();

  useEffect(() => {
    const datasource: DataSource = {
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
        widgetName: "Top10 Fundraisers",
        chartTitle: "籌款龍虎榜",
        sortOrder: SortOrder.DESC,
        calculateFunction: CalculateFunction.SUM,
        thousandSeparator: ",",
        prefix: "HKD$ ",
        suffix: "",
        buttonText: "立即捐款",
        buttonIcon: "",
        nameLabel: "",
        valueLabel: "籌款額：",
        version: "1.0.0",
        redis: false,
      },
    };

    // Frontend sends datasource, hook transforms it to Top10Data
    setData(datasource);

    Events.onSelection((result) => {
      const item = result.dataContent;
      if (item) {
        console.log("Selection clicked for:", item);
        // Handle selection action here
        alert(
          `Selection clicked for ${item.name} (${
            item.id
          })\nTotal amount: $${item.value.toFixed(2)}`
        );
      }
    });

    Events.onButtonClick((result) => {
      const item = result.dataContent;
      if (item) {
        console.log("Button clicked for:", item);
        // Handle button click action here
        alert(
          `Button clicked for ${item.name} (${
            item.id
          })\nTotal amount: $${item.value.toFixed(2)}`
        );
      }
    });
  }, [setData, Events]);

  const result = getResult();
  const data = result.dataContent || [];
  const metadata = result.metaData || {};

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
        title={metadata.chartTitle || metadata.widgetName || "籌款龍虎榜"}
        thousandSeparator={metadata.thousandSeparator}
        prefix={metadata.prefix}
        suffix={metadata.suffix}
        buttonText={metadata.buttonText}
        buttonIcon={metadata.buttonIcon}
        nameLabel={metadata.nameLabel}
        valueLabel={metadata.valueLabel}
      />
    </div>
  );
};

export default Top10Example;
