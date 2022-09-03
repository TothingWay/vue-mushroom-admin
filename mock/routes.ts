import { MockMethod } from 'vite-plugin-mock'

const keepAliveParamsRouter = {
  path: '/keepAlive',
  componentPath: 'layout/index',
  redirect: '/keepAlive/params',
  name: 'KeepAlive',
  meta: {
    title: 'route.keepAlive.index',
    icon: 'tabs',
    roles: ['admin', 'editor'],
  },
  children: [
    {
      path: 'params',
      componentPath: 'keepAlive/params/index',
      name: 'KeepAliveParams',
      meta: {
        title: 'route.keepAlive.params.index',
        roles: ['admin', 'editor'],
      },
    },
    {
      path: 'params/:id',
      componentPath: 'keepAlive/params/detail',
      name: 'KeepAliveParamsDetail',
      hidden: true,
      meta: {
        title: 'route.keepAlive.params.detail',
        roles: ['admin', 'editor'],
      },
    },
    {
      path: 'nested',
      componentPath: 'layout/index',
      name: 'KeepAliveNested',
      meta: {
        title: 'route.keepAlive.nested.index',
        roles: ['admin', 'editor'],
      },
      children: [
        {
          path: 'menu1',
          componentPath: 'keepAlive/nested/menu1/index',
          name: 'KeepAliveNestedMenu1',
          meta: {
            title: 'route.keepAlive.nested.menu1',
            roles: ['admin', 'editor'],
          },
        },
        {
          path: 'menu2',
          componentPath: 'layout/index',
          name: 'KeepAliveNestedMenu2',
          meta: {
            title: 'route.keepAlive.nested.menu2',
            roles: ['admin', 'editor'],
          },
          children: [
            {
              path: 'menu2-1',
              componentPath: 'keepAlive/nested/menu2/menu2-1/index',
              name: 'KeepAliveNestedMenu2-1',
              meta: {
                title: 'route.keepAlive.nested.menu2-1',
                roles: ['admin', 'editor'],
              },
            },
            {
              path: 'menu2-2',
              componentPath: 'keepAlive/nested/menu2/menu2-1/index',
              name: 'KeepAliveNestedMenu2-2',
              meta: {
                title: 'route.keepAlive.nested.menu2-2',
                roles: ['admin', 'editor'],
              },
            },
          ],
        },
      ],
    },
  ],
}

/* const permissionRouter = {
  path: '/permission',
  componentPath: 'layout/index',
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
} */

/* const icon = {
  path: '/icon',
  componentPath: 'layout/index',
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
} */

export default [
  {
    url: '/user/routes',
    method: 'get',
    response: ({ headers }) => {
      if (headers.token === 'admin-token') {
        return {
          code: 200,
          data: [keepAliveParamsRouter],
        }
      } else {
        return {
          code: 200,
          data: [keepAliveParamsRouter],
        }
      }
    },
  },
] as MockMethod[]
