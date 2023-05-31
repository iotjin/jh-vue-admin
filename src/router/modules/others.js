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
    }
  ]
}
export default othersRouter
