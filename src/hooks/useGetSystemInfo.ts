import {
  NodesRef,
  getSystemInfoSync,
  getMenuButtonBoundingClientRect,
  createSelectorQuery,
} from '@tarojs/taro';

const systemInfo = getSystemInfoSync();
const menuButtonInfo = getMenuButtonBoundingClientRect();

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

/**
 * @param node 传入元素选择器, 如#id .class
 */
export function getNodePositionInfo(node: string) {
  const query = createSelectorQuery().select(node).boundingClientRect();
  return new Promise<NodesRef.BoundingClientRectCallbackResult>((resolve) => {
    query.exec((res) => {
      resolve(res[0]);
    });
  });
}
