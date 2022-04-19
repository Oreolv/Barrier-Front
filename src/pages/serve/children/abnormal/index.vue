<template>
  <ApplyCardVue
    v-for="item in state.abnormalList"
    :key="item.id"
    type="异常报备"
    :title="`${item.applicantInfo.uname}异常报备`"
  >
    <template #content>
      <div class="apply-content__item">
        <div class="apply-content__item-name">体温</div>
        <div class="apply-content__item-content">{{ item.temperature }}</div>
      </div>
      <div class="apply-content__item">
        <div class="apply-content__item-name">管理意见</div>
        <div class="apply-content__item-content">{{ item.description || '等待回复' }}</div>
      </div>
      <div class="apply-content__item">
        <div class="apply-content__item-name">提交时间</div>
        <div class="apply-content__item-content">{{ item.createdAt }}</div>
      </div>
    </template>
  </ApplyCardVue>
  <div class="push" @click="createApplyAbnormal">
    <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
  </div>
</template>

<script lang="ts" setup>
import { navigateTo } from '@tarojs/taro';
import { onBeforeMount, reactive } from 'vue';
import ApplyCardVue from '/@/components/ApplyCard.vue';
import { getAbnormalList } from '/@/api/serve/abnormal/index';
import { GetAbnormalListResultModel } from '/@/api/serve/abnormal/model';

const state = reactive({
  abnormalList: [] as GetAbnormalListResultModel,
});

onBeforeMount(async () => {
  state.abnormalList = await getAbnormalList();
});

const createApplyAbnormal = () => {
  navigateTo({
    url: '/pages/serve/children/back/create/index',
  });
};
</script>

<style lang="scss">
page {
  padding: 16px;
  box-sizing: border-box;
}
.push {
  position: fixed;
  bottom: 48px;
  right: 32px;
  text {
    font-size: 36px;
    opacity: 0.7;
  }
}
</style>
