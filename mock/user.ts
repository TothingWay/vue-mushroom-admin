import { MockMethod } from 'vite-plugin-mock'

const tokens = {
  admin: {
    token: 'admin-token',
  },
  visitor: {
    token: 'visitor-token',
  },
}

const users = {
  'admin-token': {
    roles: ['admin'],
    name: 'Admin',
  },
  'visitor-token': {
    roles: ['editor'],
    name: 'visitor',
  },
}

export default [
  {
    url: '/user/login',
    method: 'get',
    response: ({ body }) => {
      const { username, password } = body
      const token = tokens[username]
      if (!token || password !== '123456') {
        return {
          code: 60204,
          message: '账号或密码错误',
        }
      }
      return {
        code: 200,
        data: {
          token,
        },
      }
    },
  },
  {
    url: '/user/info',
    method: 'get',
    response: ({ query }) => {
      const { token } = query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息',
        }
      }

      return {
        code: 200,
        data: info,
      }
    },
  },
] as MockMethod[]
