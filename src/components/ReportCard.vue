<template>
  <div class="component">
    <div class="report">
      <div class="report-left">
        <div class="report-left__top">{{ props.title }}申请访问</div>
        <div class="report-left__middle">{{ props.description }}</div>

        <div class="report-left__bottom">
          {{ transformDate(props.createdAt) }}
        </div>
      </div>
      <div class="report-right">
        <div class="report-right__avatar">
          <img :src="props.avatar || require('/@/assets/avatar.png')" alt="" />
        </div>
        <div class="report-right__result" :style="{ color: transformStatus(props.status).color }">
          {{ transformStatus(props.status).text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { transformDate, transformStatus } from '/@/hooks/useTransformData';

const props = defineProps({
  status: Number,
  avatar: String,
  title: String,
  description: String,
  createdAt: String,
});
</script>

<style lang="scss">
.component {
  .report {
    display: flex;
    padding: 16px;
    margin: 12px 16px;
    border-radius: 8px;
    background-color: #f5f5f5;
    .report-left {
      flex: 1;
      .report-left__top {
        font-weight: bolder;
      }
      .report-left__middle {
        margin-top: 8px;
        font-size: 14px;
      }
      .report-left__bottom {
        margin-top: 8px;
        font-size: 12px;
        color: #7c7c7c;
      }
    }
    .report-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .report-right__avatar {
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
      }
      .report-right__result {
        font-size: 12px;
      }
    }
  }
}
</style>
