<template>
  <div class="header">
    社区的发展需要大家的共同支持，如果您对社区工作有什么意见建议，欢迎随时反馈到这里，社区一定高度重视，认真及时回复您。
  </div>
  <div class="content">
    <div class="content-item">
      <div class="content-item__title">反馈类型</div>
      <div class="content-item__text">
        <nut-radiogroup v-model="formValues.type" direction="horizontal">
          <nut-radio shape="button" v-for="(i, idx) in suggestionType" :key="idx" :label="i">
            {{ i }}
          </nut-radio>
        </nut-radiogroup>
      </div>
    </div>
    <div class="content-item">
      <div class="content-item__title">反馈内容</div>
      <div class="content-item__text">
        <nut-textarea
          v-model="formValues.content"
          placeholder="请输入您的意见"
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
import { redirectTo } from '@tarojs/taro';
import { validate } from '/@/hooks/useHandleFormValues';
import { createSuggestion } from '/@/api/serve/suggestion';
import { formValues, formSchema, suggestionType } from './data';

const submitFormValues = async () => {
  // 组件自带的实在是难用，还不如自己写
  validate(formValues, formSchema);
  await createSuggestion(formValues);
  setTimeout(() => {
    redirectTo({
      url: '/pages/serve/children/suggestion/index',
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
