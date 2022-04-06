<template>
  <nut-searchbar v-model="state.searchValue" @change="handleSearch" placeholder="搜索地区风险等级">
    <template v-slot:leftin>
      <nut-icon size="14" name="search2"></nut-icon>
    </template>
  </nut-searchbar>
  <nut-tabs v-model="tabList.tabValue" type="none">
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
      <div class="data">
        <div class="header">
          <div class="top">
            <div class="time">{{ state.risk.end_update_time }}</div>
            <nut-icon name="ask" @click="showRiskAreaModal"></nut-icon>
          </div>
          <div class="title">风险地区数量</div>
        </div>
        <div class="content">
          <nut-skeleton
            width="250px"
            height="15px"
            animated
            avatar
            avatar-size="32"
            :loading="showSkeletonLoading"
          >
            <div class="list">
              <div class="icon">
                <nut-icon
                  id="middle"
                  font-class-name="iconfont"
                  class-prefix="icon"
                  name="error-fill"
                />
              </div>
              <div class="merge" id="first">
                <div class="title">
                  <div class="name">中风险地区</div>
                  <div
                    class="increase"
                    :style="{ color: state.hincrease.count > 0 ? '#E84840' : '#6FCC4E' }"
                  >
                    <div class="count">{{ state.mincrease.count }}</div>
                    <div class="per">({{ state.mincrease.per }})</div>
                  </div>
                </div>
                <div class="right">
                  <div class="uu">{{ state.risk.mcount }}</div>
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
            <div class="list">
              <div class="icon">
                <nut-icon id="high" font-class-name="iconfont" class-prefix="icon" name="error" />
              </div>
              <div class="merge">
                <div class="title">
                  <div class="name">高风险地区</div>
                  <div
                    class="increase"
                    :style="{ color: state.hincrease.count > 0 ? '#E84840' : '#6FCC4E' }"
                  >
                    <div class="count">{{ state.hincrease.count }}</div>
                    <div class="per">({{ state.hincrease.per }})</div>
                  </div>
                </div>
                <div class="right">
                  <div class="uu">{{ state.risk.hcount }}</div>
                </div>
              </div>
            </div>
          </nut-skeleton>
        </div>
      </div>
      <div class="description">
        <div class="title">风险区说明</div>
        <div class="list" v-for="item in areaRemarkList" :key="item.name">
          <div class="left" :style="{ backgroundColor: item.color }"></div>
          <div class="right">
            <div class="name">{{ item.name }}</div>
            <div class="remark">{{ item.remark }}</div>
          </div>
        </div>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="t2">
      <div class="infiniteLoading" id="scroll">
        <nut-infiniteloading
          containerId="scroll"
          :use-window="false"
          :has-more="state.hasMoreMiddleList"
          @load-more="loadMoreMiddleList"
          load-more-txt="没有更多数据了"
          pull-icon="loading"
        >
          <div class="box" v-for="item in state.middlelist" :key="item.id">
            <div v-for="(i, idx) in item.communitys" :key="idx" class="area-list">
              {{ i }}
            </div>
            <nut-divider :style="{ color: '#f4f4f4' }"></nut-divider>
            <div class="footer">
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="location-fill" />
              <div class="area-name">{{ item.area_name }}</div>
            </div>
          </div>
        </nut-infiniteloading>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="t3">
      <div class="infiniteLoading" id="scroll">
        <nut-infiniteloading
          containerId="scroll"
          :use-window="false"
          :has-more="state.hasMoreHighList"
          @load-more="loadMoreHighList"
          load-more-txt="没有更多数据了"
          pull-icon="loading"
        >
          <div class="box" v-for="item in state.highlist" :key="item.id">
            <div v-for="(i, idx) in item.communitys" :key="idx" class="area-list">
              {{ i }}
            </div>
            <nut-divider :style="{ color: '#f4f4f4' }"></nut-divider>
            <div class="footer">
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="location-fill" />
              <div class="area-name">{{ item.area_name }}</div>
            </div>
          </div>
        </nut-infiniteloading>
      </div>
    </nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { getRiskArea } from '/@/api/covid';
import { onBeforeMount, reactive, ref } from 'vue';
import { GetRiskAreaResultModel, RiskAreaItem } from '/@/api/model/covidModel';
import { tabList, areaRemarkList } from './data';
import { getNodePositionInfo } from '/@/hooks/useGetSystemInfo';
import { addPlusAndMinus } from '/@/hooks/useTransformData';
import { ShowModal } from '/@/hooks/useShowMessage';
interface RiskIncrease {
  per: string;
  count: number | string;
}
const tabnineHeight = ref('80vh');
const loadmoreHeight = ref('80vh');
const showSkeletonLoading = ref(true);

const state = reactive({
  searchValue: '',
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
  console.log(val);
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
// 隐藏滚动条
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.data {
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .header {
    .top {
      display: flex;
      justify-content: space-between;
      .title {
        font-weight: 600;
        font-size: 18px;
      }
    }
    .time {
      font-size: 14px;
      color: #909399;
      margin-bottom: 8px;
    }
  }
  .content {
    .list {
      display: flex;
      align-items: center;
      margin-top: 16px;
      .icon {
        box-sizing: border-box;
        // border: 1px #f4f4f4 solid;
        border-radius: 8px;
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        padding: 4px;
        margin-right: 12px;
        #middle {
          color: #e57631;
        }
        #high {
          color: #e61c1d;
        }
        .nut-icon {
          font-size: 32px;
        }
      }
      .merge {
        display: flex;
        flex: 1;

        padding-bottom: 8px;
        .title {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 40px;
          .increase {
            display: flex;
            font-size: 12px;
          }
        }
        .right {
          display: flex;
          align-items: center;
          font-size: 22px;
          font-weight: 600;
          border-radius: 32px;
        }
      }
    }
  }
}

#first {
  border-bottom: #efefef 1px solid;
}

.description {
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 16px;
  margin-top: 16px;
  .title {
    font-size: 18px;
    font-weight: 600;
  }
  .list {
    display: flex;
    border-bottom: #efefef 1px solid;
    margin-top: 16px;
    .left {
      height: 20px;
      width: 20px;
      flex-shrink: 0;
      border-radius: 50%;
      margin: 0 16px 0 4px;
    }
    .right {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .remark {
        margin: 8px 0;
        color: #949494;
      }
    }
  }
  .list:last-child {
    border-bottom: none;
  }
}
.infiniteLoading {
  height: v-bind(loadmoreHeight);
  .box {
    font-size: 14px;
    margin-top: 8px;
    border-radius: 8px;
    padding: 16px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    .area-list {
      margin-top: 8px;
    }
    .area-list:first-child {
      margin-top: 0;
    }
    .footer {
      display: flex;
      .area-name {
        color: #949494;
        margin-left: 8px;
      }
    }
  }
}
</style>

<style lang="scss">
.nut-searchbar {
  background-color: #f5f5f5;
  box-shadow: none;
  margin-top: 8px;
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
  padding: 16px;
  padding-top: 0;
  background-color: #f5f5f5;
}
.nut-divider {
  margin: 8px 0;
}
.skeleton {
  margin-top: 16px;
}
</style>
