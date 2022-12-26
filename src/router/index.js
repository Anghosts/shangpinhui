// 引入路由
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入仓库
import store from '@/store';
// 应用插件
Vue.use(VueRouter);

// 解决重复点击导航, 控制台报错的问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

// 引入路由组件
// import Home from '@/pages/Home';
// import Login from '@/pages/Login';
// import Register from '@/pages/Register';
// import Search from '@/pages/Search';
// import Detail from '@/pages/Detail';
// import AddCart from '@/pages/AddCart';
// import ShopCart from '@/pages/ShopCart';
// import Trade from '@/pages/Trade';
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';
// import MyOrder from '@/pages/Center/MyOrder';
// import GroupOrder from '@/pages/Center/GroupOrder';

// 配置路由
const router = new VueRouter({
  routes: [ 
    {
      // 重定向
      path: '/',
      redirect: '/home',
    },{
      path: '/home',
      component: ()=>import('@/pages/Home'),
    }, {
      path: '/login',
      component: ()=>import('@/pages/Login'),
      meta: {
        isHideFooter: true,
        isAuth: true
      }
    }, {
      path: '/register',
      component: ()=>import('@/pages/Register'),
      meta: {
        isHideFooter: true,
      }
    }, {
      // params 参数可传可不传 '/search/:keyword?'
      path: '/search/:keyword?',
      name: 'search',
      component: ()=>import('@/pages/Search'),
      // 独享路由守卫
      beforeEnter: (to, _, next) => {
        if (!to.query.pageNo) {
          to.query.pageNo = 1;
        }
        if (isNaN(to.query.pageNo * 1)) {
          to.query.pageNo = 1;
        }
        to.query.pageNo = parseInt(to.query.pageNo);
        next();
      }
    }, {
      path: '/detail/:id',
      name: 'detail',
      component: ()=>import('@/pages/Detail')
    }, {
      path: '/addcart',
      name: 'addCart',
      component: ()=>import('@/pages/AddCart'),
      meta: {
        isAuth: true
      }
    }, {
      path: '/shopcart',
      name: 'shopCart',
      component: ()=>import('@/pages/ShopCart'),
      meta: {
        isAuth: true
      }
    }, {
      path: '/trade',
      name: 'trade',
      component: ()=>import('@/pages/Trade'),
      meta: {
        isAuth: true
      }
    }, {
      path: '/pay',
      name: 'pay',
      component: ()=>import('@/pages/Pay'),
      meta: {
        isAuth: true
      }
    }, {
      path: '/paysuccess',
      component: ()=>import('@/pages/PaySuccess'),
      meta: {
        isAuth: true
      }

    }, {
      path: '/center',
      component: ()=>import('@/pages/Center'),
      meta: {
        isAuth: true
      },
      children: [
        {
          path: '',
          redirect: '/center/myorder'
        }, {
          path: 'myorder',
          component: ()=>import('@/pages/Center/MyOrder'),
          meta: {
            isAuth: true
          },
        }, {
          path: 'grouporder',
          component: ()=>import('@/pages/Center/GroupOrder'),
          meta: {
            isAuth: true
          },
        }
      ]
    }
  ],
  // 设置每次路由跳转后,回到页面顶部
  scrollBehavior() {
    return {y: 0}
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  store.dispatch('user/getUserInfo')
    .then(() => {
      // 是否登录
      let isLogin = store.state.user.isLogin;
      // 去的路由需要进行权限认证并且不是从 / 路由来的
      if (to.meta.isAuth) {
        // 已登录
        if (isLogin) {
          if (to.path === '/login') {
            next('/home');
          } else if (to.path === '/paysuccess' && from.path !== '/pay') {
            next(from.path);
          } else if (to.path === '/pay' && from.path !== '/trade') {
            next(from.path);
          } else if (to.path === '/trade' && from.path !== '/shopcart') {
            next(from.path)
          } else if (to.path === '/addcart' && from.name !== 'detail') {
            next(from.path)
          }
          else {
            next();
          }
        // 未登录
        } else {
          if (to.path === '/login') {
            next();
          } else if (to.path === '/addcart') {
            alert('您当前还未登录！无法添加购物车．')
          } else {
            next('/login?redirect=' + to.path );
          }
        }
      // 不需要进行权限认证
      } else {
        next();
      }
    })
    .catch((err) => {

    })
  
  
})

export default router;
