import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login.do',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info.do',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout.do',
    method: 'post'
  })
}
