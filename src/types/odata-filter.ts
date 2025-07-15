export interface IODataFilter {
  id: number;
  key: string;
  type: string;
  comparator: string;
  value: string[];
  valueType: string;
  optionalComparisons?: IODataFilter[];
}
