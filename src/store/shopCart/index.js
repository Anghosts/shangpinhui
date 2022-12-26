import { reqGetShopCartList,reqDeleteShopCartList,reqUpdateCheck } from '@/api';

const actions = {
  // 获取用户购物车列表
  async getShopCartList({commit}) {
    let result = await reqGetShopCartList();
    if (result.code == 200) {
      commit('GET_SHOPCART_LIST', result.data);
    }
  },
  // 删除购物车中的某个商品
  async deleteShopCartList(_, skuId) {
    let result = await reqDeleteShopCartList(skuId);
    return new Promise((resolve, reject) => {
      if (result.code == 200){
        resolve('success');
      } else {
        reject('failed');
      }
    })
  },
  // 切换商品的选中状态
  async updateCheck(_, { skuId, isChecked }) {
    let result = await reqUpdateCheck(skuId, isChecked);
    return new Promise((resolve, reject) => {
      if (result.code == 200){
        resolve('success');
      } else {
        reject('failed');
      }
    })
  },
  // 删除选中的商品
  deleteCheckedAll({ dispatch, getters }) {
    let promiseAllList = [];
    getters.shopCartList.cartInfoList.forEach(item => {
      // 遍历被选中的商品
      if (item.isChecked == 1) {
        let promise = dispatch('deleteShopCartList', item.skuId);
        promiseAllList.push(promise);
      }
    })
    // 返回一个成功或者失败的Promise对象
    return Promise.all(promiseAllList);
  },
  // 全选或取消全选
  checkAll({ dispatch, getters }, isChecked) {
    let promiseAllList = [];
    isChecked = isChecked ? '1' : '0';
    getters.shopCartList.cartInfoList.forEach(item => {
      let promise = dispatch('updateCheck', { skuId: item.skuId, isChecked });
      promiseAllList.push(promise);
    })
    // 返回一个成功或者失败的Promise对象
    return Promise.all(promiseAllList);
  }
};
const mutations = {
  GET_SHOPCART_LIST(state, shopCartList) {
    state.shopCartList = shopCartList
  }
};
const state = {
  shopCartList: []  // 购物车数据
};
const getters = {
  shopCartList(state) {
    return state.shopCartList[0] || {};
  }
};

// 对外暴露
export default {
  namespaced: 'shopCart',
  actions,
  mutations,
  state,
  getters
};