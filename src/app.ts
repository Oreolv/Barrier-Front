import './app.scss';
import '/@/assets/font/iconfont.css';
import { createApp } from 'vue';
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
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
  Cell,
  CellGroup,
  Uploader,
  Progress,
  Popup,
  OverLay,
  Input,
  Empty,
  Divider,
  InfiniteLoading,
  Skeleton,
  Avatar,
  Tag,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Calendar,
  Checkbox,
  CheckboxGroup,
  Picker,
  Cascader,
  DatePicker,
  TextArea,
} from '@nutui/nutui-taro';
const pinia = createPinia();
const App = createApp({});
const NutComponent = [
  Button,
  SearchBar,
  Icon,
  Tabs,
  TabPane,
  Grid,
  GridItem,
  Table,
  Navbar,
  Cell,
  CellGroup,
  Uploader,
  Progress,
  Popup,
  OverLay,
  Input,
  Empty,
  Divider,
  InfiniteLoading,
  Skeleton,
  Avatar,
  Tag,
  Form,
  FormItem,
  Calendar,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Picker,
  Cascader,
  DatePicker,
  TextArea,
];

App.use(pinia);
NutComponent.forEach((component) => {
  App.use(component);
});

export default App;
