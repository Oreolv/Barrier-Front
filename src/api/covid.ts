import { defHttp } from '/@/utils/axios';
import {
  GetCovidDataResultModel,
  GetRiskAreaResultModel,
  GetNewsListResultModel,
  GetNewsListParams,
} from './system/model/covidModel';
enum Api {
  GetCovidData = '/covid/all_data',
  GetRiskArea = '/covid/risk_area',
  GetNewsList = '/news/getNewsList',
}

export function getCovidData() {
  return defHttp.get<GetCovidDataResultModel>({ url: Api.GetCovidData });
}

export function getRiskArea() {
  return defHttp.get<GetRiskAreaResultModel>({ url: Api.GetRiskArea });
}

export function getNewsList(params: GetNewsListParams) {
  return defHttp.get<GetNewsListResultModel>({ url: Api.GetNewsList, params: params });
}
