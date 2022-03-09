<template>
  <SearchBar></SearchBar>
  <nut-tabs v-model="tabValue" background="#FFF" title-gutter="15">
    <nut-tabpane title="疫情资讯">
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
    </nut-tabpane>
    <nut-tabpane title="防疫知识">Tab 2</nut-tabpane>
    <nut-tabpane title="社区公告">Tab 3</nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchBar from '../../component/SearchBar.vue';
import ChinaCovidItem from '../../component/ChinaCovidItem.vue';
import { useCovidStore } from '../../../store/covid';
import { CovidList } from '../../../model/covid';
import { useDidShow } from '@tarojs/taro';
import './index.scss';

const covidStore = useCovidStore();
useDidShow(() => {
  covidStore.getCovidData();
});

const tabValue = ref(0);
const test = () => {};
</script>
