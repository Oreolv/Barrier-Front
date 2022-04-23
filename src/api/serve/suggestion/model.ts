import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateSuggestionParams {
  type: string;
  content: string;
}

export interface SuggestionItem
  extends Omit<BasicApplyItem, 'start_time | end_time'>,
    BasicTimeResult {
  type: string;
  content: string;
}

export type GetSuggestionListResultModel = BasicFetchResult<SuggestionItem>;
