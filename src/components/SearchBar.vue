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
import { useSystemStore } from '/@/store/system';
defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索内容',
  },
  data: {
    type: String,
  },
});
const systemStore = useSystemStore();
systemStore.getAllInfo();
const navBarHeight = systemStore.getNavBarHeigtht;
const navBarTop = systemStore.getNavBarTop;
const inputHeight = systemStore.getMenuButtonHeight;
const searchBarWidth = systemStore.getSearchBarWidth;
const searchBarHeight = systemStore.getSearchBarHeight;
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
  width: v-bind(searchBarWidth);
  height: v-bind(searchBarHeight);
  .nut-searchbar__search-input {
    height: v-bind(inputHeight);
  }
  .nut-searchbar__input-bar {
    text-align: left;
  }
}
</style>
