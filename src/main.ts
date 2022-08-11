import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App)
const store = createPinia()

// 路由注册
app.use(router)
// 状态管理注册
app.use(store)

app.mount('#app')
