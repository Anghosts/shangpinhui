import axios from 'axios';
// 引入进度条
import nProgress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';

// 二次封装axios
const requests = axios.create({
  baseURL: '/mock',
  timeout: 5000
});

// 添加请求拦截器
requests.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 进度条开始
  nProgress.start();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use((response) => {
  // 对响应数据做点什么
  // 进度条结束
  nProgress.done();
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 对外暴露
export default requests