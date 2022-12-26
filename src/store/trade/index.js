import { reqGetOrderInfo,reqSubmitOrder } from '@/api';

const actions = {
  // 获取订单交易页信息
  async getOrderInfo({commit}) {
    let result = await reqGetOrderInfo();
    if (result.code == 200) {
      commit('GET_ORDER_INFO', result.data);
    }
  },
  // 提交订单
  async submitOrder(_, {tradeNo, params}) {
    let result = await reqSubmitOrder(tradeNo, params);
    return new Promise((resolve, reject) => {
      if (result.code == 200) {
        resolve(result.data);
      } else {
        reject(result.message);
      }
    })
  }
};
const mutations = {
  // 保存订单交易页信息
  GET_ORDER_INFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  }
};
const state = {
  orderInfo: {}   // 订单交易页信息
};
const getters = {
  userAddressList(state) {
    return state.orderInfo.userAddressList || [];
  },
  detailArrayList(state) {
    return state.orderInfo.detailArrayList || [];
  }
};

// 对外暴露
export default {
  namespaced: 'trade',
  actions,
  mutations,
  state,
  getters
};