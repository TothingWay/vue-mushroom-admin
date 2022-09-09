import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { i18n } from '@/lang'
import { getSysConfig } from '@/utils/sysHelper'
import 'normalize.css'
import 'uno.css'
import '@/styles/theme/light.css'
import '@/styles/theme/dark.css'
import '@/styles/variables.css'
import '@/styles/index.scss'
import useElementPlus from '@/plugins/elementPlus'
import registerGlobComps from '@/plugins/registerGlobComps'
import '@/permission'
import * as directives from '@/directive'

const app = createApp(App)

// 动态获取 /public 下的 config.json 配置，便于打包后修改
getSysConfig().then(() => {
  const store = createPinia()
  // 路由注册
  app.use(router)
  // 状态管理注册
  app.use(store)
  // 初始化国际化
  app.use(i18n)
  // 全局注册 ElementPlus UI 组件库
  useElementPlus(app)
  // '@/components/globa/*/index.vue'下的组件会自动全局注册
  registerGlobComps(app)
  // 全局注册自定义指令
  Object.keys(directives).forEach((key) => {
    app.directive(key, (directives as { [key: string]: Directive })[key])
  })

  app.mount('#app')
})
