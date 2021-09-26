import request from '@/utils/request'

export function getOrder(params) {
  return request({
    url: '/order/list.do',
    method: 'get',
    params
  })
}

export function deleteOrder(data) {
  return request({
    url: '/order/delete.do',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: '/order/edit.do',
    method: 'post',
    data
  })
}

export function addOrder(data) {
  return request({
    url: '/order/add.do',
    method: 'post',
    data
  })
}
