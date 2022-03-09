import { defineStore } from 'pinia';
import { CovidDataProp, ChinaDataProp, ProvinceDataProp, CityDataProp } from '/model/covid';
import { getCovidData } from '/api/covid';
export const useCovidStore = defineStore('covid', {
  state: () => {
    return {
      lastUpdateTime: '' as string,
      allData: {} as CovidDataProp,
      chinaAdd: {} as ChinaDataProp,
      chinaTotal: {} as ChinaDataProp,
      provinceData: [] as ProvinceDataProp[],
      cityData: [] as CityDataProp[],
    };
  },
  getters: {},
  actions: {
    async getCovidData() {
      const ret = await getCovidData();
      this.allData = ret.data;
      this.lastUpdateTime = ret.data.lastUpdateTime;
      this.chinaAdd = ret.data.china_data[0];
      this.chinaTotal = ret.data.china_data[1];
      this.cityData = ret.data.city_data;
      this.provinceData = ret.data.province_data;
    },
  },
});
