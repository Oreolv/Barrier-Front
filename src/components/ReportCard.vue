<template>
  <div class="component">
    <div class="report">
      <div class="report-left">
        <nut-skeleton
          width="200px"
          height="12px"
          :loading="props.loading"
          :title="false"
          row="3"
          animated
        >
          <div class="report-left__top">{{ props.title }}</div>
          <div class="report-left__middle">{{ props.description }}</div>
          <div class="report-left__bottom">
            {{ transformDate(props.createdAt) }}
          </div>
        </nut-skeleton>
      </div>
      <div class="report-right">
        <nut-skeleton
          width="0"
          height="0"
          animated
          avatar
          avatar-size="36"
          :title="false"
          :loading="props.loading"
          style="width: 40px"
        >
          <div class="report-right__avatar">
            <img :src="props.avatar || require('/@/assets/avatar.png')" alt="" />
          </div>
        </nut-skeleton>
        <nut-skeleton width="40px" height="12px" :loading="props.loading" animated>
          <div class="report-right__result" :style="{ color: transformStatus(props.status).color }">
            {{ transformStatus(props.status).text }}
          </div>
        </nut-skeleton>
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
  loading: Boolean,
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
      margin-left: 8px;
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
