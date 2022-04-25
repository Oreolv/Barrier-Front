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
  Table,
  Navbar,
  Cell,
  CellGroup,
  Uploader,
  Popup,
  OverLay,
  Input,
  Empty,
  Divider,
  InfiniteLoading,
  Skeleton,
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
  ImagePreview,
  Avatar,
} from '@nutui/nutui-taro';
const pinia = createPinia();
const App = createApp({});
const NutComponent = [
  Button,
  SearchBar,
  Icon,
  Tabs,
  TabPane,
  Table,
  Navbar,
  Cell,
  CellGroup,
  Uploader,
  Popup,
  OverLay,
  Input,
  Empty,
  Divider,
  InfiniteLoading,
  Skeleton,
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
  ImagePreview,
  Avatar,
];

App.use(pinia);
NutComponent.forEach((component) => {
  App.use(component);
});

export default App;
