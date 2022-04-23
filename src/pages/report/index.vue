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
    <nut-tabpane pane-key="visitor">
      <InfiniteLoading
        name="visitor"
        :pageSize="10"
        :api="getVisitorList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <nut-empty description="无数据" v-if="!DataList.visitor.length"></nut-empty>
          <ReportCardVue
            v-else
            v-for="i in DataList.visitor"
            :key="i.id"
            :status="i.status"
            :title="`${i.visitor}申请访问`"
            :description="`${i.start_time}至${i.end_time}`"
            :avatar="i.approverInfo?.avatar"
            :createdAt="i.createdAt"
          ></ReportCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="trip">
      <InfiniteLoading
        name="trip"
        :pageSize="10"
        :api="getTripList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <nut-empty description="无数据" v-if="!DataList.trip.length"></nut-empty>
          <ReportCardVue
            v-else
            v-for="i in DataList.trip"
            :key="i.id"
            :status="i.status"
            :title="`前往${i.destination}报备`"
            :description="`${i.start_time}至${i.end_time}`"
            :avatar="i.approverInfo?.avatar"
            :createdAt="i.createdAt"
          ></ReportCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="back">
      <InfiniteLoading
        name="back"
        :pageSize="10"
        :api="getBackList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <nut-empty description="无数据" v-if="!DataList.back.length"></nut-empty>
          <ReportCardVue
            v-else
            v-for="i in DataList.back"
            :key="i.id"
            :status="i.status"
            :title="`自${i.come_from}返乡`"
            :description="`${i.end_time}到达`"
            :avatar="i.approverInfo?.avatar"
            :createdAt="i.createdAt"
          ></ReportCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="abnormal">
      <InfiniteLoading
        name="abnormal"
        :pageSize="10"
        :api="getAbnormalList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <nut-empty description="无数据" v-if="!DataList.abnormal.length"></nut-empty>
          <ReportCardVue
            v-else
            v-for="i in DataList.abnormal"
            :key="i.id"
            :status="i.status"
            :title="i.type"
            :description="i.content"
            :avatar="i.approverInfo?.avatar"
            :createdAt="i.createdAt"
          ></ReportCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="health">
      <InfiniteLoading
        name="health"
        :pageSize="10"
        :api="getHealthList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <nut-empty description="无数据" v-if="!DataList.health.length"></nut-empty>
          <ReportCardVue
            v-else
            v-for="i in DataList.health"
            :key="i.id"
            :status="i.status"
            title="每日健康上报"
            :description="`${i.createdAt.substring(0, 10)} ${transformHealth(i)}`"
            :avatar="i.approverInfo?.avatar"
            :createdAt="i.createdAt"
          ></ReportCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="material">
      <InfiniteLoading
        name="material"
        :pageSize="10"
        :api="getMaterialList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <nut-empty description="无数据" v-if="!DataList.material.length"></nut-empty>
          <ReportCardVue
            v-else
            v-for="i in DataList.material"
            :key="i.id"
            :status="i.status"
            :title="`${i.type}申请`"
            :description="i.content"
            :avatar="i.approverInfo?.avatar"
            :createdAt="i.createdAt"
          ></ReportCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="agency">123</nut-tabpane>
  </nut-tabs>
  <div class="push-button" @click="create(TabList.tabValue)">
    <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { navigateTo } from '@tarojs/taro';
import { TabList, DataList } from './data';
import { getTripList } from '/@/api/serve/trip';
import { getBackList } from '/@/api/serve/back';
import { getHealthList } from '/@/api/serve/health/index';
import { getVisitorList } from '/@/api/serve/visitor';
import { getAbnormalList } from '/@/api/serve/abnormal';
import { getMaterialList } from '/@/api/serve/material';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';
import ReportCardVue from '/@/components/ReportCard.vue';

const create = (dir) => {
  navigateTo({
    url: `/pages/report/children/${dir}/index`,
  });
};

const tabnineHeight = ref('80vh');
const loadmoreHeight = ref('80vh');

const loadMore = (name, data) => {
  DataList[name].push(...data.rows);
};

const refresh = async (name, api, pageSize) => {
  DataList[name].length = 0;
  const data = await api({ page: 1, pageSize });
  DataList[name].push(...data.rows);
};

function transformHealth(params) {
  const { temperature, diagnosis, contact, symptom, hospital } = params;
  const array = [temperature, diagnosis, contact, symptom, hospital];
  return array.some((i) => i > 0) ? '异常' : '无异常';
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
