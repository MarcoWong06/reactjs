export const CalculateFunction = {
  SUM: "sum",
  MAX: "max",
  MIN: "min",
  AVG: "avg",
} as const;

export type CalculateFunction = typeof CalculateFunction[keyof typeof CalculateFunction];

export const SortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

// Core Item Types
export interface Top10Item {
  id: string;
  name: string;
  value: number;
  rank: number;
}

export interface DataSourceItem {
  id: string;
  name: string;
  value: number;
}

// Metadata Types
export interface DataSourceMetaData {
  widgetName: string;
  chartTitle?: string;
  sortOrder?: SortOrder;
  calculateFunction?: CalculateFunction;
  thousandSeparator?: string;
  prefix?: string;
  suffix?: string;
  buttonText?: string;
  buttonIcon?: string;
  nameLabel?: string;
  valueLabel?: string;
  version: string;
  redis: boolean;
  [key: string]: any;
}

export interface Top10MetaData {
  widgetName: string;
  chartTitle?: string;
  thousandSeparator?: string;
  prefix?: string;
  suffix?: string;
  buttonText?: string;
  buttonIcon?: string;
  nameLabel?: string;
  valueLabel?: string;
  version: string;
  redis: boolean;
  [key: string]: any;
}

// Data Container Types
export interface DataSource {
  resultType: string;
  resultMessage: string;
  dataContent: DataSourceItem[];
  metaData: DataSourceMetaData;
}

export interface Top10Data {
  resultType: string;
  resultMessage: string;
  dataContent: Top10Item[];
  metaData: Top10MetaData;
}

// Legacy Request/Result Types (for backward compatibility)
export interface Top10Request extends RequestObject<Top10Item[]> {}
export interface Top10Result extends ResultObject<Top10Item[]> {}

// Hook Return Type
export interface UseTop10Return {
  setData: (datasource: DataSource) => void;
  loading: boolean;
  getResult: () => Top10Data;
  Events: Events;
}

// Events Class Interface
export interface Events {
  onSelection(callback: (resultset: ResultObject<Top10Item>) => void): void;
  onButtonClick(callback: (resultset: ResultObject<Top10Item>) => void): void;
  triggerSelection(item: Top10Item): void;
  triggerButtonClick(item: Top10Item): void;
}
