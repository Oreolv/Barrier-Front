import { reactive } from 'vue';
import { TripItem } from '/@/api/serve/trip/model';
import { BackItem } from '../../api/serve/back/model';
import { VisitorItem } from '/@/api/serve/visitor/model';
import { AbnormalItem } from '../../api/serve/abnormal/model';

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

export interface DataListProps {
  trip: TripItem[];
  back: BackItem[];
  visitor: VisitorItem[];
  abnormal: AbnormalItem[];
}

export const DataList = reactive<DataListProps>({
  trip: [],
  back: [],
  visitor: [],
  abnormal: [],
});
