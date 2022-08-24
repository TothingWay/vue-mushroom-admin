import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { getMenu } from '@/api/user'
import { deepClone } from '@/utils'
import { routeType } from './types'
import path from 'path'

// Layout component
import Layout from '@/layout/index.vue'
import errorPage from '@/views/errorPage/404.vue'

const dynamicViewsModules = import.meta.glob('../../**/*.vue')
const modulesRoutesKeys = Object.keys(dynamicViewsModules)

// 将三级及以上路由都转化为二级路由
export const getFlatRoutes = (routes: routeType[]) => {
  const routers = routes.map((child) => {
    child.component = Layout
    if (child.children && child.children.length > 0) {
      child.children = formatRouter(child.children, child.path, [], child)
    }
    return child
  })
  return routers
}

const formatRouter = (
  routes: routeType[],
  basePath = '/',
  list: routeType[] = [],
  parent: routeType
) => {
  routes.map((item) => {
    item.path = path.resolve(basePath, item.path)
    const meta = item.meta || {}
    if (!meta.parent && parent) {
      meta.parent = parent.path
      item.meta = meta
    }
    if (item.redirect) item.redirect = path.resolve(basePath, item.redirect)
    if (item.componentPath) {
      const index = modulesRoutesKeys.findIndex((ev) => ev.includes(item.componentPath!))
      if (index !== -1) {
        item.component = dynamicViewsModules[modulesRoutesKeys[index]]
      } else {
        item.component = errorPage
      }
    }
    if (item.children && item.children.length > 0) {
      const arr = formatRouter(item.children, item.path, list, parent)
      delete item.children
      list.concat(arr)
    }
    list.push(item)
  })
  return list
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [] as routeType[],
    flatRoutes: [] as routeType[],
  }),
  actions: {
    generateRoutes() {
      return new Promise((resolve) => {
        getMenu().then((response) => {
          const asyncRoutes = response.data

          const flatRoutes = getFlatRoutes(deepClone(asyncRoutes, ['component']))
          console.log(flatRoutes)

          this.routes = constantRoutes.concat(asyncRoutes) as any
          this.flatRoutes = flatRoutes
          resolve(flatRoutes)
        })
      })
    },
  },
})
