import { defHttp } from '/@/utils/axios';
import { BasicPageParams } from '/@/api/model/baseModel';
import { CreateTripParams, GetTripListResultModel } from './model';
enum Api {
  CreateTrip = '/trip/createTrip',
  GetTripList = '/trip/getTripList',
  RemoveTrip = '/trip/removeTrip',
}

export function createTrip(params: CreateTripParams) {
  return defHttp.post<null>({ url: Api.CreateTrip, params }, { showSuccessMessage: true });
}

export function getTripList(params: BasicPageParams) {
  return defHttp.get<GetTripListResultModel>({ url: Api.GetTripList, params });
}

export function removeTrip(id: number) {
  return defHttp.delete<null>({ url: `${Api.RemoveTrip}?id=${id}` }, { showSuccessMessage: true });
}
