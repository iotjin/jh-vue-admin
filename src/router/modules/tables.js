/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/tables',
  component: Layout,
  redirect: '/tables/table1',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'table1',
      component: () => import('@/views/demos/tables/table1'),
      name: 'table1',
      meta: { title: 'table1' }
    },
    {
      path: 'table2',
      component: () => import('@/views/demos/tables/table2'),
      name: 'table2',
      meta: { title: 'table2' }
    },
    {
      path: 'table3',
      component: () => import('@/views/demos/tables/table3'),
      name: 'table3',
      meta: { title: 'table3' }
    },
    {
      path: 'table4',
      component: () => import('@/views/demos/tables/table4'),
      name: 'table4',
      meta: { title: 'table4' }
    }
  ]
}
export default tableRouter
