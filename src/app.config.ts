export default defineAppConfig({
  pages: ['pages/home/index', 'pages/serve/index', 'pages/mine/index'],
  subpackages: [
    {
      root: 'pages/mine/children',
      pages: ['user/index', 'setting/index'],
    },
    {
      root: 'pages/home/children',
      pages: ['risk/index', 'news/index'],
    },
    {
      root: 'pages/serve/children',
      pages: [
        'visitor/index',
        'visitor/create/index',
        'trip/index',
        'trip/create/index',
        'back/index',
        'back/create/index',
        'abnormal/index',
        'abnormal/create/index',
        'suggestion/index',
        'suggestion/create/index',
        'health/index',
        'health/create/index',
        'material/index',
        'agency/index',
      ],
    },
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
    selectedColor: '#1a1a1a',
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
