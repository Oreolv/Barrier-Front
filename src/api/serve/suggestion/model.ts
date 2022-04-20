import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateSuggestionParams {
  type: string;
  content: string;
}

export interface SuggestionItem
  extends Omit<BasicApplyItem, 'startTime | endTime'>,
    BasicTimeResult {
  type: string;
  content: string;
}

export type GetSuggestionListResultModel = BasicFetchResult<SuggestionItem>;
