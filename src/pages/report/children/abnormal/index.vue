<template>
  <div class="header">如您出现身体不适、体温异常，或是疑似与确诊患者接触，请及时反馈</div>
  <div class="content">
    <div class="content-item">
      <div class="content-item__title">异常类型</div>
      <div class="content-item__text">
        <nut-radiogroup v-model="formValues.type" direction="horizontal">
          <nut-radio shape="button" v-for="(i, idx) in abnormalType" :key="idx" :label="i">
            {{ i }}
          </nut-radio>
        </nut-radiogroup>
      </div>
    </div>
    <div class="content-item">
      <div class="content-item__title">异常说明</div>
      <div class="content-item__text">
        <nut-textarea
          v-model="formValues.content"
          placeholder="请如实描写您的异常情况"
          limit-show
          max-length="300"
        />
      </div>
    </div>
    <div class="footer">
      <nut-button shape="square" type="primary" block @click="handleSubmit">提交</nut-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { switchTab } from '@tarojs/taro';
import { createAbnormal } from '/@/api/serve/abnormal';
import { formValues, formSchema, abnormalType } from './data';
import { validate, reset } from '/@/hooks/useHandleFormValues';

async function handleSubmit() {
  validate(formValues, formSchema);
  await createAbnormal(formValues);
  setTimeout(() => {
    switchTab({
      url: '/pages/report/index',
    });
    reset(formValues);
  }, 1000);
}
</script>

<style lang="scss">
page {
  padding: 16px;
  box-sizing: border-box;
}
.header {
  font-size: 12px;
  color: #999999;
  margin-bottom: 20px;
}
.content {
  .content-item {
    .content-item__title {
      font-size: 14px;
      color: #999999;
      margin: 16px 0;
    }
    .content-item__text {
      .nut-button {
        margin-right: 16px;
      }
    }
  }
}
.footer {
  margin-top: 24px;
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
.nut-textarea {
  padding: 12px;
  border: 1px solid #e8e8e8;
}
</style>
