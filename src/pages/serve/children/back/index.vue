<template>
  <nut-tabs v-model="state.tabValue">
    <template v-slot:titles>
      <div
        class="nut-tabs__titles-item"
        @click="state.tabValue = '0'"
        :class="{ active: state.tabValue == '0' }"
      >
        <span class="nut-tabs__titles-item__text">正在进行</span>
      </div>
      <div class="nut-tabs__titles-add" @click="createApply">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
      </div>
      <div
        class="nut-tabs__titles-item"
        @click="state.tabValue = '2'"
        :class="{ active: state.tabValue == '2' }"
      >
        <span class="nut-tabs__titles-item__text">历史记录</span>
        <!-- <span class="nut-tabs__titles-item__line"></span> -->
      </div>
    </template>
    <nut-tabpane pane-key="0">
      <nut-empty description="无数据" v-if="!state.currentList.length"></nut-empty>
      <ApplyCardVue
        v-for="item in state.currentList"
        :key="item.id"
        type="行程报备"
        :status="item.status"
        :title="`${item.applicantInfo.uname}行程报备`"
      >
        <template #content>
          <div class="apply-content__item">
            <div class="apply-content__item-name">出发地区</div>
            <div class="apply-content__item-content">{{ item.come_from }}</div>
          </div>
          <div class="apply-content__item">
            <div class="apply-content__item-name">到达时间</div>
            <div class="apply-content__item-content">{{ item.end_time }}</div>
          </div>
          <div class="apply-content__item" v-if="item.status === ApplyStatusEnum.reject">
            <div class="apply-content__item-name">拒绝理由</div>
            <div class="apply-content__item-content">{{ item.description }}</div>
          </div>
        </template>
      </ApplyCardVue>
    </nut-tabpane>
    <nut-tabpane pane-key="2">
      <nut-empty description="无数据" v-if="!state.historyList.length"></nut-empty>
      <ApplyCardVue
        v-for="item in state.historyList"
        :key="item.id"
        type="行程报备"
        :status="item.status"
        :title="`${item.applicantInfo.uname}行程报备`"
      >
        <template #content>
          <div class="apply-content__item">
            <div class="apply-content__item-name">出发地区</div>
            <div class="apply-content__item-content">{{ item.come_from }}</div>
          </div>
          <div class="apply-content__item">
            <div class="apply-content__item-name">到达时间</div>
            <div class="apply-content__item-content">{{ item.end_time }}</div>
          </div>
          <div class="apply-content__item" v-if="item.status === ApplyStatusEnum.reject">
            <div class="apply-content__item-name">拒绝理由</div>
            <div class="apply-content__item-content">{{ item.description }}</div>
          </div>
        </template>
      </ApplyCardVue>
    </nut-tabpane>
  </nut-tabs>
</template>
<script lang="ts" setup>
import { navigateTo } from '@tarojs/taro';
import { reactive, onBeforeMount, ref } from 'vue';
import ApplyCardVue from '/@/components/ApplyCard.vue';
import { getBackList } from '/@/api/serve/back';
import { GetBackListResultModel } from '/@/api/serve/back/model';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import { ApplyStatusEnum } from '/@/enums/serveEnums';

const state = reactive({
  tabValue: '0',
  currentList: [] as GetBackListResultModel,
  historyList: [] as GetBackListResultModel,
});

const tabnineHeight = ref('80vh');

const createApply = () => {
  navigateTo({
    url: '/pages/serve/children/back/create/index',
  });
};

onBeforeMount(async () => {
  const data = await getBackList();
  const currentTime = new Date().getTime();
  state.currentList = data.filter((i) => Date.parse(i.end_time.replace(/-/g, '/')) > currentTime);
  state.historyList = data.filter((i) => Date.parse(i.end_time.replace(/-/g, '/')) <= currentTime);

  tabnineHeight.value = `calc(100vh - ${
    (await getNodePositionInfo('.nut-tabs__titles')).height
  }px)`;
});
</script>

<style lang="scss">
page {
  background: #f5f5f5;
}
</style>

<style lang="scss">
.nut-tabs__titles {
  padding: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.iconfont {
  top: 16px;
  color: #1a1a1a;
  font-size: 36px;
}
.nut-tabs__titles-add {
  display: flex;
  width: 100px;
  justify-content: center;
}
.nut-tabpane {
  height: v-bind(tabnineHeight);
  background: #f5f5f5;
}
.apply {
  margin-top: 16px;
}
.apply:first-child {
  margin-top: 0;
}
</style>
