const host = 'http://localhost:28191';
// 登录接口
export const login = `${host}/auth/login`

/*个人中心-宣传资料*/
export  const entInfoList = `${host}/entInfo/list` // 角色管理列表
export  const entInfoParent = `${host}/entInfo/parent` // 角色管理列表
export  const entInfoUpdate = `${host}/entInfo/update` // 角色更新
export  const entInfoDelete = `${host}/entInfo/delete` // 角色删除
export  const entInfoInsert = `${host}/entInfo/insert` // 角色插入
export  const entInfoGetById = `${host}/entInfo/get` // 角色插入

// 系统管理-系统日志
export  const sysLogSelectAll = `${host}/sysLog/selectAll` // 系统日志

// 系统管理-资源管理
export  const sysResourceList = `${host}/sysResource/list` // 资源管理列表 todo 接口返回有问题
export const treeTable = `${host}/sysResource/treeTable` // 树形结构
export const sysResourceInsert = `${host}/sysResource/insert` // 插入
export const sysResourceUpdate = `${host}/sysResource/update` // 更新
export const sysResourceDelete = `${host}/sysResource/delete` // 删除