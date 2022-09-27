  const state = {
    selection: [],
    collagedetail: {},
    loandetail: {}
  }
  
  const mutations = {
    SET_SELECTION: (state, value) => {
      state.selection = value
    },
    SET_COLLAGEDEIL: (state, value) => {
      state.collagedetail = value
    },
    SET_LOANDETAIL: (state, value) => {
      state.loandetail = value
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
    },
    collagedetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_COLLAGEDEIL', params)
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    setLoanDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_LOANDETAIL', params)
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
  