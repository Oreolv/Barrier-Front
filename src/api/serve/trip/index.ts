import { defHttp } from '/@/utils/axios';
import { BasicPageParams } from '/@/api/model/baseModel';
import { CreateTripParams, GetTripListResultModel } from './model';
enum Api {
  CreateTrip = '/trip/createTrip',
  GetTripList = '/trip/getTripList',
}

export function createTrip(params: CreateTripParams) {
  return defHttp.post<null>({ url: Api.CreateTrip, params }, { showSuccessMessage: true });
}

export function getTripList(params: BasicPageParams) {
  return defHttp.get<GetTripListResultModel>({ url: Api.GetTripList, params });
}
