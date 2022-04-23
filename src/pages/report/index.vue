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

          <div class="visitor" v-else v-for="i in DataList.visitor" :key="i.id">
            <div class="visitor-left">
              <div class="visitor-left__top">{{ i.visitor }}申请访问</div>
              <div class="visitor-left__middle">{{ i.startTime }}至{{ i.endTime }}</div>

              <div class="visitor-left__bottom">
                {{ transformDate(i.createdAt) }}
              </div>
            </div>
            <div class="visitor-right">
              <div class="visitor-right__avatar">
                <img :src="i.approverInfo?.avatar || require('/@/assets/avatar.png')" alt="" />
              </div>
              <div
                class="visitor-right__result"
                :style="{ color: transformStatus(i.status).color }"
              >
                {{ transformStatus(i.status).text }}
              </div>
            </div>
          </div>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="trip">123</nut-tabpane>
    <nut-tabpane pane-key="back">123</nut-tabpane>
    <nut-tabpane pane-key="abnormal">123</nut-tabpane>
    <nut-tabpane pane-key="health">123</nut-tabpane>
    <nut-tabpane pane-key="material">123</nut-tabpane>
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
import { getVisitorList } from '/@/api/serve/visitor';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';
import { transformDate, transformStatus } from '/@/hooks/useTransformData';

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
.visitor {
  display: flex;
  padding: 16px;
  margin: 12px 16px;
  border-radius: 8px;
  background-color: #f5f5f5;
  .visitor-left {
    flex: 1;
    .visitor-left__top {
      font-weight: bolder;
    }
    .visitor-left__middle {
      margin-top: 8px;
      font-size: 14px;
    }
    .visitor-left__bottom {
      margin-top: 8px;
      font-size: 12px;
      color: #7c7c7c;
    }
  }
  .visitor-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .visitor-right__avatar {
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .visitor-right__result {
      font-size: 12px;
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
