<template>
  <InfiniteLoading
    name="agency"
    :pageSize="10"
    :api="getAgencyList"
    @load="loadMore"
    @refresh="refresh"
  >
    <template #content>
      <div class="container" v-for="i in state.agencyList" :key="i.id">
        <div class="agency">
          <div class="agency-header">
            <div class="agency-header__avatar">
              <img :src="i.applicantInfo.avatar" />
            </div>
            <div class="agency-header__info">
              <div class="agency-info__name">{{ i.applicantInfo.uname }}</div>
              <div class="agency-info__description">{{ i.applicantInfo.cname }}居民</div>
            </div>
          </div>
          <div class="agency-content">
            {{ i.content }}
          </div>
          <div class="agency-footer">
            <div class="agency-footer__tag">
              <nut-icon name="check-checked"></nut-icon>
              <div class="agency-footer__tag-name">{{ i.type }}</div>
            </div>
            <div class="agency-footer__time">{{ transformDate(i.createdAt) }}</div>
          </div>
          <div class="reply" v-if="i.description">
            <div class="agency-header">
              <div class="agency-header__avatar">
                <img :src="i.approverInfo.avatar" />
              </div>
              <div class="agency-header__info">
                <div class="agency-info__name">{{ i.approverInfo.real_name }}</div>
                <div class="agency-info__description">{{ transformDate(i.approve_time) }}</div>
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
  <div class="push" @click="createApplyAgency">
    <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { navigateTo } from '@tarojs/taro';
import { transformDate } from '/@/hooks/useTransformData';
import { getAgencyList } from '/@/api/serve/agency';
import { AgencyItem } from '/@/api/serve/agency/model';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';

const state = reactive({
  agencyList: [] as AgencyItem[],
});

const loadMore = (_, data) => {
  state.agencyList.push(...data.rows);
};

const refresh = async (_, api, pageSize) => {
  state.agencyList.length = 0;
  const data = await api({ page: 1, pageSize });
  state.agencyList.push(...data.rows);
};

const createApplyAgency = () => {
  navigateTo({
    url: '/pages/serve/children/agency/create/index',
  });
};
</script>

<style lang="scss">
page {
  padding: 16px 0;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.agency {
  padding: 16px;
  padding-bottom: 0;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  .agency-header {
    display: flex;
    align-items: center;
    .agency-header__avatar {
      margin-right: 16px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .agency-header__info {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      box-sizing: border-box;
      justify-content: space-around;
      .agency-info__name {
        margin-bottom: 4px;
        color: #1a1a1a;
        font-weight: bolder;
      }
      .agency-info__description {
        color: #666666;
      }
    }
  }
  .agency-content {
    white-space: pre-line;
    line-height: 24px;
    margin-top: 16px;
    font-size: 14px;
  }
  .agency-footer {
    margin-top: 12px;
    padding-bottom: 12px;
    font-size: 12px;
    display: flex;
    align-items: center;
    .agency-footer__time {
      color: #7c7c7c;
      flex: 1;
      text-align: end;
    }
    .agency-footer__tag {
      display: flex;
      align-items: center;
      border: 1px solid #f1f1f1;
      border-radius: 16px;
      padding: 2px 8px 3px 6px;
      .agency-footer__tag-name {
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
