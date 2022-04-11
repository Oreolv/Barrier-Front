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
          <div class="loadmore" v-if="state.allData.city_data.length">
            <div
              @click="
                loadmore = !loadmore;
                loadmore ? scrollToTop() : null;
              "
            >
              {{ loadmore ? '展开更多' : '收起数据' }}
            </div>
          </div>
        </div>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="1">
      <div id="infiniteLoading">
        <nut-infiniteloading
          containerId="infiniteLoading"
          :use-window="false"
          :has-more="state.hasMoreNews"
          @load-more="loadMoreNews"
          load-more-txt="没有更多数据了"
          pull-icon="loading"
        >
          <div class="news" v-for="(i, idx) in state.newsList" :key="i.id">
            <div class="news-header">
              <div class="news-header__left"></div>
              <div class="news-header__time">{{ i.publishTime }}</div>
              <nut-tag v-if="idx === 0" type="danger">最新</nut-tag>
            </div>
            <div class="news-content">
              <div class="news-content__title">{{ i.title }}</div>
              <div class="news-content__footer">
                <div class="news-content__info">点击查看详细报道 >></div>
                <div class="news-content__source">{{ i.infoSource }}</div>
              </div>
            </div>
          </div>
        </nut-infiniteloading>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="2"><nut-empty description="无数据"></nut-empty></nut-tabpane>
    <nut-tabpane pane-key="3"><nut-empty description="无数据"></nut-empty></nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { useDidShow } from '@tarojs/taro';
import { getCovidData } from '/@/api/covid';
import Card from '../../components/Card.vue';
import { CovidList, CityColumn, TabList } from './data';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import SearchBar from '/@/components/SearchBar.vue';
import { scrollToTop } from '/@/hooks/useScrollToTop';
import { addPlusAndMinus } from '/@/hooks/useTransformData';
import { getNavBarHeigtht, getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import ChinaCovidItem from '/@/components/ChinaCovidItem.vue';
import {
  GetCovidDataResultModel,
  GetNewsListResultModel,
  NewsItem,
} from '/@/api/system/model/covidModel';
import { navigateTo } from '@tarojs/taro';
import { getNewsList } from '/@/api/covid';

const state = reactive({
  allData: {} as GetCovidDataResultModel,
  allNews: {} as GetNewsListResultModel,
  newsList: [] as NewsItem[],
  hasMoreNews: true,
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

  loadmoreHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top + 16}px)`;
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

const loadMoreNews = (done) => {
  setTimeout(async () => {
    state.page = state.page + 1;
    const data = await getNewsList({ page: state.page, pageSize: state.pageSize });
    state.newsList.push(...data.rows);
    if (data.rows.length === 0) {
      state.hasMoreNews = false;
    }
    done();
  }, 100);
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
  padding-top: 10px;
  overflow: hidden;
}
</style>
