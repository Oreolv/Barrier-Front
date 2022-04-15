<template>
  <nut-tabs v-model="state.tabValue">
    <template v-slot:titles>
      <div
        class="nut-tabs__titles-item"
        @click="state.tabValue = '0'"
        :class="{ active: state.tabValue == '0' }"
      >
        <span class="nut-tabs__titles-item__text">正在进行</span>
      </div>
      <div class="nut-tabs__titles-add" @click="createApply">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
      </div>
      <div
        class="nut-tabs__titles-item"
        @click="state.tabValue = '2'"
        :class="{ active: state.tabValue == '2' }"
      >
        <span class="nut-tabs__titles-item__text">历史记录</span>
        <!-- <span class="nut-tabs__titles-item__line"></span> -->
      </div>
    </template>
    <nut-tabpane pane-key="0">正在进行</nut-tabpane>
    <nut-tabpane pane-key="2">历史记录</nut-tabpane>
  </nut-tabs>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { navigateTo } from '@tarojs/taro';
const state = reactive({
  tabValue: '0',
});

const createApply = () => {
  navigateTo({
    url: '/pages/serve/children/visitor/create/index',
  });
};
</script>

<style lang="scss">
page {
  background: #f5f5f5;
}
</style>

<style lang="scss">
.nut-tabs__titles {
  padding: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.iconfont {
  top: 16px;
  color: #1a1a1a;
  font-size: 36px;
}
.nut-tabs__titles-add {
  display: flex;
  width: 100px;
  justify-content: center;
}
.nut-tabs__titles-item.active {
  // border-bottom: 5px solid #1a1a1a;
}
.nut-tabpane {
  background: #f5f5f5;
}
</style>
