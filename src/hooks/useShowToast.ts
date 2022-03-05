import Taro from '@tarojs/taro';

export const SuccessToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'success',
    duration: 1500,
  });
};

export const ErrorToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'error',
    duration: 1500,
  });
};

export const LoadingToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'loading',
    duration: 1500,
  });
};

export const NoneToast = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: 'none',
    duration: 1500,
  });
};
