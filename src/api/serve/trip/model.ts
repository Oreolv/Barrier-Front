import { VehicleEnum } from '/@/enums/serveEnums';
import { BasicApplyItem, BasicFetchResult, BasicTimeResult } from '/@/api/model/baseModel';

export interface CreateTripParams {
  destination: string;
  start_time: string;
  end_time: string;
  vehicle: VehicleEnum;
  vehicle_no: string;
  vehicle_seat: string;
}

export interface TripItem extends BasicApplyItem, BasicTimeResult {
  destination: string;
  vehicle: string;
  vehicle_no: string;
  vehicle_seat: string;
}

export type GetTripListResultModel = BasicFetchResult<TripItem>;
