import { defHttp } from '/@/utils/axios';
import { CreateHealthParams, GetHealthListResultModel } from './model';
import { BasicPageParams } from '/@/api/model/baseModel';

enum Api {
  CreateHealth = '/health/createHealth',
  GetHealthList = '/health/getHealthList',
}

export function createHealth(params: CreateHealthParams) {
  return defHttp.post<null>({ url: Api.CreateHealth, params }, { showSuccessMessage: true });
}

export function getHealthList(params: BasicPageParams) {
  return defHttp.get<GetHealthListResultModel>({ url: Api.GetHealthList, params });
}
