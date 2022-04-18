import { reactive, ref } from 'vue';

export const formValues = reactive({
  comeFrom: '',
  vehicle: '',
  vehicleNo: '',
  vehicleSeat: '',
  endTime: '',
  riskStatus: NaN,
  healthCode: [] as string[],
});

export const formSchema = {
  comeFrom: '来自何地',
  endTime: '到达时间',
  vehicle: '交通工具',
  vehicleNo: '车牌/车次号',
  vehicleSeat: '座位号',
  riskStatus: '风险等级',
  healthCode: '您的健康码与行程码',
};

export const vehicleColumns = ref<Array<{ text: string; value: number }>>([
  { text: '驾车', value: 0 },
  { text: '大巴', value: 1 },
  { text: '火车', value: 2 },
  { text: '高铁', value: 3 },
  { text: '飞机', value: 4 },
]);

export const riskStatusColumns = ref<Array<{ text: string; value: number }>>([
  { text: '低风险', value: 0 },
  { text: '中风险', value: 1 },
  { text: '高风险', value: 2 },
]);
