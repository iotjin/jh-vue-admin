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
import BaseTree from '@/views/components/base-tree'

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

// 引入全局常量
Vue.use(constant)
Vue.component('base-tree', BaseTree)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
