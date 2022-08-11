import { Router, createRouter, createWebHashHistory } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

// 静态路由
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/myDashboard',
    children: [
      {
        path: 'myDashboard',
        name: 'MyDashboard',
        component: () => import('@/views/sys/desktop/index.vue'),
        meta: { title: 'myDesktop', icon: 'desktop', affix: true }, //noCache: true,
      },
    ],
  },
]

// 白名单应该包含基本静态路由
/* const WHITE_NAME_LIST = []
const getRouteNames = (array) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(constantRoutes) */

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const router: Router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: constantRoutes,
})

/* export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
} */

export default router
