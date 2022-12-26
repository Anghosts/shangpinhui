import Vue from 'vue';
import Vuex from 'vuex';

import home from './home';
import search from './search';
import user from './user';
import detail from './detail';
import shopCart from './shopCart';
import trade from './trade';
import pay from './pay';
import center from './center';

// 应用插件
Vue.use(Vuex);

// 对外暴露
export default new Vuex.Store({
  modules: {
    home,
    search,
    user,
    detail,
    shopCart,
    trade,
    pay,
    center,
  }
})