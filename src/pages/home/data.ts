import { reactive } from 'vue';

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

export const CityColumn = [
  {
    title: '城市(区)',
    key: 'name',
    align: 'center',
  },
  {
    title: '省市',
    key: 'province',
    align: 'center',
  },
  {
    title: '新增',
    key: 'confirm',
    align: 'center',
  },
  {
    title: '确诊',
    key: 'nowConfirm',
    align: 'center',
  },
];

export const TabList = reactive({
  tabValue: '0',
  list: [
    {
      title: '疫情数据',
      paneKey: '0',
    },
    {
      title: '疫情新闻',
      paneKey: '1',
    },
    {
      title: '防疫知识',
      paneKey: '2',
    },
    {
      title: '社区公告',
      paneKey: '3',
    },
  ],
});
