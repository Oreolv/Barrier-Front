import { defHttp } from '/@/utils/axios';
import { GetCovidDataModel } from './model/covidModel';
enum Api {
  GetCovidData = '/covid/all_data',
}

export function getCovidData() {
  return defHttp.get<GetCovidDataModel>({ url: Api.GetCovidData });
}
