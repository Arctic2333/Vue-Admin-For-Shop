import request from '@/utils/request'

export function getPayinfo(params) {
  return request({
    url: '/payinfo/list.do',
    method: 'get',
    params
  })
}

export function deletePayinfo(data) {
  return request({
    url: '/payinfo/delete.do',
    method: 'post',
    data
  })
}

export function updatePayinfo(data) {
  return request({
    url: '/payinfo/edit.do',
    method: 'post',
    data
  })
}

export function addPayinfo(data) {
  return request({
    url: '/payinfo/add.do',
    method: 'post',
    data
  })
}
