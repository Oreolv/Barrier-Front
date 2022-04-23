import { BasicApplyItem, BasicTimeResult, BasicFetchResult } from '/@/api/model/baseModel';

export interface CreateMaterialParams {
  type: string;
  content: string;
}

export interface MaterialItem extends BasicApplyItem, BasicTimeResult {
  type: string;
  content: string;
}

export type GetMaterialListResultModel = BasicFetchResult<MaterialItem>;
