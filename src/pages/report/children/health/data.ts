import { reactive } from 'vue';
import { CreateHealthParams } from '/@/api/serve/health/model';

export const formValues = reactive<CreateHealthParams>({
  temperature: '',
  diagnosis: NaN,
  contact: NaN,
  symptom: NaN,
  hospital: '',
});

export const formSchema = {
  temperature: '今日体温',
  diagnosis: '是否为疑似、确诊患者',
  contact: '是否接触疑似、确诊患者',
  symptom: '是否有咳嗽、乏力等症状',
  hospital: '是否就诊或住院',
};
