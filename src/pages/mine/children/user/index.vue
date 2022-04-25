<template>
  <view class="index">
    <div class="user-avatar">
      <nut-uploader
        maximum="1"
        :headers="uploadConfig.headers"
        :url="uploadConfig.url"
        multiple
        @success="handleSuccess"
        @failure="handleError"
      ></nut-uploader>
      <img :src="userInfo.profile.avatar" alt="avatar" />
      <div class="change-avatar">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="paizhao" />
      </div>
    </div>
    <div class="user-info">
      <nut-cell-group>
        <nut-cell
          title="昵称"
          :desc="userInfo.profile.nickName"
          is-link
          @click="editNickName.show = true"
        ></nut-cell>
        <nut-cell title="性别" :desc="userInfo.usex"></nut-cell>
        <nut-cell title="手机号" :desc="userInfo.uphone"></nut-cell>
        <nut-cell title="工作单位" :desc="userInfo.company"></nut-cell>
      </nut-cell-group>
      <nut-cell-group>
        <nut-cell title="所属社区" :desc="userInfo.cname"></nut-cell>
        <nut-cell title="所属小区" :desc="userInfo.vname"></nut-cell>
      </nut-cell-group>
    </div>
  </view>
  <nut-popup
    pop-class="popclass"
    v-model:visible="editNickName.show"
    :z-index="100"
    position="bottom"
  >
    <div class="top">
      <div class="left" @click="editNickName.show = false">取消</div>
      <div class="middle">修改昵称</div>
      <div class="right">
        <nut-button type="info" color="#303133" @click="updateNickName">保存</nut-button>
      </div>
    </div>
    <div class="content" v-if="editNickName.show">
      <input
        :focus="true"
        v-model="editNickName.value"
        placeholder="输入昵称"
        :adjustPosition="false"
      />
    </div>
  </nut-popup>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { global } from '/@/utils/global';
import { useUserStore } from '/@/store/users';
import { ShowToast } from '/@/hooks/useShowMessage';
import { transformUserInfo } from '/@/hooks/useTransformData';

const userStore = useUserStore();

const userInfo = reactive(transformUserInfo(userStore.getUserInfo));

const editNickName = reactive({
  show: false,
  value: userInfo.profile.nickName,
});

const uploadConfig = {
  url: `${global.apiUrl}/upload`,
  headers: { Authorization: `Bearer ${userStore.getToken}` },
};

async function handleSuccess(res) {
  const data = JSON.parse(res.data.data);
  if (data.code !== 0) {
    ShowToast.error('上传失败');
    return;
  }
  await userStore.updateUserProfile({ avatar: data.result });
  userInfo.profile.avatar = data.result;
}

function handleError() {
  ShowToast.error('上传失败');
}

async function updateNickName() {
  await userStore.updateUserProfile({ nickName: editNickName.value });
  userInfo.profile.nickName = editNickName.value;
  editNickName.show = false;
}
</script>

<style lang="scss">
page {
  background-color: #f4f4f4;
}
.index {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 16px;
}
.user-avatar {
  text-align: center;
  .nut-uploader {
    position: absolute;
    top: 36px;
    left: calc(50% - 40px);
    width: 90px;
    height: 90px;
    opacity: 0;
    .nut-uploader__upload {
      height: 80px;
      button {
        padding: 0;
      }
    }
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 36px 0 24px 0;
  }
  .change-avatar {
    position: absolute;
    top: 93px;
    left: calc(50% + 18px);
    width: max-content;
    height: max-content;
    text {
      font-size: 20px;
      padding: 2px 2px 3px 2px;
      color: white;
      border-radius: 50%;
      border: 1px solid white;
      background-color: black;
      vertical-align: middle;
    }
  }
}
.user-info {
  margin: 0 16px;
  .nut-cell {
    padding-right: 8px;
  }
  .nut-cell__title {
    color: black;
    font-weight: bolder;
  }
  .nut-cell__value {
    color: #909399;
  }
  .nutui-iconfont {
    margin-left: 4px;
    color: black;
    font-size: 10px;
    font-weight: 800;
  }
}
.popclass {
  height: 66.6vh;
  box-sizing: border-box;
  padding: 16px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .middle {
      font-weight: bolder;
      position: fixed;
      width: 100px;
      text-align: center;
      left: calc(50% - 50px);
    }
    .right {
      .nut-button {
        color: white;
      }
    }
  }
  .content {
    margin-top: 24px;
    input {
      font-size: 14px;
      padding: 8px 16px;
      background-color: #f4f4f4;
      border-radius: 8px;
    }
  }
}
</style>
