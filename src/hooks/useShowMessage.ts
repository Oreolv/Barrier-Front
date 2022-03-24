import Taro from '@tarojs/taro';

type icon = 'success' | 'error' | 'loading' | 'none';
interface ModalParams {
  title: string;
  content: string;
  showCancel?: boolean;
  success?: Function;
  fail?: Function;
}

function toast(title: string, icon: icon, duration: number) {
  Taro.showToast({
    title: title,
    icon: icon,
    duration: duration,
  });
}

function modal(params: ModalParams) {
  Taro.showModal({
    title: params.title,
    content: params.content,
    showCancel: params.showCancel,
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
