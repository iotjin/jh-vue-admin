import { copyDirective } from '@/directives/copy'
import { dragTableDirective } from '@/directives/drag-table'
import { dragDialogDirective } from '@/directives/drag-dialog'
import { debounceDirective } from '@/directives/debounce'
import { throttleDirective } from '@/directives/throttle'

/**
 * 自定义全局指令 directive：v-xxx
 */
export const setupDirective = (Vue) => {
  // 复制指令，用法：v-copy
  copyDirective(Vue)
  // el-table拖拽排序指令，用法：v-drag-table
  dragTableDirective(Vue)
  // el-dialog拖拽指令，用法：v-drag-dialog
  dragDialogDirective(Vue)
  // 防抖指令，用法：v-debounce
  debounceDirective(Vue)
  // 节流指令，用法：v-throttle
  throttleDirective(Vue)
}
