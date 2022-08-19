import request from '@/utils/request'

export function login(data: object) {
  return request({
    url: `/user/login`,
    method: 'post',
    data,
  })
}

export function getUserInfo(token: string) {
  return request({
    url: `/user/info`,
    method: 'get',
    params: { token },
  })
}

export function getMenu() {
  return request({
    url: `/user/routes`,
    method: 'get',
  })
}
