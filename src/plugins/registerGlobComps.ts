import 'virtual:svg-icons-register'
import type { App } from 'vue'
import User from '~icons/ep/user'
import Lock from '~icons/ep/lock'

// Icons
const iconComponents = [User, Lock]

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

  // 全局注册 element-plus 图标，在element-plus 组件中可以通过字符串的形式使用, 例如：<el-input prefix-icon="ep-user"/>
  iconComponents.forEach((comp) => {
    app.component(comp.name, comp)
  })
}

export default registerGlobComps
