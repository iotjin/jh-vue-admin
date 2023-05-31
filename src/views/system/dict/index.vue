<template>
  <div class="bs-page-body">
    <Hamburger />
    <div class="mt10" />

    <!-- 字典列表 -->
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card>
          <!-- Search start -->
          <el-form :inline="true" size="small" :model="queryParams" class="bs-form-search">
            <el-form-item style="margin-right: 25px;" class="search-input">
              <el-input v-model="queryParams.keyword" maxlength="20" placeholder="字典名称 / 类型" clearable @keyup.enter.native="onSearch" />
            </el-form-item>
            <el-form-item>
              <el-button class="bs-form-btn" style="margin-left: 0px;" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- Search end -->
          <!-- Table start -->
          <div class="bs-page-table" style="padding:0px;">
            <div class="bs-table-btns">
              <el-button v-permission="{action:'dict-type-add'}" size="mini" type="primary" icon="el-icon-plus" @click="onClickAdd">新增 </el-button>
            </div>
            <el-table ref="tableRef" v-loading="tableLoading" class="bs-table table-class" highlight-current-row :data="tableData" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" @current-change="onCurrentChange">
              <el-table-column label="字典名称" width>
                <template slot-scope="scope">
                  <span @click="onClickLook(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.name }}</a> </span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="字典类型" width />
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button v-permission="{action:'dict-type-edit'}" size="mini" icon="el-icon-edit-outline" :disabled="!isEditable(scope.row)" @click="onClickEdit(scope.row)" />
                  <el-button v-permission="{action:'dict-type-delete'}" size="mini" icon="el-icon-delete" type="danger" :disabled="!isEditable(scope.row)" @click="onClickDelete(scope.row)" />
                </template>
              </el-table-column>
            </el-table>
            <Pagination v-show="tableTotal>0" :layout="layout" :total="tableTotal" :page.sync="queryParams.page" :limit.sync="queryParams.limit" @pagination="requestList" />
          </div>
          <!-- Table end -->
        </el-card>
      </el-col>
      <!-- 字典详情列表 -->
      <el-col :span="16">
        <el-card>
          <div slot="header">
            <span style="font-size: 20px;">字典详情</span>
          </div>
          <DictDetails :data="selectedData" />
        </el-card>
      </el-col>
    </el-row>

    <!-- add/edit dict type dialog -->
    <AddTypeDialog :dialog-type="dialogType" :is-show.sync="isShowDialog" :dialog-data="dialogFormData" @success="requestList" />

  </div>
</template>

<script>
import { getDictTypeList, deleteDictType } from '@/api/system/dict'
import Pagination from '@/components/Pagination'
import Hamburger from '@/components/Hamburger/index2'
import DictDetails from './dictDetails'
import AddTypeDialog from './addTypeDialog'

export default {
  components: {
    Pagination,
    Hamburger,
    DictDetails,
    AddTypeDialog
  },
  data() {
    return {
      tableTotal: 0,
      tableLoading: false,
      tableData: [],
      queryParams: {
        page: 1,
        limit: this.pageGroup.size,
        keyword: ''
      },
      selectedRows: [], // 勾选一行或多行数据
      selectedData: {}, // 选中的字典
      layout: 'total, sizes, prev, pager, next',
      // 弹框相关
      isShowDialog: false,
      dialogType: '',
      dialogFormData: {}
    }
  },
  created() {
    this.requestList()
  },
  methods: {
    requestList() {
      var params = JSON.parse(JSON.stringify(this.queryParams))
      console.log(JSON.stringify(params))

      this.tableLoading = true
      getDictTypeList(params)
        .then((res) => {
          this.tableLoading = false
          if (res.code === 20000) {
            this.tableData = res.data
            this.tableTotal = res.total
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          this.tableLoading = false
          console.log(JSON.stringify(error))
        })
    },
    onSearch() {
      this.queryParams.page = 1
      this.requestList()
    },
    isEditable: function(row) {
      return row.builtin === '0'
    },
    // 操作按钮
    onClickAdd() {
      this.dialogType = 'add'
      this.dialogFormData = {} // 新增使用的内部初始值
      this.isShowDialog = true
    },
    onClickEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormData = JSON.parse(JSON.stringify(row))
      this.isShowDialog = true
    },
    onClickLook(row) {
      this.dialogType = 'look'
      this.dialogFormData = JSON.parse(JSON.stringify(row))
      this.isShowDialog = true
    },
    onClickDelete(row) {
      var name = ''
      if (row && row.id) {
        name = row.name
      } else {
        name = this.selectedRows.map((item) => item.name).join(',')
      }

      this.$confirm(`确定要删除字典类型 ${name} ，此操作将永久删除, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = { ids: [] }
        if (row && row.id) {
          params.ids = [row.id]
        } else {
          const tempArr = this.selectedRows.map((item) => item.id)
          params.ids = tempArr.join(',')
        }
        this.deleteRequest(params)
      })
    },
    deleteRequest(params) {
      console.log(JSON.stringify(params))
      deleteDictType(params).then((res) => {
        if (res.code === 20000) {
          this.$message.success('删除成功!')
          this.requestList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onRowClick(row, column, event) {},
    onCurrentChange(currentRow, oldCurrentRow) {
      this.selectedData = JSON.parse(JSON.stringify(currentRow))
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input ::v-deep .el-form-item__content .el-input {
  width: 260px;
}

.table-class ::v-deep .el-table__body tr.current-row > td {
  background-color: #e8f4ff !important;
}
</style>
