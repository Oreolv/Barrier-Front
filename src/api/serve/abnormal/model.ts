import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateAbnormalParams {
  type: string;
  content: string;
}

export interface AbnormalItem extends BasicApplyItem, BasicTimeResult {
  type: string;
  content: string;
}

export type GetAbnormalListResultModel = BasicFetchResult<AbnormalItem>;
