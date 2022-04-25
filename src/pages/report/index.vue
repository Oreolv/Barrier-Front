<template>
  <nut-tabs v-model="TabList.tabValue" background="#FFF" title-gutter="15">
    <template #titles>
      <scroll-view :scroll-x="true" style="white-space: nowrap">
        <nut-radiogroup v-model="TabList.tabValue" direction="horizontal">
          <nut-radio
            shape="button"
            v-for="i in TabList.list"
            :key="i.paneKey"
            :label="i.paneKey"
            @click="TabList.tabValue = i.paneKey"
          >
            {{ i.title }}
          </nut-radio>
        </nut-radiogroup>
      </scroll-view>
    </template>
    <nut-tabpane v-for="tab in TabList.list" :key="tab.paneKey" :pane-key="tab.paneKey">
      <InfiniteLoading
        :name="tab.paneKey"
        :pageSize="10"
        :api="FuncList[tab.paneKey]"
        @load="loadMore"
        @refresh="refresh"
        v-if="TabList.tabValue === tab.paneKey"
      >
        <template #content>
          <nut-empty description="无数据" v-if="!DataList[tab.paneKey].length"></nut-empty>
          <ReportCardVue
            v-else
            v-for="i in DataList[tab.paneKey]"
            :key="i.id"
            :status="i.status"
            :title="getContent(tab.paneKey, i).title"
            :description="getContent(tab.paneKey, i).description"
            :avatar="i.approverInfo?.avatar"
            :createdAt="i.createdAt"
            @click="showDetail(tab.paneKey, i)"
          ></ReportCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
  </nut-tabs>
  <div class="push-button" @click="create(TabList.tabValue)">
    <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { navigateTo, useDidShow } from '@tarojs/taro';
import ReportCardVue from '/@/components/ReportCard.vue';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';
import { TabList, DataList, FuncList, Flag, getContent, DetailData } from './data';

useDidShow(() => {
  if (Flag.value) {
    refresh(TabList.tabValue, FuncList[TabList.tabValue], 10);
    Flag.value = false;
  }
  DetailData.name = '';
  DetailData.data = null;
  DetailData.status = NaN;
  DetailData.description = '';
});

const tabnineHeight = ref('100vh');
const loadmoreHeight = ref('100vh');

const create = (dir) => {
  navigateTo({
    url: `/pages/report/children/${dir}/index`,
  });
};

const refresh = async (name, api, pageSize) => {
  DataList[name].length = 0;
  const data = await api({ page: 1, pageSize });
  DataList[name].push(...data.rows);
};

const loadMore = (name, data) => {
  DataList[name].push(...data.rows);
};

function showDetail(name, params) {
  DetailData.name = name;
  DetailData.data = params;
  DetailData.status = params.status;
  DetailData.description = params.description;
  navigateTo({
    url: `/pages/report/children/detail/index`,
  });
}

setTimeout(async () => {
  loadmoreHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
  tabnineHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
}, 1000);
</script>

<style lang="scss">
.push-button {
  position: fixed;
  bottom: 48px;
  right: 32px;
  text {
    font-size: 36px;
    opacity: 0.7;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
.push-popup {
  height: 100%;
  .pop-content {
    text {
      font-size: 36px;
    }
  }
  .pop-footer {
    text-align: center;
    margin-top: 12px;
    text {
      font-size: 12px;
      background-color: #666666;
      color: white;
      padding: 8px;
      border-radius: 50%;
    }
  }
}
</style>

<style lang="scss">
.nut-radio__button--active {
  background-color: #1a1a1a;
  border: none;
  color: white;
}

.nut-radio__button {
  // border-radius: 0;
  font-size: 13px;
  padding: 8px 16px;
}

.nut-radio .nut-radiogroup {
  margin-bottom: 0;
}

#infiniteLoading {
  height: v-bind(loadmoreHeight);
}

.nut-tabpane {
  padding: 0;
  height: v-bind(tabnineHeight);
}

.nut-tabs__titles {
  height: auto;
  padding: 10px 10px 0 10px;
}
</style>
