<template>
  <div>
    <!-- add/edit dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="55%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="bs-dialog">
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="true" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
          <el-form-item label="角色名称:" prop="name">
            <el-input v-model="dialogFormData.name" placeholder="请输入角色名称" clearable />
          </el-form-item>
          <el-form-item label="角色编码:" prop="code">
            <el-input v-model="dialogFormData.code" placeholder="请输入角色编码" clearable />
          </el-form-item>
          <el-form-item label="备注:" prop="notes">
            <el-input v-model="dialogFormData.notes" placeholder="请输入备注" type="textarea" maxlength="100" show-word-limit clearable />
          </el-form-item>
          <el-form-item v-if="dialogType!=='add'" label="是否内置:" prop="builtin">
            <el-radio-group v-model="dialogFormData.builtin">
              <el-radio label="1" disabled>是</el-radio>
              <el-radio label="0" disabled>否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div v-if="!dialogIsLook" slot="footer" class="bs-dialog-footer">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit()"> 保存 </el-button>
          <el-button size="small" @click="isShowDialog = false"> 取消 </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, editRole, saveRole } from '@/api/system/role'

export default {
  components: {},
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
        id: '',
        name: '',
        code: '',
        notes: '',
        builtin: '0'
      },
      initFormData: {},
      dialogFormRules: {
        name: [
          { required: true, message: '请输入', trigger: ['blur'] },
          { min: 1, max: 32, message: '32字符以内', trigger: ['blur'] }
        ],
        code: [
          { required: true, message: '请输入', trigger: ['blur'] },
          { min: 1, max: 32, message: '32字符以内', trigger: ['blur'] }
        ]
      }
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.$emit('update:isShow', val) // isShowDialog改变时同步父组件isShow的值
    },
    title: function(val) {
      this.dialogTitle = val.length ? val : this.dialogTitle
    },
    dialogData: function(val) {
      if (this.dialogType === 'add') {
        // 新增使用的初始值
        this.dialogFormData = JSON.parse(JSON.stringify(this.initFormData))
      } else {
        this.dialogFormData = JSON.parse(JSON.stringify(val))
      }
    },
    dialogType: function(val) {
      this.dialogTitle = this.title || (val === 'add' ? '新增' : val === 'edit' ? '编辑' : val === 'look' ? '查看' : this.dialogTitle)
      this.dialogIsLook = val === 'look'
    }
  },
  created() {
    this.initFormData = JSON.parse(JSON.stringify(this.dialogFormData))
  },
  methods: {
    // 弹框相关
    onOpenedDialog() {},
    onClosedDialog() {
      if (!this.dialogIsLook) {
        this.$refs['dialogFormRef'].resetFields() // 仅清除验证
      }
      this.$emit('closed', {})
    },
    onDialogSubmit() {
      this.$refs['dialogFormRef'].validate((valid) => {
        if (valid) {
          this.submitRequest()
        }
      })
    },
    submitRequest() {
      var params = JSON.parse(JSON.stringify(this.dialogFormData))
      console.log(JSON.stringify(params))
      const msg = this.dialogType === 'edit' ? '编辑成功!' : '新增成功!'
      this.dialogSubmitBtnLoading = true
      saveRole(params)
        .then((res) => {
          this.dialogSubmitBtnLoading = false
          if (res.code === 20000) {
            this.$message.success(msg)
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
    },
    submitRequest2() {
      var params = JSON.parse(JSON.stringify(this.dialogFormData))
      console.log(JSON.stringify(params))
      this.dialogSubmitBtnLoading = true
      if (this.dialogType === 'add') {
        addRole(params)
          .then((res) => {
            this.dialogSubmitBtnLoading = false
            if (res.code === 20000) {
              this.$message.success('新增成功!')
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
      if (this.dialogType === 'edit') {
        editRole(params)
          .then((res) => {
            this.dialogSubmitBtnLoading = false
            if (res.code === 20000) {
              this.$message.success('编辑成功!')
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
}
</script>

<style lang="scss" scoped>

</style>
