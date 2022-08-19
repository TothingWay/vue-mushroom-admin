import 'virtual:svg-icons-register'
import type { App } from 'vue'

// 读取 "@/components/global/*/index.vue" 组件
const globalComponents: Record<string, any> = import.meta.glob('../components/global/*/index.vue', {
  eager: true,
})

function registerGlobComps(app: App) {
  // 自动全局注册 "@/components/global" 下的组件
  for (const [key, value] of Object.entries(globalComponents)) {
    const componentName = value.default.name || key.split('/').slice(-2, -1)[0]
    app.component(componentName, value.default)
  }
}

export default registerGlobComps
