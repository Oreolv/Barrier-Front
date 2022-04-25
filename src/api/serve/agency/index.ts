import { defHttp } from '/@/utils/axios';
import { CreateAgencyParams, GetAgencyListResultModel } from './model';
import { BasicPageParams } from '/@/api/model/baseModel';
enum Api {
  CreateAgency = '/agency/createAgency',
  GetAgencyList = '/agency/getAgencyList',
  RemoveAgency = '/agency/removeAgency',
}

export function createAgency(params: CreateAgencyParams) {
  return defHttp.post<null>({ url: Api.CreateAgency, params }, { showSuccessMessage: true });
}

export function getAgencyList(params: BasicPageParams) {
  return defHttp.get<GetAgencyListResultModel>({ url: Api.GetAgencyList, params });
}

export function removeAgency() {
  return defHttp.delete<null>({ url: Api.RemoveAgency });
}
