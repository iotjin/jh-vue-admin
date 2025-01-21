<template>
  <div class="app-container">
    <el-button type="primary" @click="showColumnDialog">
      列设置
    </el-button>

    <!-- table -->
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px;">
      <!-- <el-table-column v-for="(col, index) in visibleColumns" :key="index" :prop="col.prop" :label="col.label" :width="col.width" /> -->

      <template v-for="(col, index) in visibleColumns">
        <el-table-column v-if="col.prop === 'date'" :key="index" :prop="col.prop" :label="col.label" :width="col.width">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.date }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else-if="col.prop === 'address'" :key="index" :prop="col.prop" :label="col.label" :width="col.width">
          <template slot-scope="scope">
            <el-input v-model="scope.row.address" size="mini" disabled />
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" :prop="col.prop" :label="col.label" :width="col.width" />
      </template>

    </el-table>

    <!-- 弹框 -->
    <el-dialog title="列设置" :visible.sync="dialogVisible" width="500px">
      <draggable v-model="columns" @end="onDragEnd">
        <div v-for="col in columns" :key="col.prop" class="column-item">
          <div class="drag-handle">
            <i class="el-icon-rank" />
            <span style="margin-left:10px;">{{ col.label }}</span>
          </div>
          <el-checkbox v-model="col.visible" />
        </div>
      </draggable>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'ColumnSetting',
  components: {
    draggable
  },
  data() {
    return {
      dialogVisible: false,
      columns: [
        { label: '日期', prop: 'date', visible: true, width: '200' },
        { label: '姓名', prop: 'name', visible: true, width: '100' },
        { label: '地址', prop: 'address', visible: true, width: '' },
        { label: '电话', prop: 'phone', visible: true, width: '' }
      ],
      tableData: [
        {
          date: '2024-03-20',
          name: '张三',
          address: '北京市朝阳区',
          phone: '13800138000'
        },
        {
          date: '2024-03-20',
          name: '李四',
          address: '上海市浦东新区',
          phone: '13900139000'
        }
      ]
    }
  },
  computed: {
    visibleColumns() {
      return this.columns.filter((col) => col.visible)
    }
  },
  methods: {
    showColumnDialog() {
      this.dialogVisible = true
    },
    onDragEnd() {
      console.log('this.columns', JSON.stringify(this.columns))
    }
  }
}
</script>

<style lang="scss" scoped>
.column-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}
.drag-handle {
  cursor: move;
  margin-right: 10px;
  color: #909399;
}
</style>
