<template>
  <view class="index">
    <nut-button @click="logout">退出登陆</nut-button>
  </view>
</template>

<script setup lang="ts">
import { switchTab } from '@tarojs/taro';
import { useUserStore } from '/@/store/users';
const userStore = useUserStore();

const logout = () => {
  userStore.logoutAction();
  setTimeout(() => {
    switchTab({
      url: '/pages/mine/index',
    });
  }, 1000);
};
</script>

<style lang="scss">
page {
  background-color: #f4f4f4;
}
</style>
