<template>
  <div class="total">
    <div class="head">截至 {{ state.risk.end_update_time }}数据：</div>
    <div class="content">
      <div class="grade">
        <div class="data">
          <div id="high">
            {{ state.risk.hcount }}
            <span class="item">个</span>
          </div>
        </div>
        <div class="title">高风险地区</div>
      </div>
      <div class="grade">
        <div class="data">
          <div id="middle">
            {{ state.risk.mcount }}
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
  <custom-wrapper>
    <nut-collapse
      :accordion="true"
      icon="down-arrow"
      v-for="p in state.risk.middlelist"
      v-model:active="state.highlistActive"
      :key="p.id"
    >
      <nut-collapse-item :name="p.id" :title="p.province">
        <div class="grade-list">
          <nut-cell-group v-for="i in p.children" :key="i.id" :title="i.area_name">
            <nut-cell v-for="c in i.communitys" :key="c" :title="c">
              <template #link>
                <div id="high">高风险</div>
              </template>
            </nut-cell>
          </nut-cell-group>
        </div>
      </nut-collapse-item>
    </nut-collapse>
  </custom-wrapper>
  <div class="grade-title">
    <nut-icon id="middle-icon" font-class-name="iconfont" class-prefix="icon" name="bg-warning" />
    <div>中风险地区</div>
  </div>
  <custom-wrapper>
    <nut-collapse
      :accordion="true"
      icon="down-arrow"
      v-model:active="state.middleActive"
      v-for="p in state.risk.middlelist"
      :key="p.id"
    >
      <nut-collapse-item :name="p.id" :title="p.province">
        <div class="grade-list">
          <nut-cell-group v-for="i in p.children" :key="i.id" :title="i.area_name">
            <nut-cell v-for="c in i.communitys" :key="c" :title="c">
              <template #link>
                <div id="middle">中风险</div>
              </template>
            </nut-cell>
          </nut-cell-group>
        </div>
      </nut-collapse-item>
    </nut-collapse>
  </custom-wrapper>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { getRiskAreaMerge } from '/@/api/covid';
import { GetRiskAreaMergeResultModel } from '/@/api/model/covidModel';
const state = reactive({
  risk: {} as GetRiskAreaMergeResultModel,
  highlistActive: 1,
  middleActive: 1,
});
// 在setup中直接使用await会报数组相关错误，可能是Taro目前并不支持，Vue3.2其实已经可以这样写了
onBeforeMount(async () => {
  state.risk = await getRiskAreaMerge();
});
</script>
<style lang="scss">
page {
  box-sizing: border-box;
  padding: 16px;
  background-color: #f4f4f4;
}
.nutui-iconfont {
  font-size: 14px !important;
}
.nut-cell-group__title {
  margin-top: 10px;
  font-weight: bold;
  color: #1a1a1a;
  padding: 0 8px;
}
.collapse-item {
  padding-left: 16px !important;
}
.collapse-wrapper {
  background-color: white;
  .collapse-content {
    padding: 0 8px !important;
  }
}
.nut-cell {
  padding: 0 !important;
  .nut-cell__title {
    padding: 13px 8px !important;
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
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0;
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
.total {
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
</style>
