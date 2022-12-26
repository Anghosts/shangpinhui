import { reqGetOrderPayInfo,reqGetPayStatus } from '@/api';

const actions = {
  // 获取订单支付信息
  async getOrderPayInfo({ commit }, orderId) {
    let result = await reqGetOrderPayInfo(orderId);
    if (result.code == 200) {
      commit('GET_ORDER_PAY_INFO', result.data);
    }
  },
  // 获取订单支付状态
  async getPayStatus(_, orderId) {
    return await reqGetPayStatus(orderId);
  }
};
const mutations = {
  // 保存订单支付信息
  GET_ORDER_PAY_INFO(state, orderPayInfo) {
    state.orderPayInfo = orderPayInfo
  }
};
const state = {
  orderPayInfo: {}  // 订单支付信息
};
const getters = {};

// 对外暴露
export default {
  namespaced: 'pay',
  actions,
  mutations,
  state,
  getters
};