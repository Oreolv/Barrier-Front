<template>
  <div class="component">
    <div class="avatar-header">
      <div class="avatar-header__avatar">
        <img :src="props.avatar" />
      </div>
      <div class="avatar-header__info">
        <div class="avatar-info__name">{{ props.name }}</div>
        <div class="avatar-info__description">
          {{ props.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface AvatarHeaderProps {
  avatar: string;
  name: string;
  description: string;
}
const props = withDefaults(defineProps<AvatarHeaderProps>(), {
  avatar: '',
  name: '',
  description: '',
});
</script>

<style lang="scss">
.component {
  .avatar-header {
    display: flex;
    align-items: center;
    .avatar-header__avatar {
      margin-right: 16px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .avatar-header__info {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      box-sizing: border-box;
      justify-content: space-around;
      .avatar-info__name {
        margin-bottom: 4px;
        color: #1a1a1a;
        font-weight: bolder;
      }
      .avatar-info__description {
        color: #666666;
      }
    }
  }
}
</style>
