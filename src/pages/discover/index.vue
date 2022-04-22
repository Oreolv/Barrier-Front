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
    <nut-tabpane pane-key="0">
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
            :name="i.publisherInfo.realName"
            :description="i.publisherInfo.roles.roleName"
            :content="i.content"
            :time="i.createdAt"
            v-for="i in dataList.noticeList"
            :key="i.id"
          >
            <template #tag>
              <div class="discuss-footer__tag" v-if="i.grade == 0">
                <nut-icon name="check-checked" color="#4FC08D"></nut-icon>
                <div class="discuss-footer__tag-name">安全</div>
              </div>
              <div class="discuss-footer__tag" v-if="i.grade == 1">
                <nut-icon name="check-checked" color="#F3812E"></nut-icon>
                <div class="discuss-footer__tag-name">重要</div>
              </div>
              <div class="discuss-footer__tag" v-if="i.grade == 2">
                <nut-icon name="check-checked" color="#EA290E"></nut-icon>
                <div class="discuss-footer__tag-name">紧急</div>
              </div>
            </template>
          </DiscussCardVue>
        </template>
      </InfiniteLoading>
    </nut-tabpane>
    <nut-tabpane pane-key="1">
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
            :replyName="i.approverInfo?.realName"
            :replyDesc="i?.approveTime"
            :replyCont="i?.description"
            v-for="i in dataList.suggestionList"
            :key="i.id"
          />
        </template>
      </InfiniteLoading>
    </nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { TabList } from './data';
import { onBeforeMount, reactive, ref } from 'vue';
import SearchBar from '/@/components/SearchBar.vue';
import DiscussCardVue from '/@/components/DiscussCard.vue';
import { getNoticeList } from '/@/api/index/information';
import { getSuggestionList } from '/@/api/serve/suggestion';
import { SuggestionItem } from '/@/api/serve/suggestion/model';
import InfiniteLoading from '/@/components/InfiniteLoading.vue';
import { NoticeItem } from '/@/api/index/model/informationModel';
import { getNavBarHeigtht, getNodePositionInfo } from '/@/hooks/useGetSystemInfo';

const dataList = reactive({
  noticeList: [] as NoticeItem[],
  suggestionList: [] as SuggestionItem[],
});

const tabsTop = getNavBarHeigtht();
const tabnineHeight = ref('80vh');
const loadmoreHeight = ref('80vh');

onBeforeMount(async () => {
  // FIX: getNodePositionInfo无法获取到值
  loadmoreHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
  tabnineHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
});

const loadMore = (name, data) => {
  dataList[`${name}List`].push(...data.rows);
};

const refresh = async (name, api, pageSize) => {
  const data = await api({ page: 1, pageSize });
  dataList[`${name}List`].length = 0;
  dataList[`${name}List`].push(...data.rows);
};
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
.nut-table__main__head__tr {
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
}
.nut-tabs {
  position: relative;
  top: v-bind(tabsTop);
}
.nut-tabs__titles {
  padding-left: 16px;
}

.nut-tabs__titles-item.active {
  font-size: 16px !important;
  .nut-tabs__titles-item__line {
    background: #000;
    width: 40%;
    bottom: 8%;
    border-radius: 10px;
  }
}
.nut-tabs__titles-item {
  width: auto;
  min-width: 0;
  flex: 0 1 auto;
  margin-right: 16px;
}
.nut-tabpane {
  height: v-bind(tabnineHeight);
  padding: 0 16px;
  // overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.container:first-child {
  padding-top: 0;
}
</style>
