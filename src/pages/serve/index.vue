<template>
  <div class="top-img">
    <img src="https://img.xinyu.ink//serve-background1.png" mode="widthFix" />
  </div>
  <div class="serve">
    <div class="serve-header">日常防疫</div>
    <div class="serve-content">
      <nut-grid :column-num="4" :border="false" clickable>
        <nut-grid-item
          v-for="(item, index) in ServeList.normal"
          :key="index"
          :text="item.name"
          @click="navigate(item.key)"
        >
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" :name="item.icon" />
          </template>
        </nut-grid-item>
      </nut-grid>
    </div>
  </div>
  <div class="serve">
    <div class="serve-header">紧急防疫</div>
    <div class="serve-content">
      <nut-grid :column-num="4" :border="false" clickable>
        <nut-grid-item
          v-for="(item, index) in ServeList.urgent"
          :key="index"
          :text="item.name"
          @click="navigate(item.key)"
        >
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" :name="item.icon" />
          </template>
        </nut-grid-item>
      </nut-grid>
    </div>
  </div>
</template>

<script setup>
import { ServeList } from './data';
import { navigateTo } from '@tarojs/taro';
const navigate = (dir) => {
  navigateTo({
    url: `/pages/serve/children/${dir}/index`,
    events: {},
  });
};
</script>

<style lang="scss">
page {
  box-sizing: border-box;
  padding: 16px;
}
.top-img {
  margin-bottom: 16px;
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
}
.serve {
  .serve-header {
    font-weight: bold;
    font-size: 18px;
  }
  .serve-content {
    padding: 16px 0;
  }
}
.iconfont {
  font-size: 30px;
}
</style>
