import { Router, createRouter, createWebHashHistory, RouteRecordName } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'
import { routeType } from '@/store/types'

// 静态路由
export const constantRoutes = [
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    hidden: true,
    meta: {
      title: 'Redirect',
    },
    children: [
      {
        path: '/redirect/:path(.*)',

        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/desktop/index.vue'),
        meta: { title: 'route.dashboard', icon: 'desktop', affix: true }, //noCache: true,
      },
    ],
  },
]

// 白名单应该包含基本静态路由
const whiteNameList: RouteRecordName[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item: routeType) => {
    whiteNameList.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(constantRoutes)

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

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !whiteNameList.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
