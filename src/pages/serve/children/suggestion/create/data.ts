import { reactive } from 'vue';

export const formValues = reactive({
  type: '防疫相关',
  content: '',
});

export const formSchema = {
  type: '意见类型',
  content: '意见内容',
};

export const suggestionType = [
  '防疫相关',
  '人员投诉',
  '工作建议',
  '人员进出',
  '问题咨询',
  '小程序优化',
  '其他',
];
