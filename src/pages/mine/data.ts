import Taro from '@tarojs/taro';
interface SettingItem {
  title: string;
  icon: string;
  click?: () => void;
}
export const SettingList: SettingItem[] = [
  {
    title: '个人资料',
    icon: 'wode-gerenziliao',
    click: () => {
      Taro.navigateTo({
        url: '/pages/mine/children/user/index',
        events: {},
      });
    },
  },
  {
    title: '账户设置',
    icon: 'wode-bangdingguanxi',
    click: () => {},
  },
  {
    title: '分享应用',
    icon: 'fenxiang',
    click: () => {},
  },
];
