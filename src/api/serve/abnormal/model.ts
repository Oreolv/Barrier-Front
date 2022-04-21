import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateAbnormalParams {
  type: string;
  content: string;
}

export interface AbnormalItem extends Omit<BasicApplyItem, 'startTime | endTime'>, BasicTimeResult {
  type: string;
  content: string;
}

export type GetAbnormalListResultModel = BasicFetchResult<AbnormalItem>;
