import { defHttp } from '/@/utils/axios';
import { GetCovidDataResultModel, GetRiskAreaResultModel } from './system/model/covidModel';
enum Api {
  GetCovidData = '/covid/all_data',
  GetRiskArea = '/covid/risk_area',
}

export function getCovidData() {
  return defHttp.get<GetCovidDataResultModel>({ url: Api.GetCovidData });
}

export function getRiskArea() {
  return defHttp.get<GetRiskAreaResultModel>({ url: Api.GetRiskArea });
}
