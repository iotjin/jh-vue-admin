<template>
  <div>
    <!-- 新增 编辑弹框 -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="60%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="spp-dialog">
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="true" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
          <el-form-item label="操作人:" prop="name1">
            <el-input v-model="dialogFormData.name1" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="级别:" prop="level">
            <el-select v-model="dialogFormData.level" placeholder="请选择" collapse-tags clearable>
              <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="dialogFormData.phone" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="金额:" prop="money">
            <el-input v-model="dialogFormData.money" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="年龄:" prop="age">
            <el-input v-model="dialogFormData.age" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="创建时间:" prop="createDate">
            <el-date-picker v-model="dialogFormData.createDate" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <el-form-item label="更新时间:" prop="updateDate">
            <el-date-picker v-model="dialogFormData.updateDate" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <el-form-item label="处理状态:" prop="status">
            <el-select v-model="dialogFormData.status" placeholder="请选择" collapse-tags clearable>
              <el-option label="未处理" value="0" />
              <el-option label="已处理" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="内容:" prop="content">
            <el-input v-model="dialogFormData.content" placeholder="请输入" type="textarea" clearable />
          </el-form-item>
          <el-form-item label="启用:" prop="isUse">
            <el-radio-group v-model="dialogFormData.isUse">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div v-if="!dialogIsLook" slot="footer" class="dialog-footer spp-dialog-btns">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit(dialogFormData)">保存
          </el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getDeptList, getStationTree } from '@/api/base/base'
import { getDictLevel, addData, editData } from '@/api/tables/tables'
import * as checkUtils from '@/utils/checkUtils'
import { REGEX_phone } from '@/utils/checkUtils'

export default {
  components: {
  },
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    // 标题：新增、编辑、查看
    title: { type: String, default: '' },
    // 传参
    dialogData: { type: Object, default: () => ({}) },
    // add，edit，look
    dialogType: { type: String, default: 'add' },
    // 跳转页面：新增1，新增2，详情1，详情2
    jumpPage: { type: String, default: '' }
  },
  data() {
    return {
      levelOptions: [],
      // 弹框相关
      dialogTitle: '提示',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      dialogFormData: {
        name1: '',
        content: '',
        level: '',
        createDate: '',
        updateDate: '',
        isUse: '',
        status: '',
        phone: '',
        money: '',
        age: ''
      },
      dialogFormRules: {
        name1: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 10, message: '10字符以内', trigger: 'blur' }
        ],
        content: [
          { required: false, message: '请输入', trigger: 'blur' },
          { min: 1, max: 100, message: '100字符以内', trigger: 'blur' }
        ],
        level: [{ required: true, message: '请选择', trigger: 'blur' }],
        createDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        updateDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        status: [{ required: true, message: '请选择', trigger: 'blur' }],
        isUse: [{ required: true, message: '请选择', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: REGEX_phone, message: '请输入正确手机号' }
        ],
        money: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: checkUtils.REGEX_money, message: '请输入最多两位小数金额' }
        ],
        age: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '仅支持录入正整数' }
        ]
      }
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.showDialog(val)
    },
    title: function(val) {
      this.dialogTitle = val.length ? val : this.dialogTitle
      this.dialogIsLook = val === '查看'
    },
    dialogData: function(val) {
      this.dialogFormData = val
    },
    dialogType: function(val) {
      this.dialogTitle = val === 'add' ? '新增' : (val === 'edit' ? '编辑' : (val === 'look' ? '查看' : this.dialogTitle))
      this.dialogIsLook = val === 'look'
    }
  },
  mounted() {
  },
  methods: {
    showDialog(isShow) {
      this.$emit('update:isShow', isShow) // isShowDialog改变时同步父组件show的值
    },
    // 字典
    requestDict() {
      var that = this
      // getDeptList().then(res => {
      //   if (res.code === 20000) {
      //     that.deptOptions = res.data
      //   }
      // }).catch(error => {
      //   console.log(JSON.stringify(error))
      // })
      getDictLevel().then(res => {
        if (res.code === 20000) {
          that.levelOptions = res.data
        }
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    },
    getName(value, data) {
      var tempData = data
      for (var i = 0; i < tempData.length; i++) {
        if (tempData[i].value === value) {
          return tempData[i].label
        }
      }
    },
    // 弹框相关
    onOpenedDialog() {
      this.requestDict()
    },
    onClosedDialog() {
      if (!this.dialogIsLook) {
        this.$refs['dialogFormRef'].resetFields() // 仅清除验证
      }
      this.$emit('closed', {}) // 传出选择对象
    },
    onDialogSubmit() {
      this.$refs['dialogFormRef'].validate((valid) => {
        if (valid) {
          this.submitRequest()
        }
      })
    },
    submitRequest() {
      var that = this
      this.dialogSubmitBtnLoading = true

      var params = {}
      params = this.dialogFormData
      console.log(JSON.stringify(params))

      if (this.dialogTitle === '新增') {
        addData(params).then(res => {
          that.dialogSubmitBtnLoading = false
          if (res.code === 20000) {
            that.$message.success('保存成功!')
            that.isShowDialog = false
            that.$emit('success', {}) // 传出选择对象
          } else {
            that.$message.error(res.msg)
          }
        }).catch(error => {
          that.dialogSubmitBtnLoading = false
          console.log(JSON.stringify(error))
        })
      }
      if (this.dialogTitle === '编辑') {
        editData(params).then(res => {
          that.dialogSubmitBtnLoading = false
          if (res.code === 20000) {
            that.$message.success('保存成功!')
            that.isShowDialog = false
            that.$emit('success', {}) // 传出选择对象
          } else {
            that.$message.error(res.msg)
          }
        }).catch(error => {
          that.dialogSubmitBtnLoading = false
          console.log(JSON.stringify(error))
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: 65vh;
  overflow: auto;
  border: 1px solid gray;
  background: yellow;
}
.left {
  flex: 25;
  min-width: 25%;
  max-height: 60vh;
  overflow-x: auto;
  overflow-y: auto;
  background: orange;
}
.right {
  flex: 75;
  min-width: 60%;
  background: red;
}
.footer-center {
  text-align: center;
}
</style>
