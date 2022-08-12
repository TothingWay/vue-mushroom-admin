import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: `/api/get`,
    method: 'get',
  })
}
