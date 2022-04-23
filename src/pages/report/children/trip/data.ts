import { reactive, ref } from 'vue';
import { VehicleEnum } from '/@/enums/serveEnums';
import { CreateTripParams } from '/@/api/serve/trip/model';

export const formValues = reactive<CreateTripParams>({
  destination: '',
  vehicle: NaN,
  vehicle_no: '',
  vehicle_seat: '',
  start_time: '',
  end_time: '',
});

export const formSchema = {
  destination: '目的地',
  start_time: '行程时间',
  vehicle: '交通工具',
  vehicle_no: '车牌/车次号',
  vehicle_seat: '座位号',
};

export const vehicleColumns = ref<Array<{ text: string; value: number }>>([
  { text: '驾车', value: VehicleEnum.CAR },
  { text: '大巴', value: VehicleEnum.BUS },
  { text: '火车', value: VehicleEnum.TRAIN },
  { text: '高铁', value: VehicleEnum.CHSR },
  { text: '飞机', value: VehicleEnum.PLANE },
]);
