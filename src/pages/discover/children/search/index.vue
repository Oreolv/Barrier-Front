<template>
  <div class="search">
    <div class="search-header">
      <nut-searchbar v-model="state.searchValue" placeholder="请输入搜索关键词">
        <template #leftin>
          <nut-icon size="14" name="search2"></nut-icon>
        </template>
        <template #rightout>
          <div class="search-header__text" v-if="state.searchValue">搜索</div>
          <div class="search-header__text" v-else @click="hanleBack">取消</div>
        </template>
      </nut-searchbar>
    </div>
    <div class="search-history">
      <div class="search-history__title">
        <div class="search-history__title-text">搜索记录</div>
        <div class="search-history__title-icon">
          <nut-icon font-class-name="iconfont" class-prefix="icon" name="delete" />
        </div>
      </div>
      <div class="search-history__content">
        <div class="search-history__content-item" v-for="(i, idx) in state.history" :key="idx">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { switchTab } from '@tarojs/taro';

const state = reactive({
  searchValue: '',
  history: ['上海', '物资', '北京'],
});

function hanleBack() {
  switchTab({
    url: '/pages/discover/index',
  });
}
</script>

<style lang="scss">
.search {
  .search-header {
    .search-header__text {
      font-size: 16px;
    }
  }
  .search-history {
    margin-top: 24px;
    padding: 0 16px;
    .search-history__title {
      display: flex;
      .search-history__title-text {
        flex: 1;
        font-size: 14px;
        font-weight: bold;
      }
      .search-history__title-icon {
        text {
          font-weight: bold;
        }
      }
    }
    .search-history__content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
      .search-history__content-item {
        font-size: 13px;
        background: #f5f5f5;
        padding: 8px 12px;
        border-radius: 16px;
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
<style lang="scss">
.nut-searchbar__search-input {
  background-color: #f5f5f5 !important;
}
</style>
