import Vue from 'vue'
import TableColumnSettingPopover from './TableColumnSettingPopover.vue'

const PopoverConstructor = Vue.extend(TableColumnSettingPopover)
const TABLE_SETTING_KEY = '__tableColumnSettingState2__'

/**
 * 获取指令绑定的 el-table 组件实例
 */
function getTableVm(vnode) {
  return vnode.componentInstance
}

/**
 * 归一化 fixed 值，只允许 left / right / ''
 * 这样可以避免 Element Table 内部 true/false/undefined 混用导致状态错乱。
 */
function normalizeFixed(fixed) {
  return fixed === 'left' || fixed === 'right' ? fixed : ''
}

/**
 * 将内部列结构转成弹框可消费的数据结构
 */
function toPanelColumns(columns) {
  return (columns || []).map((item) => ({
    id: item.id,
    label: item.label,
    prop: item.prop,
    visible: item.visible !== false,
    fixed: normalizeFixed(item.fixed)
  }))
}

/**
 * 兜底列名映射，避免出现“列1”这种无业务语义文案
 */
function resolveColumnLabel(column, index) {
  if (column.type === 'selection') {
    return 'checkbox勾选列'
  }
  if (column.type === 'index') {
    return '序号列'
  }
  if (column.type === 'expand') {
    return '展开列'
  }
  return (
    column.label ||
    column.property ||
    column.columnKey ||
    `未命名列${index + 1}`
  )
}

/**
 * 指令会在表格上方注入工具栏：
 * - 左区承载页面已有顶部 div（如果存在）
 * - 右区放“列设置”按钮
 */
function ensureToolbar(el, state) {
  if (!el.parentNode) {
    return
  }

  // 记录表格前一个兄弟节点，若是页面顶部业务区，则搬运到工具栏左侧
  const originalPrev = el.previousElementSibling
  const toolbar = document.createElement('div')
  toolbar.className = 'table-column-setting-toolbar'
  toolbar.style.display = 'flex'
  toolbar.style.alignItems = 'center'
  toolbar.style.justifyContent = 'space-between'
  toolbar.style.gap = '12px'
  toolbar.style.marginBottom = '10px'

  const left = document.createElement('div')
  left.className = 'table-column-setting-toolbar__left'
  left.style.flex = '1'
  left.style.minWidth = '0'
  left.style.display = 'flex'
  left.style.alignItems = 'center'

  const right = document.createElement('div')
  right.className = 'table-column-setting-toolbar__right'
  right.style.display = 'flex'
  right.style.alignItems = 'center'

  const popoverMount = document.createElement('div')
  right.appendChild(popoverMount)

  toolbar.appendChild(left)
  toolbar.appendChild(right)
  el.parentNode.insertBefore(toolbar, el)

  // 将页面现有顶部区域（例如筛选/按钮区）与“列设置”按钮合并到同一行
  if (
    originalPrev &&
    originalPrev !== toolbar &&
    originalPrev.tagName === 'DIV' &&
    !originalPrev.classList.contains('table-column-setting-toolbar')
  ) {
    left.appendChild(originalPrev)
    state.leftContentEl = originalPrev
  }

  state.toolbarEl = toolbar
  state.toolbarLeftEl = left
  state.toolbarRightEl = right
  state.popoverMountNode = popoverMount
}

/**
 * 程序化挂载弹框组件，保持“页面只注册指令”调用方式
 */
function ensurePopover(state, vm) {
  if (state.popoverVm || !state.popoverMountNode) {
    return
  }

  const popoverVm = new PopoverConstructor({
    propsData: {
      columns: [],
      defaultColumns: []
    }
  })
  popoverVm.$mount()
  state.popoverMountNode.appendChild(popoverVm.$el)

  popoverVm.$on('open', () => {
    // 打开前先从表格回填最新状态，确保弹框展示与表格一致
    const currentColumns = syncColumnsFromTable(state, vm)
    popoverVm.columns = toPanelColumns(currentColumns)
    popoverVm.defaultColumns = toPanelColumns(state.defaultColumns)
  })

  popoverVm.$on('apply', (columns) => {
    applyColumnSetting(state, columns, vm)
    popoverVm.columns = toPanelColumns(state.allColumns)
  })

  state.popoverVm = popoverVm
}

function normalizeColumns(columnList) {
  if (!Array.isArray(columnList) || columnList.length === 0) {
    return []
  }
  return columnList
    .filter((column) => column && !Array.isArray(column.children))
    .map((column, index) => ({
      id: column.id,
      label: resolveColumnLabel(column, index),
      prop: column.property || '',
      visible: true,
      fixed: normalizeFixed(column.fixed),
      columnRef: column
    }))
}

/**
 * 同步表格当前列状态：
 * - 保持 allColumns 的稳定顺序
 * - 只更新 visible/fixed，避免隐藏列打开弹框时漂移到末尾
 */
function syncColumnsFromTable(state, vm) {
  if (!vm || !vm.store || !vm.store.states) {
    return state.allColumns || []
  }

  const storeColumns = Array.isArray(vm.store.states._columns)
    ? vm.store.states._columns
    : []
  const normalizedStoreColumns = normalizeColumns(storeColumns)
  if (!normalizedStoreColumns.length && !state.allColumns.length) {
    return []
  }
  const storeColumnMap = new Map(
    normalizedStoreColumns.map((item) => [item.id, item])
  )

  // 首次初始化：以当前表格列为基准构建完整状态和默认快照
  if (!state.allColumns.length) {
    state.allColumns = normalizedStoreColumns
    state.defaultColumns = toPanelColumns(normalizedStoreColumns)
    return state.allColumns
  }

  // 每次打开弹框时只同步可见性和固定状态，不重排隐藏列位置
  const visibleMap = new Set(storeColumns.map((item) => item.id))
  state.allColumns = state.allColumns.map((item) => {
    const current = storeColumnMap.get(item.id)
    if (!current) {
      return {
        ...item,
        visible: false
      }
    }
    return {
      ...item,
      label: current.label,
      prop: current.prop,
      columnRef: current.columnRef,
      visible: visibleMap.has(item.id),
      fixed: normalizeFixed(current.fixed)
    }
  })

  normalizedStoreColumns.forEach((item) => {
    // 兼容运行时动态插入列（例如权限切换后新增列）
    if (!state.allColumns.some((exist) => exist.id === item.id)) {
      state.allColumns.push(item)
      state.defaultColumns.push({
        id: item.id,
        label: item.label,
        prop: item.prop,
        visible: true,
        fixed: normalizeFixed(item.fixed)
      })
    }
  })

  return state.allColumns
}

/**
 * 以弹框返回结果为唯一真值，更新表格列显隐/顺序/固定
 */
function applyColumnSetting(state, panelColumns, vm) {
  if (!vm || !vm.store || !vm.store.states || !Array.isArray(panelColumns)) {
    return
  }

  const columnMap = new Map(state.allColumns.map((item) => [item.id, item]))
  const nextColumns = []

  panelColumns.forEach((item) => {
    const current = columnMap.get(item.id)
    if (!current) {
      return
    }
    current.visible = item.visible
    current.fixed = normalizeFixed(item.fixed)
    current.columnRef.fixed = current.fixed || false
    nextColumns.push(current)
  })

  state.allColumns = nextColumns
  const tableColumns = nextColumns
    .filter((item) => item.visible)
    .map((item) => item.columnRef)

  // 直接覆盖 _columns，再触发内部 updateColumns/scheduleLayout 完成渲染同步
  vm.store.states._columns = tableColumns
  vm.store.updateColumns()
  vm.store.scheduleLayout()
  if (typeof vm.doLayout === 'function') {
    vm.doLayout()
  }
  if (typeof vm.$forceUpdate === 'function') {
    vm.$forceUpdate()
  }
}

function destroyState(el) {
  const state = el[TABLE_SETTING_KEY]
  if (!state) {
    return
  }

  if (state.toolbarEl && state.toolbarEl.parentNode) {
    // 卸载时把左侧原始业务节点还原，避免页面结构被永久修改
    if (
      state.leftContentEl &&
      state.leftContentEl.parentNode === state.toolbarLeftEl
    ) {
      state.toolbarEl.parentNode.insertBefore(
        state.leftContentEl,
        state.toolbarEl
      )
    }
    state.toolbarEl.parentNode.removeChild(state.toolbarEl)
  }

  if (state.popoverVm) {
    state.popoverVm.$destroy()
  }

  delete el[TABLE_SETTING_KEY]
}

const TableColumnSetting2Directive = {
  inserted(el, binding, vnode) {
    const vm = getTableVm(vnode)
    if (!vm || !vm.store || !vm.store.states) {
      return
    }

    const state = {
      // allColumns: 完整列序列（包含隐藏列），用于保持稳定顺序
      allColumns: [],
      // defaultColumns: 初始快照，仅用于“重置”
      defaultColumns: [],
      toolbarEl: null,
      toolbarLeftEl: null,
      toolbarRightEl: null,
      leftContentEl: null,
      popoverMountNode: null,
      popoverVm: null
    }
    el[TABLE_SETTING_KEY] = state

    Vue.nextTick(() => {
      // 等 el-table 内部列实例初始化完成后再读取 store
      syncColumnsFromTable(state, vm)
      ensureToolbar(el, state)
      ensurePopover(state, vm)
    })
  },
  unbind(el) {
    destroyState(el)
  }
}

/**
 * 全局注册入口：
 * 在 src/directives/index.js 中调用后，可在任意页面直接使用 v-table-column-setting2。
 */
export const tableColumnSetting2Directive = (VueInstance) => {
  VueInstance.directive('table-column-setting2', TableColumnSetting2Directive)
}

export default TableColumnSetting2Directive
