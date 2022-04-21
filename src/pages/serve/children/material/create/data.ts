import { reactive } from 'vue';

export const formValues = reactive({
  type: '生活物资',
  content: '',
});

export const formSchema = {
  type: '物资类型',
  content: '具体内容',
};

export const materialType = ['生活物资', '防疫物资', '其他'];
