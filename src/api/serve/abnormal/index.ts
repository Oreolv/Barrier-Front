import { defHttp } from '/@/utils/axios';
import { CreateAbnormalParams, GetAbnormalListResultModel } from './model';
enum Api {
  CreateAbnormal = '/abnormal/createAbnormal',
  GetAbnormalList = '/abnormal/getAbnormalList',
}

export function createAbnormal(params: CreateAbnormalParams) {
  return defHttp.post<null>({ url: Api.CreateAbnormal, params }, { showSuccessMessage: true });
}

export function getAbnormalList() {
  return defHttp.get<GetAbnormalListResultModel>({ url: Api.GetAbnormalList });
}
