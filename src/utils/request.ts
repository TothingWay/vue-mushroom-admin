import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { getToken } from '@/utils/auth'

// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: '/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers!['token'] = getToken()!
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        const userStore = useUserStore()
        const { t } = useI18n()
        // to re-login
        ElMessageBox.confirm(t('login.confirmLogoutTips'), t('login.confirmLogout'), {
          confirmButtonText: t('login.confirmLogoutReLogin'),
          type: 'warning',
        }).then(() => {
          userStore.resetToken().then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
