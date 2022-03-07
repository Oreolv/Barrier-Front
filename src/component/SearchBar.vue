<template>
  <nut-searchbar :placeholder="placeholder">
    <template v-slot:leftin>
      <nut-icon size="14" name="search2"></nut-icon>
    </template>
  </nut-searchbar>
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
const { top, width, height, right } = Taro.getMenuButtonBoundingClientRect();
const navTop = `${top - 9}px`; // 组件库含有9px的padding-top
const navWidth = `${right - width}px`;
const navHeight = `${height}px`;
</script>

<style lang="scss">
.nut-searchbar {
  margin-top: v-bind(navTop);
  width: v-bind(navWidth);
  .nut-searchbar__search-input {
    height: v-bind(navHeight);
  }
}
</style>
