<template>
  <div class="search">
    <div class="search-header">
      <nut-searchbar v-model="state.searchValue" placeholder="请输入搜索关键词">
        <template #leftin>
          <nut-icon size="14" name="search2"></nut-icon>
        </template>
        <template #rightout>
          <div class="search-header__text" v-if="state.searchValue" @click="handleSearch">搜索</div>
          <div class="search-header__text" v-else @click="hanleBack">取消</div>
        </template>
      </nut-searchbar>
    </div>
    <div class="search-history">
      <div class="search-history__title">
        <div class="search-history__title-text">搜索记录</div>
        <div class="search-history__title-icon">
          <nut-icon
            v-if="!state.editStatus"
            font-class-name="iconfont"
            class-prefix="icon"
            name="delete"
            @click="state.editStatus = true"
          />
          <div class="shti-action" v-if="state.editStatus">
            <div @click="deleteAll">全部删除</div>
            <div class="shti-action__line">|</div>
            <div @click="state.editStatus = false">完成</div>
          </div>
        </div>
      </div>
      <div class="search-history__content">
        <div class="search-history__content-item" v-for="(i, idx) in state.history" :key="idx">
          {{ i }}
          <nut-icon
            v-if="state.editStatus"
            @click="deleteOne(idx)"
            font-class-name="iconfont"
            class-prefix="icon"
            name="close-circle-fill"
            color="#f20c00"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { switchTab } from '@tarojs/taro';
import { SEARCH_HISTORY_KEY } from '/@/enums/cacheEnum';
import { setLocalCache, getLocalCache } from '/@/hooks/useLocalCache';

const state = reactive({
  editStatus: false,
  searchValue: '',
  history: getLocalCache(SEARCH_HISTORY_KEY) || [],
});

function handleSearch() {
  state.history.push(state.searchValue);
  setLocalCache(SEARCH_HISTORY_KEY, state.history);
}

function deleteAll() {
  state.history.length = 0;
  setLocalCache(SEARCH_HISTORY_KEY, state.history);
  state.editStatus = false;
}

function deleteOne(i) {
  state.history.splice(i, 1);
  setLocalCache(SEARCH_HISTORY_KEY, state.history);
}

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
      height: 24px;
      .search-history__title-text {
        flex: 1;
        font-size: 14px;
        font-weight: bold;
      }
      .search-history__title-icon {
        text {
          font-weight: bold;
        }
        .shti-action {
          display: flex;
          color: #9a9a9a;
          font-size: 12px;
        }
        .shti-action__line {
          margin: 0 6px;
        }
      }
    }
    .search-history__content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
      .search-history__content-item {
        position: relative;
        font-size: 13px;
        background: #f5f5f5;
        padding: 8px 12px;
        border-radius: 16px;
        margin-right: 12px;
        margin-bottom: 12px;
        text {
          position: absolute;
          top: 0;
          right: 0;
          margin-top: -5px;
          margin-right: -10px;
        }
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
