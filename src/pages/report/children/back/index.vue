<template>
  <nut-form>
    <nut-form-item :label="formSchema.come_from">
      <input
        v-model="formValues.come_from"
        class="nut-input-text"
        :placeholder="`请选择您${formSchema.come_from}`"
        :disabled="true"
        @click="state.showCascader = true"
      />
      <nut-cascader
        title="地址选择"
        v-model:visible="state.showCascader"
        v-model="state.areaDataValue"
        @change="confirmAreaData"
        value-key="text"
        :options="state.chinaAreaData"
      ></nut-cascader>
    </nut-form-item>
    <nut-form-item :label="formSchema.risk_status">
      <input
        v-model="riskStatusShowValue"
        class="nut-input-text"
        :placeholder="`请选择所在地区${formSchema.risk_status}`"
        :disabled="true"
        @click="state.showRiskStatusPicker = true"
      />
      <nut-picker
        v-model:visible="state.showRiskStatusPicker"
        :columns="riskStatusColumns"
        title="风险等级"
        @confirm="handleRisk"
      ></nut-picker>
    </nut-form-item>
    <nut-form-item :label="formSchema.vehicle">
      <input
        v-model="vehicleShowValue"
        class="nut-input-text"
        :placeholder="`请选择${formSchema.vehicle}`"
        :disabled="true"
        @click="state.showVehiclePicker = true"
      />
      <nut-picker
        v-model:visible="state.showVehiclePicker"
        :columns="vehicleColumns"
        title="交通工具"
        @confirm="handleVehicle"
      ></nut-picker>
    </nut-form-item>
    <nut-form-item :label="formSchema.vehicle_no">
      <input
        v-model="formValues.vehicle_no"
        class="nut-input-text"
        placeholder="请输入车牌号/车次号/航班号"
        type="text"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.vehicle_seat">
      <input
        v-model="formValues.vehicle_seat"
        class="nut-input-text"
        placeholder="请输入座位号(自驾与大巴请填无)"
        type="text"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.end_time">
      <input
        v-model="state.timePickerShowValue"
        class="nut-input-text"
        :placeholder="`请选择您的${formSchema.end_time}`"
        :disabled="true"
        @click="state.showEndTime = true"
      />
      <nut-datepicker
        v-model="formValues.end_time"
        title="日期时间选择"
        type="datetime"
        :min-date="new Date(2016, 0, 1)"
        :max-date="new Date(2046, 11, 31)"
        @confirm="confirm"
        v-model:visible="state.showEndTime"
      ></nut-datepicker>
    </nut-form-item>
    <nut-form-item :label="formSchema.health_code">
      <nut-uploader
        :headers="uploadConfig.headers"
        :url="uploadConfig.url"
        multiple
        @success="handleSuccess"
        @failure="handleError"
        maximum="2"
      ></nut-uploader>
    </nut-form-item>
  </nut-form>

  <div class="footer">
    <nut-checkbox v-model="state.userPromise" label="本人承诺以上内容属实">
      本人承诺以上内容属实
    </nut-checkbox>
    <nut-button type="primary" block @click="handleSubmit">提交申请</nut-button>
  </div>
</template>
<script lang="ts" setup>
import { global } from '/@/utils/global';
import { switchTab } from '@tarojs/taro';
import { Flag } from '/@/pages/report/data';
import { useUserStore } from '/@/store/users';
import { createBack } from '/@/api/serve/back';
import { ShowToast } from '/@/hooks/useShowMessage';
import { getChinaAreaData } from '/@/api/system/index';
import { reactive, onBeforeMount, computed } from 'vue';
import { validate, reset } from '/@/hooks/useHandleFormValues';
import { formValues, formSchema, vehicleColumns, riskStatusColumns } from './data';

const userStore = useUserStore();

const state = reactive({
  chinaAreaData: [],
  areaDataValue: [],
  showEndTime: false,
  showCascader: false,
  showVehiclePicker: false,
  showRiskStatusPicker: false,
  userPromise: true,
  timePickerShowValue: '',
});

const uploadConfig = {
  url: `${global.apiUrl}/upload`,
  headers: { Authorization: `Bearer ${userStore.getToken}` },
};

onBeforeMount(async () => {
  state.chinaAreaData = (await getChinaAreaData()) as any;
  const time = new Date().toJSON().substring(0, 10).split('-').map(Number);
  formValues.end_time = new Date(time[0], time[1] - 1, time[2], 8, 0);
});

const confirm = ({ selectedValue }) => {
  const date = selectedValue.slice(0, 3).join('-');
  const time = selectedValue.slice(3).join(':');
  formValues.end_time = date + ' ' + time;
  state.timePickerShowValue = date + ' ' + time;
};

function confirmAreaData(data) {
  state.areaDataValue = data;
  let [prov, city, area] = data;
  city = city + '市';
  area = area + '区';
  prov = ['天津', '北京', '上海', '重庆'].includes(prov) ? prov + '市' : prov + '省';
  formValues.come_from = [prov, city, area].join(' ');
}

const vehicleShowValue = computed(() => {
  if (isNaN(formValues.vehicle)) {
    return '';
  }
  const i = vehicleColumns.value.filter((i) => i.value == Number(formValues.vehicle))[0];
  return i.text;
});

const riskStatusShowValue = computed(() => {
  if (isNaN(formValues.risk_status)) {
    return '';
  }
  const i = riskStatusColumns.value.filter((i) => i.value == Number(formValues.risk_status))[0];
  return i.text;
});

function handleVehicle(record) {
  formValues.vehicle = record.selectedOptions[0].value;
}

function handleRisk(record) {
  formValues.risk_status = record.selectedOptions[0].value;
}

function handleSuccess(res) {
  const data = JSON.parse(res.data.data);
  if (data.code !== 0) {
    ShowToast.error('上传失败');
    return;
  }
  formValues.health_code.push(data.result);
}

function handleError() {
  ShowToast.error('上传失败');
}

async function handleSubmit() {
  validate(formValues, formSchema);
  await createBack(formValues);
  setTimeout(() => {
    Flag.value = true;
    switchTab({
      url: '/pages/report/index',
    });
    reset(formValues);
  }, 1000);
}
</script>

<style lang="scss">
.calendar {
  .nut-cell__title {
    flex: 0 1 auto;
    width: 100px;
  }
}
.nut-cell__value {
  color: #808080;
}
.footer {
  padding: 16px;
  .nut-button {
    margin-top: 16px;
    width: 100%;
  }
}
.nut-cascader__popup {
  .nut-tabs__titles-item.active .nut-tabs__titles-item__line {
    background: #1a1a1a !important;
  }
}
</style>
