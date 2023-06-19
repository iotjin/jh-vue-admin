<template>
  <div class="bs-page-body">
    <Hamburger />
    <!-- Search start -->
    <el-form :inline="true" size="small" :model="queryParams" class="bs-form-search mt10">
      <el-form-item>
        <span class="bs-form-label" style="width:80px"> <i class="icon">姓名:</i> </span>
        <el-input v-model="queryParams.name" maxlength="20" placeholder="请输入姓名" clearable @keyup.enter.native="onSearch" />
      </el-form-item>
      <el-form-item>
        <span class="bs-form-label"> <i class="icon">员工编号:</i> </span>
        <el-input v-model="queryParams.userNumber" maxlength="20" placeholder="请输入员工编号" clearable @keyup.enter.native="onSearch" />
      </el-form-item>
      <el-form-item>
        <span class="bs-form-label" style="width:80px"> <i class="icon">部门:</i> </span>
        <el-select v-model="queryParams.deptId" placeholder="请选择" collapse-tags clearable>
          <el-option v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <span class="bs-form-label" style="width:100px"> <i class="icon">创建时间:</i> </span>
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy年MM月dd日" />
      </el-form-item>
      <el-form-item>
        <el-button class="bs-form-btn" size="small" type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- Search end -->

    <!-- Table start -->
    <div class="bs-page-table">
      <div class="bs-table-btns">
        <el-button v-permission="{action:'user-add'}" size="small" type="primary" icon="el-icon-plus" @click="onClickAdd"> 新增 </el-button>
        <el-button v-permission="{action:'user-edit'}" size="small" type="primary" icon="el-icon-edit" :disabled="selectedRows.length!==1" @click="onClickEdit"> 编辑 </el-button>
        <el-button v-permission="{action:'user-look'}" size="small" type="primary" icon="el-icon-search" :disabled="selectedRows.length!==1" @click="onClickLook"> 查看 </el-button>
        <el-button v-permission="{action:'user-export'}" size="small" type="warning " icon="el-icon-download" @click="onClickExport"> 导出 </el-button>
        <el-button v-permission="{action:'user-delete'}" size="small" type="danger" icon="el-icon-delete" :disabled="selectedRows.length==0" @click="onClickDelete"> 删除 </el-button>
        <el-button v-permission="{action:'user-assign'}" size="small" type="warning" icon="el-icon-setting" :disabled="selectedRows.length!==1" @click="onClickAssignRole"> 角色分配 </el-button>
      </div>
      <el-table ref="tableRef" v-loading="tableLoading" class="bs-table" :data="tableData" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" @selection-change="onSelectionChange">
        <el-table-column prop="number" type="index" label="序号" />
        <el-table-column type="selection" width="55" :selectable="isEditable" />
        <el-table-column label="姓名" width>
          <template slot-scope="scope">
            <span @click="onClickRow(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.name }}</a> </span>
          </template>
        </el-table-column>
        <el-table-column prop="loginName" label="用户名" min-width="120" />
        <el-table-column prop="userNumber" label="员工编号" min-width="100" sortable />
        <el-table-column label="部门" min-width="130">
          <template slot-scope="scope">
            <div>{{ getDictLabel(scope.row.deptId, deptOptions) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{ scope.row.status ==='0' ?'停用':'启用' }} -->
            <div :style="{'background':getBgColor(scope.row)}" class="tagClass"> {{ scope.row.status ==='0' ?'停用':'启用' }} </div>
          </template>
        </el-table-column>
        <el-table-column prop="userExpiryDate" label="用户有效期至" sortable min-width="130" />
        <el-table-column label="级别" width="80">
          <template slot-scope="scope">
            <!-- <div class="b-tag-success">{{ getDictLabel(scope.row.level, levelOptions) }}</div> -->
            <div :class="scope.row.level=='1' ? 'b-tag-success' : (scope.row.level=='2' ? 'b-tag-warning' :'b-tag-error') ">{{ getDictLabel(scope.row.level,levelOptions) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="100" />
        <!-- <el-table-column prop="notes" label="备注" min-width="100" show-overflow-tooltip /> -->
        <el-table-column label="备注" min-width="100">
          <template slot-scope="scope">
            <el-tooltip :visible-arrow="false" effect="light" :content="scope.row.notes" placement="bottom">
              <span class="bs-tooltip-text"> {{ scope.row.notes }} </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="money" label="补助" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="loginDate" label="登录时间" min-width="180" />
        <el-table-column prop="loginIp" label="登录IP" min-width="150" />
        <el-table-column prop="createDate" label="创建时间" min-width="180" />
        <el-table-column prop="updateDate" label="更新时间" min-width="180" />
        <el-table-column prop="updateBy" label="操作人" /> -->
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button v-permission="{action:'user-edit'}" size="mini" icon="el-icon-edit-outline" :disabled="!isEditable(scope.row)" @click="onClickEdit(scope.row)" />
            <el-button v-permission="{action:'user-delete'}" size="mini" icon="el-icon-delete" type="danger" :disabled="!isEditable(scope.row)" @click="onClickDelete(scope.row)" />
            <el-button v-permission="{action:'user-resetPwd'}" size="mini" icon="el-icon-refresh-left" type="danger" :disabled="!isEditable(scope.row)" @click="onClickReset(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-show="tableTotal>0" :total="tableTotal" :page.sync="queryParams.page" :limit.sync="queryParams.limit" @pagination="requestList" />
    </div>
    <!-- Table end -->

    <!-- add/edit dialog -->
    <AddDialog :dialog-type="dialogType" :is-show.sync="isShowDialog" :dialog-data="dialogFormData" @success="requestList" @closed="onClosedDialog" />
    <!-- 角色分配-->
    <AssignRoleDialog :is-show.sync="isShowDialogAssignRole" :dialog-data="assignRoleUserData" />

  </div>
</template>

<script>
import { getDictDept, getDictLevel, getDictDeptAndLevel } from '@/api/base/base'
import { getUserList, deleteUser, resetPwd } from '@/api/system/user'
import Pagination from '@/components/Pagination'
import Hamburger from '@/components/Hamburger/index2'
import TimeUtils from '@/utils/timeUtils'
import AddDialog from './addDialog'
import AssignRoleDialog from './assignRoleDialog'

export default {
  components: {
    Pagination,
    Hamburger,
    AddDialog,
    AssignRoleDialog
  },
  data() {
    return {
      tableTotal: 0,
      tableLoading: false,
      tableData: [],
      queryParams: {
        page: 1,
        limit: this.pageGroup.size,
        startDate: '',
        endDate: '',
        name: '',
        userNumber: '',
        deptId: ''
      },
      dateRange: [],
      selectedRows: [], // 勾选一行或多行数据
      // 字典项
      deptOptions: [],
      levelOptions: [],
      // 弹框相关
      isShowDialog: false,
      dialogType: '',
      dialogFormData: {},
      isShowDialogAssignRole: false,
      assignRoleUserData: {}
    }
  },
  created() {
    this.requestDict()
    this.requestList()
  },
  methods: {
    requestDict() {
      getDictDeptAndLevel().then((res) => {
        if (res.code === 20000) {
          this.deptOptions = res.data.dept
          this.levelOptions = res.data.level
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    requestDict2() {
      getDictDept().then((res) => {
        if (res.code === 20000) {
          this.deptOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      getDictLevel().then((res) => {
        if (res.code === 20000) {
          this.levelOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    requestList() {
      var params = JSON.parse(JSON.stringify(this.queryParams))
      params.startDate = this.dateRange ? TimeUtils.startOfDay(this.dateRange[0]) : ''
      params.endDate = this.dateRange ? TimeUtils.endOfDay(this.dateRange[1]) : ''
      console.log(JSON.stringify(params))

      this.tableLoading = true
      getUserList(params)
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
      return !row.loginName.toLowerCase().includes('admin')
    },
    onSelectionChange(val) {
      this.selectedRows = val
    },
    getDictLabel(value, dictList) {
      const foundIndex = dictList.findIndex((item) => item.value === value)
      if (foundIndex !== -1) {
        return dictList[foundIndex].label
      }
    },
    getBgColor(row) {
      return row.status === '0' ? '#E6A23C' : '#67C23A'
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
    onClickExport() {
      if (this.selectedRows.length === 0) {
        var params = JSON.parse(JSON.stringify(this.queryParams))
        params.startDate = this.dateRange ? TimeUtils.startOfDay(this.dateRange[0]) : ''
        params.endDate = this.dateRange ? TimeUtils.endOfDay(this.dateRange[1]) : ''
        params.page = 0
        params.limit = 1000
        console.log(JSON.stringify(params))
        getUserList(params).then((response) => {
          const { data } = response
          this.handelExcel(data)
        })
      } else {
        this.handelExcel(this.selectedRows)
      }
    },
    handelExcel(tableData) {
      var newTableDate = {}
      newTableDate = tableData
      newTableDate.forEach((item) => {
        item.deptName = this.getDictLabel(item.deptId, this.deptOptions)
        item.statusText = item.status === '0' ? '停用' : '启用'
        item.levelName = this.getDictLabel(item.level, this.levelOptions)
      })
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['姓名', '用户名', '员工编号', '部门', '状态', '用户有效期至', '级别', '备注', '手机号']
        const filterVal = ['name', 'loginName', 'userNumber', 'deptName', 'statusText', 'userExpiryDate', 'levelName', 'notes', 'phone']
        const data = this.formatJson(filterVal, newTableDate)
        export_json_to_excel(tHeader, data, 'Excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    onClickDelete(row) {
      var name = ''
      if (row && row.id) {
        name = row.name
      } else {
        name = this.selectedRows.map((item) => item.name).join(',')
      }

      this.$confirm(`确定要删除用户 ${name} ，此操作将永久删除, 是否继续?`, '提示', {
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
      deleteUser(params).then((res) => {
        if (res.code === 20000) {
          this.$message.success('删除成功!')
          this.requestList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onClickAssignRole() {
      this.assignRoleUserData = JSON.parse(JSON.stringify(this.selectedRows[0]))
      this.isShowDialogAssignRole = true
    },
    // 通过下划线点击row
    onClickRow(row) {
      this.dialogType = 'look'
      this.dialogFormData = JSON.parse(JSON.stringify(row))
      this.isShowDialog = true
    },
    // 行操作
    onClickReset(row) {
      this.$confirm(`确定要重置 ${row.name} 的密码, 是否继续 ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { id: row.id }
        this.resetRequest(params)
      })
    },
    resetRequest(params) {
      console.log(JSON.stringify(params))
      resetPwd(params).then((res) => {
        if (res.code === 20000) {
          this.$message.success('重置密码成功!')
          this.requestList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 弹框相关
    onClosedDialog() {
      this.$refs.tableRef.clearSelection()
    }
  }
}
</script>

<style lang="scss" scoped>
.tagClass {
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  word-break: break-word;
}

.b-tag-warning {
  display: inline-block;
  margin: 0.2rem;
  padding: 5px 10px;
  font-size: 12px;
  color: #ffba00;
  background: #fff8e6;
  border: 1px solid #fff1cc;
  border-radius: 4px;
}

.b-tag-error {
  display: inline-block;
  margin: 0.2rem;
  padding: 5px 10px;
  font-size: 12px;
  color: #ff4949;
  background: #ffeded;
  border: 1px solid #ffdbdb;
  border-radius: 4px;
}

.b-tag-success {
  display: inline-block;
  margin: 0.2rem;
  padding: 5px 10px;
  font-size: 12px;
  color: #13ce66;
  background: #e7faf0;
  border: 1px solid #d0f5e0;
  border-radius: 4px;
}
</style>
