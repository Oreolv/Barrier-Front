import { reactive } from 'vue';
import { CreateAgencyParams } from '/@/api/serve/agency/model';

export const formValues = reactive<CreateAgencyParams>({
  type: '生活物资',
  content: '',
});

export const formSchema = {
  type: '代办类型',
  content: '具体内容',
};

export const agencyType = ['送水送气', '跑腿服务', '代排队', '机场接送', '其他'];
