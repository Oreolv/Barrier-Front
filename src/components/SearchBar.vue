<template>
  <nut-navbar :left-show="false">
    <template #content>
      <nut-searchbar :placeholder="placeholder">
        <template v-slot:leftin>
          <nut-icon name="search2"></nut-icon>
        </template>
      </nut-searchbar>
    </template>
  </nut-navbar>
</template>

<script lang="ts" setup>
import {
  getNavBarHeigtht,
  getNavBarTop,
  getMenuButtonHeight,
  getSearchBarWidth,
} from '/@/hooks/useGetSystemInfo';
defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索内容',
  },
  data: {
    type: String,
  },
});

const navBarTop = getNavBarTop();
const navBarHeight = getNavBarHeigtht();
const searchBarHeight = getMenuButtonHeight();
const searchBarWidth = getSearchBarWidth();
</script>

<style lang="scss">
.nut-navbar {
  position: fixed;
  height: v-bind(navBarHeight);
  top: 0;
  z-index: 1;
  width: 100%;
}
.nut-searchbar {
  position: fixed;
  top: v-bind(navBarTop);
  left: 0;
  margin: 0;
  padding: 0;
  padding: 0 10px;
  width: v-bind(searchBarWidth);
  height: v-bind(searchBarHeight);
  .nut-searchbar__search-input {
    height: v-bind(searchBarHeight);
    width: v-bind(searchBarWidth);
  }
  .nut-searchbar__input-bar {
    text-align: left;
    font-size: 14px;
    padding-left: 26px;
  }
}
</style>
