<template>
  <view class="index">
    <div>{{ msg }}</div>
    <nut-button type="primary" block @click="tip">主要按钮</nut-button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import './index.scss';
const msg = ref('Hello world');
const tip = () => {
  console.log('tip');
};
</script>
