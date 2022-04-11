import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

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

export interface RiskAreaItem {
  id: number;
  type: string;
  province: string;
  city: string;
  county: string;
  area_name: string;
  communitys: string[];
}

export interface GetRiskAreaResultModel {
  end_update_time: string;
  hcount: number;
  mcount: number;
  last_hcount: number;
  last_mcount: number;
  highlist: RiskAreaItem[];
  middlelist: RiskAreaItem[];
}

export interface mediaInfo {
  name: string;
  avatar: string;
  description: string;
}
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  summary?: string;
  source?: string;
  cover?: string;
  mediaInfo?: mediaInfo;
  sourceURL: string;
  publishTime: string;
}

export type GetNewsListResultModel = BasicFetchResult<NewsItem>;

export type GetNewsListParams = BasicPageParams;
