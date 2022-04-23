import { BasicApplyItem, BasicFetchResult, BasicTimeResult } from '/@/api/model/baseModel';

export interface CreateTripParams {
  destination: string;
  startTime: string;
  endTime: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
}

export interface TripItem extends BasicApplyItem, BasicTimeResult {
  destination: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
}

export type GetTripListResultModel = BasicFetchResult<TripItem>;
