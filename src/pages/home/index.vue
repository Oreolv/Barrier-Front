<template>
  <SearchBar></SearchBar>
  <nut-tabs v-model="TabList.tabValue" background="#FFF" title-gutter="15">
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
    <nut-tabpane pane-key="0">
      <nut-empty description="无数据" v-if="!Object.keys(state.allData).length"></nut-empty>
      <div class="data" v-else>
        <!-- 国内疫情数据 -->
        <div class="china-data">
          <div class="update-time">
            <div class="update-time-des">统计数据截至</div>
            <div class="update-time-text">{{ state.allData.lastUpdateTime }}</div>
          </div>
          <Card title="全国疫情数据">
            <template #content>
              <div class="china-item" v-for="item in CovidList" :key="item.name">
                <ChinaCovidItem
                  :add="chinaAdd[item.name]"
                  :today="chinaTotal[item.name]"
                  :type="item.name"
                >
                  {{ item.des }}
                </ChinaCovidItem>
              </div>
            </template>
          </Card>
        </div>
        <!-- 城市疫情数据 -->
        <div class="city-data">
          <div class="city-data-des">
            <div class="left">近期31省市区本土病例</div>
            <nut-button type="primary" size="mini" plain @click="navigateToRiskArea">
              风险地区查询
            </nut-button>
          </div>
          <nut-table :columns="CityColumn" :data="cityData" striped></nut-table>
          <!-- <div class="loadmore" v-if="state.allData.city_data.length">
            <div
              @click="
                loadmore = !loadmore;
                loadmore ? scrollToTop() : null;
              "
            >
              {{ loadmore ? '展开更多' : '收起数据' }}
            </div>
          </div> -->
        </div>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="1">
      <div id="infiniteLoading">
        <nut-infiniteloading
          is-open-refresh
          containerId="infiniteLoading"
          :use-window="false"
          :has-more="state.hasMoreNews"
          @load-more="loadMoreNews"
          @refresh="refreshNews"
          load-more-txt="没有更多数据了"
          pull-icon="loading"
          pull-txt=""
          load-icon="loading"
        >
          <div class="news" v-for="(i, idx) in state.newsList" :key="i.id">
            <div class="news-header">
              <div class="news-header__left"></div>
              <div class="news-header__time">{{ i.publishTime }}</div>
              <nut-tag v-if="idx === 0" type="danger">最新</nut-tag>
            </div>
            <div class="news-content" @click="navigateToNewsInfo(idx)">
              <div class="news-content__title">{{ i.title }}</div>
              <div class="news-content__footer">
                <div class="news-content__info">点击查看详细报道 >></div>
                <div class="news-content__source">{{ i.mediaInfo.name }}</div>
              </div>
            </div>
          </div>
        </nut-infiniteloading>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="2">
      <div id="infiniteLoading">
        <nut-infiniteloading
          is-open-refresh
          containerId="infiniteLoading"
          :use-window="false"
          :has-more="state.hasMoreTips"
          @load-more="loadMoreTips"
          @refresh="refreshTips"
          load-more-txt="没有更多数据了"
          pull-icon="loading"
          pull-txt=""
          load-icon="loading"
        >
          <div class="tips" v-for="(i, idx) in state.tipsList" :key="i.id">
            <div class="tips-content" @click="navigateToTipsInfo(idx)">
              <div class="tips-content__title">{{ i.title }}</div>
              <div class="tips-content__info">{{ i.summary }}</div>
              <!-- <div class="news-content__source">{{ i?.mediaInfo.name || i.source }}</div> -->
            </div>
          </div>
        </nut-infiniteloading>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="3"><nut-empty description="无数据"></nut-empty></nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { useDidShow } from '@tarojs/taro';
import { getCovidData, getTipsList, getNewsList } from '/@/api/covid';
import Card from '../../components/Card.vue';
import { CovidList, CityColumn, TabList } from './data';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import SearchBar from '/@/components/SearchBar.vue';
import { addPlusAndMinus } from '/@/hooks/useTransformData';
import { getNavBarHeigtht, getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import ChinaCovidItem from '/@/components/ChinaCovidItem.vue';
import { GetCovidDataResultModel, NewsItem } from '/@/api/system/model/covidModel';
import { navigateTo } from '@tarojs/taro';
import { ShowToast } from '/@/hooks/useShowMessage';

const state = reactive({
  allData: {} as GetCovidDataResultModel,
  newsList: [] as NewsItem[],
  tipsList: [] as NewsItem[],
  hasMoreNews: true,
  hasMoreTips: true,
  page: 1,
  pageSize: 15,
});

const tabsTop = getNavBarHeigtht();
const tabnineHeight = ref('80vh');
const loadmoreHeight = ref('80vh');
const loadmore = ref(true);

useDidShow(() => {});

onBeforeMount(async () => {
  state.allData = await getCovidData();
  state.allData.city_data = state.allData.city_data.sort((a, b) => {
    return b.confirm - a.confirm;
  });
  const news = await getNewsList({ page: state.page, pageSize: state.pageSize });
  state.newsList.push(...news.rows);
  const tips = await getTipsList({ page: state.page, pageSize: state.pageSize });
  state.tipsList.push(...tips.rows);

  // 20px 为tabnine的上下padding之和
  loadmoreHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top + 20}px)`;
  tabnineHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
});

const chinaAdd = computed(() => {
  return addPlusAndMinus(state.allData.china_data[0]);
});

const chinaTotal = computed(() => {
  return state.allData.china_data[1];
});

const cityData = computed(() => {
  return loadmore.value
    ? state.allData.city_data.filter((c) => c.confirm > 0)
    : state.allData.city_data;
});

const navigateToRiskArea = () => {
  navigateTo({
    url: '/pages/home/children/risk/index',
    events: {},
  });
};

const navigateToNewsInfo = (index) => {
  const params = JSON.stringify(state.newsList[index]);
  navigateTo({
    url: `/pages/home/children/news/index?data=${encodeURIComponent(params)}`,
  });
};

const navigateToTipsInfo = (index) => {
  const data = state.tipsList[index];
  data.mediaInfo = {
    name: data.source,
    avatar: '',
    description: '',
  };
  const params = JSON.stringify(data);
  navigateTo({
    url: `/pages/home/children/news/index?data=${encodeURIComponent(params)}`,
  });
};

const loadMoreNews = async (done) => {
  state.page = state.page + 1;
  const data = await getNewsList({ page: state.page, pageSize: state.pageSize });
  state.newsList.push(...data.rows);
  if (data.rows.length === 0) {
    state.hasMoreNews = false;
  }
  done();
};
const refreshNews = async (done) => {
  state.page = 1;
  state.newsList.length = 0;
  const data = await getNewsList({ page: state.page, pageSize: state.pageSize });
  state.newsList.push(...data.rows);
  if (data.rows.length > 0) {
    ShowToast.success('刷新成功');
  }
  done();
};

const loadMoreTips = async (done) => {
  state.page = state.page + 1;
  const data = await getTipsList({ page: state.page, pageSize: state.pageSize });
  state.tipsList.push(...data.rows);
  if (data.rows.length === 0) {
    state.hasMoreTips = false;
  }
  done();
};
const refreshTips = async (done) => {
  state.page = 1;
  state.tipsList.length = 0;
  const data = await getTipsList({ page: state.page, pageSize: state.pageSize });
  state.tipsList.push(...data.rows);
  if (data.rows.length > 0) {
    ShowToast.success('刷新成功');
  }
  done();
};
</script>

<style lang="scss">
.loadmore {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

#infiniteLoading {
  height: v-bind(loadmoreHeight);
}

.update-time {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
  .update-time-des {
    margin-right: 8px;
    color: #7c7c7c;
  }
  .update-time-text {
    color: #222;
  }
}
.city-data-des {
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  display: flex;
  align-items: center;
  .left {
    flex: 1;
  }
}
.card-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.china-item {
  margin-top: 4px;
  flex-basis: 33.3%;
}
.china-item:nth-child(-n + 3) {
  margin: 8px 0;
}
.news {
  margin-bottom: 16px;
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
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px #f1f1f1 solid;
    .tips-content__title {
      font-weight: 600;
    }
    .tips-content__info {
      justify-content: space-between;
      margin-top: 8px;
      font-size: 14px;
      color: #7c7c7c;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
  }
}
</style>

<style lang="scss">
.nut-navbar {
  box-shadow: none;
}
.nut-table__main__head__tr {
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
}
.nut-tabs {
  position: relative;
  top: v-bind(tabsTop);
}
.nut-tabs__titles {
  padding-left: 16px;
}

.nut-tabs__titles-item.active {
  font-size: 16px !important;
  .nut-tabs__titles-item__line {
    background: #000;
    width: 40%;
    bottom: 8%;
    border-radius: 10px;
  }
}
.nut-tabs__titles-item {
  width: auto;
  min-width: 0;
  flex: 0 1 auto;
  margin-right: 16px;
}
.nut-tabpane {
  height: v-bind(tabnineHeight);
  padding: 10px 16px;
  // overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
