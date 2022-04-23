import { reactive, ref } from 'vue';

export const formValues = reactive({
  come_from: '',
  vehicle: '',
  vehicle_no: '',
  vehicle_seat: '',
  end_time: '',
  risk_status: NaN,
  health_code: [] as string[],
});

export const formSchema = {
  come_from: '来自何地',
  end_time: '到达时间',
  vehicle: '交通工具',
  vehicle_no: '车牌/车次号',
  vehicle_seat: '座位号',
  risk_status: '风险等级',
  health_code: '您的健康码与行程码',
};

export const vehicleColumns = ref<Array<{ text: string; value: number }>>([
  { text: '驾车', value: 0 },
  { text: '大巴', value: 1 },
  { text: '火车', value: 2 },
  { text: '高铁', value: 3 },
  { text: '飞机', value: 4 },
]);

export const risk_statusColumns = ref<Array<{ text: string; value: number }>>([
  { text: '低风险', value: 0 },
  { text: '中风险', value: 1 },
  { text: '高风险', value: 2 },
]);
