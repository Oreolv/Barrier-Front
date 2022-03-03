import { createApp } from 'vue';
import './app.scss';
import '@nutui/nutui-taro/dist/style.css';
import { createPinia } from 'pinia';
import { Button } from '@nutui/nutui-taro';

const pinia = createPinia();
const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
App.use(Button).use(pinia);

export default App;
