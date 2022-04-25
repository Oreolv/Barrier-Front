<template>
  <nut-searchbar v-model="state.searchValue" @change="handleSearch" placeholder="搜索地区风险等级">
    <template v-slot:leftin>
      <nut-icon size="14" name="search2"></nut-icon>
    </template>
  </nut-searchbar>
  <nut-tabs v-model="tabList.tabValue" type="none" v-show="!state.searchValue.length">
    <template v-slot:titles>
      <nut-button
        type="default"
        class="nut-tabs__titles-item"
        @click="tabList.tabValue = item.paneKey"
        :class="{ active: tabList.tabValue == item.paneKey }"
        :key="item.paneKey"
        v-for="item in tabList.list"
      >
        <span class="nut-tabs__titles-item__text">{{ item.title }}</span>
      </nut-button>
    </template>
    <nut-tabpane pane-key="t1">
      <Card id="count" :description="state.risk.end_update_time" title="风险地区数量">
        <template #icon><nut-icon name="ask" @click="showRiskAreaModal"></nut-icon></template>
        <template #content>
          <nut-skeleton
            width="250px"
            height="15px"
            animated
            avatar
            avatar-size="32"
            :loading="showSkeletonLoading"
          >
            <div class="count-list">
              <div class="count-list__left">
                <nut-icon
                  id="count-list__left-middle"
                  font-class-name="iconfont"
                  class-prefix="icon"
                  name="error-fill"
                />
              </div>
              <div class="count-list__middle" id="count-list__first">
                <div class="count-list__middle-top">
                  <div class="clmt-name">中风险地区</div>
                  <div
                    class="clmt-increase"
                    :style="{ color: state.mincrease.count > 0 ? '#E84840' : '#6FCC4E' }"
                  >
                    <div class="clmt-increase__count">{{ state.mincrease.count }}</div>
                    <div class="clmt-increase__per">({{ state.mincrease.per }})</div>
                  </div>
                </div>
                <div class="count-list__right">
                  {{ state.risk.mcount }}
                </div>
              </div>
            </div>
          </nut-skeleton>
          <nut-skeleton
            width="250px"
            height="15px"
            animated
            avatar
            avatar-size="32"
            :loading="showSkeletonLoading"
          >
            <div class="count-list">
              <div class="count-list__left">
                <nut-icon
                  id="count-list__left-high"
                  font-class-name="iconfont"
                  class-prefix="icon"
                  name="error"
                />
              </div>
              <div class="count-list__middle" id="count-list__second">
                <div class="count-list__middle-top">
                  <div class="clmt-name">高风险地区</div>
                  <div
                    class="clmt-increase"
                    :style="{ color: state.hincrease.count > 0 ? '#E84840' : '#6FCC4E' }"
                  >
                    <div class="clmt-increase__count">{{ state.hincrease.count }}</div>
                    <div class="clmt-increase__per">({{ state.hincrease.per }})</div>
                  </div>
                </div>
                <div class="count-list__right">
                  {{ state.risk.hcount }}
                </div>
              </div>
            </div>
          </nut-skeleton>
        </template>
      </Card>
      <Card id="description" title="风险区说明" marginTop="8">
        <template #content>
          <div class="description-list" v-for="item in areaRemarkList" :key="item.name">
            <div class="description-list__left" :style="{ backgroundColor: item.color }"></div>
            <div class="description-list__right">
              <div class="description-list__right-name">{{ item.name }}</div>
              <div class="description-list__right-remark">{{ item.remark }}</div>
            </div>
          </div>
        </template>
      </Card>
    </nut-tabpane>
    <nut-tabpane pane-key="t2">
      <div id="infiniteLoading">
        <nut-infiniteloading
          containerId="infiniteLoading"
          :use-window="false"
          :has-more="state.hasMoreMiddleList"
          @load-more="loadMoreMiddleList"
          load-more-txt="已经到底啦"
          pull-icon="loading"
          pull-txt=""
          load-icon="loading"
        >
          <Card id="arealist" v-for="item in state.middlelist" :key="item.id" :show-divider="false">
            <template #content>
              <div v-for="(i, idx) in item.communitys" :key="idx" class="arealist-communitys">
                {{ i }}
              </div>
              <nut-divider :style="{ color: '#f4f4f4' }"></nut-divider>
              <div class="arealist-footer">
                <nut-icon font-class-name="iconfont" class-prefix="icon" name="location-fill" />
                <div class="arealist-footer__name">{{ item.area_name }}</div>
              </div>
            </template>
          </Card>
        </nut-infiniteloading>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="t3">
      <div id="infiniteLoading">
        <nut-infiniteloading
          containerId="infiniteLoading"
          :use-window="false"
          :has-more="state.hasMoreHighList"
          @load-more="loadMoreHighList"
          load-more-txt="已经到底啦"
          pull-icon="loading"
          pull-txt=""
          load-icon="loading"
        >
          <Card id="arealist" v-for="item in state.highlist" :key="item.id" :show-divider="false">
            <template #content>
              <div v-for="(i, idx) in item.communitys" :key="idx" class="arealist-communitys">
                {{ i }}
              </div>
              <nut-divider :style="{ color: '#f4f4f4' }"></nut-divider>
              <div class="arealist-footer">
                <nut-icon font-class-name="iconfont" class-prefix="icon" name="location-fill" />
                <div class="arealist-footer__name">{{ item.area_name }}</div>
              </div>
            </template>
          </Card>
        </nut-infiniteloading>
      </div>
    </nut-tabpane>
  </nut-tabs>
  <div id="search" v-show="state.searchValue.length">
    <div v-if="state.searchMiddleList.length > 0 || state.searchHighList.length > 0">
      <div v-if="state.searchMiddleList.length > 0" class="search-type">中风险地区：</div>
      <Card
        id="arealist"
        v-for="item in state.searchMiddleList"
        :key="item.id"
        :show-divider="false"
      >
        <template #content>
          <div v-for="(i, idx) in item.communitys" :key="idx" class="arealist-communitys">
            {{ i }}
          </div>
          <nut-divider :style="{ color: '#f4f4f4' }"></nut-divider>
          <div class="arealist-footer">
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="location-fill" />
            <div class="arealist-footer__name">{{ item.area_name }}</div>
          </div>
        </template>
      </Card>
      <div v-if="state.searchHighList.length > 0" class="search-type">高风险地区：</div>
      <Card id="arealist" v-for="item in state.searchHighList" :key="item.id" :show-divider="false">
        <template #content>
          <div v-for="(i, idx) in item.communitys" :key="idx" class="arealist-communitys">
            {{ i }}
          </div>
          <nut-divider :style="{ color: '#f4f4f4' }"></nut-divider>
          <div class="arealist-footer">
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="location-fill" />
            <div class="arealist-footer__name">{{ item.area_name }}</div>
          </div>
        </template>
      </Card>
    </div>
    <nut-empty v-else image="error" description="无中高风险地区"></nut-empty>
  </div>
</template>

<script lang="ts" setup>
import Card from '/@/components/Card.vue';
import { getRiskArea } from '/@/api/index/covid';
import { tabList, areaRemarkList } from './data';
import { onBeforeMount, reactive, ref } from 'vue';
import { ShowModal } from '/@/hooks/useShowMessage';
import { addPlusAndMinus } from '/@/hooks/useTransformData';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import { GetRiskAreaResultModel, RiskAreaItem } from '/@/api/index/model/covidModel';
interface RiskIncrease {
  per: string;
  count: number | string;
}
const tabnineHeight = ref('100vh');
const loadmoreHeight = ref('100vh');
const showSkeletonLoading = ref(true);

const state = reactive({
  searchValue: '',
  searchMiddleList: [] as RiskAreaItem[],
  searchHighList: [] as RiskAreaItem[],
  hasMoreMiddleList: true,
  hasMoreHighList: true,
  hincrease: {} as RiskIncrease,
  mincrease: {} as RiskIncrease,
  highlist: [] as RiskAreaItem[],
  middlelist: [] as RiskAreaItem[],
  risk: {} as GetRiskAreaResultModel,
});

onBeforeMount(async () => {
  state.risk = await getRiskArea();
  showSkeletonLoading.value = false;
  state.risk.end_update_time = state.risk.end_update_time.slice(0, 10);
  state.hincrease = {
    count: addPlusAndMinus(state.risk.hcount - state.risk.last_hcount),
    per:
      addPlusAndMinus(
        Math.round(
          ((state.risk.hcount - state.risk.last_hcount) / state.risk.last_hcount) * 10000
        ) / 100
      ) + '%',
  };
  state.mincrease = {
    count: addPlusAndMinus(state.risk.mcount - state.risk.last_mcount),
    per:
      addPlusAndMinus(
        Math.round(
          ((state.risk.mcount - state.risk.last_mcount) / state.risk.last_mcount) * 10000
        ) / 100
      ) + '%',
  };
  state.highlist.push(...state.risk.highlist.slice(0, 15));
  state.middlelist.push(...state.risk.middlelist.slice(0, 15));
  tabnineHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top}px)`;
  loadmoreHeight.value = `calc(100vh - ${(await getNodePositionInfo('.nut-tabpane')).top + 16}px)`;
});

const loadMoreMiddleList = (done) => {
  setTimeout(() => {
    const len = state.middlelist.length;
    state.middlelist.push(...state.risk.middlelist.slice(len, len + 15));
    if (state.risk.middlelist.length === state.middlelist.length) {
      state.hasMoreMiddleList = false;
    }
    done();
  }, 500);
};

const loadMoreHighList = (done) => {
  setTimeout(() => {
    const len = state.highlist.length;
    state.highlist.push(...state.risk.highlist.slice(len, len + 15));
    if (state.risk.highlist.length === state.highlist.length) {
      state.hasMoreHighList = false;
    }
    done();
  }, 500);
};

const handleSearch = (val) => {
  state.searchMiddleList = state.risk.middlelist.filter((item) => item.area_name.includes(val));
  state.searchHighList = state.risk.highlist.filter((item) => item.area_name.includes(val));
};

const showRiskAreaModal = () => {
  ShowModal.info({
    title: '说明',
    content: '数据来源：由国家卫生健康委每天汇总各地报送疫情风险等级数据',
  });
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}

#count {
  .count-list {
    display: flex;
    align-items: center;
    .count-list__left {
      box-sizing: border-box;
      // border: 1px #f4f4f4 solid;
      border-radius: 8px;
      height: 40px;
      width: 40px;
      text-align: center;
      line-height: 40px;
      padding: 4px;
      margin-right: 12px;
      #count-list__left-middle {
        color: #e57631;
      }
      #count-list__left-high {
        color: #e61c1d;
      }
      .nut-icon {
        font-size: 32px;
      }
    }
    .count-list__middle {
      display: flex;
      flex: 1;
      padding-bottom: 8px;
      .count-list__middle-top {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 40px;
        .clmt-increase {
          display: flex;
          font-size: 12px;
        }
      }
      .count-list__right {
        font-size: 22px;
        font-weight: 600;
      }
    }
    #count-list__first {
      margin-top: 16px;
      padding-bottom: 16px;
      border-bottom: #efefef 1px solid;
    }
    #count-list__second {
      margin-top: 16px;
    }
  }
}

#description {
  margin-bottom: 16px;
  .description-list {
    display: flex;
    border-bottom: #efefef 1px solid;
    margin-top: 16px;
    .description-list__left {
      height: 20px;
      width: 20px;
      flex-shrink: 0;
      border-radius: 50%;
      margin: 0 16px 0 4px;
    }
    .description-list__right {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .description-list__right-remark {
        margin: 8px 0;
        color: #949494;
      }
    }
  }
  .description-list:last-child {
    border-bottom: none;
  }
}

#infiniteLoading {
  height: v-bind(loadmoreHeight);
  #arealist {
    font-size: 14px;
    margin-top: 8px !important;
  }
  .arealist-communitys {
    margin-top: 8px;
  }
  .arealist-communitys:first-child {
    margin-top: 0;
  }
  .arealist-footer {
    display: flex;
    .arealist-footer__name {
      color: #949494;
      margin-left: 8px;
    }
  }
}

#search {
  #arealist {
    margin: 0 16px 8px 16px;
    font-size: 14px;
  }
  .search-type {
    margin: 8px 0 8px 16px;
    font-weight: 600;
  }
  .arealist-communitys {
    margin-top: 8px;
  }
  .arealist-communitys:first-child {
    margin-top: 0;
  }
  .arealist-footer {
    display: flex;
    .arealist-footer__name {
      color: #949494;
      margin-left: 8px;
    }
  }
}
.card {
  box-shadow: none;
  margin: 0 16px;
}
</style>

<style lang="scss">
.nut-searchbar {
  position: relative;
  background-color: #f5f5f5;
  box-shadow: none;
  padding: 16px;
  padding-bottom: 4px;
}
.nut-tabs__titles {
  padding: 0 16px;
  margin-top: 8px;
  .active {
    font-weight: 500;
    background-color: #333333 !important;
    color: white !important;
  }
  button {
    font-size: 14px;
    flex: 0 0 80px;
    margin-right: 8px;
    color: #949494;
    border: 1px #f5f5f5 solid;
    padding: 0 8px;
  }
}

.nut-searchbar__search-input {
  padding: 4px 0 4px 13px;
  background: white;
}

.nut-tabpane {
  height: v-bind(tabnineHeight);
  padding: 0;
  background-color: #f5f5f5;
}
.nut-infinite-bottom {
  padding: 16px;
}
.nut-divider {
  margin: 8px 0;
}
.skeleton {
  margin-top: 16px;
}
</style>
