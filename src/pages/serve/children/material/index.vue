<template>
  <InfiniteLoading
    name="material"
    :pageSize="10"
    :api="getMaterialList"
    @load="loadMore"
    @refresh="refresh"
  >
    <template #content>
      <div class="container" v-for="i in state.materialList" :key="i.id">
        <div class="material">
          <div class="material-header">
            <div class="material-header__avatar">
              <img :src="i.applicantInfo.avatar" />
            </div>
            <div class="material-header__info">
              <div class="material-info__name">{{ i.applicantInfo.uname }}</div>
              <div class="material-info__description">{{ i.applicantInfo.cname }}居民</div>
            </div>
          </div>
          <div class="material-content">
            {{ i.content }}
          </div>
          <div class="material-footer">
            <div class="material-footer__tag">
              <nut-icon name="check-checked"></nut-icon>
              <div class="material-footer__tag-name">{{ i.type }}</div>
            </div>
            <div class="material-footer__time">{{ transformDate(i.createdAt) }}</div>
          </div>
          <div class="reply" v-if="i.description">
            <div class="material-header">
              <div class="material-header__avatar">
                <img :src="i.approverInfo.avatar" />
              </div>
              <div class="material-header__info">
                <div class="material-info__name">{{ i.approverInfo.real_name }}</div>
                <div class="material-info__description">{{ transformDate(i.approve_time) }}</div>
              </div>
            </div>
            <div class="reply-content">
              <div class="reply-content__text">
                {{ i.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </InfiniteLoading>
  <div class="push" @click="createApplyMaterial">
    <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { navigateTo } from '@tarojs/taro';
import { transformDate } from '/@/hooks/useTransformData';
import { getMaterialList } from '/@/api/serve/material';
import { MaterialItem } from '/@/api/serve/material/model';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';

const state = reactive({
  materialList: [] as MaterialItem[],
});

const loadMore = (_, data) => {
  state.materialList.push(...data.rows);
};

const refresh = async (_, api, pageSize) => {
  state.materialList.length = 0;
  const data = await api({ page: 1, pageSize });
  state.materialList.push(...data.rows);
};

const createApplyMaterial = () => {
  navigateTo({
    url: '/pages/serve/children/material/create/index',
  });
};
</script>

<style lang="scss">
page {
  padding: 16px 0;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.material {
  padding: 16px;
  padding-bottom: 0;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  .material-header {
    display: flex;
    align-items: center;
    .material-header__avatar {
      margin-right: 16px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .material-header__info {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      box-sizing: border-box;
      justify-content: space-around;
      .material-info__name {
        margin-bottom: 4px;
        color: #1a1a1a;
        font-weight: bolder;
      }
      .material-info__description {
        color: #666666;
      }
    }
  }
  .material-content {
    white-space: pre-line;
    line-height: 24px;
    margin-top: 16px;
    font-size: 14px;
  }
  .material-footer {
    margin-top: 12px;
    padding-bottom: 12px;
    font-size: 12px;
    display: flex;
    align-items: center;
    .material-footer__time {
      color: #7c7c7c;
      flex: 1;
      text-align: end;
    }
    .material-footer__tag {
      display: flex;
      align-items: center;
      border: 1px solid #f1f1f1;
      border-radius: 16px;
      padding: 2px 8px 3px 6px;
      .material-footer__tag-name {
        color: #7c7c7c;
        margin-left: 4px;
      }
    }
  }
}
.reply {
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f5f5f5;
  .reply-header {
    color: #666666;
    font-size: 12px;
  }
  .reply-content {
    margin-top: 12px;
    font-size: 12px;
    border: 1px solid #f1f1f1;
    .reply-content__time {
      text-align: right;
    }
  }
}
.push {
  position: fixed;
  bottom: 48px;
  right: 32px;
  text {
    font-size: 36px;
    opacity: 0.7;
  }
}
</style>
