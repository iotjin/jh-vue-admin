/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/homes',
  component: Layout,
  redirect: '/homes/home1',
  name: 'Home',
  meta: {
    title: 'Home',
    icon: 'table'
  },
  children: [
    {
      path: 'home1',
      component: () => import('@/views/demos/homes/home1'),
      name: 'home1',
      meta: { title: 'home1' }
    },
    {
      path: 'home2',
      component: () => import('@/views/demos/homes/home2'),
      name: 'home2',
      meta: { title: 'home2' }
    },
    {
      path: 'home3',
      component: () => import('@/views/demos/homes/home3'),
      name: 'home3',
      meta: { title: 'home3' }
    },
    {
      path: 'home4',
      component: () => import('@/views/demos/homes/home4'),
      name: 'home4',
      meta: { title: 'Home4' }
    }
  ]
}
export default tableRouter
