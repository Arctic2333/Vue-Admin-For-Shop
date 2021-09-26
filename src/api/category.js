import request from '@/utils/request'

export function getTable(params) {
  return request({
    url: '/category/list.do',
    method: 'get',
    params
  })
}

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

export function update(data) {
  return request({
    url: '/category/update.do',
    method: 'post',
    data
  })
}

export function deleteC(data) {
  return request({
    url: '/category/delete.do',
    method: 'post',
    data
  })
}

export function insertParent(data) {
  return request({
    url: '/category/insertparent.do',
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
