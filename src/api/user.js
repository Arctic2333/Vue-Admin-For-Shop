import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUser(params) {
  return request({
    url: '/user/list.do',
    method: 'get',
    params
  })
}

export function updateUser(data) {
  return request({
    url: '/user/edit.do',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete.do',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add.do',
    method: 'post',
    data
  })
}
