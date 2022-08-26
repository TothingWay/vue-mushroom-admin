import router from '@/router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from './utils/sysHelper'
import { $t } from '@/lang'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/autoLogin'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  // 开启进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle($t(to.meta.title as string | undefined))

  // 判断用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 通过 getInfo方法 判断用户是否已获取其权限角色
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        // 第一次进来时，维护roles。 具体有无to.path的权限，vueRouter 自动会判断
        next()
      } else {
        try {
          // get user info
          await userStore.getInfo()

          // generate accessible routes map
          const accessRoutes: any = await permissionStore.generateRoutes()

          // dynamically add accessible routes
          accessRoutes.forEach((route: any) => {
            router.addRoute(route)
          })

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error: any) {
          // remove token and go to login page to re-login
          await userStore.resetToken()
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.fullPath}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
