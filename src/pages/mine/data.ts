import { navigateTo } from '@tarojs/taro';
import { ShowToast } from '/@/hooks/useShowMessage';
interface SettingItem {
  title: string;
  icon: string;
  click: (loginStatus: boolean) => void;
}
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
];
