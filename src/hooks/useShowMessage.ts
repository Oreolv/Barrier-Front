import Taro, { showToast, showModal } from '@tarojs/taro';

type icon = 'success' | 'error' | 'loading' | 'none';
interface ModalParams {
  title: string;
  content: string;
  showCancel?: boolean;
  success?: any;
  fail?: any;
}

function toast(title: string, icon: icon, duration: number) {
  showToast({
    title: title,
    icon: icon,
    duration: duration,
  });
}

function modal(params: ModalParams) {
  showModal({
    title: params.title,
    content: params.content,
    showCancel: params.showCancel,
    success: params.success,
    fail: params.fail,
  });
}

function loading(title: string) {
  Taro.showLoading({
    title: title,
  });
}

export const ShowToast = {
  success: function (title) {
    toast(title, 'success', 1500);
  },
  error: function (title) {
    toast(title, 'error', 1500);
  },
  info: function (title) {
    toast(title, 'none', 1500);
  },
};

export const ShowModal = {
  info: function (params: ModalParams) {
    params.showCancel = false;
    modal(params);
  },
  confirm: function (params: ModalParams) {
    params.showCancel = true;
    modal(params);
  },
};

export const showLoading = {
  loading: function (title) {
    loading(title);
  },
  hideLoading: function () {
    Taro.hideLoading();
  },
};
