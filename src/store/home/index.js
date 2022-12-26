import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

const actions = {
  // 获取三级菜单的数据
  async categoryList({commit}) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('CATEGORY_LIST', result.data);
    }
  },
  // 获取轮播图的数据
  async getBannerList({commit}) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit('GET_BANNER_LIST', result.data);
    }
  },
  // 获取 floor 的数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      commit('GET_FLOOR_LIST', result.data);
    }
  },
};
const mutations = {
  // 保存数据三级菜单的数据
  CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 15);
  },
  // 保存轮播图的数据
  GET_BANNER_LIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  // 保存floor的数据
  GET_FLOOR_LIST(state, floorList) {
    state.floorList = floorList;
  },
};
const state = {
  categoryList: [],   // 三级菜单
  bannerList: [],     // 轮播图
  floorList: [],      // floor
};
const getters = {};

// 对外暴露
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
};