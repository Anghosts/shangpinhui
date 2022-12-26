import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo,reqUserLogout } from "@/api";
import { getToken,setToken,removeToken } from '@/utils/token';

const actions = {
  // 获取验证码
  async getCode(_, phone) {
    let result = await reqGetCode(phone);
    return new Promise((resolve, reject) => {
      if (result.code == 200){
        resolve(result.data);
      } else {
        reject(result.message);
      }
    })
  },
  // 用户注册
  async userRegister(_, params = {}) {
    let result = await reqUserRegister(params);
    return new Promise((resolve, reject) => {
      if (result.code == 200){
        resolve('success');
      } else {
        reject(result.message);
      }
    })
  },
  // 用户登录
  async userLogin({commit}, params = {}) {
    let result = await reqUserLogin(params);
    return new Promise((resolve, reject) => {
      if (result.code == 200) {
        // 保存token
        commit('USER_LOGIN', result.data.token);
        // 持久化存储token
        setToken(result.data.token);
        resolve('success');
      } else {
        reject(result.message);
      }
    })
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo();
    let isLogin = false;
    if (result.code == 200) {
      isLogin = true;
    } else {
      console.log(result.message);
    }
    commit('GET_USER_INFO', {userInfo:result.data, isLogin});
  },
  // 退出登录
  async userLogout({commit}) {
    let result = await reqUserLogout();
    return new Promise((resolve, reject) => {
      if (result.code == 200) {
        // 清除用户信息
        commit('CLEAR_USER_DATA');
        // 清除token
        removeToken();
        resolve('success');
      } else {
        reject(result.message);
      }
    })
  }
};
const mutations = {
  // 保存token
  USER_LOGIN(state, token) {
    state.token = token;
  },
  // 保存用户信息
  GET_USER_INFO(state, {userInfo,isLogin}) {
    state.userInfo = userInfo;
    state.isLogin = isLogin;
  },
  // 退出登录清除用户信息
  CLEAR_USER_DATA(state) {
    state.isLogin = false,
    state.token = '',
    state.userInfo = {}
  }

};
const state = {
  token: getToken(),
  userInfo: {},       // 用户信息
  isLogin: false      // 是否登录
};
const getters = {};

// 对外暴露
export default {
  namespaced: 'user',
  actions,
  mutations,
  state,
  getters
};