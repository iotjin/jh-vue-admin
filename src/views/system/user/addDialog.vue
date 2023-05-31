<template>
  <div>
    <!-- add/edit dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="55%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="bs-dialog input-width">
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="true" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="dialogFormData.name" placeholder="请输入姓名" clearable />
          </el-form-item>
          <el-form-item label="用户名:" prop="loginName">
            <el-input v-model="dialogFormData.loginName" :disabled="dialogType !== 'add'" placeholder="请输入用户名" clearable />
          </el-form-item>
          <el-form-item label="员工编号:" prop="userNumber">
            <el-input v-model.number="dialogFormData.userNumber" :disabled="dialogType !== 'add'" placeholder="请输入员工编号" clearable />
          </el-form-item>
          <el-form-item label="部门:" prop="deptId">
            <el-select v-model="dialogFormData.deptId" placeholder="请选择部门" collapse-tags clearable>
              <el-option v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户有效期至:" prop="userExpiryDate">
            <el-date-picker v-model="dialogFormData.userExpiryDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="dialogFormData.phone" placeholder="请输入手机号" clearable />
          </el-form-item>
          <el-form-item label="级别:" prop="level">
            <el-select v-model="dialogFormData.level" placeholder="请选择级别" collapse-tags clearable>
              <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="补助:" prop="money">
            <el-input v-model="dialogFormData.money" placeholder="请输入金额" clearable />
          </el-form-item>
          <el-form-item label="年龄:" prop="age">
            <el-input v-model="dialogFormData.age" placeholder="请输入年龄" clearable />
          </el-form-item>
          <el-form-item v-if="dialogType!=='add'" label="登录时间:" prop="loginDate">
            <el-date-picker v-model="dialogFormData.loginDate" disabled type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <el-form-item v-if="dialogType!=='add'" label="登录IP:" prop="loginIp">
            <el-input v-model="dialogFormData.loginIp" disabled />
          </el-form-item>
          <el-form-item v-if="dialogType!=='add'" label="创建时间:" prop="createDate">
            <el-date-picker v-model="dialogFormData.createDate" disabled type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <el-form-item v-if="dialogType!=='add'" label="更新时间:" prop="updateDate">
            <el-date-picker v-model="dialogFormData.updateDate" disabled type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <el-form-item v-if="dialogType!=='add'" label="操作人:" prop="updateBy">
            <el-input v-model="dialogFormData.updateBy" disabled />
          </el-form-item>
          <el-form-item label="备注:" prop="notes">
            <el-input v-model="dialogFormData.notes" placeholder="请输入备注" type="textarea" maxlength="100" show-word-limit clearable />
          </el-form-item>
          <el-form-item label="状态:" prop="status">
            <el-radio-group v-model="dialogFormData.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
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
import { getDictDept, getDictLevel } from '@/api/base/base'
import { addUser, editUser, saveUser } from '@/api/system/user'
import * as checkUtils from '@/utils/checkUtils'
import { REGEX_phone } from '@/utils/checkUtils'

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
    var validate1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入'))
      } else {
        if (value.toString().length !== 8) {
          callback(new Error('请输入8位数字'))
        }
        callback()
      }
    }
    return {
      // 弹框相关
      dialogTitle: '提示',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      dialogFormData: {
        id: '',
        name: '',
        loginName: '',
        userNumber: '',
        userExpiryDate: '',
        deptId: '',
        status: '',
        notes: '',
        phone: '',
        age: '',
        money: '',
        level: '',
        loginDate: '',
        loginIp: '',
        createDate: '',
        updateDate: '',
        updateBy: ''
      },
      initFormData: {},
      dialogFormRules: {
        name: [
          { required: true, message: '请输入', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '10字符以内', trigger: ['blur', 'change'] }
        ],
        loginName: [
          { required: true, message: '请输入', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '10字符以内', trigger: ['blur', 'change'] }
        ],
        userNumber: [
          { required: true, message: '请输入', trigger: ['blur', 'change'] },
          { type: 'number', message: '请输入8位数字1', trigger: ['blur', 'change'] },
          { validator: validate1, trigger: ['blur', 'change'] }
        ],
        userExpiryDate: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        deptId: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        status: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        phone: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: REGEX_phone, message: '请输入正确手机号' }
        ],
        level: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        notes: [
          { required: false, message: '请输入', trigger: ['blur', 'change'] },
          { min: 1, max: 100, message: '100字符以内', trigger: ['blur', 'change'] }
        ],
        age: [
          { required: false, message: '请输入', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '仅支持录入正整数' }
        ],
        money: [
          { required: false, message: '请输入', trigger: 'blur' },
          { pattern: checkUtils.REGEX_money, message: '请输入最多两位小数金额' }
        ]
      },
      // 字典项
      deptOptions: [],
      levelOptions: []
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
    this.requestDictDept()
    this.requestDictLevel()
  },
  methods: {
    // 字典
    requestDictDept() {
      getDictDept().then((res) => {
        if (res.code === 20000) {
          this.deptOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    requestDictLevel() {
      getDictLevel().then((res) => {
        if (res.code === 20000) {
          this.levelOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 弹框相关
    onOpenedDialog() {
      if (this.dialogType === 'add') {
        this.$refs['dialogFormRef'].clearValidate() // 清空校验
      }
      if (!this.deptOptions.length) {
        this.requestDictDept()
      }
      if (!this.levelOptions.length) {
        this.requestDictLevel()
      }
    },
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
      saveUser(params)
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
        addUser(params)
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
        editUser(params)
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
$inputWidth: null;
// $inputWidth: 300px;

.input-width ::v-deep .el-form-item__content {
  width: $inputWidth;
}
.input-width ::v-deep .el-input .el-input__inner {
  width: $inputWidth;
}

.input-width ::v-deep .el-form-item__content .el-input {
  width: $inputWidth;
}

.input-width ::v-deep .el-textarea {
  width: $inputWidth;
}
</style>
