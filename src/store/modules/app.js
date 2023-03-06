import Cookies from 'js-cookie'
const hashList = ['#/beijing', '#/shijingshan'];
let hash = window.location.hash;
for (let i = 0;i < hashList.length; i++) {
  if(hash.includes(hashList[i])) {
    hash = hashList[i];
    break;
  }
}
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  location: hash
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  CURRENT_LOCARION: (state, location) => {
    state.location = location;
  }
}

const actions = {
  // 切换
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 切换设备
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  changeLocation({ commit }, location) {
    commit('CURRENT_LOCARION', location)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
