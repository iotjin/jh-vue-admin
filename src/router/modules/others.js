import Layout from '@/layout'

const othersRouter = {
  path: '/other',
  alwaysShow: true,
  component: Layout,
  name: 'Other',
  meta: { title: 'Other', icon: 'el-icon-menu' },
  children: [
    {
      path: 'other1',
      component: () => import('@/views/demos/others/other1'),
      name: 'other1',
      meta: { title: 'other1' },
      hidden: false
    },
    {
      path: 'other2',
      name: 'other2',
      component: () => import('@/views/demos/others/other2'),
      meta: { title: 'other2' },
      hidden: false
    },
    {
      path: 'other3',
      name: 'other3',
      component: () => import('@/views/demos/others/other3'),
      meta: { title: 'other3' },
      hidden: false
    },
    {
      path: 'other4',
      name: 'other4',
      component: () => import('@/views/demos/others/other4'),
      meta: { title: 'other4' },
      hidden: false
    }
  ]
}
export default othersRouter
