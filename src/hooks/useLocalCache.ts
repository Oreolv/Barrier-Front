import Taro from '@tarojs/taro';

export function setLocalCache(key: string, value: string) {
  Taro.setStorageSync(key, value);
}

export function getLocalCache(key: string) {
  Taro.getStorageSync(key);
}

export function removeLocalCache(key: string) {
  Taro.removeStorageSync(key);
}

export function clearLocalCache() {
  Taro.clearStorageSync();
}
