import { setStorageSync, getStorageSync, removeStorageSync, clearStorageSync } from '@tarojs/taro';

export function setLocalCache(key: string, value: any) {
  setStorageSync(key, value);
}

export function getLocalCache(key: string) {
  return getStorageSync(key);
}

export function removeLocalCache(key: string) {
  removeStorageSync(key);
}

export function clearLocalCache() {
  clearStorageSync();
}
