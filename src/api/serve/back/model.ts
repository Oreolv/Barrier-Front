import { BasicApplyItem, BasicTimeResult } from '/@/api/model/baseModel';

export interface CreateBackParams {
  riskStatus: number;
  come_from: string;
  endTime: string;
  healthCode: string[];
}

export interface BackItem extends BasicApplyItem, BasicTimeResult {
  come_from: string;
  riskStatus: number;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
  healthCode: string[];
}

export type GetBackListResultModel = BackItem[];
