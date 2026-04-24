<template>
  <div class="table-setting-popover">
    <el-popover ref="popover" v-model="innerVisible" placement="bottom-end" width="360" trigger="manual" popper-class="table-setting-popover-popper" @show="syncLocalColumns">
      <div class="table-setting-popover__header">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="onToggleAll">
          全选
        </el-checkbox>
        <el-button type="text" @click="onReset">重置</el-button>
      </div>

      <div class="table-setting-popover__body">
        <draggable v-model="tempColumns" handle=".table-setting-popover__item" animation="160" ghost-class="drag-ghost" @end="emitApply">
          <div v-for="(column, index) in tempColumns" :key="`column-item-${column.id}-${index}`" class="table-setting-popover__item" @dblclick="onRowDblClick(column)">
            <el-checkbox v-model="column.visible" @change="onVisibleChange(column)" @click.native.stop />
            <span class="table-setting-popover__label" :title="column.label">{{ column.label }}</span>
            <i class="el-icon-rank drag-handle" title="拖动排序（整行可拖动）" />
            <span class="fixed-pin" :class="{ 'is-active': column.fixed === 'left' }" title="固定在左边" @click.stop="onToggleFixed(column, 'left')">
              <svg class="fixed-pin-svg" viewBox="0 0 16 16" aria-hidden="true">
                <use class="fixed-pin-shape" :class="{ 'is-solid': column.fixed === 'left' }" :xlink:href="`${leftPinUrl}#pin-shape`" />
              </svg>
            </span>
            <span class="fixed-pin" :class="{ 'is-active': column.fixed === 'right' }" title="固定在右边" @click.stop="onToggleFixed(column, 'right')">
              <svg class="fixed-pin-svg" viewBox="0 0 16 16" aria-hidden="true">
                <use class="fixed-pin-shape" :class="{ 'is-solid': column.fixed === 'right' }" :xlink:href="`${rightPinUrl}#pin-shape`" />
              </svg>
            </span>
          </div>
        </draggable>
      </div>

      <el-button slot="reference" type="primary" size="mini" @click="onTriggerClick">
        列设置
      </el-button>
    </el-popover>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import leftPinUrl from './assets/pin-left-outline.svg'
import rightPinUrl from './assets/pin-right-outline.svg'

export default {
  name: 'TableColumnSettingPopover',
  components: { draggable },
  props: {
    // 当前表格列状态（打开时回填）
    columns: {
      type: Array,
      default: () => []
    },
    // 默认列快照（用于“重置”恢复）
    defaultColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      innerVisible: false,
      tempColumns: [],
      defaultSnapshot: [],
      leftPinUrl,
      rightPinUrl
    }
  },
  computed: {
    checkAll: {
      get() {
        return this.tempColumns.length > 0 && this.tempColumns.every((item) => item.visible)
      },
      set(val) {
        this.tempColumns.forEach((item) => {
          item.visible = val
        })
      }
    },
    isIndeterminate() {
      const checkedCount = this.tempColumns.filter((item) => item.visible).length
      return checkedCount > 0 && checkedCount < this.tempColumns.length
    }
  },
  watch: {
    columns: {
      immediate: true,
      deep: true,
      handler(val) {
        // 外部每次打开弹框都会回灌当前列状态，这里刷新编辑态副本
        this.tempColumns = this.cloneColumns(val)
      }
    },
    defaultColumns: {
      immediate: true,
      deep: true,
      handler(val) {
        // 默认快照单独维护，确保“重置”不会被编辑态污染
        this.defaultSnapshot = this.cloneColumns(val)
      }
    }
  },
  mounted() {
    // 手动模式下需要自己处理“点击外部关闭”
    document.addEventListener('mousedown', this.handleDocumentMousedown)
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleDocumentMousedown)
  },
  methods: {
    // 统一深拷贝，避免对父级状态产生引用修改
    cloneColumns(columns) {
      return JSON.parse(JSON.stringify(columns || []))
    },
    getPopoverContentEl() {
      return this.$refs.popover && this.$refs.popover.popperElm
    },
    // 点击区域不在触发按钮和 popover 内容内时，关闭面板
    handleDocumentMousedown(event) {
      if (!this.innerVisible) {
        return
      }
      const target = event.target
      const triggerEl = this.$el
      const popoverEl = this.getPopoverContentEl()
      if ((triggerEl && triggerEl.contains(target)) || (popoverEl && popoverEl.contains(target))) {
        return
      }
      this.innerVisible = false
    },
    // 每次打开前都按最新表格状态刷新本地副本
    syncLocalColumns() {
      this.tempColumns = this.cloneColumns(this.columns)
      this.defaultSnapshot = this.cloneColumns(this.defaultColumns)
    },
    onTriggerClick() {
      if (!this.innerVisible) {
        // 打开前先从表格回填最新状态，确保弹框展示与表格一致
        this.$emit('open')
        this.$nextTick(() => {
          this.syncLocalColumns()
          this.innerVisible = true
        })
        return
      }
      this.innerVisible = false
    },
    ensureAtLeastOneVisible(changedColumn) {
      if (this.tempColumns.some((item) => item.visible)) {
        return true
      }
      if (changedColumn) {
        changedColumn.visible = true
      }
      this.$message.warning('至少保留一列')
      return false
    },
    emitApply() {
      if (!this.ensureAtLeastOneVisible()) {
        return
      }
      this.$emit('apply', this.cloneColumns(this.tempColumns))
    },
    onToggleAll(val) {
      if (!val) {
        this.$message.warning('至少保留一列')
        this.$nextTick(() => {
          this.checkAll = true
        })
        return
      }
      this.checkAll = val
      this.emitApply()
    },
    onVisibleChange(column) {
      if (!this.ensureAtLeastOneVisible(column)) {
        return
      }
      this.emitApply()
    },
    onToggleFixed(column, side) {
      // 左右固定互斥，点击同一侧再次取消
      column.fixed = column.fixed === side ? '' : side
      this.emitApply()
    },
    // 双击行快速切换勾选状态
    onRowDblClick(column) {
      column.visible = !column.visible
      if (!this.ensureAtLeastOneVisible(column)) {
        return
      }
      this.emitApply()
    },
    onReset() {
      // 恢复到初始默认配置，不是恢复到“本次打开时”的状态
      this.tempColumns = this.cloneColumns(this.defaultSnapshot)
      this.emitApply()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-setting-popover {
  display: inline-flex;
  align-items: center;
}

.table-setting-popover__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.table-setting-popover__body {
  max-height: 320px;
  overflow-y: auto;
}

.table-setting-popover__item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  margin-bottom: 6px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f5f7fa;
  cursor: move;
}

.table-setting-popover__label {
  flex: 1;
  min-width: 0;
  margin: 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drag-handle {
  margin-right: 8px;
  color: #909399;
  cursor: move;
}

.fixed-pin {
  width: 16px;
  height: 16px;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.fixed-pin-svg {
  width: 16px;
  height: 16px;
  display: block;
}

.fixed-pin-shape {
  fill: none;
  stroke: #6b7280;
  stroke-width: 1;
}

.fixed-pin-shape.is-solid {
  fill: #409eff;
  stroke: none;
}

.drag-ghost {
  background-color: #ecf5ff;
}
</style>
