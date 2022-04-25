<template>
  <div class="index">
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
            <nut-icon name="ask"></nut-icon>
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
          <nut-cell title="个人资料" @click="goUserProfile" is-link>
            <template v-slot:icon>
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="adduser" />
            </template>
          </nut-cell>
          <nut-cell title="清除缓存" @click="goDeleteCache" is-link>
            <template v-slot:icon>
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="delete" />
            </template>
          </nut-cell>
          <nut-cell is-link>
            <template #default>
              <div class="nut-cell__icon">
                <nut-icon font-class-name="iconfont" class-prefix="icon" name="share" />
              </div>
              <div class="nut-cell__title">分享好友</div>
              <button id="share" open-type="share"></button>
              <div class="nutui-iconfont nut-icon nut-icon-right nut-cell__link"></div>
            </template>
          </nut-cell>
        </nut-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '/@/store/users';
import { ShowModal, ShowToast } from '/@/hooks/useShowMessage';
import { navigateTo, showModal, switchTab, useShareAppMessage, useDidShow } from '@tarojs/taro';

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

useShareAppMessage(() => {
  return {
    title: '清疫小程序',
    path: '/page/mine/index',
  };
});

function goUserProfile() {
  if (!userStore.getUserLoginStatus) {
    ShowToast.info('请先登陆');
    return;
  }
  navigateTo({
    url: '/pages/mine/children/user/index',
    events: {},
  });
}

function goDeleteCache() {
  showModal({
    title: '提醒',
    content: '清除缓存后需要重新登陆',
    showCancel: true,
    success: (res) => {
      if (res.confirm) {
        userStore.logoutAction('清除成功');
        setTimeout(() => {
          switchTab({
            url: '/pages/mine/index',
          });
        }, 1500);
      }
    },
  });
}
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
  background-image: url('https://img.xinyu.ink//847c34361e45170999586818469b2e67.jpg');
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
        font-size: 20px;
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
  .nut-cell__icon {
    margin-right: 12px;
    text {
      font-size: 24px;
    }
  }
}
#share {
  opacity: 0;
  position: absolute;
  height: 20px;
  width: 100%;
}
</style>
