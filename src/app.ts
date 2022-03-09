import { createApp } from 'vue';
import './app.scss';
import '@nutui/nutui-taro/dist/style.css';
import { createPinia } from 'pinia';
import { Button, SearchBar, Icon, Tabs, TabPane, Grid, GridItem, Table } from '@nutui/nutui-taro';
const pinia = createPinia();
const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
App.use(pinia);
App.use(Button).use(SearchBar).use(Icon).use(Tabs).use(TabPane).use(Grid).use(GridItem).use(Table);

export default App;
