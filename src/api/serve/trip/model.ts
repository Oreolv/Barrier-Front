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
  applicant: number;
  status: number;
  destination: string;
  startTime: string;
  endTime: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
  applicantInfo: ResidentInfo;
}

export type GetTripListResultModel = TripItem[];
