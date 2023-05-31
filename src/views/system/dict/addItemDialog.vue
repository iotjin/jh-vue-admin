<template>
  <div>
    <!-- add/edit dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="55%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="bs-dialog">
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="true" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
          <el-form-item label="字典标签:" prop="label">
            <el-input v-model="dialogFormData.label" placeholder="请输入字典标签" clearable />
          </el-form-item>
          <el-form-item label="字典值:" prop="value">
            <el-input v-model="dialogFormData.value" placeholder="请输入字典值" clearable />
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <el-input v-model="dialogFormData.sort" type="number" placeholder="请输入排序" clearable />
          </el-form-item>
          <el-form-item label="所属字典:" prop="type">
            <el-input v-model="dialogFormData.type" placeholder="" clearable disabled />
          </el-form-item>
          <el-form-item v-if="dialogType!=='add'" label="是否内置:" prop="builtin">
            <el-radio-group v-model="dialogFormData.builtin">
              <el-radio label="1" disabled>是</el-radio>
              <el-radio label="0" disabled>否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注:" prop="notes">
            <el-input v-model="dialogFormData.notes" placeholder="请输入备注" type="textarea" maxlength="100" show-word-limit clearable />
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
import { addDictItem, editDictItem, saveDictItem } from '@/api/system/dict'

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
        label: '',
        value: '',
        sort: '',
        type: '',
        builtin: '0',
        notes: ''
      },
      dialogFormRules: {
        label: [
          { required: true, message: '请输入', trigger: ['blur'] },
          { min: 1, max: 32, message: '32字符以内', trigger: ['blur'] }
        ],
        value: [
          { required: true, message: '请输入', trigger: ['blur'] },
          { min: 1, max: 32, message: '32字符以内', trigger: ['blur'] }
        ],
        sort: [
          { required: true, message: '请输入正确的排序号', trigger: ['blur'] },
          { pattern: /^[1-9]\d{0,2}$/, message: '请输入0-999之间的正整数', trigger: ['blur'] }
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
      this.dialogFormData = JSON.parse(JSON.stringify(val))
    },
    dialogType: function(val) {
      this.dialogTitle = this.title || (val === 'add' ? '新增' : val === 'edit' ? '编辑' : val === 'look' ? '查看' : this.dialogTitle)
      this.dialogIsLook = val === 'look'
    }
  },
  created() {},
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
      saveDictItem(params)
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
        addDictItem(params)
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
        editDictItem(params)
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
