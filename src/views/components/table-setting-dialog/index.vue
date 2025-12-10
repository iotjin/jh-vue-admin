<template>
  <el-dialog v-drag-dialog :title="dialogTitle" :visible.sync="isShowDialog" :top="top" :width="width" :close-on-click-modal="false" @closed="onClosedDialog">
    <div class="dialog-header">
      <el-checkbox v-model="selectAll" @change="onSelectAll">全选</el-checkbox>
      <el-button type="text" @click="onReset">重置</el-button>
    </div>

    <div class="column-list">
      <draggable v-model="dialogColumns" handle=".column-item" animation="150" class="drag-list" ghost-class="drag-ghost" @end="handleDragEnd">
        <div v-for="(column, index) in dialogColumns" :key="`col-${column.prop}-${index}`" class="column-item">
          <el-checkbox v-model="column.visible" />
          <span class="column-label">{{ column.label }}</span>
          <i class="el-icon-rank drag-icon" />
        </div>
      </draggable>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onDialogCancel">取消</el-button>
      <el-button type="primary" @click="onDialogConfirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TableSettingDialog',
  components: { draggable },
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    columns: {
      type: Array,
      required: true,
      validator: (val) => {
        return val.every((item) => typeof item.label === 'string' && typeof item.prop === 'string' && typeof item.visible === 'boolean')
      }
    },
    // 标题
    title: { type: String, default: '' },
    // Dialog CSS 中的 margin-top 值
    top: { type: String, default: '8vh' },
    // Dialog 的宽度
    width: { type: String, default: '400px' }
  },
  data() {
    return {
      // 弹框相关
      dialogTitle: '表格列配置',
      isShowDialog: false,
      dialogColumns: []
    }
  },
  computed: {
    selectAll: {
      get() {
        return this.dialogColumns.every((col) => col.visible)
      },
      set(val) {
        this.dialogColumns.forEach((col) => {
          col.visible = val
        })
      }
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.$emit('update:isShow', val) // isShowDialog改变时同步父组件isShow的值
    },
    title: {
      handler(val) {
        this.dialogTitle = val.length ? val : this.dialogTitle
      },
      immediate: true
    },
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
    onClosedDialog() {
      this.onReset()
    },
    onDialogCancel() {
      this.$emit('cancel', {})
      this.isShowDialog = false
    },
    onDialogConfirm() {
      this.$emit('confirm', JSON.parse(JSON.stringify(this.dialogColumns)))
      this.isShowDialog = false
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

<style lang="scss" scoped>
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.column-list {
  max-height: 350px;
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
</style>

