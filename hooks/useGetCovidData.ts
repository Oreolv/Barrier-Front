import { getCovidData } from './../api/covid';
import { CovidDataProp } from './../model/covid';
import { SuccessToast, ErrorToast } from './useShowToast';

export const useGetCovidData = async (): Promise<CovidDataProp> => {
  const { data } = await getCovidData();
  return data;
};
