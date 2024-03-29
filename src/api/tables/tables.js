import request from '@/utils/request'
import { getDictList } from '@/api/system/dict'

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
  return getDictList({ type: 'level' })
}

export function getDictLeader(params) {
  return getDictList({ type: 'leader' })
}

export function getDictDept(params) {
  return getDictList({ type: 'dept' })
}

export function getDictDeptTree(params) {
  return getDictList({ type: 'deptTree' })
}
