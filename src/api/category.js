import request from '@/utils/request'

export function getParentName(params) {
  return request({
    url: '/category/parentname.do',
    method: 'get',
    params
  })
}

export function getParentID(params) {
  return request({
    url: '/category/parentid.do',
    method: 'get',
    params
  })
}

export function insertParent(data) {
  return request({
    url: '/category/insert_parent.do',
    method: 'post',
    data
  })
}

export function insert(data) {
  return request({
    url: '/category/insert.do',
    method: 'post',
    data
  })
}
