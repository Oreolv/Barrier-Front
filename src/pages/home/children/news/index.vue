<template>
  <div class="media">
    <div class="media-header">
      <div class="media-header__avatar" v-if="params.mediaInfo.avatar">
        <img :src="params.mediaInfo.avatar" alt="" />
      </div>
      <div class="media-header__info">
        <div class="media-info__name">{{ params.mediaInfo.name }}</div>
        <div class="media-info__description">
          <!-- {{ params.mediaInfo.description || `${params.mediaInfo.name}报道` }} -->
          {{ params.publishTime }}
        </div>
      </div>
    </div>
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
import { NewsItem } from '/@/api/system/model/covidModel';
const params: NewsItem = JSON.parse(decodeURIComponent(getCurrentInstance().router!.params.data!));
// setNavigationBarTitle({ title: params.title });
</script>

<style lang="scss">
page {
  padding: 16px;
  box-sizing: border-box;
}
.media {
  display: flex;
  flex-direction: column;
  .media-header {
    display: flex;
    .media-header__avatar {
      margin-right: 16px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px #e5e5e5 solid;
      }
    }
    .media-header__info {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      box-sizing: border-box;
      justify-content: space-around;
      .media-info__name {
        color: #1a1a1a;
        font-weight: bolder;
      }
      .media-info__description {
        color: #666666;
      }
    }
  }
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
