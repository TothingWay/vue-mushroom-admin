import { MockMethod } from 'vite-plugin-mock'

const permissionRouter = {
  path: '/permission',
  componentPath: 'layout/Layout',
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
      componentPath: 'permission/page',
      name: 'PagePermission',
      meta: {
        title: 'Page Permission',
        roles: ['admin'],
      },
    },
    {
      path: 'directive',
      componentPath: 'permission/directive',
      name: 'DirectivePermission',
      meta: {
        title: 'Directive Permission',
      },
    },
    {
      path: 'role',
      componentPath: 'permission/role',
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
  componentPath: 'layout/Layout',
  meta: {
    title: 'icon',
    roles: ['admin', 'editor'],
  },
  children: [
    {
      path: 'index',
      componentPath: 'icons/index',
      name: 'Icons',
      meta: { title: 'Icons', icon: 'icon', noCache: true },
    },
  ],
}

export default [
  {
    url: '/user/routes',
    method: 'get',
    response: ({ headers }) => {
      if (headers.token === 'admin-token') {
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
