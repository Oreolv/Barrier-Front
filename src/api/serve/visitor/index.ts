import { defHttp } from '/@/utils/axios';
import { CreateVisitorParams } from './model';
enum Api {
  CreateVisitor = '/visitor/createVisitor',
}

export function createVisitor(params: CreateVisitorParams) {
  return defHttp.post<null>({ url: Api.CreateVisitor, params }, { showSuccessMessage: true });
}
