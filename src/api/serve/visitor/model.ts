import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateVisitorParams {
  visitor: string;
  foreign: number;
  comeFrom: string;
  goTo: string;
  startTime: string;
  endTime: string;
  healthCode: string[];
}

export interface VisitorItem extends BasicApplyItem, BasicTimeResult {
  visitor: string;
  foreign: number;
  comeFrom: string;
  goTo: string;
  healthCode: string;
}

export type GetVisitorListResultModel = BasicFetchResult<VisitorItem>;
