<template>
  <view class="index">
    <div>{{ msg }}</div>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import './index.scss';
const msg = ref('Hello world');
</script>
