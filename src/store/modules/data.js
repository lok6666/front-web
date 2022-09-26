  const state = {
    selection: []
  }
  
  const mutations = {
    SET_SELECTION: (state, value) => {
      state.selection = value
    }
  }
  
  const actions = {
    setSelection({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_SELECTION', params)
        resolve()
      }).catch(error => {
        reject(error)
      })
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  