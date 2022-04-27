import { reactive } from 'vue';
import { NewsItem } from '/@/api/index/model/informationModel';

interface DataListProps {
  newsList: NewsItem[];
  tipsList: NewsItem[];
}

export const TabList = reactive({
  tabValue: 'news',
  list: [
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
  newsList: [],
  tipsList: [],
});
