export interface CityItem {
  id: number;
  name: string;
}

export interface ProvinceItem {
  id: number;
  name: string;
  children: CityItem[];
}

export type GetChinaAreaDataResultModel = ProvinceItem[];
