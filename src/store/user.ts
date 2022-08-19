import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { userInfoType } from './types'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    roles: [],
  }),
  actions: {
    // 登录
    login(userInfo: userInfoType) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response
            console.log(data)

            this.token = data.token
            setToken(data.token)
            resolve(data.token)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise<any>((resolve, reject) => {
        getUserInfo(this.token!)
          .then((response) => {
            const { data } = response

            if (!data) {
              reject('验证失败，请重新登录.')
            }

            const { roles, name } = data

            // roles 必须是非空数组
            if (!roles || roles.length <= 0) {
              reject('getInfo: roles 必须是非空数组!')
            }

            this.roles = roles
            this.name = name
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    resetToken() {
      return new Promise<void>((resolve) => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve()
      })
    },
  },
})
