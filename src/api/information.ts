import { defHttp } from '/@/utils/axios';
import { GetNewsListResultModel, GetNewsListParams } from './system/model/informationModel';
enum Api {
  GetNewsList = '/news/getNewsList',
  GetTipsList = '/tips/getTipsList',
}

export function getNewsList(params: GetNewsListParams) {
  return defHttp.get<GetNewsListResultModel>({ url: Api.GetNewsList, params: params });
}

export function getTipsList(params: GetNewsListParams) {
  return defHttp.get<GetNewsListResultModel>({ url: Api.GetTipsList, params: params });
}
