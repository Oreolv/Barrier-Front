import { reactive } from 'vue';
import { NewsItem } from '/@/api/index/model/informationModel';
import { GetCovidDataResultModel } from '/@/api/index/model/covidModel';
import { getTipsList, getNewsList } from '/@/api/index/information';

interface DataListProps {
  allData: GetCovidDataResultModel;
  newsList: NewsItem[];
  tipsList: NewsItem[];
}

export const CovidList = [
  {
    name: 'nowConfirm',
    des: '现有确诊',
  },
  {
    name: 'localConfirm',
    des: '本土现有确诊',
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
  tabValue: 'covid',
  list: [
    {
      title: '疫情数据',
      paneKey: 'covid',
    },
    {
      title: '疫情新闻',
      paneKey: 'news',
    },
    {
      title: '防疫知识',
      paneKey: 'tips',
    },
  ],
});

export const DataList = reactive<DataListProps>({
  allData: {} as GetCovidDataResultModel,
  newsList: [],
  tipsList: [],
});

export const FuncList = {
  news: getNewsList,
  tips: getTipsList,
};
