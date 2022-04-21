import { reactive } from 'vue';

export const formValues = reactive({
  type: '体温异常',
  content: '',
});

export const formSchema = {
  type: '异常类型',
  content: '异常内容',
};

export const abnormalType = ['体温异常', '行程异常', '黄码/红码', '疑似密接', '疑似确诊', '其他'];
