import { BasicApplyItem, BasicTimeResult } from '/@/api/model/baseModel';

export interface CreateAbnormalParams {
  abnormal: string;
  foreign: number;
  comeFrom: string;
  goTo: string;
  startTime: string;
  endTime: string;
  healthCode: string[];
}

export interface AbnormalItem extends Omit<BasicApplyItem, 'starTime | endTime'>, BasicTimeResult {
  temperature: string;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: string;
}

export type GetAbnormalListResultModel = AbnormalItem[];
