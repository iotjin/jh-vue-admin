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
      meta: { title: 'table1 - 综合示例' }
    },
    {
      path: 'table2',
      component: () => import('@/views/demos/tables/table2/table2'),
      name: 'table2',
      meta: { title: 'table2 - 综合示例' }
    },
    {
      path: 'table3',
      component: () => import('@/views/demos/tables/table3/table3'),
      name: 'table3',
      meta: { title: 'table3 - 动态表格' }
    },
    {
      path: 'table4',
      component: () => import('@/views/demos/tables/table4'),
      name: 'table4',
      meta: { title: 'table4 - 综合示例' }
    },
    {
      path: 'table5',
      component: () => import('@/views/demos/tables/table5'),
      name: 'table5',
      meta: { title: 'table5 - 行多层嵌套' }
    },
    {
      path: 'table6',
      component: () => import('@/views/demos/tables/table6'),
      name: 'table6',
      meta: { title: 'table6 - 行多层嵌套' }
    },
    {
      path: 'table7',
      component: () => import('@/views/demos/tables/table7'),
      name: 'table7',
      meta: { title: 'table7 - 合并单元格' }
    },
    {
      path: 'table8',
      component: () => import('@/views/demos/tables/table8/table8'),
      name: 'table8',
      meta: { title: 'table8 - 行嵌套子组件' }
    },
    {
      path: 'table9',
      component: () => import('@/views/demos/tables/table9'),
      name: 'table9',
      meta: { title: 'table9 - 动态列' }
    },
    {
      path: 'table10',
      component: () => import('@/views/demos/tables/table10/table10'),
      name: 'table10',
      meta: { title: 'table10 - 动态列' }
    },
    {
      path: 'table11',
      component: () => import('@/views/demos/tables/table11'),
      name: 'table11',
      meta: { title: 'table11 - 行拖拽排序-指令实现' }
    },
    {
      path: 'table12',
      component: () => import('@/views/demos/tables/table12'),
      name: 'table12',
      meta: { title: 'table12 - 行拖拽排序' }
    },
    {
      path: 'table13',
      component: () => import('@/views/demos/tables/table13'),
      name: 'table13',
      meta: { title: 'table13 - 自定义滚动条' }
    },
    {
      path: 'table14',
      component: () => import('@/views/demos/tables/table14'),
      name: 'table14',
      meta: { title: 'table14' }
    }
  ]
}
export default tableRouter
