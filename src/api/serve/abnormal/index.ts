import { defHttp } from '/@/utils/axios';
import { CreateAbnormalParams, GetAbnormalListResultModel } from './model';
import { BasicPageParams } from '/@/api/model/baseModel';

enum Api {
  CreateAbnormal = '/abnormal/createAbnormal',
  GetAbnormalList = '/abnormal/getAbnormalList',
  RemoveAbnormal = '/abnormal/removeAbnormal',
}

export function createAbnormal(params: CreateAbnormalParams) {
  return defHttp.post<null>({ url: Api.CreateAbnormal, params }, { showSuccessMessage: true });
}

export function getAbnormalList(params: BasicPageParams) {
  return defHttp.get<GetAbnormalListResultModel>({ url: Api.GetAbnormalList, params });
}

export function removeAbnormal(id: number) {
  return defHttp.delete<null>(
    { url: `${Api.RemoveAbnormal}?id=${id}` },
    { showSuccessMessage: true }
  );
}
