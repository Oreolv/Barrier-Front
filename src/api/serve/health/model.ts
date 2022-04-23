import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateHealthParams {
  temperature: number;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: number;
}

export interface HealthItem extends BasicApplyItem, BasicTimeResult {
  temperature: number;
  diagnosis: number;
  contact: number;
  symptom: number;
  hospital: number;
}

export type GetHealthListResultModel = BasicFetchResult<HealthItem>;
