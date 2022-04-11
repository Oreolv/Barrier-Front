import { pageScrollTo } from '@tarojs/taro';

export const scrollToTop = () => {
  pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
};
