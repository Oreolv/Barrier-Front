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
        type="访客申请"
        :status="item.status"
        :title="`${item.visitor}访客申请`"
        :startTime="item.startTime"
        :endTime="item.endTime"
      ></ApplyCardVue>
    </nut-tabpane>
    <nut-tabpane pane-key="2">
      <nut-empty description="无数据" v-if="!state.historyList.length"></nut-empty>
      <ApplyCardVue
        v-for="item in state.historyList"
        :key="item.id"
        type="访客申请"
        :status="item.status"
        :title="`${item.visitor}访客申请`"
        :startTime="item.startTime"
        :endTime="item.endTime"
      ></ApplyCardVue>
    </nut-tabpane>
  </nut-tabs>
</template>
<script lang="ts" setup>
import { navigateTo } from '@tarojs/taro';
import { reactive, onBeforeMount, ref } from 'vue';
import ApplyCardVue from '/@/components/ApplyCard.vue';
import { getVisitorList } from '/@/api/serve/visitor';
import { GetVisitorListResultModel } from '/@/api/serve/visitor/model';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';

const state = reactive({
  tabValue: '0',
  currentList: [] as GetVisitorListResultModel,
  historyList: [] as GetVisitorListResultModel,
});

const tabnineHeight = ref('80vh');

const createApply = () => {
  navigateTo({
    url: '/pages/serve/children/visitor/create/index',
  });
};

onBeforeMount(async () => {
  const data = await getVisitorList();
  const currentTime = new Date().getTime();
  state.currentList = data.filter((i) => Date.parse(i.endTime) > currentTime);
  state.historyList = data.filter((i) => Date.parse(i.endTime) <= currentTime);

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
