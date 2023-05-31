import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  name: 'system',
  component: Layout,
  meta: { title: '系统管理', icon: 'el-icon-setting', roles: ['admin'] },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/system/user'),
      meta: {
        title: '用户管理',
        buttons: ['user-add', 'user-edit', 'user-look', 'user-export', 'user-delete', 'user-assign', 'user-resetPwd']
      }
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role'),
      meta: {
        title: '角色管理',
        buttons: ['role-add', 'role-edit', 'role-look', 'role-delete', 'role-setting']
      }
    },
    {
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/system/menu'),
      meta: {
        title: '菜单管理',
        buttons: ['menu-add', 'menu-edit', 'menu-look', 'menu-delete']
      }
    },
    {
      path: 'dict',
      name: 'dict',
      component: () => import('@/views/system/dict'),
      meta: {
        title: '字典管理',
        buttons: ['dict-type-add', 'dict-type-edit', 'dict-type-delete', 'dict-item-add', 'dict-item-edit', 'dict-item-delete']
      }
    }
  ]
}
export default systemRouter
