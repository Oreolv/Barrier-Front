<template>
  <div class="item">
    <div class="item-add">
      <div class="item-add-des">较上日</div>
      <div class="item-add-text">{{ add }}</div>
    </div>
    <div class="item-today">{{ today }}</div>
    <div class="item-des"><slot></slot></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: String,
  add: Number,
  today: Number,
});

const style = {
  localConfirm: {
    text: '#e57631',
    background: '#fffaf7',
  },
  confirm: {
    text: '#be2121',
    background: '#fff4f4',
  },
  importedCase: {
    text: '#4e8be6',
    background: '#f1f5ff',
  },
  noInfect: {
    text: '#ae3ac6',
    background: '#fef7ff',
  },
  nowConfirm: {
    text: '#e61c1d',
    background: '#fff8f8',
  },
  dead: {
    text: '#4e5a65',
    background: '#f3f6f8',
  },
};

const textColor = style[props.type!].text;
// const backgroundColor = style[props.type!].background;
</script>

<style lang="scss">
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding: 5px;
  .item-add {
    display: flex;
    align-items: flex-end;
    color: #7c7c7c;
    font-size: 12px;
    .item-add-text {
      color: v-bind(textColor);
    }
  }
  .item-today {
    color: v-bind(textColor);
    font-weight: bold;
    font-size: 24px;
    margin: 4px 0;
  }
  .item-des {
    color: #222;
    font-size: 14px;
  }
}
</style>
