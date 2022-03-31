<template>
  <nut-empty
    image="empty"
    description="无内容"
    v-if="!covidStore.riskArea.end_update_time"
  ></nut-empty>
  <div class="index" v-else>
    <div class="total">
      <div class="head">截至 {{ covidStore.riskArea.end_update_time }}数据：</div>
      <div class="content">
        <div class="grade">
          <div class="data">
            <div id="high">
              {{ covidStore.riskArea.hcount }}
              <span class="item">个</span>
            </div>
          </div>
          <div class="title">高风险地区</div>
        </div>
        <div class="grade">
          <div class="data">
            <div id="middle">
              {{ covidStore.riskArea.mcount }}
              <span class="item">个</span>
            </div>
          </div>

          <div class="title">中风险地区</div>
        </div>
      </div>
      <nut-divider :style="{ color: '#f4f4f4' }" />
      <div class="footer">由国家卫生健康委每天汇总各地报送疫情风险等级数据</div>
    </div>
    <div class="grade-title">
      <nut-icon id="high-icon" font-class-name="iconfont" class-prefix="icon" name="bg-warning" />
      <div>高风险地区</div>
    </div>
    <div class="grade-list">
      <nut-cell-group v-for="i in covidStore.riskArea.highlist" :key="i.id" :title="i.area_name">
        <nut-cell v-for="c in i.communitys" :key="c" :title="c">
          <template #link>
            <div id="high">高风险</div>
          </template>
        </nut-cell>
      </nut-cell-group>
    </div>
    <div class="grade-title">
      <nut-icon id="middle-icon" font-class-name="iconfont" class-prefix="icon" name="bg-warning" />
      <div>中风险地区</div>
    </div>
    <div class="grade-list">
      <nut-cell-group v-for="i in covidStore.riskArea.middlelist" :key="i.id" :title="i.area_name">
        <nut-cell v-for="c in i.communitys" :key="c" :title="c">
          <template #link>
            <div id="middle">中风险</div>
          </template>
        </nut-cell>
      </nut-cell-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCovidStore } from '/@/store/covid';
const covidStore = useCovidStore();
covidStore.getRiskArea();
</script>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.total {
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 16px;
  padding: 16px;
  .content {
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin: 24px 0;
    .item {
      display: inline !important;
      font-size: 16px;
    }
    .grade {
      .data {
        font-weight: bold;
        font-size: 24px;
        #high {
          color: #e61c1d;
        }
        #middle {
          color: #e57631;
        }
      }
    }
  }
  .footer {
    font-size: 14px;
    color: #909399;
  }
}
.nut-cell-group {
  margin: 8px 16px;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding-top: 8px;
  background-color: white;
  .nut-cell-group__title {
    margin-top: 16px;
    margin-left: 8px;
    color: #1a1a1a;
    font-weight: bold;
  }
}

.grade-list {
  #high {
    margin-left: 8px;
    color: #e61c1d;
  }
  #middle {
    margin-left: 8px;
    color: #e57631;
  }
}

.grade-title {
  display: flex;
  align-items: center;
  margin: 16px;
  font-weight: bold;
  font-size: 20px;
  text {
    font-size: 20px;
    vertical-align: middle;
  }
  #high-icon {
    margin-right: 8px;
    color: #e61c1d;
  }
  #middle-icon {
    margin-right: 8px;
    color: #e57631;
  }
}
</style>
