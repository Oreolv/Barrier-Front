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
  destination: string;
  startTime: string;
  endTime: string;
  vehicle: string;
  vehicleNo: string;
  vehicleSeat: string;
}

export type GetTripListResultModel = TripItem[];
