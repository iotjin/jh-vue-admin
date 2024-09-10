// import draggable from 'vuedraggable'
import Sortable from 'sortablejs'

/**
 * el-table拖拽排序指令，用法：v-drag-table
 *
 * 使用指令v-drag-table实现el-table拖拽排序，必须要设置row-key="id"，并且id是唯一的，data定义为tableData
 */
export const dragTableDirective = (Vue) => {
  // 使 v-drag-table 在el-table中可用
  Vue.directive('drag-table', {
    bind(el, binding, vnode) {
      // const vm = vnode.context
      const table = el.querySelector('.el-table__body-wrapper > table')
      if (!table) {
        console.warn('Table element not found!')
        return
      }

      const tbody = table.querySelector('tbody')
      if (!tbody) {
        console.warn('Tbody element not found!')
        return
      }

      const dragClass = binding.value?.dragClass || 'dragClass'
      const { onStart, onEnd } = binding.value || {}

      new Sortable(tbody, {
        animation: 150,
        ghostClass: dragClass, // 使用外部传递的样式类名
        handle: '.el-table__row',
        onStart: (evt) => {
          if (onStart) {
            onStart(evt)
          }
        },
        onEnd: (evt) => {
          const oldIndex = evt.oldIndex
          const newIndex = evt.newIndex
          const tableCom = vnode.componentInstance
          // vm.tableData.splice(newIndex, 0, vm.tableData.splice(oldIndex, 1)[0])
          tableCom.data.splice(newIndex, 0, tableCom.data.splice(oldIndex, 1)[0])
          if (onEnd) {
            onEnd(evt)
          }
        }
      })
    }
  })
}
