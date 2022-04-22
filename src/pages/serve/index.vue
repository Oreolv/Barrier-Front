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
</template>

<script lang="ts" setup>
import { TabList } from './data';
</script>

<style lang="scss"></style>
<style lang="scss">
.nut-radio__button--active {
  background-color: #1a1a1a;
  border: none;
  color: white;
}

.nut-radio__button {
  // border-radius: 0;
  font-size: 13px;
  padding: 12rpx 24px;
}
.scroll-view_H {
  white-space: nowrap;
}
</style>
