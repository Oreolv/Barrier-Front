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
      <nut-tabpane pane-key="news">
        <nut-empty
          image="empty"
          description="无内容"
          v-if="!loading && DataList.newsList.length === 0"
        ></nut-empty>
        <div class="news" v-for="(i, idx) in DataList.newsList" :key="i.id">
          <div class="news-header">
            <div class="news-header__left"></div>
            <div class="news-header__time">{{ i.publishTime }}</div>
            <nut-tag v-if="idx === 0" type="danger">最新</nut-tag>
          </div>
          <div class="news-content" @click="navigateToNewsInfo(idx)">
            <div class="news-content__title">{{ i.title }}</div>
            <div class="news-content__footer">
              <div class="news-content__info">点击查看详细报道 >></div>
              <div class="news-content__source">{{ i.mediaInfo!.name }}</div>
            </div>
          </div>
        </div>
      </nut-tabpane>
      <nut-tabpane pane-key="tips">
        <nut-empty
          image="empty"
          description="无内容"
          v-if="!loading && DataList.tipsList.length === 0"
        ></nut-empty>
        <div class="tips" v-for="(i, idx) in DataList.tipsList" :key="i.id">
          <div class="tips-content" @click="navigateToTipsInfo(idx)">
            <div class="tips-content__title">
              <nut-tag color="#ff4c00">问</nut-tag>
              {{ i.title }}
            </div>
            <div class="tips-content__info">
              <nut-tag type="success">答</nut-tag>
              {{ i.summary }}
            </div>
            <!-- <div class="news-content__source">{{ i?.mediaInfo.name || i.source }}</div> -->
          </div>
        </div>
      </nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { switchTab, navigateTo } from '@tarojs/taro';
import { HOME_HISTORY_KEY } from '/@/enums/cacheEnum';
import { setLocalCache, getLocalCache } from '/@/hooks/useLocalCache';
import { TabList, DataList } from './data';
import { getTipsList, getNewsList } from '/@/api/index/information';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';

const loading = ref(true);
const tabnineHeight = ref('100vh');

const state = reactive({
  editStatus: false,
  searchStatus: false,
  searchValue: '',
  history: getLocalCache(HOME_HISTORY_KEY) || [],
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
  setLocalCache(HOME_HISTORY_KEY, state.history);
  const news = await getNewsList({ keyword });
  const tipst = await getTipsList({ keyword });
  DataList.newsList.push(...news.rows);
  DataList.tipsList.push(...tipst.rows);
  loading.value = false;
  tabnineHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
}

function hanleSearchOne(keyword) {
  state.searchValue = keyword;
  handleSearch(keyword);
}

function resetSearch() {
  state.searchStatus = false;
  TabList.tabValue = 'news';
  DataList.newsList.length = 0;
  DataList.tipsList.length = 0;
}

function deleteAll() {
  state.history.length = 0;
  setLocalCache(HOME_HISTORY_KEY, state.history);
  state.editStatus = false;
}

function deleteOne(i) {
  state.history.splice(i, 1);
  setLocalCache(HOME_HISTORY_KEY, state.history);
}

function hanleBack() {
  switchTab({
    url: '/pages/home/index',
  });
}

function navigateToNewsInfo(index) {
  const params = JSON.stringify(DataList.newsList[index]);
  navigateTo({
    url: `/pages/home/children/news/index?data=${encodeURIComponent(params)}`,
  });
}

function navigateToTipsInfo(index) {
  const data = DataList.tipsList[index];
  data.mediaInfo = {
    name: data.source!,
    avatar: '',
    description: '',
  };
  const params = JSON.stringify(data);
  navigateTo({
    url: `/pages/home/children/news/index?data=${encodeURIComponent(params)}`,
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
.news {
  padding: 16px;
  padding-bottom: 0;
  .news-header {
    display: flex;
    align-items: center;
    .news-header__time {
      color: #666666;
      margin: 0 8px;
    }
    .news-header__left {
      width: 8px;
      height: 8px;
      background-color: #1a1a1a;
    }
    margin-bottom: 8px;
  }
  .news-content {
    background-color: #f4f4f4;
    padding: 16px;
    border-radius: 8px;
    .news-content__title {
      font-weight: 600;
    }
    .news-content__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      font-size: 14px;
      color: #7c7c7c;
    }
  }
}

.tips {
  .tips-content {
    padding: 16px;
    border-bottom: 1px #f1f1f1 solid;
    .nut-tag {
      margin-right: 8px;
      font-weight: normal;
    }
    .tips-content__title {
      display: flex;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .tips-content__info {
      .nut-tag {
        margin-right: 5px;
        margin-bottom: 4px;
      }
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 14px;
      color: #7c7c7c;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
<style lang="scss">
.nut-tabpane {
  height: v-bind(tabnineHeight);
  padding: 0;
}
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
