<template>
  <div class="component">
    <nut-navbar :left-show="false">
      <template #left>
        <div class="search" @click="hanlefocus">
          <nut-icon name="search2" color="#949494"></nut-icon>
          <div class="search-input">请输入搜索内容</div>
        </div>
      </template>
    </nut-navbar>
  </div>
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

const emit = defineEmits(['focus']);

function hanlefocus() {
  emit('focus');
}
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
  left: 0;
  z-index: 1;
  width: 100%;
  .nut-navbar__left {
    padding: 0;
    margin: 0;
  }
}
.component {
  .search {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 4px 12px;
    margin: 0 16px;
    border-radius: 16px;
    background-color: #f5f5f5;
    position: fixed;
    top: v-bind(navBarTop);
    width: v-bind(searchBarWidth);
    height: v-bind(searchBarHeight);
    .search-input {
      font-size: 14px;
      color: #949494;
      margin-left: 8px;
    }
  }
}
</style>
