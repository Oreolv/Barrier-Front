import { reactive } from 'vue';

export const formValues = reactive({
  visitor: '',
  foreign: 0,
  comeFrom: '',
  goTo: '',
  startTime: '',
  endTime: '',
  healthCode: [] as string[],
});

export const formSchema = {
  visitor: '访客姓名',
  foreign: '来自异地',
  comeFrom: '来自何地',
  goTo: '去往何地',
  startTime: '开始时间',
  endTime: '结束时间',
  healthCode: '访客的健康码与行程码',
};
