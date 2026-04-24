<template>
  <el-dialog :visible.sync="innerVisible" title="列设置" width="460px" :close-on-click-modal="false" @closed="onClosed">
    <div class="table-setting-dialog__header">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="onToggleAll">
        全选
      </el-checkbox>
      <el-button type="text" @click="onReset">重置</el-button>
    </div>

    <div class="table-setting-dialog__body">
      <draggable v-model="tempColumns" handle=".table-setting-dialog__item" animation="160" ghost-class="drag-ghost">
        <div v-for="(column, index) in tempColumns" :key="`column-item-${column.id}-${index}`" class="table-setting-dialog__item" @dblclick="onRowDblClick(column)">
          <el-checkbox v-model="column.visible" @click.native.stop />
          <span class="table-setting-dialog__label" :title="column.label">{{ column.label }}</span>
          <i class="el-icon-rank drag-handle" title="拖动排序（整行可拖动）" />
          <span class="fixed-pin fixed-pin--left" :class="{ 'is-active': column.fixed === 'left' }" title="固定在左边" @click.stop="onToggleFixed(column, 'left')">
            <svg class="fixed-pin-svg" viewBox="0 0 16 16" aria-hidden="true">
              <use class="fixed-pin-shape" :class="{ 'is-solid': column.fixed === 'left' }" :xlink:href="`${leftPinUrl}#pin-shape`" />
            </svg>
          </span>
          <span class="fixed-pin fixed-pin--right" :class="{ 'is-active': column.fixed === 'right' }" title="固定在右边" @click.stop="onToggleFixed(column, 'right')">
            <svg class="fixed-pin-svg" viewBox="0 0 16 16" aria-hidden="true">
              <use class="fixed-pin-shape" :class="{ 'is-solid': column.fixed === 'right' }" :xlink:href="`${rightPinUrl}#pin-shape`" />
            </svg>
          </span>
        </div>
      </draggable>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onConfirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import leftPinUrl from './assets/pin-left-outline.svg'
import rightPinUrl from './assets/pin-right-outline.svg'

export default {
  name: 'TableColumnSettingDialog',
  components: { draggable },
  props: {
    // 是否显示弹框
    visible: {
      type: Boolean,
      default: false
    },
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
    visible: {
      immediate: true,
      handler(val) {
        this.innerVisible = val
      }
    },
    innerVisible(val) {
      this.$emit('update:visible', val)
    },
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
  methods: {
    // 统一深拷贝，避免对父级状态产生引用修改
    cloneColumns(columns) {
      return JSON.parse(JSON.stringify(columns || []))
    },
    onToggleAll(val) {
      this.checkAll = val
    },
    onToggleFixed(column, side) {
      // 左右固定互斥，点击同一侧再次取消
      column.fixed = column.fixed === side ? '' : side
    },
    // 双击行快速切换勾选状态
    onRowDblClick(column) {
      column.visible = !column.visible
    },
    onReset() {
      // 恢复到初始默认配置，不是恢复到“本次打开时”的状态
      this.tempColumns = this.cloneColumns(this.defaultSnapshot)
    },
    onCancel() {
      this.$emit('cancel')
      this.innerVisible = false
    },
    onConfirm() {
      const payload = this.cloneColumns(this.tempColumns)
      // 至少保留一列，避免表格整列消失造成不可用
      if (!payload.some((item) => item.visible)) {
        this.$message.warning('至少保留一列')
        return
      }
      this.$emit('confirm', payload)
      this.innerVisible = false
    },
    onClosed() {
      // 弹框关闭后回退到打开前状态，避免取消操作污染下一次编辑
      this.tempColumns = this.cloneColumns(this.columns)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-setting-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.table-setting-dialog__body {
  max-height: 360px;
  overflow-y: auto;
}

.table-setting-dialog__item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  margin-bottom: 8px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f5f7fa;
  cursor: move;
}

.table-setting-dialog__label {
  flex: 1;
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drag-handle {
  margin-right: 12px;
  color: #909399;
  cursor: move;
}

.fixed-pin {
  width: 16px;
  height: 16px;
  margin-left: 8px;
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
