import { defHttp } from '/@/utils/axios';
import {
  GetCovidDataResultModel,
  GetRiskAreaResultModel,
  GetRiskAreaMergeResultModel,
} from './model/covidModel';
enum Api {
  GetCovidData = '/covid/all_data',
  GetRiskArea = '/covid/risk_area',
  GetRiskAreaMerge = '/covid/risk_area_merge',
}

export function getCovidData() {
  return defHttp.get<GetCovidDataResultModel>({ url: Api.GetCovidData });
}

export function getRiskArea() {
  return defHttp.get<GetRiskAreaResultModel>({ url: Api.GetRiskArea });
}

export function getRiskAreaMerge() {
  return defHttp.get<GetRiskAreaMergeResultModel>({ url: Api.GetRiskAreaMerge });
}
