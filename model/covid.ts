export type ChinaDataProp = {
  confirm: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  noInfect: number;
  localConfirm: number;
};

export type ProvinceDataProp = {
  confirm: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  noInfect: number;
  localConfirm: number;
};

export type CityDataProp = {
  name: string;
  nowConfirm: number;
  confirm: number;
  heal: number;
  dead: number;
};

export interface CovidDataProp {
  lastUpdateTime: string;
  china_data: ChinaDataProp[];
  province_data: ProvinceDataProp[];
  city_data: CityDataProp[];
}
