<template>
  <div class="health">
    <div class="health-item">
      <div class="health-item__title">{{ formSchema.temperature }}</div>
      <div class="health-item__form">
        <scroll-view :scroll-x="true" style="white-space: nowrap">
          <nut-radiogroup direction="horizontal" v-model="formValues.temperature">
            <nut-radio shape="button" :label="0">{{ TemperatureEnum[0] }}</nut-radio>
            <nut-radio shape="button" :label="1">{{ TemperatureEnum[1] }}</nut-radio>
            <nut-radio shape="button" :label="2">{{ TemperatureEnum[2] }}</nut-radio>
          </nut-radiogroup>
        </scroll-view>
      </div>
    </div>
    <div class="health-item">
      <div class="health-item__title">{{ formSchema.diagnosis }}</div>
      <div class="health-item__form">
        <nut-radiogroup direction="horizontal" v-model="formValues.diagnosis">
          <nut-radio shape="button" :label="0">否</nut-radio>
          <nut-radio shape="button" :label="1">是</nut-radio>
        </nut-radiogroup>
      </div>
    </div>
    <div class="health-item">
      <div class="health-item__title">{{ formSchema.contact }}</div>
      <div class="health-item__form">
        <nut-radiogroup direction="horizontal" v-model="formValues.contact">
          <nut-radio shape="button" :label="0">否</nut-radio>
          <nut-radio shape="button" :label="1">是</nut-radio>
        </nut-radiogroup>
      </div>
    </div>
    <div class="health-item">
      <div class="health-item__title">{{ formSchema.symptom }}</div>
      <div class="health-item__form">
        <nut-radiogroup direction="horizontal" v-model="formValues.symptom">
          <nut-radio shape="button" :label="0">否</nut-radio>
          <nut-radio shape="button" :label="1">是</nut-radio>
        </nut-radiogroup>
      </div>
    </div>
    <div class="health-item">
      <div class="health-item__title">{{ formSchema.hospital }}</div>
      <div class="health-item__form">
        <nut-radiogroup direction="horizontal" v-model="formValues.hospital">
          <nut-radio shape="button" :label="0">{{ HospitalEnum[0] }}</nut-radio>
          <nut-radio shape="button" :label="1">{{ HospitalEnum[1] }}</nut-radio>
          <nut-radio shape="button" :label="2">{{ HospitalEnum[2] }}</nut-radio>
        </nut-radiogroup>
      </div>
    </div>
  </div>
  <div class="footer">
    <nut-checkbox v-model="state.userPromise" label="本人承诺以上内容属实">
      本人承诺以上内容属实
    </nut-checkbox>
    <nut-button type="primary" block @click="handleSubmit">提交申请</nut-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { switchTab } from '@tarojs/taro';
import { global } from '/@/utils/global';
import { useUserStore } from '/@/store/users';
import { formValues, formSchema } from './data';
import { createHealth } from '/@/api/serve/health';
import { validate } from '/@/hooks/useHandleFormValues';
import { TemperatureEnum, HospitalEnum } from '/@/enums/serveEnums';

const userStore = useUserStore();

const state = reactive({
  showEndTime: false,
  showCascader: false,
  showVehiclePicker: false,
  showRiskStatusPicker: false,
  uploadConfig: {
    url: `${global.apiUrl}/upload`,
    headers: { Authorization: `Bearer ${userStore.getToken}` },
  },
  userPromise: true,
});

async function handleSubmit() {
  validate(formValues, formSchema);
  await createHealth(formValues);
  setTimeout(() => {
    switchTab({
      url: '/pages/report/index',
    });
  }, 1000);
}
</script>

<style lang="scss">
.health {
  padding: 0 16px;
  .health-item {
    margin: 16px 0;
    .health-item__title {
      font-size: 14px;
      color: #666666;
      margin-bottom: 16px;
    }
  }
}
.footer {
  padding: 16px;
  .nut-button {
    margin-top: 16px;
    width: 100%;
  }
}
</style>

<style lang="scss">
.nut-radio__button--active {
  background-color: #1a1a1a;
  border: none;
  color: white;
}
.nut-radio__button {
  border-radius: 0;
  font-size: 13px;
  padding: 12rpx 24px;
}
</style>
