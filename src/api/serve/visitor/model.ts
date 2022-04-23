import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateVisitorParams {
  visitor: string;
  foreign: number;
  come_from: string;
  start_time: string;
  end_time: string;
  health_code: string[];
}

export interface VisitorItem extends BasicApplyItem, BasicTimeResult {
  visitor: string;
  foreign: number;
  come_from: string;
  health_code: string;
}

export type GetVisitorListResultModel = BasicFetchResult<VisitorItem>;
