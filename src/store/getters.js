const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  defaultAvatar: state => state.settings.defaultAvatar,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  login_visible: state => state.login.visible,
  login_username: state => state.login.username,
  login_password: state => state.login.password,
  data_selection: state => state.data.selection,
  data_collagedetail: state => state.data.collagedetail,
  data_loandetail: state => state.data.loandetail,
  data_busneissdetail: state => state.data.busneissdetail,
  data_newdetail: state => state.data.newdetail,
  data_policydetail: state => state.data.policydetail
}
export default getters
