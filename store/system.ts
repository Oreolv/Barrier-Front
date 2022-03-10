import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';
export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      systemInfo: {} as getWindowInfo.Result,
      menuButtonInfo: {} as getMenuButtonBoundingClientRect.Rect,
    };
  },
  getters: {
    getNavBarHeigtht() {
      return `${
        (this.menuButtonInfo.top - this.systemInfo.statusBarHeight) * 2 +
        this.menuButtonInfo.height +
        this.systemInfo.statusBarHeight
      }px`;
    },
    getNavBarTop() {
      return `${this.menuButtonInfo.top - 9}px`; // 减去组件自带的padding
    },
    getMenuButtonHeight() {
      return `${this.menuButtonInfo.height}px`;
    },
    getSearchBarWidth() {
      return `${this.menuButtonInfo.right - this.menuButtonInfo.width}px`;
    },
  },
  actions: {
    getSystemInfo() {
      const ret = Taro.getSystemInfoSync();
      this.systemInfo.statusBarHeight = ret.statusBarHeight;
    },
    getMenuButtonInfo() {
      const ret = Taro.getMenuButtonBoundingClientRect();
      this.menuButtonInfo.width = ret.width;
      this.menuButtonInfo.height = ret.height;
      this.menuButtonInfo.top = ret.top;
      this.menuButtonInfo.left = ret.left;
      this.menuButtonInfo.right = ret.right;
      this.menuButtonInfo.bottom = ret.bottom;
    },
    getAllInfo() {
      this.getSystemInfo();
      this.getMenuButtonInfo();
    },
  },
});
