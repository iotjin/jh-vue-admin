import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui' // 全局引用
import ElementUI from '@/utils/element' // 按需引用
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入全局常量
import constant from '@/common/const'
// 引入全局方法
import { deepCopy } from '@/common/commonUtils'
// 引入全局组件
import BaseTree from '@/views/components/base-tree'
import BaseDialog from '@/views/components/base-dialog'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_USE_MOCK === 'true') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.pageGroup = { index: 1, size: 10, sizes: [10, 20, 50, 100] }// 表格分页变量

// 设置全局常量，use创建的对象，会自动调用对象的install方法，使用：this.GLOBAL.title
Vue.use(constant)
// 设置全局方法，使用：this._deepCopy()
Vue.prototype._deepCopy = deepCopy
// 设置全局组件, 使用时不需要注册，直接使用，如：<base-tree></base-tree>
Vue.component('base-tree', BaseTree)
Vue.component('BaseDialog', BaseDialog)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
