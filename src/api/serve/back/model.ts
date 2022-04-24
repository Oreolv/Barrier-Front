import { BasicApplyItem, BasicTimeResult } from '/@/api/model/baseModel';
import { VehicleEnum } from '/@/enums/serveEnums';

export interface CreateBackParams {
  vehicle: VehicleEnum;
  vehicle_no: string;
  vehicle_seat: string;
  risk_status: number;
  come_from: string;
  end_time: any; // Date类型
  health_code: string[];
}

export interface BackItem extends BasicApplyItem, BasicTimeResult {
  come_from: string;
  risk_status: number;
  vehicle: string;
  vehicle_no: string;
  vehicle_seat: string;
  health_code: string[];
}

export type GetBackListResultModel = BackItem[];
