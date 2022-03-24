<template>
  <view class="index">
    <div class="info" v-if="userProfile?.nickName">
      <div class="info-avatar">
        <img :src="userProfile?.avatar" alt="" />
      </div>
      <div class="info-user">
        <div class="info-nickName">{{ userProfile?.nickName }}</div>
        <div class="info-community">
          {{ userInfo?.cname ? userInfo.cname : '暂未绑定社区，请前往社区绑定' }}
        </div>
      </div>
    </div>

    <div class="info" @click="userStore.loginAction()" v-else>
      <div class="info-avatar">
        <img :src="require('/@/assets/avatar.png')" alt="" />
      </div>
      <div class="info-user">
        <div class="info-nickName">立即登陆</div>
        <div class="info-community">登陆享受更多精彩内容</div>
      </div>
    </div>
    <br />

    <nut-button type="primary" block plain @click="userStore.logout()" v-if="userProfile?.nickName">
      退出登录
    </nut-button>
    <br />
  </view>
</template>

<script setup lang="ts">
import './index.scss';
import { useUserStore } from '/@/store/users';
import { storeToRefs } from 'pinia';
import { useDidShow } from '@tarojs/taro';
const userStore = useUserStore();
const { userProfile, userInfo } = storeToRefs(userStore);
useDidShow(() => {
  // 页面显示获取头像和昵称
  if (userStore.getToken) {
    userStore.getUserProfileAction();
    console.log(userStore.userProfile);
  }
});
</script>
