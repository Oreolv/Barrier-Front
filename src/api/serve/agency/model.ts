import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateAgencyParams {
  type: string;
  content: string;
}

export interface AgencyItem extends Omit<BasicApplyItem, 'startTime | endTime'>, BasicTimeResult {
  type: string;
  content: string;
}

export type GetAgencyListResultModel = BasicFetchResult<AgencyItem>;
