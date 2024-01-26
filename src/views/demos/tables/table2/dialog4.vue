<template>
  <div>
    <!-- 新增 编辑弹框 -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="60%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="spp-dialog">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="Staff Info" name="staffTab">
            <el-form ref="dialogFormRef" :model="dialogFormData" :inline="true" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
              <el-form-item label="操作人:" prop="name1">
                <el-input v-model="dialogFormData.name1" placeholder="请输入" clearable />
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Set Status" name="setStatusTab">
            <SetStatus :type="dialogType" :edit-status-list="editStatusList" @change="onChangeStatus" />
          </el-tab-pane>
        </el-tabs>

        <div v-if="!dialogIsLook" slot="footer" class="dialog-footer spp-dialog-btns">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit()">保存</el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SetStatus from './setStatus'

export default {
  components: {
    SetStatus
  },
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    // add，edit，look
    dialogType: { type: String, default: 'add' },
    // 传参
    dialogData: { type: Object, default: () => ({}) },
    // 标题：默认按类型设置为新增、编辑、查看，传值优先级更高
    title: { type: String, default: '' }
  },
  data() {
    return {
      // 弹框相关
      dialogTitle: '提示',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      dialogFormData: {
        name1: ''
      },
      dialogFormRules: {
        name1: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 10, message: '10字符以内', trigger: 'blur' }
        ]
      },
      activeName: 'staffTab',
      editStatusList: []
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.$emit('update:isShow', val) // isShowDialog改变时同步父组件isShow的值
    },
    dialogType: function(val) {
      this.dialogTitle = this.title || (val === 'add' ? '新增' : val === 'edit' ? '编辑' : val === 'look' ? '查看' : this.dialogTitle)
      this.dialogIsLook = val === 'look'
    },
    dialogData: function(val) {
      if (this.dialogType === 'add') {
        // 新增使用的初始值
        this.dialogFormData = JSON.parse(JSON.stringify(this.initFormData))
      } else {
        this.dialogFormData = JSON.parse(JSON.stringify(val))
      }
    },
    title: function(val) {
      this.dialogTitle = val.length ? val : this.dialogTitle
    }
  },
  created() {
    this.initFormData = JSON.parse(JSON.stringify(this.dialogFormData))
  },
  methods: {
    // 弹框相关
    onOpenedDialog() {
      if (this.dialogType === 'add') {
        this.$refs['dialogFormRef'].clearValidate() // 清空校验
      }

      // this.editStatusList = this.dialogType === 'add' ? [] : this.initFormData.statusList
      var statusList = [
        { statusId: 'status2', statusName: '状态2', canRead: true, canWrite: true, order: 1 },
        { statusId: 'status4', statusName: '状态4', canRead: true, canWrite: false, order: 2 }
      ]
      this.editStatusList = this.dialogType === 'add' ? [] : statusList
    },
    onClosedDialog() {
      if (!this.dialogIsLook) {
        this.$refs['dialogFormRef'].resetFields() // 仅清除验证
      }
      this.editStatusList = []
      this.$emit('closed', {})
    },
    onChangeStatus(arr) {
      this.dialogFormData.statusList = arr
    },
    onDialogSubmit() {
      this.$refs['dialogFormRef'].validate((valid) => {
        if (valid) {
          this.submitRequest()
        } else {
          this.$message.warning('Please check staff info.')
        }
      })
    },
    submitRequest() {
      const params = JSON.parse(JSON.stringify(this.dialogFormData))
      console.log('params', JSON.stringify(params))
      this.isShowDialog = false
      this.$emit('success', {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
