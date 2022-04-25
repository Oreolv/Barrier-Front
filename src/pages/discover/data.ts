import { reactive } from 'vue';
import { SuggestionItem } from '/@/api/serve/suggestion/model';
import { NoticeItem } from '/@/api/index/model/informationModel';
import { getNoticeList } from '/@/api/index/information';
import { getSuggestionList } from '/@/api/serve/suggestion';
interface DataListProps {
  noticeList: NoticeItem[];
  suggestionList: SuggestionItem[];
}

export const TabList = reactive({
  tabValue: 'notice',
  list: [
    {
      title: '社区公告',
      paneKey: 'notice',
    },
    {
      title: '意见反馈',
      paneKey: 'suggestion',
    },
  ],
});

export const DataList = reactive<DataListProps>({
  noticeList: [],
  suggestionList: [],
});

export const FuncList = {
  notice: getNoticeList,
  suggestion: getSuggestionList,
};
