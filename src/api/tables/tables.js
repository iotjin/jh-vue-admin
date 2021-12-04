import request from '@/utils/request'

export function getListData(params) {
  return request({
    url: '/v1/api/table/list',
    method: 'get',
    params: params
  })
}

export function addData(params) {
  return request({
    url: '/v1/api/table/save',
    method: 'post',
    params: params
  })
}

export function deleteData(params) {
  return request({
    url: '/v1/api/table/delete',
    method: 'post',
    params: params
  })
}

export function editData(params) {
  return request({
    url: '/v1/api/table/save',
    method: 'post',
    params: params
  })
}

export function getDataById(params) {
  return request({
    url: '/v1/api/table/' + params,
    method: 'get'
  })
}

// 导出
export function exportById(params) {
  return request({
    url: '/v1/api/table/' + params,
    data: 'get',
    responseType: 'blob'
  })
}

export function getDictLevel(params) {
  return request({
    url: '/v1/api/dict/level',
    method: 'get',
    params
  })
}

export function getDictLeader(params) {
  return request({
    url: '/v1/api/dict/leader',
    method: 'get',
    params
  })
}

export function getDictDept(params) {
  return request({
    url: '/v1/api/dict/dept',
    method: 'get',
    params
  })
}

export function getDictDeptTree(params) {
  return request({
    url: '/v1/api/dict/tree',
    method: 'get',
    params
  })
}
