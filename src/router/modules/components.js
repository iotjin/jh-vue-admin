/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  alwaysShow: true,
  component: Layout,
  redirect: 'noRedirect',
  name: 'components',
  meta: { title: 'Components', icon: 'el-icon-menu' },
  children: [
    {
      path: 'basedialog',
      component: () => import('@/views/demos/components/dialog'),
      name: 'basedialog',
      meta: { title: 'Base Dialog' }
    },
    {
      path: 'excelUpload',
      component: () => import('@/views/demos/components/excelUpload'),
      name: 'excelUpload',
      meta: { title: 'Excel Upload' }
    },
    {
      path: 'fileUpload',
      component: () => import('@/views/demos/components/fileUpload'),
      name: 'fileUpload',
      meta: { title: 'File Upload' }
    },
    {
      path: 'copy',
      component: () => import('@/views/demos/components/copy'),
      name: 'copy',
      meta: { title: 'copy directive' }
    },
    {
      path: 'debounce',
      component: () => import('@/views/demos/components/debounce'),
      name: 'debounce',
      meta: { title: 'debounce directive' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/demos/components/markdown'),
      name: 'markdown',
      meta: { title: 'Markdown' }
    },
    {
      path: 'wangEditor',
      component: () => import('@/views/demos/components/wangEditor'),
      name: 'wangEditor',
      meta: { title: 'WangEditor' }
    }
  ]
}

export default componentsRouter
