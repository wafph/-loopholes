/**
 *
 * http配置
 * 
 */
// 引入axios以及element ui中的loading和message组件

import axios from 'axios'

import {
  Loading,
  Message
} from 'element-ui'
// 超时时间
 axios.defaults.timeout = 20000;
 axios.defaults.timeout = 0;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/'
let loadinginstace
let cfg, msg;
msg = '服务器君开小差了，请稍后再试';

//HTTPrequest拦截
axios.interceptors.request.use(function (config) {
  loadinginstace = Loading.service({
    fullscreen: true
  });
  return config
}, error => {
  return Promise.reject(error)
})


//HTTPresponse拦截
axios.interceptors.response.use(
  response => {
    loadinginstace.close();
    let res = response.data || {}
    return response
  },
  error => {
    console.log('错误信息', error)
    loadinginstace.close();
    const res = error.response 
    return Promise.reject(error)
  }
)
export function message(text, type) {
  Message({
    message: text,
    type: type,
    duration: 5 * 1000,
    center: true
  })
}
export default axios
