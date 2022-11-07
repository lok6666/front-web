  const state = {
    selection: [],
    collagedetail: {},
    loandetail: {},
    busneissdetail: {},
    newdetail: {},
    policydetail: {}
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
    },
    SET_BUSNEISSDETAIL: (state, value) => {
      state.busneissdetail = value
    },
    SET_NEWDETAIL: (state, value) => {
      state.newdetail = value
    },
    SET_POLICYDETAIL: (state, value) => {
      state.policydetail = value
    },
  }
  
  const actions = {
    setSelection({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_SELECTION', params);
        window.localStorage.setItem('selection-detail', JSON.stringify(params));
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    collagedetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        console.log('collagedetail--', params);
        commit('SET_COLLAGEDEIL', params);
        window.localStorage.setItem('collage-detail', JSON.stringify(params));
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    setLoanDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_LOANDETAIL', params);
        window.localStorage.setItem('loan-detail', JSON.stringify(params));
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
/*     setBuildDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        // commit('SET_LOANDETAIL', params);
        window.localStorage.setItem('building-detail', JSON.stringify(params));
        resolve()
      }).catch(error => {
        reject(error)
      })
    }, */
    setNewDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_NEWDETAIL', params);
        window.localStorage.setItem('new-detail', JSON.stringify(params));
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    etPolicyDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_POLICYDETAIL', params);
        window.localStorage.setItem('policy-detail', JSON.stringify(params));
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    setBusneissDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_BUSNEISSDETAIL', params);
        window.localStorage.setItem('busneiss-detail', JSON.stringify(params));
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
  