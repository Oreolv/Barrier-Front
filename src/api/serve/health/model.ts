import { BasicApplyItem, BasicTimeResult } from '/@/api/model/baseModel';

export interface CreateHealthParams {
  temperature: string;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: string;
}

export interface HealthItem extends Omit<BasicApplyItem, 'starTime | endTime'>, BasicTimeResult {
  temperature: string;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: string;
}

export type GetHealthListResultModel = HealthItem[];
