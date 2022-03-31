export interface ChinaDataItem {
  confirm: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  noInfect: number;
  localConfirm: number;
}

export interface ProvinceDataItem {
  name: string;
  nowConfirm: number;
  confirm: number;
  heal: number;
  dead: number;
}
export interface CityDataItem {
  name: string;
  nowConfirm: number;
  confirm: number;
  province: string;
  grade: string;
}

export interface GetCovidDataResultModel {
  lastUpdateTime: string;
  china_data: ChinaDataItem[];
  province_data: ProvinceDataItem[];
  city_data: CityDataItem[];
}

interface ProvinceRiskItem {
  province: string;
  children: CityRiskItem[];
}

interface CityRiskItem {
  city: string;
  county: string;
  area_name: string;
  communitys: string[];
}
export interface GetRiskAreaResultModel {
  end_update_time: string;
  hcount: number;
  mcount: number;
  highlist: ProvinceRiskItem[];
  middlelist: ProvinceRiskItem[];
}
