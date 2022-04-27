<template>
  <div class="search">
    <div class="search-header">
      <nut-searchbar
        v-model="state.searchValue"
        placeholder="请输入搜索关键词"
        @search="handleSearch(state.searchValue)"
      >
        <template #leftin>
          <nut-icon size="14" name="search2"></nut-icon>
        </template>
        <template #rightout>
          <div
            class="search-header__text"
            v-if="state.searchValue"
            @click="handleSearch(state.searchValue)"
          >
            搜索
          </div>
          <div class="search-header__text" v-else @click="hanleBack">取消</div>
        </template>
      </nut-searchbar>
    </div>
    <div class="search-history" v-if="!state.searchStatus">
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
          <div @click="hanleSearchOne(i)">{{ i }}</div>
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
    <nut-tabs
      v-model="TabList.tabValue"
      v-if="state.searchStatus"
      background="#FFF"
      title-gutter="15"
    >
      <template v-slot:titles>
        <div
          class="nut-tabs__titles-item"
          @click="TabList.tabValue = item.paneKey"
          :class="{ active: TabList.tabValue == item.paneKey }"
          :key="item.paneKey"
          v-for="item in TabList.list"
        >
          <span class="nut-tabs__titles-item__text">{{ item.title }}</span>
          <span class="nut-tabs__titles-item__line"></span>
        </div>
      </template>
      <nut-tabpane pane-key="notice">
        <nut-empty
          image="empty"
          description="无内容"
          v-if="!loading && DataList.noticeList.length === 0"
        ></nut-empty>
        <DiscussCardVue
          :avatar="i.publisherInfo.avatar"
          :name="i.publisherInfo.real_name"
          :description="i.publisherInfo.roles.role_name"
          :content="i.content"
          :time="i.createdAt"
          v-for="i in DataList.noticeList"
          :key="i.id"
        >
          <template #tag>
            <div class="discuss-footer__tag" v-if="i.grade == 0">
              <nut-icon
                font-class-name="iconfont"
                class-prefix="icon"
                name="slack-circle-fill"
                color="#4FC08D"
              ></nut-icon>
              <div class="discuss-footer__tag-name">安全</div>
            </div>
            <div class="discuss-footer__tag" v-if="i.grade == 1">
              <nut-icon
                font-class-name="iconfont"
                class-prefix="icon"
                name="slack-circle-fill"
                color="#F3812E"
              ></nut-icon>
              <div class="discuss-footer__tag-name">重要</div>
            </div>
            <div class="discuss-footer__tag" v-if="i.grade == 2">
              <nut-icon
                font-class-name="iconfont"
                class-prefix="icon"
                name="slack-circle-fill"
                color="#EA290E"
              ></nut-icon>
              <div class="discuss-footer__tag-name">紧急</div>
            </div>
          </template>
        </DiscussCardVue>
      </nut-tabpane>
      <nut-tabpane pane-key="suggestion">
        <nut-empty
          image="empty"
          description="无内容"
          v-if="!loading && DataList.suggestionList.length === 0"
        ></nut-empty>
        <DiscussCardVue
          :avatar="i.applicantInfo.avatar"
          :name="i.applicantInfo.uname"
          :description="i.applicantInfo.cname"
          :content="i.content"
          :time="i.createdAt"
          :type="i.type"
          :replyAvat="i.approverInfo?.avatar"
          :replyName="i.approverInfo?.real_name"
          :replyDesc="i?.approve_time"
          :replyCont="i?.description"
          v-for="i in DataList.suggestionList"
          :key="i.id"
        />
      </nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { switchTab } from '@tarojs/taro';
import { DISCOVER_HISTORY_KEY } from '/@/enums/cacheEnum';
import { setLocalCache, getLocalCache } from '/@/hooks/useLocalCache';
import { TabList, DataList } from './data';
import DiscussCardVue from '/@/components/DiscussCard.vue';
import { getNoticeList } from '/@/api/index/information';
import { getSuggestionList } from '/@/api/serve/suggestion';

const loading = ref(true);

const state = reactive({
  editStatus: false,
  searchStatus: false,
  searchValue: '',
  history: getLocalCache(DISCOVER_HISTORY_KEY) || [],
});

watch(
  () => state.searchValue,
  (val) => {
    if (val.length === 0) {
      resetSearch();
    }
  }
);

async function handleSearch(keyword) {
  state.searchStatus = true;
  if (state.history.includes(keyword)) {
    // 已搜索过的关键词，重复搜索后移到最前
    const idx = state.history.indexOf(keyword);
    state.history.splice(idx, 1);
  }
  state.history.unshift(state.searchValue);
  setLocalCache(DISCOVER_HISTORY_KEY, state.history);
  const notice = await getNoticeList({ keyword });
  const suggest = await getSuggestionList({ keyword });
  DataList.noticeList.push(...notice.rows);
  DataList.suggestionList.push(...suggest.rows);
  loading.value = false;
}

function hanleSearchOne(keyword) {
  state.searchValue = keyword;
  handleSearch(keyword);
}

function resetSearch() {
  state.searchStatus = false;
  TabList.tabValue = 'notice';
  DataList.noticeList.length = 0;
  DataList.suggestionList.length = 0;
}

function deleteAll() {
  state.history.length = 0;
  setLocalCache(DISCOVER_HISTORY_KEY, state.history);
  state.editStatus = false;
}

function deleteOne(i) {
  state.history.splice(i, 1);
  setLocalCache(DISCOVER_HISTORY_KEY, state.history);
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
.nut-tabs__titles-item.active {
  font-size: 16px !important;
  .nut-tabs__titles-item__line {
    background: #000;
    width: 10%;
    bottom: 4%;
    border-radius: 10px;
  }
}
.nut-tabpane {
  padding: 0;
}
</style>
