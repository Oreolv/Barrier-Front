import { defHttp } from '/@/utils/axios';
import {
  GetNewsListResultModel,
  GetNewsListParams,
  GetNoticeListResultModel,
  GetNoticeListParams,
} from '/@/api/index/model/informationModel';
enum Api {
  GetNewsList = '/news/getNewsList',
  GetTipsList = '/tips/getTipsList',
  GetNoticeList = '/notice/getNoticeList',
}

export function getNewsList(params: GetNewsListParams) {
  return defHttp.get<GetNewsListResultModel>({ url: Api.GetNewsList, params: params });
}

export function getTipsList(params: GetNewsListParams) {
  return defHttp.get<GetNewsListResultModel>({ url: Api.GetTipsList, params: params });
}

export function getNoticeList(params: GetNoticeListParams) {
  return defHttp.get<GetNoticeListResultModel>({ url: Api.GetNoticeList, params: params });
}
