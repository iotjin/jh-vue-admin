import request from '@/utils/request'

// 查询列表
export function getUserList(params) {
  return request({
    url: '/v1/api/user/list',
    method: 'get',
    params: params
  })
}

// 新增、编辑
// 检查loginName重复
export function saveUser(data) {
  return request({
    url: '/v1/api/user/save',
    method: 'post',
    data: data
  })
}

// 新增
export function addUser(data) {
  return request({
    url: '/v1/api/user/save',
    method: 'post',
    data: data
  })
}

// 删除
// 不能删除自己的账户
export function deleteUser(data) {
  return request({
    url: '/v1/api/user/delete',
    method: 'post',
    data: data
  })
}

// 编辑
export function editUser(data) {
  return request({
    url: '/v1/api/user/save',
    method: 'post',
    data: data
  })
}

// 单条查询
export function getUserById(params) {
  return request({
    url: '/v1/api/user/',
    method: 'get',
    params: params
  })
}

// 重置密码
// 不能重置自己的密码
export function resetPwd(data) {
  return request({
    url: '/v1/api/user/resetPwd',
    method: 'post',
    data: data
  })
}

// 用户分配角色
// 先删除用户所有角色，再插入新勾选
// useId 用户id
// roleIds 角色id数组
export function assignRole(data) {
  return request({
    url: '/v1/api/user/assignRole',
    method: 'post',
    data: data
  })
}
