<template>
  <div class="media">
    <AvatarHeader
      :avatar="params.mediaInfo.avatar || undefined"
      :name="params.mediaInfo.name"
      :description="params.publishTime"
    />
    <div class="media-content">
      <div class="media-content__title">
        {{ params.title }}
      </div>
      <div class="media-content__text" v-html="params.content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from '@tarojs/taro';
import { NewsItem } from '/@/api/index/model/informationModel';
import AvatarHeader from '/@/components/AvatarHeader.vue';

const params: NewsItem = JSON.parse(decodeURIComponent(getCurrentInstance().router!.params.data!));
</script>

<style lang="scss">
page {
  padding: 16px;
  box-sizing: border-box;
}
.media {
  display: flex;
  flex-direction: column;
  .media-content {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    .media-content__title {
      font-weight: 600;
      font-size: 22px;
    }
    .media-content__text {
      font-size: 15px;
      margin-top: 16px;
      line-height: 26px;
      .img_div {
        text-align: center;
        img {
          margin: 8px 0;
        }
      }
      .img_alt {
        text-align: center;
        font-size: 12px;
        color: #999999;
        margin-top: -16px;
      }
      .title {
        font-weight: bold;
      }
    }
    .section {
      margin: 8px 0;
    }
  }
}
</style>
