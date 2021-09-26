import request from '@/utils/request'

export function getCart(params) {
  return request({
    url: '/cart/list.do',
    method: 'get',
    params
  })
}

export function deleteCart(data) {
  return request({
    url: '/cart/delete.do',
    method: 'post',
    data
  })
}

export function updateCart(data) {
  return request({
    url: '/cart/edit.do',
    method: 'post',
    data
  })
}

export function addCart(data) {
  return request({
    url: '/cart/add.do',
    method: 'post',
    data
  })
}
