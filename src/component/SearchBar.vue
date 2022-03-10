<template>
  <nut-navbar :left-show="false">
    <template #content>
      <nut-searchbar :placeholder="placeholder">
        <template v-slot:leftin>
          <nut-icon size="14" name="search2"></nut-icon>
        </template>
      </nut-searchbar>
    </template>
  </nut-navbar>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索内容',
  },
  data: {
    type: String,
  },
});
const { statusBarHeight } = Taro.getSystemInfoSync();
const { top, width, height, right } = Taro.getMenuButtonBoundingClientRect();
const navTop = `${top - 9}px`; // 组件库含有9px的padding-top
const navWidth = `${right - width}px`;
const inputHeight = `${height}px`;
const navHeight = `${(top - statusBarHeight) * 2 + height + statusBarHeight}px`;
</script>

<style lang="scss">
.nut-navbar {
  position: fixed;
  height: v-bind(navHeight);
  top: 0;
  z-index: 1;
  width: 100%;
}
.nut-searchbar {
  position: fixed;
  top: v-bind(navTop);
  left: 0;
  width: v-bind(navWidth);
  .nut-searchbar__search-input {
    height: v-bind(inputHeight);
  }
}
</style>
