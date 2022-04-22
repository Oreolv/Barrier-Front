<template>
  <nut-tabs v-model="TabList.tabValue" background="#FFF" title-gutter="15">
    <template v-slot:titles>
      <scroll-view :scroll-x="true" class="scroll-view_H">
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
    <nut-tabpane pane-key="visitor">123</nut-tabpane>
    <nut-tabpane pane-key="trip">123</nut-tabpane>
    <nut-tabpane pane-key="back">123</nut-tabpane>
    <nut-tabpane pane-key="abnormal">123</nut-tabpane>
    <nut-tabpane pane-key="health">123</nut-tabpane>
    <nut-tabpane pane-key="material">123</nut-tabpane>
    <nut-tabpane pane-key="agency">123</nut-tabpane>
  </nut-tabs>
  <div class="push-button" @click="state.showPushPop = true">
    <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
  </div>
  <nut-popup position="bottom" round class="push-popup" v-model:visible="state.showPushPop">
    <div class="pop-header"></div>
    <div class="pop-content">
      <nut-grid :border="false" clickable>
        <nut-grid-item v-for="i in ServeList" :key="i.key" :text="i.name" @click="create(i.key)">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" :name="i.icon" />
          </template>
        </nut-grid-item>
      </nut-grid>
    </div>
    <div class="pop-footer" @click="state.showPushPop = false">
      <nut-icon name="close-little"></nut-icon>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { navigateTo } from '@tarojs/taro';
import { TabList, ServeList } from './data';

const state = reactive({
  showPushPop: false,
});

const create = (dir) => {
  navigateTo({
    url: `/pages/serve/children/${dir}/index`,
  });
};
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
  padding: 16px;
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

.scroll-view_H {
  white-space: nowrap;
}

.nutui-popup__close-icon {
  position: relative !important;
  left: 50%;
  bottom: 0;
}

.nut-popup {
  padding: 24px 16px 16px 16px;
  box-sizing: border-box;
}
</style>
