<template>
  <div class="component">
    <div class="push-button">
      <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
    </div>
  </div>
</template>

<script lang="scss" setup></script>

<style lang="scss">
.component {
  .push-button {
    position: fixed;
    bottom: 48px;
    right: 32px;
    text {
      font-size: 36px;
      opacity: 0.7;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
}
</style>
