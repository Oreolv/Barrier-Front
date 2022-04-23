<template>
  <nut-form>
    <nut-form-item :label="formSchema.visitor">
      <input
        v-model="formValues.visitor"
        class="nut-input-text"
        :placeholder="`请输入${formSchema.visitor}`"
        type="text"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.start_time">
      <input
        v-model="rangeDate"
        class="nut-input-text"
        :placeholder="`请选择${formSchema.start_time}`"
        :disabled="true"
        @click="state.showCalendar = true"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.foreign">
      <nut-radiogroup direction="horizontal" v-model="formValues.foreign">
        <nut-radio :label="0">否</nut-radio>
        <nut-radio :label="1">是</nut-radio>
      </nut-radiogroup>
    </nut-form-item>
    <nut-form-item :label="formSchema.come_from">
      <input
        v-model="formValues.come_from"
        class="nut-input-text"
        :placeholder="`请输入访客${formSchema.come_from}`"
        type="text"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.goTo">
      <input
        v-model="formValues.goTo"
        class="nut-input-text"
        :placeholder="`请输入访客${formSchema.goTo}`"
        type="text"
      />
    </nut-form-item>
    <nut-form-item :label="formSchema.health_code">
      <nut-uploader
        :headers="state.uploadConfig.headers"
        :url="state.uploadConfig.url"
        multiple
        @success="SuccessCallback"
        @failure="ErrorCallback"
        maximum="2"
      ></nut-uploader>
    </nut-form-item>
  </nut-form>
  <nut-calendar
    v-model:visible="state.showCalendar"
    type="range"
    :show-title="false"
    @choose="setChooseValue"
    @close="state.showCalendar = false"
  ></nut-calendar>
  <div class="footer">
    <nut-checkbox v-model="state.userPromise" label="本人承诺以上内容属实">
      本人承诺以上内容属实
    </nut-checkbox>
    <nut-button type="primary" block @click="submitFormValues">提交申请</nut-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { global } from '/@/utils/global';
import { redirectTo } from '@tarojs/taro';
import { useUserStore } from '/@/store/users';
import { validate } from '/@/hooks/useHandleFormValues';
import { createVisitor } from '/@/api/serve/visitor';
import { ShowToast } from '/@/hooks/useShowMessage';
import { formValues, formSchema } from './data';

const userStore = useUserStore();

const state = reactive({
  showCalendar: false,
  uploadConfig: {
    url: `${global.apiUrl}/upload`,
    headers: { Authorization: `Bearer ${userStore.getToken}` },
  },
  userPromise: true,
});

const rangeDate = computed(() => {
  if (!formValues.start_time) {
    return '请选择行程持续时间';
  }
  return `${formValues.start_time}至${formValues.end_time}`;
});

const setChooseValue = (param) => {
  formValues.start_time = param[0][3];
  formValues.end_time = param[1][3];
};

const SuccessCallback = (res) => {
  const data = JSON.parse(res.data.data);
  if (data.code !== 0) {
    ShowToast.error('上传失败');
    return;
  }
  formValues.health_code.push(data.result);
};

const ErrorCallback = () => {
  ShowToast.error('上传失败');
};

const submitFormValues = async () => {
  // 组件自带的实在是难用，还不如自己写
  validate(formValues, formSchema);
  await createVisitor(formValues);
  setTimeout(() => {
    redirectTo({
      url: '/pages/serve/children/visitor/index',
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
