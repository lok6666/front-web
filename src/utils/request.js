import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getAccessToken } from '@/utils/auth'
const errorType = (code) => {
  if(code.startsWith('30')) {
    return 'warning';
  } else {
    return 'error';
  }

};
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加请求头
    if (store.getters.token) {
      config.headers['Access-Control-Allow-Origin'] = "*";
      config.headers['Authorization'] = getAccessToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 从新登录
    if(res.code === '4003') {
      store.commit('login/CHANGE_VISIBLE', true)
      store.dispatch('user/resetToken')
      window.localStorage.setItem('USERID', '');
      window.localStorage.setItem('userinfo', '');
      window.localStorage.setItem('selection-detail', '');
      window.localStorage.setItem('collage-detail', '');
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    else if (res.code !== 0 && res.code !== '2000') {
      // 凭证无效或过期
      if (res.code === 1006 || res.code === 1009) {
        store.dispatch('user/resetToken')
        MessageBox.confirm('登录信息已过期', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          location.reload()
        }).catch(() => {
          location.reload()
        })  
      } else {
        // 其他
        Message({
          message: res.msg || 'Error',
          type: errorType(String(res.code)),
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return {code: 0, message: 'suc'}
    // return Promise.reject(error)
  }
)

export default service
