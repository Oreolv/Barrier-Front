<template>
  <div class="header">
    如您目前生活物资或是防疫物资缺乏，请向我们申请，我们一定尽快送到您的手中。
  </div>
  <div class="content">
    <div class="content-item">
      <div class="content-item__title">物资类型</div>
      <div class="content-item__text">
        <nut-radiogroup v-model="formValues.type" direction="horizontal">
          <nut-radio shape="button" v-for="(i, idx) in materialType" :key="idx" :label="i">
            {{ i }}
          </nut-radio>
        </nut-radiogroup>
      </div>
    </div>
    <div class="content-item">
      <div class="content-item__title">详细说明</div>
      <div class="content-item__text">
        <nut-textarea
          v-model="formValues.content"
          placeholder="请输入关于物资的详细说明"
          limit-show
          max-length="300"
        />
      </div>
    </div>
    <div class="footer">
      <nut-button shape="square" type="primary" block @click="submitFormValues">提交</nut-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { switchTab } from '@tarojs/taro';
import { validate } from '/@/hooks/useHandleFormValues';
import { createMaterial } from '/@/api/serve/material';
import { formValues, formSchema, materialType } from './data';

const submitFormValues = async () => {
  validate(formValues, formSchema);
  await createMaterial(formValues);
  setTimeout(() => {
    switchTab({
      url: '/pages/report/index',
    });
  }, 1000);
};
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
