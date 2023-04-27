// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: 'redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'login/index',
    hidden: true
  },
  {
    path: '/404',
    component: '404',
    hidden: true
  },

  {
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: 'dashboard/index',
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
const asyncRoutes = [
  {
    path: '/example',
    component: 'Layout',
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '动态Example', icon: 'el-icon-s-help', roles: ['admin'] },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: 'table/index',
        meta: { title: '动态Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: 'tree/index',
        meta: { title: '动态Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: 'Layout',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: 'form/index',
        meta: { title: '动态Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: '动态Nested', icon: 'nested', roles: ['admin'] },
    children: [
      {
        path: 'menu1',
        component: 'nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: '动态Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: 'nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: '动态Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: 'nested/menu1/menu1-2',
            name: 'Menu1-2',
            meta: { title: '动态Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: '动态Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: '动态Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: '动态Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: 'nested/menu2/index',
        meta: { title: '动态menu2' }
      }
    ]
  },
  {
    path: 'external-link',
    component: 'Layout',
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '动态External Link', icon: 'link' }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
