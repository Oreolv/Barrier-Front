<template>
  <nut-form>
    <nut-form-item :label="formSchema.temperature">
      <nut-radiogroup v-model="formValues.temperature">
        <nut-radio label="36~37.2℃">36~37.2℃</nut-radio>
        <nut-radio label="37.3~37.9℃">37.3~37.9℃</nut-radio>
        <nut-radio label="38℃及以上">38℃及以上</nut-radio>
      </nut-radiogroup>
    </nut-form-item>
    <nut-form-item :label="formSchema.diagnosis">
      <nut-radiogroup direction="horizontal" v-model="formValues.diagnosis">
        <nut-radio :label="0">否</nut-radio>
        <nut-radio :label="1">是</nut-radio>
      </nut-radiogroup>
    </nut-form-item>
    <nut-form-item :label="formSchema.contact">
      <nut-radiogroup direction="horizontal" v-model="formValues.contact">
        <nut-radio :label="0">否</nut-radio>
        <nut-radio :label="1">是</nut-radio>
      </nut-radiogroup>
    </nut-form-item>
    <nut-form-item :label="formSchema.symptom">
      <nut-radiogroup direction="horizontal" v-model="formValues.symptom">
        <nut-radio :label="0">否</nut-radio>
        <nut-radio :label="1">是</nut-radio>
      </nut-radiogroup>
    </nut-form-item>
    <nut-form-item :label="formSchema.hospital">
      <nut-radiogroup v-model="formValues.hospital">
        <nut-radio label="无">无</nut-radio>
        <nut-radio label="就诊">就诊</nut-radio>
        <nut-radio label="住院">住院</nut-radio>
      </nut-radiogroup>
    </nut-form-item>
  </nut-form>

  <div class="footer">
    <nut-checkbox v-model="state.userPromise" label="本人承诺以上内容属实">
      本人承诺以上内容属实
    </nut-checkbox>
    <nut-button type="primary" block @click="submitFormValues">提交申请</nut-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { global } from '/@/utils/global';
import { redirectTo } from '@tarojs/taro';
import { useUserStore } from '/@/store/users';
import { validate } from '/@/hooks/useHandleFormValues';
import { createHealth } from '/@/api/serve/health';
import { formValues, formSchema } from './data';

const userStore = useUserStore();

const state = reactive({
  chinaAreaData: [],
  areaDataValue: [],
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

const submitFormValues = async () => {
  // 组件自带的实在是难用，还不如自己写
  validate(formValues, formSchema);
  await createHealth(formValues);
  setTimeout(() => {
    redirectTo({
      url: '/pages/serve/children/health/index',
    });
  }, 1000);
};
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
