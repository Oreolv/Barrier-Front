<template>
  <div id="infiniteLoading">
    <nut-infiniteloading
      is-open-refresh
      containerId="infiniteLoading"
      :use-window="false"
      :has-more="state.hasMore"
      @load-more="loadMore"
      @refresh="refresh"
      pull-txt=""
      load-more-txt="已经到底啦"
      pull-icon="loading"
      load-icon="loading"
    >
      <slot name="content"></slot>
    </nut-infiniteloading>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const props = defineProps({
  name: {
    type: String,
    require: true,
  },
  api: {
    type: Function,
    require: true,
  },
  pageSize: {
    type: Number,
    default: 15,
    require: true,
  },
});

const emit = defineEmits(['load', 'refresh']);

const state = reactive({
  page: 1,
  pageSize: props.pageSize,
  hasMore: true,
});

const loadMore = async (done) => {
  state.page = state.page + 1;
  const data = await props.api!({ page: state.page, pageSize: state.pageSize });
  emit('load', props.name, data);
  if (data.rows.length === 0) {
    state.hasMore = false;
  }
  done();
};

const refresh = (done) => {
  emit('refresh', props.name, props.api, props.pageSize);
  done();
};
</script>

<style>
.nut-infinite-bottom {
  padding-top: 0 !important;
  padding-bottom: 16px;
}
</style>
