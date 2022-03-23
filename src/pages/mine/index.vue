<template>
  <view class="index">
    <div class="info" v-if="userInfo.nickName">
      <div class="info-avatar">
        <img :src="userInfo.avatar" alt="" />
      </div>
      <div class="info-user">
        <div class="info-nickName">{{ userInfo.nickName }}</div>
        <div class="info-community">
          {{ userProfile.cname ? userProfile.cname : '暂未绑定社区，请前往社区绑定' }}
        </div>
      </div>
    </div>

    <div class="info" @click="userStore.login()" v-else>
      <div class="info-avatar">
        <img :src="require('/@/assets/avatar.png')" alt="" />
      </div>
      <div class="info-user">
        <div class="info-nickName">立即登陆</div>
        <div class="info-community">登陆享受更多精彩内容</div>
      </div>
    </div>
    <br />

    <nut-button type="primary" block plain @click="userStore.logout()" v-if="userInfo.nickName">
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
const { userInfo, userProfile } = storeToRefs(userStore);
useDidShow(() => {
  // 页面显示获取头像和昵称
  if (userStore.checkLogin()) {
    userStore.getInfo();
  }
});
</script>
