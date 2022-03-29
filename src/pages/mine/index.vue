<template>
  <view class="index">
    <div class="mine-back"></div>
    <div class="mine-user">
      <div class="user-profile" @click="loginAction">
        <div class="user-avatar">
          <img
            :src="userStore.getUserProfile.avatar || require('/@/assets/avatar.png')"
            alt="avatar"
          />
        </div>
        <div class="user-name">
          {{ userStore.getUserProfile.nickName || '立即登录' }}
        </div>
      </div>
      <div class="user-info">
        <div class="info-item" v-for="item in userStore.getUserStatus" :key="item.key">
          <div class="item-data" :style="{ color: item.color }">{{ item.data }}</div>
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
      <div class="user-setting">
        <div
          class="setting-item"
          v-for="item in SettingList"
          :key="item.icon"
          @click="item.click(userStore.getUserLoginStatus)"
        >
          <div class="item-icon">
            <nut-icon
              font-class-name="iconfont"
              class-prefix="icon"
              :name="item.icon"
              size="38rpx"
            />
          </div>
          <div class="item-title">{{ item.title }}</div>
          <div class="item-right">
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="jiantou" size="26rpx" />
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { SettingList } from './data';
import { useDidShow } from '@tarojs/taro';
import { useUserStore } from '/@/store/users';
const userStore = useUserStore();
const loginStatus = userStore.getUserLoginStatus;

useDidShow(async () => {
  // 每次页面显示后初始化userStore，会请求getUserInfo接口
  if (loginStatus) {
    await userStore.initStateAction();
  }
});

const loginAction = async () => {
  if (!loginStatus) {
    await userStore.loginAction();
  }
};
</script>

<style lang="scss">
.index {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 16px;
}
.iconfont {
  // 解决图标基线导致的垂直不居中问题
  vertical-align: middle;
}
.mine-back {
  height: 40vh;
  background-image: url('https://img.xinyu.ink//E2CEA33874A5BAE3CD39750AEAA63173.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mine-user {
  flex: 1;
  margin-top: -25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: white;
  .user-avatar {
    text-align: center;
    img {
      width: 80px;
      height: 80px;
      margin-top: -40px;
      border-radius: 50%;
      box-shadow: rgba(50, 50, 93, 0.19) 0px 10px 20px, rgba(50, 50, 93, 0.23) 0px 6px 6px;
    }
  }
  .user-name {
    text-align: center;
    font-size: 21px;
    margin-top: 10px;
    letter-spacing: 1px;
  }
}
.user-info {
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
  .info-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 0 8px;
    border-right: 1px #e4e7ed solid;
    .item-data {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 8px;
    }
    .item-title {
      color: #909399;
      font-size: 14px;
    }
  }
}
.user-setting {
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  justify-content: center;
  .setting-item {
    display: flex;
    padding: 18px 0;
    margin: 0 24px;
    align-items: center;
    border-bottom: 1px #e4e7ed solid;
    .item-title {
      flex: 1;
      margin-left: 12px;
    }
  }
}
.user-setting :last-child {
  border-bottom: none;
}
</style>
