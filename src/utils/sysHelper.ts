import { useStorage } from '@vueuse/core'
import axios from 'axios'

const config = useStorage<ImportMetaEnv>('config', {} as ImportMetaEnv)
// 获取系统默认配置
export function getConfig(key: string) {
  const cfg: ImportMetaEnv = config.value
  return cfg[key]
}
// 动态获取 /public 下的 config.json 配置，便于打包后修改，将会覆盖 import.meta.env 中的环境变量
export function getSysConfig(): Promise<any> {
  return axios({
    baseURL: '',
    method: 'get',
    url: `${import.meta.env.BASE_URL}config.json`,
  })
    .then(({ data }) => {
      const filterEnv = Object.keys(import.meta.env)
        .filter((key) => key.indexOf('VITE_') > -1)
        .reduce((obj: ImportMetaEnv, key) => {
          obj[key] = import.meta.env[key]
          return obj
        }, {} as ImportMetaEnv)
      config.value = Object.assign(filterEnv, data)
      return config.value
    })
    .catch(() => {
      throw 'Add the config.json configuration file to the public folder.'
    })
}

// 获取系统语言
export function getLanguage() {
  // 获取浏览器默认语言，截取前2位字符
  const sysLang = navigator.language.substring(0, 2)

  // 当前设置的语言
  const currentLang = useStorage('language', sysLang, sessionStorage)

  return currentLang.value
}
