import { reactive } from 'vue';
import { VisitorItem } from '/@/api/serve/visitor/model';

export const TabList = reactive({
  tabValue: 'visitor',
  list: [
    {
      title: '来访申请',
      paneKey: 'visitor',
    },
    {
      title: '行程报备',
      paneKey: 'trip',
    },
    {
      title: '返乡报备',
      paneKey: 'back',
    },
    {
      title: '异常报备',
      paneKey: 'abnormal',
    },
    {
      title: '健康上报',
      paneKey: 'health',
    },
    {
      title: '物资申请',
      paneKey: 'material',
    },
    {
      title: '事情代办',
      paneKey: 'agency',
    },
  ],
});

export const ServeList = [
  {
    key: 'visitor',
    name: '来访申请',
    icon: 'tongxunlu',
  },
  {
    key: 'trip',
    name: '行程报备',
    icon: 'ziyuangongxiang',
  },
  {
    key: 'back',
    name: '返乡报备',
    icon: 'laifangshenpi',
  },
  {
    key: 'abnormal',
    name: '异常报备',
    icon: 'tongzhi',
  },
  {
    key: 'health',
    name: '健康上报',
    icon: 'renzheng',
  },
  {
    key: 'material',
    name: '物资申请',
    icon: 'che',
  },
  {
    key: 'agency',
    name: '事情代办',
    icon: 'wenjian',
  },
];

export interface DataListProps {
  visitor: VisitorItem[];
}

export const DataList = reactive<DataListProps>({
  visitor: [],
});
