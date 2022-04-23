import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateHealthParams {
  temperature: string;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: string;
}

export interface HealthItem extends BasicApplyItem, BasicTimeResult {
  temperature: string;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: string;
}

export type GetHealthListResultModel = BasicFetchResult<HealthItem>;
