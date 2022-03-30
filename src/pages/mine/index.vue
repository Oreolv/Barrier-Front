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
          <div class="name">{{ userStore.getUserProfile.nickName || '立即登录' }}</div>
          <div class="tips" @click="showBindingModal" v-if="!userStore.checkUserInfoBinding">
            <nut-icon name="ask" size="20"></nut-icon>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="info-item" v-for="item in userStore.getUserStatus" :key="item.key">
          <div class="item-data" :style="{ color: item.color }">{{ item.data }}</div>
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
      <div class="user-setting">
        <nut-cell-group>
          <nut-cell
            v-for="item in SettingList"
            :key="item.icon"
            :title="item.title"
            @click="item.click"
            is-link
          >
            <template v-slot:icon>
              <nut-icon
                font-class-name="iconfont"
                class-prefix="icon"
                :name="item.icon"
                size="20"
              />
            </template>
          </nut-cell>
        </nut-cell-group>
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { SettingList } from './data';
import { useDidShow } from '@tarojs/taro';
import { useUserStore } from '/@/store/users';
import { ShowModal } from '/@/hooks/useShowMessage';
const userStore = useUserStore();

useDidShow(async () => {
  // 每次页面显示后初始化userStore，会请求getUserInfo接口
  if (userStore.getUserLoginStatus) {
    await userStore.initStateAction();
  }
});

const loginAction = async () => {
  if (!userStore.getUserLoginStatus) {
    await userStore.loginAction();
  }
};

const showBindingModal = () => {
  ShowModal.info({
    title: '提示',
    content: '由于用户未绑定个人信息，默认设置为高风险用户，进出小区将会受到限制。',
  });
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
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    .name {
      text-align: center;
      font-size: 21px;
      letter-spacing: 1px;
    }
    .tips {
      margin-left: 8px;
      text {
        vertical-align: middle;
        color: #faad14;
      }
    }
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
  padding: 24px 8px 16px 8px;
  .nut-cell__title {
    .iconfont {
      margin-right: 8px;
    }
    color: black;
  }
  .nutui-iconfont {
    color: black;
    font-size: 10px;
    font-weight: 800;
  }
}
</style>
