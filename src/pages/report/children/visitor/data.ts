import { reactive } from 'vue';
import { CreateVisitorParams } from '/@/api/serve/visitor/model';

export const formValues = reactive<CreateVisitorParams>({
  visitor: '',
  foreign: 0,
  come_from: '',
  startTime: '',
  endTime: '',
  healthCode: [],
});

export const formSchema = {
  visitor: '访客姓名',
  foreign: '来自异地',
  come_from: '来自何地',
  startTime: '开始时间',
  endTime: '结束时间',
  healthCode: '访客的健康码与行程码',
};
