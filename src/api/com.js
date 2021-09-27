import request from '@/utils/request'

export function getData(params, api_name) {
  return request({
    url: '/'+api_name+'/list.do',
    method: 'get',
    params
  })
}

export function deleteData(data, api_name) {
  return request({
    url: '/'+api_name+'/delete.do',
    method: 'post',
    data
  })
}

export function updateData(data, api_name) {
  return request({
    url: '/'+api_name+'/edit.do',
    method: 'post',
    data
  })
}

export function addData(data, api_name) {
  return request({
    url: '/'+api_name+'/add.do',
    method: 'post',
    data
  })
}
