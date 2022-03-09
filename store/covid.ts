import { defineStore } from 'pinia';
import { CovidDataProp, ChinaDataProp, ProvinceDataProp, CityDataProp } from '/model/covid';
import { getCovidData } from '/api/covid';
export const useCovidStore = defineStore('covid', {
  state: () => {
    return {
      lastUpdateTime: '' as string,
      allData: {} as CovidDataProp,
      chinaData: [] as ChinaDataProp[],
      provinceData: [] as ProvinceDataProp[],
      cityData: [] as CityDataProp[],
    };
  },
  getters: {},
  actions: {
    async getCovidData() {
      const ret = await getCovidData();
      this.allData = ret.data;
      this.chinaData = ret.data.china_data;
      this.cityData = ret.data.city_data;
      this.provinceData = ret.data.province_data;
    },
  },
});
