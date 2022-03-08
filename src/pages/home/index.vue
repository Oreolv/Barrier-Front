<template>
  <SearchBar></SearchBar>
  <nut-tabs v-model="tabValue" background="#FFF" title-gutter="15">
    <nut-tabpane title="疫情资讯"> Tab 1 </nut-tabpane>
    <nut-tabpane title="防疫知识"> Tab 2 </nut-tabpane>
    <nut-tabpane title="社区公告"> Tab 3 </nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchBar from '../../component/SearchBar';
import './index.scss';
const tabValue = ref(0);
</script>
