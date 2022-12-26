import Vue from 'vue';
import App from './App.vue';
// 引入elementUi
import { Carousel, CarouselItem, MessageBox, Button,Form,FormItem,Input } from 'element-ui';
// 引入 vue-lazyload
import VueLazyload from 'vue-lazyload'

// 引入路由
import router from "./router";
// 引入全局组件
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
// 引入vuex
import store from '@/store';
// 启用 Mockjs
import '@/mock/mockServer';
// 引入 swiprt.css
// import 'swiper/css/swiper.css';
// 引入 element-ui.css
import 'element-ui/lib/theme-chalk/index.css';
// 引入图片加载时的图片
import load from '@/assets/load.gif';

Vue.config.productionTip = false;
// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);

// Vue.use(ElementUi);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.use(VueLazyload, {
  loading: load,
})

new Vue({
  router,
  store,
  render: h => h(App),
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app');
