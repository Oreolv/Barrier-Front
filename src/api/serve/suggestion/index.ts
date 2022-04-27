import { defHttp } from '/@/utils/axios';
import { CreateSuggestionParams, GetSuggestionListResultModel } from './model';
import { BasicPageParams } from '/@/api/model/baseModel';

enum Api {
  CreateSuggestion = '/suggestion/createSuggestion',
  GetSuggestionList = '/suggestion/getSuggestionList',
}

export function createSuggestion(params: CreateSuggestionParams) {
  return defHttp.post<null>({ url: Api.CreateSuggestion, params }, { showSuccessMessage: true });
}

export function getSuggestionList(params: BasicPageParams) {
  return defHttp.get<GetSuggestionListResultModel>({ url: Api.GetSuggestionList, params });
}
