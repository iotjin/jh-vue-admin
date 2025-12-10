<template>
  <div class="app-container">
    <el-button type="primary" @click="isShowDialog = true">
      列设置 - dialog
    </el-button>

    <span style="margin-right: 100px;" />

    <TableSettingPopover width="200" :columns="columnConfigs" @confirm="handleColumnConfirm">
      <el-button type="primary">列设置 - popover</el-button>
    </TableSettingPopover>

    <el-table ref="table" :key="tableKey" :data="tableData" border style="width: 100%; margin-top: 20px;">
      <template v-for="(column, index) in columnConfigs">
        <el-table-column v-if="column.visible" :key="`table-col-${column.prop}-${index}`" :prop="column.prop" :label="column.label" :width="column.width" align="center">
          <template slot-scope="scope">
            <template v-if="column.prop === 'gender'">
              <el-tag>{{ scope.row.gender }}</el-tag>
            </template>
            <template v-else-if="column.prop === 'age'">
              <el-tag>{{ scope.row.age }}</el-tag>
            </template>
            <template v-else-if="column.prop === 'email'">
              <el-input v-model="scope.row.email" size="mini" disabled />
            </template>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 列配置弹框 -->
    <TableSettingDialog :is-show.sync="isShowDialog" :columns="columnConfigs" @confirm="handleColumnConfirm" />
  </div>
</template>

<script>
import TableSettingDialog from '@/views/components/table-setting-dialog'
import TableSettingPopover from '@/views/components/table-setting-popover'

export default {
  name: 'TableColumnSetting',
  components: {
    TableSettingDialog,
    TableSettingPopover
  },
  data() {
    return {
      isShowDialog: false,
      // 核心：表格唯一key，列配置变化时更新，强制表格重渲染，不使用key的话 则使用column的key来强制重排
      tableKey: 0,
      columnConfigs: [
        { label: 'ID', prop: 'id', visible: true, width: '80' },
        { label: '姓名', prop: 'name', visible: true },
        { label: '年龄', prop: 'age', visible: true },
        { label: '性别', prop: 'gender', visible: true, width: '100' },
        { label: '邮箱', prop: 'email', visible: false },
        { label: '电话', prop: 'phone', visible: false }
      ],
      tableData: [
        { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com', phone: '13800138000' },
        { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com', phone: '13900139000' },
        { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com', phone: '13700137000' }
      ]
    }
  },
  methods: {
    handleColumnConfirm(updatedColumns) {
      this.columnConfigs = updatedColumns
      // this.tableKey++ // 强制表格重新渲染
      console.log(
        '外部表格列顺序：',
        this.columnConfigs.map((col) => col.label)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
