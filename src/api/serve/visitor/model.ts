import { BasicApplyItem } from '/@/api/model/baseModel';

export interface CreateVisitorParams {
  visitor: string;
  foreign: number;
  comeFrom: string;
  goTo: string;
  startTime: string;
  endTime: string;
  healthCode: string[];
}

export interface VisitorItem extends BasicApplyItem {
  visitor: string;
  foreign: number;
  comeFrom: string;
  goTo: string;
  healthCode: string;
}

export type GetVisitorListResultModel = VisitorItem[];
