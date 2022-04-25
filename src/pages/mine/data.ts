import { useUserStore } from '/@/store/users';
import { ShowToast } from '/@/hooks/useShowMessage';
import { navigateTo, showModal, switchTab } from '@tarojs/taro';

interface SettingItem {
  title: string;
  icon: string;
  click: (loginStatus: boolean) => void;
}

const userStore = useUserStore();

export const SettingList: SettingItem[] = [
  {
    title: '个人资料',
    icon: 'wode-gerenziliao',
    click: (loginStatus) => {
      if (loginStatus) {
        navigateTo({
          url: '/pages/mine/children/user/index',
          events: {},
        });
      } else {
        ShowToast.info('请先登陆');
      }
    },
  },
  {
    title: '账户设置',
    icon: 'wode-bangdingguanxi',
    click: (loginStatus) => {
      if (loginStatus) {
        navigateTo({
          url: '/pages/mine/children/setting/index',
          events: {},
        });
      } else {
        ShowToast.info('请先登陆');
      }
    },
  },
  {
    title: '分享应用',
    icon: 'fenxiang',
    click: () => {},
  },
  {
    title: '清除缓存',
    icon: 'shanchu',
    click: () => {
      showModal({
        title: '提醒',
        content: '清除缓存后需要重新登陆',
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            userStore.logoutAction('清除成功');
            setTimeout(() => {
              switchTab({
                url: '/pages/mine/index',
              });
            }, 1500);
          }
        },
      });
    },
  },
];
