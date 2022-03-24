interface ChinaDataItem {
  confirm: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  noInfect: number;
  localConfirm: number;
}

interface ProvinceDataItem {
  name: string;
  nowConfirm: number;
  confirm: number;
  heal: number;
  dead: number;
}
interface CityDataItem {
  name: string;
  nowConfirm: number;
  confirm: number;
  province: string;
  grade: string;
}

export interface GetCovidDataModel {
  lastUpdateTime: string;
  china_data: ChinaDataItem[];
  province_data: ProvinceDataItem[];
  city_data: CityDataItem[];
}
