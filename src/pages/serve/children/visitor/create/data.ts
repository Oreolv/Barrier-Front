import { reactive } from 'vue';

export const formValues = reactive({
  visitor: '',
  foreign: 0,
  come_from: '',
  goTo: '',
  start_time: '',
  end_time: '',
  health_code: [] as string[],
});

export const formSchema = {
  visitor: '访客姓名',
  foreign: '来自异地',
  come_from: '来自何地',
  goTo: '去往何地',
  start_time: '开始时间',
  end_time: '结束时间',
  health_code: '访客的健康码与行程码',
};
