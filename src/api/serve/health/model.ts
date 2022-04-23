import { BasicApplyItem, BasicTimeResult } from '/@/api/model/baseModel';

export interface CreateHealthParams {
  temperature: string;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: string;
}

export interface HealthItem extends Omit<BasicApplyItem, 'start_time | end_time'>, BasicTimeResult {
  temperature: string;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: string;
}

export type GetHealthListResultModel = HealthItem[];
