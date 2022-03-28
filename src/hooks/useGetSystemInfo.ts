import Taro from '@tarojs/taro';

const systemInfo = Taro.getSystemInfoSync();
const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();

export function getNavBarHeigtht() {
  return `${
    (menuButtonInfo.top - systemInfo.statusBarHeight!) * 2 +
    menuButtonInfo.height +
    systemInfo.statusBarHeight!
  }px`;
}

export function getNavBarTop() {
  return `${menuButtonInfo.top}px`; // 减去组件自带的padding
}
export function getMenuButtonHeight() {
  return `${menuButtonInfo.height}px`;
}
export function getSearchBarWidth() {
  return `${menuButtonInfo.right - menuButtonInfo.width}px`;
}
export function getSearchBarHeight() {
  return `${(menuButtonInfo.top - systemInfo.statusBarHeight!) * 2 + menuButtonInfo.height}px`;
}
