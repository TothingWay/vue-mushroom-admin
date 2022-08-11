import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { i18n } from '@/lang'
import 'normalize.css'
import 'uno.css'
import '@/styles/theme/light.css'
import '@/styles/theme/dark.css'
import '@/styles/variables.css'
import useElementPlus from '@/plugins/elementPlus'
import registerGlobComps from '@/plugins/registerGlobComps'

const app = createApp(App)
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

app.mount('#app')
