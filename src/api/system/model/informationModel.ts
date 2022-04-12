import { BasicFetchResult, BasicPageParams, BasicTimeResult } from '/@/api/model/baseModel';
import { UserHealthEnum as NoticeGradeEnum } from '/@/enums/userEnum';
export interface MediaInfo {
  name: string;
  avatar: string;
  description: string;
}
export interface NewsItem extends BasicTimeResult {
  id: number;
  title: string;
  content: string;
  summary?: string;
  source?: string;
  cover?: string;
  mediaInfo?: MediaInfo;
  sourceURL: string;
  publishTime: string;
}

export interface PublisherInfo {
  username: string;
  realName: string;
  avatar: string;
}

export interface NoticeItem extends BasicTimeResult {
  id: number;
  content: string;
  grade: NoticeGradeEnum;
  publisher: number;
  publisherInfo: PublisherInfo;
}

export type GetNewsListResultModel = BasicFetchResult<NewsItem>;

export type GetNewsListParams = BasicPageParams;

export type GetNoticeListResultModel = BasicFetchResult<NoticeItem>;

export type GetNoticeListParams = BasicPageParams;
