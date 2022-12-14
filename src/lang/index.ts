/*
 * @name: 国际化 i18n
 * @Author: wei.wang
 * @Date: 2022-08-09 15:23:10
 * @LastEditors: wei.wang
 * @LastEditTime: 2022-08-09 17:35:10
 */
import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/utils/sysHelper'

// element-plus 语言文件
import elementPlusZh from 'element-plus/es/locale/lang/zh-cn'
import elementPlusEN from 'element-plus/es/locale/lang/en'

interface messagesType {
  [propName: string]: any
}

// 自动导入语言文件
function siphonI18n(prefix = 'zh') {
  const modules = Object.entries(import.meta.glob(`./**/*.json`, { eager: true })).filter(
    ([key]) => {
      const lang = key.match(/\.\/([A-Za-z0-9-_]+)\//i)![1]
      return lang === prefix
    }
  )

  return Object.fromEntries(
    [...modules].map(([key, value]) => {
      const langKey = key.match(/([A-Za-z0-9-_]+)\./i)![1]
      return [langKey, (value as any).default]
    })
  )
}

export const messages: messagesType = {
  en: {
    ...siphonI18n('en'),
    ...elementPlusEN,
  },
  zh: {
    ...siphonI18n('zh'),
    ...elementPlusZh,
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: getLanguage(), // set locale
  fallbackLocale: 'zh', // set fallback locale
  messages, // set locale messages
})

// 根据key获取国际化对应value，函数名为 “$t” 是为了配合i18n Ally插件来进行vscode国际化智能提示
export function $t(key: string | undefined) {
  if (!key) {
    return ''
  }

  // @ts-ignore
  const hasKey = i18n.global.te(key)

  if (hasKey) {
    // @ts-ignore
    const translatedTitle = i18n.global.t(key)

    return translatedTitle
  }
  return key
}
