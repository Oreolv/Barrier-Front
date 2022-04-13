<template>
  <div class="top-img">
    <img src="https://img.xinyu.ink//serve-back.png" mode="widthFix" />
  </div>
  <div class="serve">
    <div class="serve-header">日常防疫</div>
    <div class="serve-content">
      <nut-grid :column-num="4" :border="false" clickable>
        <nut-grid-item icon="dongdong" text="来访申请">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="tongxunlu" />
          </template>
        </nut-grid-item>
        <nut-grid-item icon="dongdong" text="行程报备">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="ziyuangongxiang" />
          </template>
        </nut-grid-item>
        <nut-grid-item icon="dongdong" text="返乡报备">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="laifangshenpi" />
          </template>
        </nut-grid-item>
        <nut-grid-item icon="dongdong" text="异常报备">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="tongzhi" />
          </template>
        </nut-grid-item>
        <nut-grid-item icon="dongdong" text="意见反馈">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="youjian3" />
          </template>
        </nut-grid-item>
      </nut-grid>
    </div>
  </div>
  <div class="serve">
    <div class="serve-header">紧急防疫</div>
    <div class="serve-content">
      <nut-grid :column-num="4" :border="false" clickable>
        <nut-grid-item icon="dongdong" text="健康上报">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="renzheng" />
          </template>
        </nut-grid-item>
        <nut-grid-item icon="dongdong" text="物资申请">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="che" />
          </template>
        </nut-grid-item>
        <nut-grid-item icon="dongdong" text="事情代办">
          <template #icon>
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="wenjian" />
          </template>
        </nut-grid-item>
      </nut-grid>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
page {
  box-sizing: border-box;
  padding: 16px;
}
.top-img {
  margin-bottom: 16px;
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
}
.serve {
  .serve-header {
    font-weight: bold;
    font-size: 18px;
  }
  .serve-content {
    padding: 16px 0;
  }
}
.iconfont {
  font-size: 30px;
}
</style>
