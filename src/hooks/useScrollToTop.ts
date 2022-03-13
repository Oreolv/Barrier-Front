import Taro from '@tarojs/taro';

export const scrollToTop = () => {
  Taro.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
};
