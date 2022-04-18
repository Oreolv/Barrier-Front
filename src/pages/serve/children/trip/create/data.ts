import { reactive, ref } from 'vue';
import { CreateTripParams } from '/@/api/serve/trip/model';

export const formValues = reactive<CreateTripParams>({
  destination: '',
  vehicle: '',
  vehicleNo: '',
  vehicleSeat: '',
  startTime: '',
  endTime: '',
});

export const formSchema = {
  destination: '目的地',
  startTime: '行程时间',
  vehicle: '交通工具',
  vehicleNo: '车牌/车次号',
  vehicleSeat: '座位号',
};

export const vehicleColumns = ref<Array<{ text: string; value: number }>>([
  { text: '驾车', value: 0 },
  { text: '大巴', value: 1 },
  { text: '火车', value: 2 },
  { text: '高铁', value: 3 },
  { text: '飞机', value: 4 },
]);
