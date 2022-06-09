export interface ISaveSearch {
  name: string;
  is_active: boolean;
  params?: ISaveSearchParam[];
}

interface ISaveSearchParam {
  key: string;
  value: string | number;
}
