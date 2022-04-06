import { reactive } from 'vue';

export const tabList = reactive({
  tabValue: 't1',
  list: [
    {
      title: '总览',
      paneKey: 't1',
    },
    {
      title: '中风险',
      paneKey: 't2',
    },
    {
      title: '高风险',
      paneKey: 't3',
    },
  ],
});

export const areaRemarkList = reactive({
  low: {
    name: '低风险地区',
    remark: '无确诊病例或连续14天无新增确诊病例',
    color: '#7FC64F',
  },
  middle: {
    name: '中风险地区',
    remark:
      '14天内有新增确诊病例，累计确诊病例不超过50例，或累计确诊病例超过50例，14天内未发生聚集性疫情',
    color: '#FDBE34',
  },
  high: {
    name: '高风险地区',
    remark: '累计确诊病例超过50例，14天内有聚集性疫情发生',
    color: '#F26161',
  },
});
