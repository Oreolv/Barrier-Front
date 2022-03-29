import './app.scss';
import '/@/assets/font/iconfont.css';
import { createApp } from 'vue';
import '@nutui/nutui-taro/dist/style.css';
import { createPinia } from 'pinia';
import {
  Button,
  SearchBar,
  Icon,
  Tabs,
  TabPane,
  Grid,
  GridItem,
  Table,
  Navbar,
} from '@nutui/nutui-taro';
const pinia = createPinia();
const App = createApp({});
const NutComponent = [Button, SearchBar, Icon, Tabs, TabPane, Grid, GridItem, Table, Navbar];

App.use(pinia);
NutComponent.forEach((component) => {
  App.use(component);
});

export default App;
