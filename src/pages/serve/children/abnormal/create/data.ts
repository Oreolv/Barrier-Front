import { reactive, ref } from 'vue';

export const formValues = reactive({
  temperature: '36~37.2℃',
  diagnosis: 0,
  contact: 0,
  symptom: 0,
  hospital: '无',
});

export const formSchema = {
  temperature: '今日体温',
  diagnosis: '是否为疑似、确诊患者',
  contact: '是否接触疑似、确诊患者',
  symptom: '是否有咳嗽、乏力等症状',
  hospital: '是否就诊或住院',
};
