import { defineStore } from 'pinia';
import { CovidDataProp, ChinaDataProp, ProvinceDataProp, CityDataProp } from '/@/model/covid';
import { getCovidData } from '/@/api/covid';
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
  getters: {
    partCityData() {
      return this.cityData.filter((c) => c.confirm > 0);
    },
  },
  actions: {
    sortCityData() {
      this.cityData.forEach((item) => {
        if (item.confirm !== 0) {
          item.confirm = `+${item.confirm}`;
        }
      });
      return this.cityData.sort((a, b) => {
        return b.confirm - a.confirm;
      });
    },
    async getCovidData() {
      const ret = await getCovidData();
      this.allData = ret.result;
      this.lastUpdateTime = ret.result.lastUpdateTime;
      this.chinaAdd = ret.result.china_data[0];
      this.chinaTotal = ret.result.china_data[1];
      this.cityData = ret.result.city_data;
      this.provinceData = ret.result.province_data;
      this.sortCityData();
    },
  },
});
