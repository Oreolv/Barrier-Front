<template>
  <div class="component">
    <div class="discuss">
      <AvatarHeader
        :avatar="props.avatar || undefined"
        :name="props.name"
        :description="props.description"
      />
      <div class="discuss-content">
        {{ props.content }}
      </div>
      <div class="discuss-footer">
        <div class="discuss-footer__tag" v-if="props.type">
          <nut-icon name="check-checked"></nut-icon>
          <div class="discuss-footer__tag-name">{{ props.type }}</div>
        </div>
        <slot name="tag"></slot>
        <div class="discuss-footer__time">{{ transformDate(props.time) }}</div>
      </div>
    </div>
    <div class="reply" v-if="props.replyCont">
      <AvatarHeader
        :avatar="props.replyAvat || undefined"
        :name="props.replyName"
        :description="props.replyDesc"
      />
      <div class="reply-content">
        <div class="reply-content__text">
          {{ props.replyCont }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { transformDate } from '/@/hooks/useTransformData';
import AvatarHeader from '/@/components/AvatarHeader.vue';

interface AvatarHeaderProps {
  avatar: string;
  name: string;
  description: string;
  content: string;
  time: string;
  type?: string;
  replyAvat?: string;
  replyName?: string;
  replyDesc?: string;
  replyCont?: string;
}
const props = withDefaults(defineProps<AvatarHeaderProps>(), {
  avatar: '',
  name: '',
  description: '',
  content: '',
  time: '',
});
</script>

<style lang="scss">
.component {
  .discuss {
    padding: 16px 0 8px 0;
    border-bottom: 1px solid #f1f1f1;
    .discuss-content {
      white-space: pre-line;
      line-height: 24px;
      margin-top: 16px;
      font-size: 14px;
    }
    .discuss-footer {
      margin-top: 12px;
      font-size: 12px;
      display: flex;
      align-items: center;
      .discuss-footer__time {
        color: #7c7c7c;
        flex: 1;
        text-align: end;
      }
    }
    .discuss-footer__tag {
      display: flex;
      align-items: center;
      border: 1px solid #f1f1f1;
      border-radius: 16px;
      padding: 2px 8px 3px 6px;
      .discuss-footer__tag-name {
        color: #7c7c7c;
        margin-left: 4px;
      }
    }
  }

  .reply {
    padding: 16px;
    margin-top: 8px;
    background-color: #f5f5f5;
    .reply-content {
      margin-top: 12px;
      font-size: 12px;
      border: 1px solid #f1f1f1;
      .reply-content__time {
        text-align: right;
      }
    }
  }
}
</style>
