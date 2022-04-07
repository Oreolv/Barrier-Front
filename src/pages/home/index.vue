<template>
  <SearchBar></SearchBar>
  <nut-tabs v-model="tabValue" background="#FFF" title-gutter="15">
    <nut-tabpane title="疫情资讯">
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
          <div class="city-data-des">近期31省市区本土病例</div>
          <nut-table :columns="CityColumn" :data="cityData" :border="false" center></nut-table>
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
    <nut-tabpane title="防疫知识">
      <nut-empty description="无数据"></nut-empty>
    </nut-tabpane>
    <nut-tabpane title="社区公告">
      <nut-empty description="无数据"></nut-empty>
    </nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { useDidShow } from '@tarojs/taro';
import { getCovidData } from '/@/api/covid';
import Card from '../../components/Card.vue';
import { CovidList, CityColumn } from './data';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import SearchBar from '/@/components/SearchBar.vue';
import { scrollToTop } from '/@/hooks/useScrollToTop';
import { addPlusAndMinus } from '/@/hooks/useTransformData';
import { getNavBarHeigtht } from '/@/hooks/useGetSystemInfo';
import ChinaCovidItem from '/@/components/ChinaCovidItem.vue';
import { GetCovidDataResultModel } from '/@/api/model/covidModel';

const state = reactive({
  allData: {} as GetCovidDataResultModel,
});

useDidShow(() => {});

onBeforeMount(async () => {
  state.allData = await getCovidData();
});

const chinaAdd = computed(() => {
  return addPlusAndMinus(state.allData.china_data[0]);
});

const chinaTotal = computed(() => {
  return addPlusAndMinus(state.allData.china_data[1]);
});

const cityData = computed(() => {
  return loadmore.value
    ? state.allData.city_data.filter((c) => c.confirm > 0)
    : state.allData.city_data;
});

const tabValue = ref(0);
const tabsTop = getNavBarHeigtht();

const loadmore = ref(true);
</script>

<style lang="scss">
.loadmore {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
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
</style>

<style lang="scss">
.nut-table__main__head__tr__td,
.nut-table__main__head__tr__th,
.nut-table__main__body__tr__td,
.nut-table__main__body__tr__th {
  text-align: center;
  padding: 8px;
}
.nut-table__main__head__tr {
  background-color: #eef4ff;
  color: #4180f1;
  white-space: nowrap;
  text-align: center;
}
.nut-table__main__body__tr__td {
  white-space: nowrap;
  text-align: center;
}

.nut-table__main__body__tr {
  :nth-child(3) {
    color: #ff7f7f;
  }
}
.nut-tabs {
  position: relative;
  top: v-bind(tabsTop);
  .nut-tabs__titles {
    width: 100%;
    position: fixed;
    z-index: 1;
  }
  .nut-tabs__content {
    margin-top: 46px; // 先写死
  }
}

.nut-tabs__titles-item.active {
  font-size: 16px !important;
  .nut-tabs__titles-item__line {
    background: #000;
    width: 60%;
    bottom: 10%;
    border-radius: 10px;
  }
}

.nut-tabs__titles-item {
  width: auto;
  min-width: 0;
  flex: 0 1 auto;
}

.nut-tabpane {
  padding-top: 10px;
}
</style>
