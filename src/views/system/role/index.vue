<template>
  <div class="bs-page-body">
    <Hamburger />
    <!-- Search start -->
    <el-form :inline="true" size="small" :model="queryParams" class="bs-form-search mt10">
      <el-form-item>
        <span class="bs-form-label" style="width:120px"> <i class="icon">角色名称:</i> </span>
        <el-input v-model="queryParams.name" maxlength="20" placeholder="请输入角色名称" clearable @keyup.enter.native="onSearch" />
      </el-form-item>
      <el-form-item>
        <span class="bs-form-label" style="width:120px"> <i class="icon">角色编码:</i> </span>
        <el-input v-model="queryParams.code" maxlength="20" placeholder="请输入角色编码" clearable @keyup.enter.native="onSearch" />
      </el-form-item>
      <el-form-item>
        <el-button class="bs-form-btn" size="small" type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- Search end -->

    <!-- Table start -->
    <div class="bs-page-table">
      <div class="bs-table-btns">
        <el-button v-permission="{action:'role-add'}" size="small" type="primary" icon="el-icon-plus" @click="onClickAdd"> 新增 </el-button>
        <el-button v-permission="{action:'role-edit'}" size="small" type="primary" icon="el-icon-edit" :disabled="selectedRows.length!==1" @click="onClickEdit"> 编辑 </el-button>
        <el-button v-permission="{action:'role-look'}" size="small" type="primary" icon="el-icon-search" :disabled="selectedRows.length!==1" @click="onClickLook"> 查看 </el-button>
        <el-button v-permission="{action:'role-delete'}" size="small" type="danger" icon="el-icon-delete" :disabled="selectedRows.length==0" @click="onClickDelete"> 删除 </el-button>
        <el-button v-permission="{action:'role-setting'}" size="small" type="warning" icon="el-icon-setting" :disabled="selectedRows.length!==1" @click="onClickAuthRole"> 权限配置 </el-button>
      </div>
      <el-table ref="tableRef" v-loading="tableLoading" class="bs-table" :data="tableData" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" @selection-change="onSelectionChange">
        <el-table-column prop="number" type="index" label="序号" />
        <el-table-column type="selection" width="55" :selectable="isEditable" />
        <el-table-column label="角色名称" width>
          <template slot-scope="scope">
            <span @click="onClickRow(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.name }}</a> </span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="角色编码" width />
        <el-table-column label="是否内置">
          <template slot-scope="scope"> {{ scope.row.builtin ==='0' ?'否':'是' }} </template>
        </el-table-column>
        <el-table-column label="备注" min-width="100">
          <template slot-scope="scope">
            <el-tooltip :visible-arrow="false" effect="light" :content="scope.row.notes" placement="bottom">
              <span class="bs-tooltip-text"> {{ scope.row.notes }} </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button v-permission="{action:'role-edit'}" size="mini" icon="el-icon-edit-outline" :disabled="!isEditable(scope.row)" @click="onClickEdit(scope.row)" />
            <el-button v-permission="{action:'role-delete'}" size="mini" icon="el-icon-delete" type="danger" :disabled="!isEditable(scope.row)" @click="onClickDelete(scope.row)" />
            <span style="padding-left: 10px;" />
            <el-dropdown>
              <el-button size="mini" :disabled="!isEditable(scope.row)"> 更多<i class="el-icon-arrow-down el-icon--right" /> </el-button>
              <el-dropdown-menu slot="dropdown" v-permission="{action:'role-setting'}" :disabled="!isEditable(scope.row)">
                <el-dropdown-item @click.native="onClickAuthRole(scope.row)"><i class="el-icon-setting" />权限配置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-show="tableTotal>0" :total="tableTotal" :page.sync="queryParams.page" :limit.sync="queryParams.limit" @pagination="requestList" />
    </div>
    <!-- Table end -->

    <!-- add/edit dialog -->
    <AddDialog :dialog-type="dialogType" :is-show.sync="isShowDialog" :dialog-data="dialogFormData" @success="requestList" @closed="onClosedDialog" />

    <!-- 权限设置 -->
    <AuthDialog :is-show.sync="isShowDialogAuthRole" :dialog-data="authRoleData" @success="requestList" @closed="onClosedDialog" />

  </div>
</template>

<script>
import { getRoleList, deleteRole } from '@/api/system/role'
import Pagination from '@/components/Pagination'
import Hamburger from '@/components/Hamburger/index2'
import AddDialog from './addDialog'
import AuthDialog from './authDialog'

export default {
  components: {
    Pagination,
    Hamburger,
    AddDialog,
    AuthDialog
  },
  data() {
    return {
      tableTotal: 0,
      tableLoading: false,
      tableData: [],
      queryParams: {
        page: 1,
        limit: this.pageGroup.size,
        name: '',
        code: ''
      },
      selectedRows: [], // 勾选一行或多行数据
      // 弹框相关
      isShowDialog: false,
      dialogType: '',
      dialogFormData: {},
      isShowDialogAuthRole: false,
      authRoleData: {}
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
      getRoleList(params)
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
      return !row.code.toLowerCase().includes('admin')
    },
    onSelectionChange(val) {
      this.selectedRows = val
    },
    // 操作按钮
    onClickAdd() {
      this.dialogType = 'add'
      this.dialogFormData = {} // 新增使用的内部初始值
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
        name = row.name
      } else {
        name = this.selectedRows.map((item) => item.name).join(',')
      }

      this.$confirm(`确定要删除角色 ${name} ，此操作将永久删除, 是否继续?`, '提示', {
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
      deleteRole(params).then((res) => {
        if (res.code === 20000) {
          this.$message.success('删除成功!')
          this.requestList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onClickAuthRole(row) {
      const params = JSON.parse(JSON.stringify(row && row.id ? row : this.selectedRows[0]))
      this.authRoleData = params
      this.isShowDialogAuthRole = true
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
</style>
