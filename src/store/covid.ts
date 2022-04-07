import { defineStore } from 'pinia';
import {
  GetCovidDataResultModel,
  ChinaDataItem,
  ProvinceDataItem,
  CityDataItem,
  GetRiskAreaResultModel,
} from '/@/api/model/covidModel';
import { getCovidData, getRiskArea } from '/@/api/covid';
import { addPlusAndMinus } from '/@/hooks/useTransformData';
export const useCovidStore = defineStore('covid', {
  state: () => {
    return {
      allData: {} as GetCovidDataResultModel,
      lastUpdateTime: '' as string,
      chinaAdd: {} as ChinaDataItem,
      chinaTotal: {} as ChinaDataItem,
      provinceData: [] as ProvinceDataItem[],
      cityData: [] as CityDataItem[],
      riskArea: {} as GetRiskAreaResultModel,
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
      this.allData = ret;
      this.lastUpdateTime = ret.lastUpdateTime;
      this.chinaAdd = ret.china_data[0];
      this.chinaTotal = ret.china_data[1];
      this.cityData = ret.city_data;
      this.provinceData = ret.province_data;
      for (const i in this.chinaAdd) {
        this.chinaAdd[i] = addPlusAndMinus(this.chinaAdd[i]);
      }
      this.sortCityData();
    },
    async getRiskArea() {
      const ret = await getRiskArea();
      this.riskArea = ret;
    },
  },
});
