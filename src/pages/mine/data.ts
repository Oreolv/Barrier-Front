import Taro from '@tarojs/taro';
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
        Taro.navigateTo({
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
    click: (loginStatus) => {},
  },
  {
    title: '分享应用',
    icon: 'fenxiang',
    click: () => {},
  },
];
