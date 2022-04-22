import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateVisitorParams {
  visitor: string;
  foreign: number;
  come_from: string;
  startTime: string;
  endTime: string;
  healthCode: string[];
}

export interface VisitorItem extends BasicApplyItem, BasicTimeResult {
  visitor: string;
  foreign: number;
  come_from: string;
  healthCode: string;
}

export type GetVisitorListResultModel = BasicFetchResult<VisitorItem>;
