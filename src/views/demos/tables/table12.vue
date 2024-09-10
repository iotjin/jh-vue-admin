<template>
  <div>
    <div style="margin: 20px;">
      <el-table ref="dragTable" :data="tableData" row-key="id" :stripe="false">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="date" label="日期" />
        <el-table-column label="Drag">
          <template slot-scope="{}">
            <div class="drag-handler">
              <i class="el-icon-rank" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 100 弄'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 200 弄'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 300 弄'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 400 弄'
        }
      ]
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.rowDrop()
    })
  },
  methods: {
    // 行拖拽
    rowDrop() {
      // 要侦听拖拽响应的DOM对象
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const that = this
      Sortable.create(tbody, {
        // dragClass: 'sortable-ghost1', // 设置拖拽样式类名
        ghostClass: 'sortable-ghost2', // 设置拖拽停靠样式类名
        // chosenClass: 'sortable-ghost3', // 设置选中样式类名
        // 结束拖拽后的回调函数
        onEnd({ newIndex, oldIndex }) {
          console.log('拖动了行，当前序号：' + newIndex)
          const currentRow = that.tableData.splice(oldIndex, 1)[0]
          that.tableData.splice(newIndex, 0, currentRow)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.custom-class {
  background: red;
}
.sortable-ghost1 {
  opacity: 0.8;
  background: #42b983 !important;
}
.sortable-ghost2 {
  opacity: 0.8;
  background: yellow !important;
}
.sortable-ghost3 {
  opacity: 0.8;
  background: red !important;
}
</style>

<style lang="scss" scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
