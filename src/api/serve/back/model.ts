import { BasicApplyItem } from '/@/api/model/baseModel';

export interface CreateBackParams {
  riskStatus: number;
  comeFrom: string;
  endTime: string;
  healthCode: string[];
}

export interface BackItem extends BasicApplyItem {
  comeFrom: string;
  riskStatus: number;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
  healthCode: string[];
}

export type GetBackListResultModel = BackItem[];
