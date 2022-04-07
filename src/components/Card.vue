<template>
  <div class="card" :style="{ marginTop: props.marginTop + 'px' }">
    <div class="card-head">
      <div class="card-head__description" v-if="props.description">
        <div class="card-head__description-name">
          {{ props.description }}
        </div>
        <div class="card-head__description-icon">
          <slot name="icon"></slot>
        </div>
      </div>
      <div class="card-head__title">
        {{ props.title }}
      </div>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface CardProps {
  title?: string;
  description?: string;
  showDivider?: boolean;
  marginTop?: string;
}
const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  description: '',
  showDivider: false,
  marginTop: '0',
});
</script>
<style lang="scss">
.card {
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .card-head {
    .card-head__description {
      display: flex;
      margin-bottom: 8px;
      align-items: center;
      justify-content: space-between;
      .card-head__description-name {
        font-size: 14px;
        color: #909399;
      }
    }
    .card-head__title {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
}
</style>
