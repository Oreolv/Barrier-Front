<template>
  <view class="index">
    <div class="user-avatar">
      <img :src="userInfo.profile.avatar" alt="avatar" />
    </div>
    <div class="user-info">
      <nut-cell-group>
        <nut-cell title="昵称" :desc="userInfo.profile.nickName" is-link></nut-cell>
        <nut-cell title="性别" :desc="userInfo.usex === UserSexEnum.Male ? '男' : '女'"></nut-cell>
        <nut-cell title="手机号" :desc="userInfo.uphone"></nut-cell>
        <nut-cell title="工作单位" :desc="userInfo.company"></nut-cell>
      </nut-cell-group>
      <nut-cell-group>
        <nut-cell title="所属社区" :desc="userInfo.cname"></nut-cell>
        <nut-cell title="所属小区" :desc="userInfo.vname"></nut-cell>
      </nut-cell-group>
    </div>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '/@/store/users';
import { UserSexEnum } from '/@/enums/userEnum';
import { UserInfo } from '/@/api/model/usersModel';
const userStore = useUserStore();
const transformUserInfo = (info: UserInfo) => {
  const data = {} as UserInfo;
  for (const key in info) {
    // eslint-disable-next-line eqeqeq
    data[key] = info[key] == null ? '暂无数据' : info[key];
  }
  return data;
};
const userInfo = transformUserInfo(userStore.getUserInfo);
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
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 36px 0 24px 0;
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
</style>
