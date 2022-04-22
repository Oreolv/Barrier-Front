export default defineAppConfig({
  pages: ['pages/home/index', 'pages/report/index', 'pages/discover/index', 'pages/mine/index'],
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
      root: 'pages/discover/children',
      pages: ['suggestion/index'],
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
        pagePath: 'pages/discover/index',
        text: '发现',
        iconPath: './assets/icons/discover.png',
        selectedIconPath: './assets/icons/discover-active.png',
      },
      {
        pagePath: 'pages/report/index',
        text: '报备',
        iconPath: './assets/icons/report.png',
        selectedIconPath: './assets/icons/report-active.png',
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
