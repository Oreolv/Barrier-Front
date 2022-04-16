import { defHttp } from '/@/utils/axios';
import { CreateTripParams, GetTripListResultModel } from './model';
enum Api {
  CreateTrip = '/trip/createTrip',
  GetTripList = '/trip/getTripList',
}

export function createTrip(params: CreateTripParams) {
  return defHttp.post<null>({ url: Api.CreateTrip, params }, { showSuccessMessage: true });
}

export function getTripList() {
  return defHttp.get<GetTripListResultModel>({ url: Api.GetTripList });
}
