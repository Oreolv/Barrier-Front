<template>
  <div class="detail">
    <div class="detail-header">
      <div class="detail-header__icon">
        <nut-icon
          font-class-name="iconfont"
          class-prefix="icon"
          :name="status.icon"
          :color="status.color"
        />
      </div>
      <div class="detail-header__title">{{ status.text }}</div>
      <div class="detail-header__description">{{ DetailData.description }}</div>
    </div>
    <div class="detail-content">
      <div class="detail-content__item" v-for="i in detail" :key="i.title">
        <div class="detail-content__item-title">{{ i.title }}：</div>
        <div class="detail-content__item-text">{{ i.content }}</div>
      </div>
      <div class="detail-content__item" v-if="DetailData.data.health_code">
        <div class="detail-content__item-title">两码凭证：</div>
        <div
          class="detail-content__item-text"
          style="color: #0960bd"
          @click="state.showPreview = true"
        >
          查看图片
          <nut-imagepreview
            :pagination-visible="true"
            pagination-color="black"
            :content-close="true"
            :show="state.showPreview"
            :images="img"
            @close="state.showPreview = false"
          />
        </div>
      </div>
      <div class="detail-content__item">
        <div class="detail-content__item-title">创建时间：</div>
        <div class="detail-content__item-text">
          {{ DetailData.data.createdAt }}
        </div>
      </div>
      <div class="detail-content__item" v-if="DetailData.data.approverInfo">
        <div class="detail-content__item-title">审批人：</div>
        <div class="detail-content__item-text">
          {{ DetailData.data.approverInfo.real_name }}
        </div>
      </div>
      <div class="detail-content__item" v-if="DetailData.data.approve_time">
        <div class="detail-content__item-title">审批时间：</div>
        <div class="detail-content__item-text">
          {{ DetailData.data.approve_time }}
        </div>
      </div>
    </div>
    <div class="detail-footer" v-if="DetailData.status === ApplyStatusEnum.underReview">
      <nut-button shape="square" type="primary" block @click="removeReport">取消申请</nut-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { Flag } from '/@/pages/report/data';
import { DetailList, FuncList } from './data';
import { DetailData } from '/@/pages/report/data';
import { showModal, switchTab } from '@tarojs/taro';
import { ResultColorEnum } from '/@/enums/colorEnum';
import { ApplyStatusEnum } from '/@/enums/serveEnum';

const state = reactive({
  showPreview: false,
});

const status = computed(() => {
  let text, icon, color;
  switch (DetailData.status) {
    case ApplyStatusEnum.approval:
      text = '审批通过';
      icon = 'check-circle-fill';
      color = ResultColorEnum.SUCCESS;
      break;
    case ApplyStatusEnum.underReview:
      text = '审批中';
      icon = 'smile-fill';
      color = ResultColorEnum.WARNING;
      break;
    case ApplyStatusEnum.reject:
      text = '申请失败';
      icon = 'close-circle-fill';
      color = ResultColorEnum.ERROR;
      break;
    default:
      text = '审批中';
      icon = 'smile-fill';
      color = ResultColorEnum.WARNING;
      break;
  }
  return { text, icon, color };
});

const img = computed(() => {
  const imgList = [] as any;
  if (!DetailData.data.health_code) {
    return [];
  }
  DetailData.data.health_code.split(',').map((i) => {
    imgList.push({
      src: i,
    });
  });
  return imgList;
});

const detail = DetailList[DetailData.name!](DetailData.data);

function removeReport() {
  showModal({
    title: '提醒',
    content: '确认删除此申请？',
    showCancel: true,
    confirmText: '删除',
    confirmColor: '#FF0000',
    success: async (res) => {
      if (res.confirm) {
        await FuncList[DetailData.name!](DetailData.data.id);
        setTimeout(() => {
          Flag.value = true;
          switchTab({
            url: '/pages/report/index',
          });
        }, 1000);
      }
    },
  });
}
</script>

<style lang="scss">
.detail {
  padding: 16px;
  .detail-header {
    .detail-header__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      text {
        width: 80px;
        height: 80px;
        font-size: 80px;
      }
    }
    .detail-header__title {
      margin-top: 16px;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
    }
    .detail-header__description {
      font-size: 14px;
      color: #999999;
      text-align: center;
      margin-top: 16px;
    }
  }
  .detail-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    .detail-content__item {
      display: flex;
      font-size: 13px;
      margin: 8px 0;
      width: 75vw;
      .detail-content__item-title {
        margin-right: 8px;
      }
      .detail-content__item-text {
        flex: 1;
        text-align: right;
        color: #999999;
      }
    }
  }
  .detail-footer {
    margin-top: 16px;
  }
}
</style>
