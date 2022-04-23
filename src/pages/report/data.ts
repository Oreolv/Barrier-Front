import { reactive } from 'vue';
import { TripItem } from '/@/api/serve/trip/model';
import { BackItem } from '/@/api/serve/back/model';
import { AgencyItem } from '/@/api/serve/agency/model';
import { HealthItem } from '/@/api/serve/health/model';
import { VisitorItem } from '/@/api/serve/visitor/model';
import { AbnormalItem } from '/@/api/serve/abnormal/model';
import { MaterialItem } from '/@/api/serve/material/model';

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
  agency: AgencyItem[];
  health: HealthItem[];
  visitor: VisitorItem[];
  abnormal: AbnormalItem[];
  material: MaterialItem[];
}

export const DataList = reactive<DataListProps>({
  trip: [],
  back: [],
  agency: [],
  health: [],
  visitor: [],
  abnormal: [],
  material: [],
});
