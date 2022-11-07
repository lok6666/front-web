import { accountLogin, codeLogin, logout, getUserInfo, register } from '@/api/user'
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { thirdLogin } from '@/api/user.js'
const state = {
  token: getAccessToken(),
  nickname: '',
  avatar: '',
  roles: [],
  userInfo: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  
  /**
   * 账号注册
   */
   register({ commit }, params) {
    return new Promise((resolve, reject) => {
      register(params).then(
        res => {
          const params = { username: this.username, password: this.password }
          new Promise(async(resolve, reject) => {
            try {
              await accountLogin(params);
              resolve()
            } catch (error) {
              this.loading = false
              console.error(error)
              reject(error)
            }
          })
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    })
  },

  /**
   * 账号登录
   */
  accountLogin({ commit }, params) {
    return new Promise((resolve, reject) => {
      accountLogin(params).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        window.localStorage.setItem('USERID', data.userId);
        location.reload();
        setAccessToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  /**
   * 第三方登录
   */
  thirdLogin({ commit }, params) {
    return new Promise((resolve, reject) => {
      thirdLogin(params).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setAccessToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  /**
   * 账号登录
   */
  codeLogin({ commit }, params) {
    return new Promise((resolve, reject) => {
      codeLogin(params).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setAccessToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response;
        if (!data) {
          reject('获取用户信息失败，请重新登录')
        }
        const { roles } = data
        // 角色列表校验
        if (!roles || roles.length <= 0) {
          reject('角色列表要求非null列表')
        }
        commit('SET_ROLES', roles)
        commit('SET_USER_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 退出
   */
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      const token = state.token
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER_INFO', '')
      window.localStorage.setItem('USERID', '');
      window.localStorage.setItem('userinfo', '');
      window.localStorage.setItem('selection-detail', '');
      window.localStorage.setItem('collage-detail', '');
      removeAccessToken()
      resetRouter()
      const params = {
        token: token
      }
      // logout(params).then(res => {
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  /**
   * 重置
   */
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER_INFO', '')
      removeAccessToken()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
