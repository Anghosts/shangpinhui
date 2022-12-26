import axios from 'axios';
// 引入进度条
import nProgress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
// 引入 store
import store from '@/store';

// 二次封装axios
const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
});

// 添加请求拦截器
requests.interceptors.request.use((config) => {
  // 进度条开始
  nProgress.start();
  // 设置用户临时身份请求头
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 设置token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use((response) => {
  // 进度条结束
  nProgress.done();
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 对外暴露
export default requests