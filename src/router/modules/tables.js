/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/tables',
  component: Layout,
  redirect: '/tables/table1',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'el-icon-s-grid'
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
      component: () => import('@/views/demos/tables/table2/table2'),
      name: 'table2',
      meta: { title: 'table2' }
    },
    {
      path: 'table3',
      component: () => import('@/views/demos/tables/table3/table3'),
      name: 'table3',
      meta: { title: 'table3' }
    },
    {
      path: 'table4',
      component: () => import('@/views/demos/tables/table4'),
      name: 'table4',
      meta: { title: 'table4' }
    },
    {
      path: 'table5',
      component: () => import('@/views/demos/tables/table5'),
      name: 'table5',
      meta: { title: 'table5' }
    },
    {
      path: 'table6',
      component: () => import('@/views/demos/tables/table6'),
      name: 'table6',
      meta: { title: 'table6' }
    },
    {
      path: 'table7',
      component: () => import('@/views/demos/tables/table7'),
      name: 'table7',
      meta: { title: 'table7' }
    },
    {
      path: 'table8',
      component: () => import('@/views/demos/tables/table8/table8'),
      name: 'table8',
      meta: { title: 'table8' }
    },
    {
      path: 'table9',
      component: () => import('@/views/demos/tables/table9'),
      name: 'table9',
      meta: { title: 'table9' }
    },
    {
      path: 'table10',
      component: () => import('@/views/demos/tables/table10/table10'),
      name: 'table10',
      meta: { title: 'table10' }
    },
    {
      path: 'table11',
      component: () => import('@/views/demos/tables/table11'),
      name: 'table11',
      meta: { title: 'table11' }
    }
  ]
}
export default tableRouter
