import { MockMethod } from 'vite-plugin-mock'
import { getToken } from '../src/utils/auth'
const permissionRouter = {
  path: '/permission',
  component: 'layout/Layout',
  redirect: '/permission/index',
  alwaysShow: true,
  meta: {
    title: 'Permission',
    icon: 'lock',
    roles: ['admin', 'editor'],
  },
  children: [
    {
      path: 'page',
      component: 'permission/page',
      name: 'PagePermission',
      meta: {
        title: 'Page Permission',
        roles: ['admin'],
      },
    },
    {
      path: 'directive',
      component: 'permission/directive',
      name: 'DirectivePermission',
      meta: {
        title: 'Directive Permission',
      },
    },
    {
      path: 'role',
      component: 'permission/role',
      name: 'RolePermission',
      meta: {
        title: 'Role Permission',
        roles: ['admin'],
      },
    },
  ],
}

const icon = {
  path: '/icon',
  component: 'layout/Layout',
  children: [
    {
      path: 'index',
      component: 'icons/index',
      name: 'Icons',
      meta: { title: 'Icons', icon: 'icon', noCache: true },
    },
  ],
}

export default [
  {
    url: '/getRoutes',
    method: 'get',
    response: () => {
      if (getToken() === 'admin-token') {
        return {
          code: 200,
          data: [permissionRouter, icon],
        }
      } else {
        return {
          code: 200,
          data: [icon],
        }
      }
    },
  },
] as MockMethod[]
