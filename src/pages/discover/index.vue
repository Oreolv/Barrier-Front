<template>
  <SearchBar></SearchBar>
  <nut-tabs v-model="TabList.tabValue" background="#FFF" title-gutter="15">
    <template v-slot:titles>
      <div
        class="nut-tabs__titles-item"
        @click="TabList.tabValue = item.paneKey"
        :class="{ active: TabList.tabValue == item.paneKey }"
        :key="item.paneKey"
        v-for="item in TabList.list"
      >
        <span class="nut-tabs__titles-item__text">{{ item.title }}</span>
        <span class="nut-tabs__titles-item__line"></span>
      </div>
    </template>
    <nut-tabpane pane-key="notice">
      <InfiniteLoading
        name="notice"
        :pageSize="10"
        :api="getNoticeList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <DiscussCardVue
            :avatar="i.publisherInfo.avatar"
            :name="i.publisherInfo.real_name"
            :description="i.publisherInfo.roles.role_name"
            :content="i.content"
            :time="i.createdAt"
            v-for="i in DataList.noticeList"
            :key="i.id"
          >
            <template #tag>
              <div class="discuss-footer__tag" v-if="i.grade == 0">
                <nut-icon
                  font-class-name="iconfont"
                  class-prefix="icon"
                  name="slack-circle-fill"
                  color="#4FC08D"
                ></nut-icon>
                <div class="discuss-footer__tag-name">安全</div>
              </div>
              <div class="discuss-footer__tag" v-if="i.grade == 1">
                <nut-icon
                  font-class-name="iconfont"
                  class-prefix="icon"
                  name="slack-circle-fill"
                  color="#F3812E"
                ></nut-icon>
                <div class="discuss-footer__tag-name">重要</div>
              </div>
              <div class="discuss-footer__tag" v-if="i.grade == 2">
                <nut-icon
                  font-class-name="iconfont"
                  class-prefix="icon"
                  name="slack-circle-fill"
                  color="#EA290E"
                ></nut-icon>
                <div class="discuss-footer__tag-name">紧急</div>
              </div>
            </template>
          </DiscussCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="suggestion">
      <InfiniteLoading
        name="suggestion"
        :pageSize="10"
        :api="getSuggestionList"
        @load="loadMore"
        @refresh="refresh"
      >
        <template #content>
          <DiscussCardVue
            :avatar="i.applicantInfo.avatar"
            :name="i.applicantInfo.uname"
            :description="i.applicantInfo.cname"
            :content="i.content"
            :time="i.createdAt"
            :type="i.type"
            :replyAvat="i.approverInfo?.avatar"
            :replyName="i.approverInfo?.real_name"
            :replyDesc="i?.approve_time"
            :replyCont="i?.description"
            v-for="i in DataList.suggestionList"
            :key="i.id"
          />
        </template>
      </InfiniteLoading>
    </nut-tabpane>
  </nut-tabs>
  <PushButton v-show="TabList.tabValue === 'suggestion'" @click="createSuggestion" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useUserStore } from '/@/store/users';
import { TabList, DataList, FuncList } from './data';
import SearchBar from '/@/components/SearchBar.vue';
import { ShowToast } from '/@/hooks/useShowMessage';
import PushButton from '/@/components/PushButton.vue';
import { getNoticeList } from '/@/api/index/information';
import DiscussCardVue from '/@/components/DiscussCard.vue';
import { getSuggestionList } from '/@/api/serve/suggestion';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';
import { navigateTo, useDidShow, switchTab } from '@tarojs/taro';
import { getNavBarHeigtht, getNodePositionInfo } from '/@/hooks/useGetSystemInfo';

const tabsTop = getNavBarHeigtht();
const tabnineHeight = ref('100vh');
const loadmoreHeight = ref('100vh');

const userStore = useUserStore();

useDidShow(() => {
  if (!userStore.getUserLoginStatus) {
    ShowToast.error('请先登陆');
    setTimeout(() => {
      switchTab({
        url: '/pages/mine/index',
      });
    }, 1000);
    return;
  }
  if (DataList.noticeList.length === 0) {
    refresh('notice', getNoticeList);
  }
});

watch(
  () => TabList.tabValue,
  (val) => {
    if (DataList[`${val}List`].length === 0) {
      refresh(val, FuncList[`${val}`]);
    }
  }
);

const loadMore = (name, data) => {
  DataList[`${name}List`].push(...data.rows);
};

const refresh = async (name, api, pageSize = 10) => {
  const data = await api({ page: 1, pageSize });
  DataList[`${name}List`].length = 0;
  DataList[`${name}List`].push(...data.rows);
};

const createSuggestion = () => {
  navigateTo({
    url: '/pages/discover/children/suggestion/index',
  });
};

setTimeout(async () => {
  loadmoreHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
  tabnineHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
}, 1000);
</script>

<style lang="scss">
.loadmore {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
#infiniteLoading {
  height: v-bind(loadmoreHeight);
}
</style>

<style lang="scss">
.nut-navbar {
  box-shadow: none;
}

.nut-tabs {
  position: relative;
  top: v-bind(tabsTop);
}

.nut-tabs__titles-item.active {
  font-size: 16px !important;
  .nut-tabs__titles-item__line {
    background: #000;
    width: 10%;
    bottom: 4%;
    border-radius: 10px;
  }
}
.nut-tabs__titles {
  padding: 0;
}
.nut-tabpane {
  height: v-bind(tabnineHeight);
  padding: 0;
  // overflow: hidden;
}

.container:first-child {
  padding-top: 0;
}
</style>
