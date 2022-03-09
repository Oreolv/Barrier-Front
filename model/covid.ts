export type ChinaDataProp = {
  confirm: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  noInfect: number;
  localConfirm: number;
};

export type ProvinceDataProp = {
  confirm: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  noInfect: number;
  localConfirm: number;
};

export type CityDataProp = {
  name: string;
  nowConfirm: number;
  confirm: number;
  heal: number;
  dead: number;
};

export interface CovidDataProp {
  lastUpdateTime: string;
  china_data: ChinaDataProp[];
  province_data: ProvinceDataProp[];
  city_data: CityDataProp[];
}

export const CovidList = [
  {
    name: 'localConfirm',
    des: '本土现有确诊',
  },
  {
    name: 'nowConfirm',
    des: '现有确诊',
  },
  {
    name: 'confirm',
    des: '累计确诊',
  },
  {
    name: 'noInfect',
    des: '无症状感染者',
  },
  {
    name: 'importedCase',
    des: '境外输入',
  },
  {
    name: 'dead',
    des: '累计死亡',
  },
];
