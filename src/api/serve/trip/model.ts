import { BasicApplyItem } from '/@/api/model/baseModel';

export interface CreateTripParams {
  destination: string;
  startTime: string;
  endTime: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
}

export interface TripItem extends BasicApplyItem {
  destination: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
}

export type GetTripListResultModel = TripItem[];
