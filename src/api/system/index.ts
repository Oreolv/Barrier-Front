import { defHttp } from '/@/utils/axios';
import { GetChinaAreaDataResultModel } from './model';
enum Api {
  GetChinaAreaData = '/system/china_area_data',
}

export function getChinaAreaData() {
  return defHttp.get<GetChinaAreaDataResultModel>({ url: Api.GetChinaAreaData });
}
