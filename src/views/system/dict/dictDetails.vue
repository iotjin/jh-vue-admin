<template>
  <div>
    <div v-if="!tableData.length">
      <div class="vertical-line">点击字典查看详情</div>
    </div>

    <div v-else>
      <!-- Search start -->
      <el-form :inline="true" size="small" :model="queryParams" class="bs-form-search">
        <el-form-item style="margin-right: 25px;" class="search-input">
          <el-input v-model="queryParams.keyword" maxlength="20" placeholder="字典标签 / 字典值" clearable @keyup.enter.native="onSearch" />
        </el-form-item>
        <el-form-item>
          <el-button class="bs-form-btn" style="margin-left: 0px;" size="small" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- Search end -->
      <!-- Table start -->
      <div class="bs-page-table" style="padding:0px;">
        <div class="bs-table-btns">
          <el-button v-permission="{action:'dict-item-add'}" size="mini" type="primary" icon="el-icon-plus" @click="onClickAdd"> 新增 </el-button>
          <el-button v-permission="{action:'dict-item-edit'}" size="mini" type="primary" icon="el-icon-edit" :disabled="selectedRows.length!==1" @click="onClickEdit"> 编辑 </el-button>
          <el-button v-permission="{action:'dict-item-delete'}" size="mini" type="danger" icon="el-icon-delete" :disabled="selectedRows.length==0" @click="onClickDelete"> 删除 </el-button>
        </div>
        <el-table ref="tableRef" v-loading="tableLoading" class="bs-table" :data="tableData" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" @selection-change="onSelectionChange">
          <el-table-column type="selection" width="55" :selectable="isEditable" />
          <el-table-column label="字典标签" width>
            <template slot-scope="scope">
              <span @click="onClickRow(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.label }}</a> </span>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="字典值" width />
          <el-table-column prop="type" label="所属字典" width />
          <el-table-column prop="sort" label="排序" />
          <el-table-column label="备注" min-width="100">
            <template slot-scope="scope">
              <el-tooltip :visible-arrow="false" effect="light" :content="scope.row.notes" placement="bottom">
                <span class="bs-tooltip-text"> {{ scope.row.notes }} </span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button v-permission="{action:'dict-item-edit'}" size="mini" icon="el-icon-edit-outline" :disabled="!isEditable(scope.row)" @click="onClickEdit(scope.row)" />
              <el-button v-permission="{action:'dict-item-delete'}" size="mini" icon="el-icon-delete" type="danger" :disabled="!isEditable(scope.row)" @click="onClickDelete(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <Pagination v-show="tableTotal>0" :total="tableTotal" :page.sync="queryParams.page" :limit.sync="queryParams.limit" @pagination="requestList" />
      </div>
      <!-- Table end -->
    </div>

    <!-- add/edit dict item dialog -->
    <AddItemDialog :dialog-type="dialogType" :is-show.sync="isShowDialog" :dialog-data="dialogFormData" @success="requestList" />

  </div>
</template>

<script>
import { getDictItemList, deleteDictItem } from '@/api/system/dict'
import Pagination from '@/components/Pagination'
import AddItemDialog from './addItemDialog'

export default {
  components: {
    Pagination,
    AddItemDialog
  },
  props: {
    // 传参
    data: { type: Object, default: () => ({}) }
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
      dictTypeData: {},
      // 弹框相关
      isShowDialog: false,
      dialogType: '',
      dialogFormData: {}
    }
  },
  watch: {
    data: function(val) {
      if (val) {
        this.dictTypeData = JSON.parse(JSON.stringify(val))
        this.requestList()
      } else {
        this.dictTypeData = {}
        this.tableData = []
        this.tableTotal = 0
      }
    }
  },
  created() {},
  methods: {
    requestList() {
      var params = JSON.parse(JSON.stringify(this.queryParams))
      params.type = this.dictTypeData.type
      console.log(JSON.stringify(params))

      this.tableLoading = true
      getDictItemList(params)
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
    onSelectionChange(val) {
      this.selectedRows = val
    },
    // 操作按钮
    onClickAdd() {
      this.dialogType = 'add'
      this.dialogFormData = {
        id: '',
        label: '',
        value: '',
        sort: '',
        type: this.dictTypeData.type,
        builtin: '0',
        notes: ''
      }
      this.isShowDialog = true
    },
    onClickEdit(row) {
      const params = JSON.parse(JSON.stringify(row && row.id ? row : this.selectedRows[0]))
      this.dialogType = 'edit'
      this.dialogFormData = params
      this.isShowDialog = true
    },
    onClickLook(row) {
      const params = JSON.parse(JSON.stringify(row && row.id ? row : this.selectedRows[0]))
      this.dialogType = 'look'
      this.dialogFormData = params
      this.isShowDialog = true
    },
    onClickDelete(row) {
      var name = ''
      if (row && row.id) {
        name = row.label
      } else {
        name = this.selectedRows.map((item) => item.label).join(',')
      }

      this.$confirm(`确定要删除字典项 ${name} ，此操作将永久删除, 是否继续?`, '提示', {
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
      deleteDictItem(params).then((res) => {
        if (res.code === 20000) {
          this.$message.success('删除成功!')
          this.requestList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 通过下划线点击row
    onClickRow(row) {
      this.dialogType = 'look'
      this.dialogFormData = JSON.parse(JSON.stringify(row))
      this.isShowDialog = true
    },
    // 弹框相关
    onClosedDialog() {
      this.$refs.tableRef.clearSelection()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input ::v-deep .el-form-item__content .el-input {
  width: 260px;
}

.vertical-line {
  position: relative;
  padding: 15px;
  line-height: 20px;
  border-left: 5px solid #ddd;
  color: #333;
  font-family: Courier New, serif;
  font-size: 12px;
}
</style>

