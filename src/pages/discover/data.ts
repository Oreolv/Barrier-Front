import { reactive } from 'vue';

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
