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
          <div class="time">{{ state.end_update_time }}</div>
          <div class="title">风险地区数量</div>
        </div>
        <div class="content">
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
                <div class="uu">{{ state.mcount }}</div>
              </div>
            </div>
          </div>

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
                <div class="uu">{{ state.hcount }}</div>
              </div>
            </div>
          </div>
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
      <!-- TODO 此处nutui的滚动加载组件存在找不到scroll-view的bug，先不做 -->
    </nut-tabpane>
    <nut-tabpane pane-key="t3">t3</nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { getRiskArea } from '/@/api/covid';
import { onBeforeMount, reactive } from 'vue';
import { GetRiskAreaResultModel, RiskAreaItem } from '/@/api/model/covidModel';
import { tabList, areaRemarkList } from './data';
interface RiskIncrease {
  per: string;
  count: number | string;
}
const state = reactive({
  searchValue: '',
  hcount: 0 as number,
  mcount: 0 as number,
  hincrease: {} as RiskIncrease,
  mincrease: {} as RiskIncrease,
  highlist: [] as RiskAreaItem[],
  middlelist: [] as RiskAreaItem[],
  end_update_time: '' as string,
  risk: {} as GetRiskAreaResultModel,
});

onBeforeMount(async () => {
  state.risk = await getRiskArea();
  state.end_update_time = state.risk.end_update_time.slice(0, 10);
  state.hcount = state.risk.hcount;
  state.mcount = state.risk.mcount;
  state.hincrease = {
    count: state.risk.hcount - state.risk.last_hcount || '+0',
    per:
      (Math.round(((state.risk.hcount - state.risk.last_hcount) / state.risk.last_hcount) * 10000) /
        100 || '+0') + '%',
  };
  state.mincrease = {
    count: state.risk.mcount - state.risk.last_mcount || '+0',
    per:
      (Math.round(((state.risk.mcount - state.risk.last_mcount) / state.risk.last_mcount) * 10000) /
        100 || '+0') + '%',
  };
});

const handleSearch = (val) => {
  console.log(val);
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
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
  padding: 16px;
  padding-top: 0;
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
    font-weight: 600;
    .title {
      font-size: 18px;
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
</style>
