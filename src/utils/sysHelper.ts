/*
 * @name: 系统辅助工具函数
 * @Author: wei.wang
 * @Date: 2022-08-09 15:33:03
 * @LastEditors: wei.wang
 * @LastEditTime: 2022-08-09 16:42:04
 */
import { useStorage } from '@vueuse/core'

// 获取系统语言
export function getLanguage() {
  // 获取浏览器默认语言，截取前2位字符
  const sysLang = (navigator.language || navigator.userLanguage).substr(0, 2)
  // 当前设置的语言
  const currentLang = useStorage('language', sysLang, sessionStorage)

  return currentLang.value
}
