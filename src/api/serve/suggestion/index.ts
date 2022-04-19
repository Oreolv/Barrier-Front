import { defHttp } from '/@/utils/axios';
import { CreateSuggestionParams, GetSuggestionListResultModel } from './model';
enum Api {
  CreateSuggestion = '/suggestion/createSuggestion',
  GetSuggestionList = '/suggestion/getSuggestionList',
}

export function createSuggestion(params: CreateSuggestionParams) {
  return defHttp.post<null>({ url: Api.CreateSuggestion, params }, { showSuccessMessage: true });
}

export function getSuggestionList() {
  return defHttp.get<GetSuggestionListResultModel>({ url: Api.GetSuggestionList });
}
