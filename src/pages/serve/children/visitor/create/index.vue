<template>
  <nut-form :model-value="formValues">
    <nut-form-item label="访客姓名" :rules="[{ required: true, message: '请填写访客姓名' }]">
      <input
        v-model="formValues.visitor"
        class="nut-input-text"
        placeholder="请输入姓名"
        type="text"
      />
    </nut-form-item>
    <nut-cell
      class="calendar"
      title="访问时间"
      :desc="
        formValues.startTime ? `${formValues.startTime}至${formValues.endTime}` : '请选择访问时间'
      "
      @click="state.showCalendar = true"
    ></nut-cell>
    <nut-calendar
      v-model:visible="state.showCalendar"
      type="range"
      :show-title="false"
      @choose="setChooseValue"
      @close="state.showCalendar = false"
    ></nut-calendar>
    <nut-form-item label="来自异地">
      <nut-radiogroup direction="horizontal" v-model="formValues.foreign">
        <nut-radio :label="0">否</nut-radio>
        <nut-radio :label="1">是</nut-radio>
      </nut-radiogroup>
    </nut-form-item>
    <nut-form-item label="访客住址" :rules="[{ required: true, message: '请填写访客家庭地址' }]">
      <input
        v-model="formValues.address"
        class="nut-input-text"
        placeholder="请输入访客的家庭住址"
        type="text"
      />
    </nut-form-item>
    <nut-form-item
      label="访客的健康码与行程码截图"
      :rules="[{ required: true, message: '请上传访客健康码行程码截图' }]"
    >
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
import { ShowToast } from '/@/hooks/useShowMessage';
import { createVisitor } from '/@/api/serve/visitor';

const userStore = useUserStore();

const state = reactive({
  showCalendar: false,
  uploadConfig: {
    url: `${global.apiUrl}/upload`,
    headers: { Authorization: `Bearer ${userStore.getToken}` },
  },
  userPromise: true,
});
const formValues = reactive({
  visitor: '',
  foreign: 0,
  address: '',
  startTime: '',
  endTime: '',
  healthCode: [] as string[],
});

const setChooseValue = (param) => {
  formValues.startTime = param[0][3];
  formValues.endTime = param[1][3];
};

const SuccessCallback = (res) => {
  const data = JSON.parse(res.data.data);
  if (data.code !== 0) {
    ShowToast.error('上传失败');
    return;
  }
  formValues.healthCode.push(data.result);
};

const ErrorCallback = () => {
  ShowToast.error('上传失败');
};

const submitFormValues = async () => {
  // 组件自带的实在是难用，还不如自己写
  if (!formValues.visitor) {
    ShowToast.info('请填写访客姓名');
    return;
  }
  if (!formValues.startTime && !formValues.endTime) {
    ShowToast.info('请填写访问时间');
    return;
  }
  if (!formValues.address) {
    ShowToast.info('请填写访客家庭住址');
    return;
  }
  if (formValues.healthCode.length < 2) {
    ShowToast.info('请同时上传访客行程码和健康码');
    return;
  }
  await createVisitor(formValues);
  redirectTo({
    url: '/pages/serve/children/visitor/index',
  });
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
