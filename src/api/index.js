import requests from './ajax';
import mockRequsts from './mockAjax';

// 三级联动接口 TypeNav
export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 轮播图 banner
export const reqGetBannerList = () => {
  return mockRequsts.get('/banner');
}

// floor
export const reqGetFloorList = () => {
  return mockRequsts.get('/floor');
}

// SearchSelector
export const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params,
  })
}

// 获取商品详情数据
export const reqGetGoodsInfo = (skuid) => {
  return requests({
    url: `/item/${skuid}`,
    method: 'get'
  })
}

// 添加购物车和更新购物车
export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

// 获取用户购物车列表
export const reqGetShopCartList = () => {
  return requests({
    url: '/cart/cartList',
    method: 'get'
  }) 
}

// 删除购物车中的某个商品
export const reqDeleteShopCartList = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}

// 切换商品选中状态
export const reqUpdateCheck = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}

// 获取注册验证码
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}

// 用户注册
export const reqUserRegister = (params) => {
  return requests({
    url: '/user/passport/register',
    method: 'post',
    data: params
  })
}

// 用户登录
export const reqUserLogin = (params) => {
  return requests({
    url: '/user/passport/login',
    method: 'post',
    data: params
  })
}

// 获取用户数据
export const reqGetUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })
}

// 退出登录
export const reqUserLogout = () => {
  return requests({
    url: '/user/passport/logout',
    method: 'get'
  })
}

// 获取订单交易页信息
export const reqGetOrderInfo = () => {
  return requests({
    url: '/order/auth/trade',
    method: 'get'
  })
}

// 获取订单提交页信息
export const reqSubmitOrder = (tradeNo, params) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data: params
  })
}

// 获取订单支付信息
export const reqGetOrderPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
}

// 获取订单支付状态
export const reqGetPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
}

// 获取我的订单列表
export const reqGetMyOrderInfo = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
  })
}
