import { reqGetSearchInfo } from '@/api';

const actions = {
  // 获取 searchInfo 数据
  async getSearchInfo({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit('GET_SEARCH_INFO', result.data);
    }
  }
};
const mutations = {
  // 保存 searchInfo 数据
  GET_SEARCH_INFO(state, searchInfo) {
    state.searchInfo = searchInfo;
  }
};
const state = {
  searchInfo: {},   // 搜索信息
};
const getters = {
  goodsList(state) {
    return state.searchInfo.goodsList || [];
  },
  attrsList(state) {
    return state.searchInfo.attrsList || [];
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || [];
  },
  total(state) {
    return state.searchInfo.total;
  }
};

// 对外暴露
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
};