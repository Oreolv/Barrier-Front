<template>
  <SearchBar></SearchBar>
  <nut-tabs v-model="tabValue" background="#FFF" title-gutter="15">
    <nut-tabpane title="疫情资讯">
      <!-- 国内疫情数据 -->
      <div class="china-data">
        <div class="update-time">
          <div class="update-time-des">统计数据截至</div>
          <div class="update-time-text">{{ covidStore.lastUpdateTime }}</div>
        </div>
        <nut-grid :column-num="3" gutter="4">
          <nut-grid-item v-for="item in CovidList" :key="item.name">
            <template #default>
              <ChinaCovidItem
                :add="covidStore.chinaAdd[item.name]"
                :today="covidStore.chinaTotal[item.name]"
                :type="item.name"
              >
                {{ item.des }}
              </ChinaCovidItem>
            </template>
          </nut-grid-item>
        </nut-grid>
      </div>
      <!-- 城市疫情数据 -->
      <div class="city-data">
        <div class="city-data-des">近期31省市区本土病例</div>
        <nut-table
          :columns="CityColumn"
          :data="loadmore ? covidStore.partCityData : covidStore.cityData"
          :bordered="false"
          align="center"
        ></nut-table>
        <div class="loadmore" v-if="covidStore.cityData.length">
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
    </nut-tabpane>
    <nut-tabpane title="防疫知识">Tab 2</nut-tabpane>
    <nut-tabpane title="社区公告">Tab 3</nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchBar from '@/component/SearchBar.vue';
import ChinaCovidItem from '@/component/ChinaCovidItem.vue';
import { useCovidStore } from '@/store/covid';
import { useSystemStore } from '@/store/system';
import { scrollToTop } from '@/hooks/useScrollToTop';
import { CovidList, CityColumn } from '@/model/covid';
import { useDidShow } from '@tarojs/taro';

const covidStore = useCovidStore();
const systemStore = useSystemStore();
systemStore.getAllInfo();
covidStore.getCovidData();
useDidShow(() => {});

const tabValue = ref(0);
const tabsTop = systemStore.getNavBarHeigtht;

const loadmore = ref(true);
</script>

<style lang="scss">
.loadmore {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
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

.nut-grid-item__content {
  padding: 0;
  border: none;
}

.nut-tabpane {
  padding-top: 10px;
}

.nut-grid {
  padding: 0;
}

.update-time {
  display: flex;
  align-items: center;
  font-size: 3.5vw;
  margin-bottom: 5px;
  .update-time-des {
    margin-right: 8px;
    color: #7c7c7c;
  }
  .update-time-text {
    color: #222;
  }
}
.city-data-des {
  font-size: 3.5vw;
  font-weight: bold;
  margin: 10px 0;
}

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
  :nth-child(5) {
    text-align: right;
  }
}
</style>
