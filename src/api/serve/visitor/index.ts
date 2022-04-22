import { defHttp } from '/@/utils/axios';
import { BasicPageParams } from '/@/api/model/baseModel';
import { CreateVisitorParams, GetVisitorListResultModel } from './model';
enum Api {
  CreateVisitor = '/visitor/createVisitor',
  GetVisitorList = '/visitor/getVisitorList',
}

export function createVisitor(params: CreateVisitorParams) {
  return defHttp.post<null>({ url: Api.CreateVisitor, params }, { showSuccessMessage: true });
}

export function getVisitorList(params: BasicPageParams) {
  return defHttp.get<GetVisitorListResultModel>({ url: Api.GetVisitorList, params });
}
