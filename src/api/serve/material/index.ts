import { defHttp } from '/@/utils/axios';
import { CreateMaterialParams, GetMaterialListResultModel } from './model';
import { BasicPageParams } from '/@/api/model/baseModel';
enum Api {
  CreateMaterial = '/material/createMaterial',
  GetMaterialList = '/material/getMaterialList',
}

export function createMaterial(params: CreateMaterialParams) {
  return defHttp.post<null>({ url: Api.CreateMaterial, params }, { showSuccessMessage: true });
}

export function getMaterialList(params: BasicPageParams) {
  return defHttp.get<GetMaterialListResultModel>({ url: Api.GetMaterialList, params });
}
