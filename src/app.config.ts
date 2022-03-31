export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/serve/index',
    'pages/mine/index',
    'pages/mine/children/user/index',
    'pages/home/children/risk/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '疫情社区管理防控',
    navigationBarTextStyle: 'black',
    navigationStyle: 'default',
  },
  tabBar: {
    color: '#000',
    selectedColor: '#fa2c19',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/icons/home.png',
        selectedIconPath: './assets/icons/home-active.png',
      },
      {
        pagePath: 'pages/serve/index',
        text: '服务',
        iconPath: './assets/icons/serve.png',
        selectedIconPath: './assets/icons/serve-active.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './assets/icons/mine.png',
        selectedIconPath: './assets/icons/mine-active.png',
      },
    ],
  },
});
