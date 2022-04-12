import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface mediaInfo {
  name: string;
  avatar: string;
  description: string;
}
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  summary?: string;
  source?: string;
  cover?: string;
  mediaInfo?: mediaInfo;
  sourceURL: string;
  publishTime: string;
}

export type GetNewsListResultModel = BasicFetchResult<NewsItem>;

export type GetNewsListParams = BasicPageParams;
