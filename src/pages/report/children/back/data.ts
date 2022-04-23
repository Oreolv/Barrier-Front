import { reactive, ref } from 'vue';
import { VehicleEnum } from '/@/enums/serveEnums';
import { CreateBackParams } from '/@/api/serve/back/model';
import { UserHealthEnum as RiskStatusEnum } from '/@/enums/userEnum';

export const formValues = reactive<CreateBackParams>({
  come_from: '',
  vehicle: NaN,
  vehicleNo: '',
  vehicleSeat: '',
  endTime: '',
  riskStatus: NaN,
  healthCode: [] as string[],
});

export const formSchema = {
  come_from: '来自何地',
  endTime: '到达时间',
  vehicle: '交通工具',
  vehicleNo: '车牌/车次号',
  vehicleSeat: '座位号',
  riskStatus: '风险等级',
  healthCode: '您的健康码与行程码',
};

export const vehicleColumns = ref<Array<{ text: string; value: number }>>([
  { text: '驾车', value: VehicleEnum.CAR },
  { text: '大巴', value: VehicleEnum.BUS },
  { text: '火车', value: VehicleEnum.TRAIN },
  { text: '高铁', value: VehicleEnum.CHSR },
  { text: '飞机', value: VehicleEnum.PLANE },
]);

export const riskStatusColumns = ref<Array<{ text: string; value: number }>>([
  { text: '低风险', value: RiskStatusEnum.Low },
  { text: '中风险', value: RiskStatusEnum.Middle },
  { text: '高风险', value: RiskStatusEnum.High },
]);
