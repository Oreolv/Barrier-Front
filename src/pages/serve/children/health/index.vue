<template>
  <ApplyCardVue
    v-for="item in state.healthList"
    :key="item.id"
    type="健康上报"
    :title="`${item.applicantInfo.uname}健康上报`"
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
  <div class="push" @click="createApplyHealth">
    <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
  </div>
</template>

<script lang="ts" setup>
import { navigateTo } from '@tarojs/taro';
import { onBeforeMount, reactive } from 'vue';
import ApplyCardVue from '/@/components/ApplyCard.vue';
import { getHealthList } from '/@/api/serve/health/index';
import { GetHealthListResultModel } from '/@/api/serve/health/model';

const state = reactive({
  healthList: [] as GetHealthListResultModel,
});

onBeforeMount(async () => {
  state.healthList = await getHealthList();
});

const createApplyHealth = () => {
  navigateTo({
    url: '/pages/serve/children/health/create/index',
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
.apply {
  margin-top: 16px;
}
.apply:first-child {
  margin-top: 0;
}
</style>
