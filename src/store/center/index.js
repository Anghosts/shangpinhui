import { reqGetMyOrderInfo } from '@/api';

const actions = {
  // 获取我的订单列表
  async getMyOrderInfo({ commit }, { page, limit }) {
    let result = await reqGetMyOrderInfo(page, limit);
    if (result.code == 200) {
      commit('GET_MYORDER_INFO', result.data);
    }
  }
};
const mutations = {
  // 保存我的订单信息
  GET_MYORDER_INFO(state, myOrderInfo) {
    state.myOrderInfo = myOrderInfo;
  }
};
const state = {
  myOrderInfo: {},  // 我的订单信息
};
const getters = {
  orderList(state) {
    return state.myOrderInfo.records || [];
  },
  total(state) {
    return state.myOrderInfo.total || 0;
  }
};


// 对外暴露
export default {
  namespaced: 'center',
  actions,
  mutations,
  state,
  getters
};