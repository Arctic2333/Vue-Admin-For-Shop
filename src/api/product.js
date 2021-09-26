import request from '@/utils/request'

export function getTable(params) {
  return request({
    url: '/product/list.do',
    method: 'get',
    params
  })
}

export function deletePro(data) {
  return request({
    url: '/product/delete.do',
    method: 'post',
    data
  })
}

export function updatePro(data) {
  return request({
    url: '/product/edit.do',
    method: 'post',
    data
  })
}

export function addProduct(data) {
  return request({
    url: '/product/add.do',
    method: 'post',
    data
  })
}
