import { reqGetGoodsInfo, reqAddOrUpdateCart } from "@/api";
import { get_uuid } from "@/utils/uuid_token";

const actions = {
  // 获取商品详情数据
  async getGoodsInfo({ commit }, skuid) {
    let result = await reqGetGoodsInfo(skuid);
    if (result.code == 200) {
      commit('GET_GOODS_INFO', result.data);
    }
  },
  // 添加购物车或更新商品数量
  async addShopCartOrUpdate(_, { skuId, skuNum }) {
    let result = await reqAddOrUpdateCart(skuId, skuNum);
    return new Promise((resolve, reject) => {
      if (result.code == 200){
        resolve('success');
      } else {
        reject('failed');
      }
    })
  }
};
const mutations = {
  GET_GOODS_INFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  }
};
const state = {
  goodsInfo: {},  // 商品详情数据
  uuid_token: get_uuid(),
};
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  }
};

// 对外暴露
export default {
  namespaced: 'detail',
  actions,
  mutations,
  state,
  getters
};