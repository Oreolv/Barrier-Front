<template>
  <div class="component">
    <div class="push-button" @click="checkUserBinding">
      <nut-icon font-class-name="iconfont" class-prefix="icon" name="zengjia" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '/@/store/users';
import { ShowModal } from '/@/hooks/useShowMessage';

const userStore = useUserStore();

function checkUserBinding(event) {
  if (!userStore.getUserBindingStatus) {
    ShowModal.info({
      title: '系统提示',
      content: '由于您未更新个人信息，暂时无法使用此功能',
    });
    event.stopPropagation();
  }
}
</script>

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
