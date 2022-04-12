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
      <div class="data">
        <!-- 国内疫情数据 -->
        <div class="china-data">
          <div class="update-time">
            <div class="update-time-des">统计数据截至</div>
            <nut-skeleton width="60vw" height="16px" animated :loading="loading">
              <div class="update-time-text">{{ dataList.allData.lastUpdateTime }}</div>
            </nut-skeleton>
          </div>
          <Card title="全国疫情数据">
            <template #content>
              <div class="china-item" v-for="item in CovidList" :key="item.name">
                <nut-skeleton
                  height="15px"
                  width="25vw"
                  :title="false"
                  row="3"
                  animated
                  :loading="loading"
                >
                  <ChinaCovidItem
                    :add="dataList.allData.china_add[item.name]"
                    :today="dataList.allData.china_total[item.name]"
                    :type="item.name"
                  >
                    {{ item.des }}
                  </ChinaCovidItem>
                </nut-skeleton>
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
          <nut-table :columns="CityColumn" :data="dataList.allData.city_data" striped></nut-table>
        </div>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="1">
      <InfiniteLoading
        name="news"
        :pageSize="5"
        :api="getNewsList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <div class="news" v-for="(i, idx) in dataList.newsList" :key="i.id">
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
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="2">
      <InfiniteLoading
        name="tips"
        :pageSize="10"
        :api="getTipsList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <div class="tips" v-for="(i, idx) in dataList.tipsList" :key="i.id">
            <div class="tips-content" @click="navigateToTipsInfo(idx)">
              <div class="tips-content__title">{{ i.title }}</div>
              <div class="tips-content__info">{{ i.summary }}</div>
              <!-- <div class="news-content__source">{{ i?.mediaInfo.name || i.source }}</div> -->
            </div>
          </div>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="3">
      <InfiniteLoading
        name="notice"
        :pageSize="10"
        :api="getNoticeList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <div class="notice" v-for="i in dataList.noticeList" :key="i.id">
            <div class="notice-header">
              <div class="notice-header__avatar">
                <img :src="i.publisherInfo.avatar" />
              </div>
              <div class="notice-header__realName">
                {{ i.publisherInfo.realName }}
              </div>
            </div>
            <div class="notice-content">
              {{ i.content }}
            </div>
            <div class="notice-footer">
              <div class="notice-footer__time">{{ transformDate(i.createdAt) }}</div>
            </div>
          </div>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { useDidShow } from '@tarojs/taro';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';
import { getTipsList, getNewsList, getNoticeList } from '/@/api/information';
import { getCovidData } from '/@/api/covid';
import Card from '../../components/Card.vue';
import { CovidList, CityColumn, TabList } from './data';
import { onBeforeMount, reactive, ref } from 'vue';
import SearchBar from '/@/components/SearchBar.vue';
import { addPlusAndMinus, transformDate } from '/@/hooks/useTransformData';
import { getNavBarHeigtht, getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import ChinaCovidItem from '/@/components/ChinaCovidItem.vue';
import { GetCovidDataResultModel } from '/@/api/system/model/covidModel';
import { NewsItem, NoticeItem } from '/@/api/system/model/informationModel';
import { navigateTo } from '@tarojs/taro';

const dataList = reactive({
  allData: {} as GetCovidDataResultModel,
  newsList: [] as NewsItem[],
  tipsList: [] as NewsItem[],
  noticeList: [] as NoticeItem[],
});

const tabsTop = getNavBarHeigtht();
const loading = ref(true);
const tabnineHeight = ref('80vh');
const loadmoreHeight = ref('80vh');

useDidShow(() => {});

onBeforeMount(async () => {
  dataList.allData = await getCovidData();
  dataList.allData = transformAllData(dataList.allData);
  loading.value = false;
  loadmoreHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
  tabnineHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
});

const transformAllData = (data) => {
  data.city_data = data.city_data
    .sort((a, b) => {
      return b.confirm - a.confirm;
    })
    .filter((i) => i.confirm > 0);
  data.china_add = addPlusAndMinus(data.china_add);
  return data;
};

const loadMore = (name, data) => {
  dataList[`${name}List`].push(...data.rows);
};

const refresh = async (name, api, pageSize) => {
  dataList[`${name}List`].length = 0;
  const data = await api({ page: 1, pageSize });
  dataList[`${name}List`].push(...data.rows);
};

const navigateToRiskArea = () => {
  navigateTo({
    url: '/pages/home/children/risk/index',
    events: {},
  });
};

const navigateToNewsInfo = (index) => {
  const params = JSON.stringify(dataList.newsList[index]);
  navigateTo({
    url: `/pages/home/children/news/index?data=${encodeURIComponent(params)}`,
  });
};

const navigateToTipsInfo = (index) => {
  const data = dataList.tipsList[index];
  data.mediaInfo = {
    name: data.source!,
    avatar: '',
    description: '',
  };
  const params = JSON.stringify(data);
  navigateTo({
    url: `/pages/home/children/news/index?data=${encodeURIComponent(params)}`,
  });
};
</script>

<style lang="scss">
.loadmore {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
.data {
  padding: 10px 0;
}
#infiniteLoading {
  padding: 10px 0;
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
.notice {
  padding: 16px 0;
  border-bottom: 1px solid #f1f1f1;
  .notice-header {
    display: flex;
    align-items: center;
    .notice-header__avatar {
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .notice-header__realName {
      margin-left: 14px;
      font-weight: bold;
      vertical-align: center;
    }
  }
  .notice-content {
    margin-top: 16px;
    font-size: 14px;
  }
  .notice-footer {
    margin-top: 12px;
    font-size: 12px;
    color: #7c7c7c;
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
  padding: 0 16px;
  // overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
