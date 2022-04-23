import { BasicApplyItem, BasicTimeResult } from '/@/api/model/baseModel';
import { VehicleEnum } from '/@/enums/serveEnums';

export interface CreateBackParams {
  vehicle: VehicleEnum;
  vehicleNo: string;
  vehicleSeat: string;
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
