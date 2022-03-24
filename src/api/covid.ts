import { defHttp } from '/@/utils/axios';
import { GetCovidDataResultModel } from './model/covidModel';
enum Api {
  GetCovidData = '/covid/all_data',
}

export function getCovidData() {
  return defHttp.get<GetCovidDataResultModel>({ url: Api.GetCovidData });
}
