<template>
  <el-popover v-model="visible" :width="width" :placement="placement" :trigger="trigger" popper-class="table-setting-popover" @after-leave="onClosed">
    <!-- Header -->
    <div class="popover-header">
      <el-checkbox v-model="selectAll" @change="onSelectAll">全选</el-checkbox>
      <el-button type="text" @click="onReset">重置</el-button>
    </div>

    <!-- Column List -->
    <div class="column-list">
      <draggable v-model="dialogColumns" handle=".column-item" animation="150" class="drag-list" ghost-class="drag-ghost" @end="handleDragEnd">
        <div v-for="(column, index) in dialogColumns" :key="`col-${column.prop}-${index}`" class="column-item">
          <el-checkbox v-model="column.visible" />
          <span class="column-label">{{ column.label }}</span>
          <i class="el-icon-rank drag-icon" />
        </div>
      </draggable>
    </div>

    <!-- Footer -->
    <div class="popover-footer">
      <el-button size="mini" @click="onCancel">取消</el-button>
      <el-button size="mini" type="primary" @click="onConfirm">确定</el-button>
    </div>

    <!-- 触发器 -->
    <slot slot="reference" />
  </el-popover>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TableSettingPopover',
  components: { draggable },
  props: {
    columns: {
      type: Array,
      required: true,
      validator: (val) => {
        return val.every((item) => typeof item.label === 'string' && typeof item.prop === 'string' && typeof item.visible === 'boolean')
      }
    },
    width: {
      type: String,
      default: '200'
    },
    // Popover 出现位置: top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: {
      type: String,
      default: 'bottom'
    },
    // Popover 触发方式: click / hover / focus / manual
    trigger: {
      type: String,
      default: 'click'
    }
  },
  data() {
    return {
      visible: false,
      dialogColumns: []
    }
  },
  computed: {
    selectAll: {
      get() {
        return this.dialogColumns.length > 0 && this.dialogColumns.every((col) => col.visible)
      },
      set(val) {
        this.dialogColumns.forEach((col) => (col.visible = val))
      }
    }
  },
  watch: {
    columns: {
      immediate: true,
      deep: true,
      handler(val) {
        this.dialogColumns = JSON.parse(JSON.stringify(val))
      }
    }
  },
  methods: {
    onSelectAll(val) {
      this.selectAll = val
    },
    onReset() {
      this.dialogColumns = JSON.parse(JSON.stringify(this.columns))
    },
    onClosed() {
      this.blurActive()
      this.onReset()
    },
    onCancel() {
      this.blurActive()
      this.$emit('cancel', {})
      this.visible = false
    },
    onConfirm() {
      this.blurActive()
      this.$emit('confirm', JSON.parse(JSON.stringify(this.dialogColumns)))
      this.visible = false
    },
    blurActive() {
      // 取消当前激活元素的焦点，避免el-popover在某些情况下无法关闭的问题
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    },
    handleDragEnd() {
      // 拖拽结束时打印临时数组顺序（调试用）
      //   console.log(
      //     '弹框内列顺序：',
      //     this.dialogColumns.map((col) => col.label)
      //   )
    }
  }
}
</script>

<style scoped lang="scss">
.table-setting-popover {
  padding: 10px;
}

.popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.column-list {
  max-height: 300px;
  overflow-y: auto;
}

.column-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f5f7fa;
  cursor: move; // 显示可拖动光标

  //   transition: background-color 0.2s;
  //   // 悬停效果
  //   &:hover {
  //     background-color: yellow;
  //   }
  //   // 选中效果（拖拽时）
  //   &.drag-ghost {
  //     background-color: red;
  //   }
}

.column-label {
  flex: 1;
  margin: 0 10px;
}

.drag-icon {
  font-size: 18px;
  opacity: 0.6;
  color: #909399;
  cursor: move;
}

.drag-icon:hover {
  color: #409eff;
}
.drag-ghost {
  border-radius: 4px;
  background-color: #e6f7ff;
}
.popover-footer {
  text-align: right;
}
</style>

