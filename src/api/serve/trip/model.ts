import { ResidentInfo } from '/@/api/model/baseModel';

export interface CreateTripParams {
  destination: string;
  startTime: string;
  endTime: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
}

export interface TripItem {
  id: number;
  residentId: number;
  status: number;
  destination: string;
  startTime: string;
  endTime: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
  residentInfo: ResidentInfo;
}

export type GetTripListResultModel = TripItem[];
