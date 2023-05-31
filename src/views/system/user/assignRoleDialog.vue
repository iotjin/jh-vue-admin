<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="60%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="bs-dialog input-width">
        <div style="margin:-10px 0px 20px;"> 选中用户：{{ userData.name }} </div>
        <el-row :gutter="10" class="dialog-body">
          <!-- 可分配角色 -->
          <el-col :span="11">
            <div class="role-title"> 可分配角色 </div>
            <el-form :inline="true" size="small" class="role-left">
              <div class="role-search">
                <el-form-item>
                  <el-input v-model="nameK" maxlength="20" placeholder="请输入角色名称" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button class="bs-form-btn" size="small" type="primary" @click="requestList('K')">查询</el-button>
                </el-form-item>
              </div>
              <el-table v-loading="isLoadingK" :data="tableDataK" :max-height="tableHeight" border @selection-change="onSelectionChangeK">
                <el-table-column type="selection" />
                <el-table-column prop="name" label="角色名称" />
                <el-table-column prop="code" label="角色编号" />
              </el-table>
            </el-form>
          </el-col>
          <el-col :span="2">
            <div class="role-center">
              <i class="el-icon-arrow-left" @click="onClickArrowLeft()" />
              <br>
              <i class="el-icon-arrow-right" @click="onClickArrowRight()" />
            </div>
          </el-col>
          <!-- 已分配角色 -->
          <el-col :span="11">
            <div class="role-title"> 已分配角色 </div>
            <el-form :inline="true" size="small" class="role-right">
              <div class="role-search">
                <el-form-item>
                  <el-input v-model="nameY" maxlength="20" placeholder="请输入角色名称" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button class="bs-form-btn" size="small" type="primary" @click="requestList('Y')">查询</el-button>
                </el-form-item>
              </div>
              <el-table v-loading="isLoadingY" :data="tableDataY" :max-height="tableHeight" border @selection-change="onSelectionChangeY">
                <el-table-column type="selection" />
                <el-table-column prop="name" label="角色名称" />
                <el-table-column prop="code" label="角色编号" />
              </el-table>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="bs-dialog-footer" style="padding-top: 30px;">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit()">保存</el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleListByUserId } from '@/api/system/role'
import { assignRole } from '@/api/system/user'

export default {
  components: {},
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    // 传参
    dialogData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      // 弹框相关
      dialogTitle: '分配角色',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      userData: {},
      tableHeight: 400,
      isLoadingK: false,
      nameK: '',
      tableDataK: [],
      selectedRowsK: [],
      isLoadingY: false,
      nameY: '',
      tableDataY: [],
      selectedRowsY: []
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.$emit('update:isShow', val) // isShowDialog改变时同步父组件isShow的值
    },
    dialogData: function(val) {
      this.userData = JSON.parse(JSON.stringify(val))
    }
  },
  created() {},
  methods: {
    // 弹框相关
    onOpenedDialog() {
      this.requestList('K')
      this.requestList('Y')
    },
    onClosedDialog() {
      this.$emit('closed', {})
    },
    requestList(type) {
      var params = { userId: this.userData.id }
      params.name = type === 'K' ? this.nameK : this.nameY
      params.status = type === 'K' ? '0' : '1'
      console.log(JSON.stringify(params))
      this.handleLoading(true, type)
      getRoleListByUserId(params)
        .then((res) => {
          this.handleLoading(false, type)
          if (res.code === 20000) {
            if (type === 'K') {
              this.tableDataK = res.data
            } else {
              this.tableDataY = res.data
            }
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          this.handleLoading(false, type)
          console.log(JSON.stringify(error))
        })
    },
    handleLoading(isShow, type) {
      if (type === 'K') {
        this.isLoadingK = isShow
      } else {
        this.isLoadingY = isShow
      }
    },
    onSelectionChangeK(row) {
      this.selectedRowsK = row
    },
    onSelectionChangeY(row) {
      this.selectedRowsY = row
    },
    onClickArrowLeft() {
      if (this.selectedRowsY.length === 0) {
        this.$message.warning('请选择需要移除的已分配角色！')
        return
      }
      this.tableDataK = this.selectedRowsY.concat(this.tableDataK)
      this.tableDataY = this.tableDataY.filter((item1) => !this.selectedRowsY.some((item2) => item1.id === item2.id))
    },
    onClickArrowRight() {
      if (this.selectedRowsK.length === 0) {
        this.$message.warning('请选择需要添加的可分配角色！')
        return
      }
      this.tableDataY = this.selectedRowsK.concat(this.tableDataY)
      this.tableDataK = this.tableDataK.filter((item1) => !this.selectedRowsK.some((item2) => item1.id === item2.id))
    },
    onDialogSubmit() {
      this.submitRequest()
    },
    submitRequest() {
      const roleIds = this.tableDataY.map((item) => item.id)
      var params = { id: this.userData.id, roleIds: roleIds }
      console.log(JSON.stringify(params))
      this.dialogSubmitBtnLoading = true
      assignRole(params)
        .then((res) => {
          this.dialogSubmitBtnLoading = false
          if (res.code === 20000) {
            this.$message.success('分配角色成功!')
            this.isShowDialog = false
            this.$emit('success', {})
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          this.dialogSubmitBtnLoading = false
          console.log(JSON.stringify(error))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  // margin-top: -10px;
  background: white;
}

.role-title {
  padding: 10px;
  text-align: center;
  color: #000;
  background: #f1f1f1;
}

.role-search {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.dialog-body .role-left,
.dialog-body .role-right {
  padding: 10px;
  border: 1px solid #f1f1f1;
}

.dialog-body .role-center {
  text-align: center;
  padding-top: 110px;
}

.dialog-body .role-center > i {
  font-size: 22px;
  cursor: pointer;
  margin-top: 10px;
}

.dialog-body .role-center > i:hover {
  color: #2aa7e8;
}

.input-width ::v-deep .el-form-item__content {
  width: 100%;
}
</style>
