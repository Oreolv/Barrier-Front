import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateAbnormalParams {
  type: string;
  content: string;
}

export interface AbnormalItem
  extends Omit<BasicApplyItem, 'start_time | end_time'>,
    BasicTimeResult {
  type: string;
  content: string;
}

export type GetAbnormalListResultModel = BasicFetchResult<AbnormalItem>;
