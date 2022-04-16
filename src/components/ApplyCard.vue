<template>
  <div class="apply">
    <div class="apply-header">
      <div class="apply-header__type">
        <div class="apply-header__type-icon">
          <nut-icon name="check-checked" color="#1a1a1a"></nut-icon>
        </div>
        <div class="apply-header__type-name">{{ props.type }}</div>
      </div>
      <div class="apply-header__apply">
        <div class="apply-header__apply-name" v-if="props.status === ApplyStatusEnum.underReview">
          审核中
        </div>
        <div
          class="apply-header__apply-name"
          style="color: #ea290e"
          v-if="props.status === ApplyStatusEnum.reject"
        >
          已拒绝
        </div>
        <div
          class="apply-header__apply-name"
          style="color: #4fc08d"
          v-if="props.status === ApplyStatusEnum.approval"
        >
          已通过
        </div>
        <div class="apply-header__apply-arrow">{{ `>` }}</div>
      </div>
    </div>
    <div class="apply-content">
      <div class="apply-content__title">{{ props.title }}</div>
      <div class="apply-content__item">
        <div class="apply-content__item-name">开始时间</div>
        <div class="apply-content__item-content">{{ props.startTime }}</div>
      </div>
      <div class="apply-content__item">
        <div class="apply-content__item-name">结束时间</div>
        <div class="apply-content__item-content">{{ props.endTime }}</div>
      </div>
      <div class="apply-content__item" v-if="props.status === ApplyStatusEnum.reject">
        <div class="apply-content__item-name">拒绝理由</div>
        <div class="apply-content__item-content">{{ props.description }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ApplyStatusEnum } from '/@/enums/serveEnums';
interface ApplyCardProps {
  type: string;
  status: ApplyStatusEnum;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
}
const props = withDefaults(defineProps<ApplyCardProps>(), {
  type: '',
  status: ApplyStatusEnum.underReview,
  title: '',
  description: '',
  startTime: '',
  endTime: '',
});
</script>
<style lang="scss">
.apply {
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .apply-header {
    display: flex;
    align-items: center;
    .apply-header__type {
      display: flex;
      padding: 2px 6px 2px 4px;
      font-size: 12px;
      border-radius: 4px;
      align-items: center;
      background-color: #1a1a1a;
      color: white;
      .apply-header__type-icon {
        text {
          vertical-align: middle;
          font-size: 12px;
          color: white !important;
        }
      }
      .apply-header__type-name {
        margin-left: 2px;
      }
    }
    .apply-header__apply {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      color: #1a1a1a;
      text-align: end;
      .apply-header__apply-name {
        margin-right: 4px;
      }
    }
  }
  .apply-content {
    display: flex;
    flex-direction: column;
    .apply-content__title {
      font-weight: bold;
      margin: 16px 0 8px 0;
    }
    .apply-content__item {
      display: flex;
      font-size: 14px;
      line-height: 24px;
      .apply-content__item-name {
        color: #999999;
        width: 80px;
      }
      .apply-content__item-content {
        color: #666666;
      }
    }
  }
}
</style>
