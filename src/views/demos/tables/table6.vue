<template>
  <div class="app-container">

    <el-table :data="tableData" :stripe="true" :header-cell-style="headerCellStyle" :cell-style="cellStyle" :row-class-name="rowClassName" border @expand-change="expandChange">

      <el-table-column type="expand">
        <template slot-scope="props">

          <el-table :data="props.row.datas" :stripe="true" :header-cell-style="headerCellStyle" :cell-style="cellStyle" :row-class-name="rowClassName" border @expand-change="expandChange">

            <el-table-column type="expand">
              <template slot-scope="props2">
                <el-table :data="props2.row.datas" :stripe="true" :header-cell-style="headerCellStyle" :cell-style="cellStyle" :row-class-name="rowClassName" border>
                  <el-table-column prop="date" label="下单日期" width="180" />
                  <el-table-column prop="type" label="单据类型" width="180" />
                  <el-table-column prop="status" label="状态" />
                </el-table>
              </template>

            </el-table-column>
            <el-table-column prop="applyNo" label="申请单号" width="132.2" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="address" label="地址" />
          </el-table>

        </template>
      </el-table-column>

      <el-table-column prop="applyNo" label="申请单号" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作" width="120">
        <template>
          <el-button type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
// import { getDeptList } from '@/api/base/base'
// import { getDictLevel, getListData, getDataById, addData, deleteData, editData, exportById } from '@/api/tables/tables'

export default {
  components: {},
  data() {
    return {
      tableHeight: 170,
      tableLoading: false,
      tableData: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.tableData = [
        {
          id: 1,
          applyNo: '202004291234',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄',
          datas: []
        },
        {
          id: 2,
          applyNo: '202004291235',
          name: '李四',
          address: '上海市普陀区金沙江路 1517 弄',
          datas: []
        },
        {
          id: 3,
          applyNo: '202004291236,202004291237',
          name: '王五',
          address: '上海市普陀区金沙江路 1519 弄',
          datas: [
            {
              id: 31,
              applyNo: '202004291236',
              name: '王小五',
              address: '上海市普陀区金沙江路 1519 弄',
              datas: [
                {
                  id: 31,
                  date: '2016-05-01',
                  type: '类型1',
                  status: '已发货'
                },
                {
                  id: 32,
                  date: '2016-05-01',
                  type: '类型2',
                  status: '未发货'
                }
              ]
            },
            {
              id: 32,
              applyNo: '202004291237',
              name: '赵小六',
              address: '上海市普陀区金沙江路 1519 弄',
              datas: []
            }
          ]
        },
        {
          id: 4,
          applyNo: '202004291238',
          name: '赵六',
          address: '上海市普陀区金沙江路 1516 弄',
          datas: []
        }
      ]
    },
    // 设置表头样式
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      return { textAlign: 'center', background: '#E6E6E6' }
    },
    // 设置表内容样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return { textAlign: 'center' }
    },
    // 设置row样式
    rowClassName({ row, rowIndex }) {
      // console.log(JSON.stringify(row))
      const data = row
      const res = []
      if (data.datas && data.datas.length > 0) {
        res.push('row-expand-has')
        return res
      } else {
        res.push('row-expand-unhas')
        return res
      }
    },
    // 判断当前行展开状态（通过唯一标识）
    expandChange(row, rows) {
      const isExpend = rows.some((r) => r.id === row.id)
      console.log('isExpend', isExpend)
      if (isExpend) {
        // Do some things
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .row-expand-unhas .el-table__expand-column {
    pointer-events: none;
  }
  .row-expand-unhas .el-table__expand-column .el-icon {
    visibility: hidden;
  }
}
</style>
