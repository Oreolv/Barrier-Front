const path = require('path');
const config = {
  projectName: 'Barrier-Front',
  date: '2022-3-1',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html', 'taro-plugin-pinia'],
  scss: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  alias: {
    '/@/api': path.resolve(__dirname, '..', 'src/api'),
    '/@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '/@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '/@/store': path.resolve(__dirname, '..', 'src/store'),
    '/@/model': path.resolve(__dirname, '..', 'src/model'),
    '/@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '/@/components': path.resolve(__dirname, '..', 'src/components'),
  },
  framework: 'vue3',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
