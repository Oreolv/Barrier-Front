<template>
  <nut-form :model-value="formValues">
    <nut-form-item :label="formSchema.destination">
      <input
        v-model="formValues.destination"
        class="nut-input-text"
        :placeholder="`请输入${formSchema.destination}`"
        type="text"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.start_time">
      <input
        v-model="dateRange"
        class="nut-input-text"
        placeholder="请选择行程持续时间"
        :disabled="true"
        @click="state.showCalendar = true"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.vehicle">
      <input
        v-model="vehicleShowValue"
        class="nut-input-text"
        :placeholder="`请选择${formSchema.vehicle}`"
        :disabled="true"
        @click="state.showVehiclePicker = true"
      />
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
  </nut-form>
  <nut-calendar
    v-model:visible="state.showCalendar"
    type="range"
    :show-title="false"
    @choose="setCalendarValue"
    @close="state.showCalendar = false"
  ></nut-calendar>
  <nut-picker
    v-model:visible="state.showVehiclePicker"
    :columns="vehicleColumns"
    title="交通工具"
    @confirm="handleVehiclePickerComfirm"
  ></nut-picker>
  <div class="footer">
    <nut-checkbox v-model="state.userPromise" label="本人承诺以上内容属实">
      本人承诺以上内容属实
    </nut-checkbox>
    <nut-button type="primary" block @click="handleSubmit">提交申请</nut-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { switchTab } from '@tarojs/taro';
import { Flag } from '/@/pages/report/data';
import { createTrip } from '/@/api/serve/trip';
import { validate, reset } from '/@/hooks/useHandleFormValues';
import { formValues, formSchema, vehicleColumns } from './data';

const state = reactive({
  showCalendar: false,
  showVehiclePicker: false,
  userPromise: true,
});

const dateRange = computed(() => {
  if (formValues.start_time === '') {
    return '请选择行程持续时间';
  }
  return `${formValues.start_time}至${formValues.end_time}`;
});

const vehicleShowValue = computed(() => {
  if (isNaN(formValues.vehicle)) {
    return '';
  }
  const i = vehicleColumns.value.filter((i) => i.value == Number(formValues.vehicle))[0];
  return i.text;
});

function setCalendarValue(param) {
  formValues.start_time = param[0][3];
  formValues.end_time = param[1][3];
}

function handleVehiclePickerComfirm(record) {
  formValues.vehicle = record.selectedOptions[0].value;
}

async function handleSubmit() {
  validate(formValues, formSchema);
  await createTrip(formValues);
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
</style>
