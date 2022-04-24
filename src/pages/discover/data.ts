import { reactive } from 'vue';
import { SuggestionItem } from '/@/api/serve/suggestion/model';
import { NoticeItem } from '/@/api/index/model/informationModel';

interface DataListProps {
  noticeList: NoticeItem[];
  suggestionList: SuggestionItem[];
}

export const TabList = reactive({
  tabValue: '0',
  list: [
    {
      title: '社区公告',
      paneKey: '0',
    },
    {
      title: '意见反馈',
      paneKey: '1',
    },
  ],
});

export const DataList = reactive<DataListProps>({
  noticeList: [],
  suggestionList: [],
});
