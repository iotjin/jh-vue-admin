import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
const { deepClone } = require('@/utils')

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// 加载路由
export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
  // return (resolve) => require([`@${view}`], resolve)
}

/**
 * 通过递归格式化菜单路由 (配置项规则：https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#配置项)
 * @param routes
 * @param roles
 */
export function filterAsyncRoutes2(routes) {
  const res = []
  routes.forEach((route) => {
    const tmp = deepClone(route)
    if (route.component === 'Layout') {
      tmp.component = Layout
    } else if (route.component) {
      tmp.component = loadView(route.component)
    }
    if (route.children && route.children.length > 0) {
      tmp.children = filterAsyncRoutes2(route.children)
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generateDynamicRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes2(menus)
      commit('SET_ROUTES', accessedRoutes) // Todo: 内部拼接constantRoutes，所以查出来的菜单不用包含constantRoutes
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
