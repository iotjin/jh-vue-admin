<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="70%" :close-on-click-modal="false" @open="onOpenDialog" @opened="onOpenedDialog" @closed="onClosedDialog">

      <div v-loading.fullscreen.lock="dialogLoading" class="spp-dialog">
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="false" :rules="dialogFormRules" size="small" label-width="200px" :disabled="dialogIsLook">
          <el-form-item label="有效期延长到:" prop="expireTime">
            <el-date-picker v-model="dialogFormData.expireTime" style="width:310px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable />
          </el-form-item>
          <el-form-item label="负责人签名:" prop="signPicture">
            <img :src="dialogFormData.signPicture" style="width:200px;height:50px;">
          </el-form-item>
          <el-form-item label="签字时间:" prop="signTime">
            <el-date-picker v-model="dialogFormData.signTime" style="width:310px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable />
          </el-form-item>
          <el-form-item label="备注:" prop="notes">
            <el-input v-model="dialogFormData.notes" style="width:310px" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" />
          </el-form-item>
        </el-form>
      </div>

      <div v-if="!dialogIsLook" slot="footer" class="dialog-footer spp-dialog-btns">
        <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit(dialogFormDataData)">确定</el-button>
        <el-button size="small" @click="isShowDialog = false">取消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
// import { getDeptList, getStationTree } from '@/api/base/base'
import { getDictLevel, addData, editData } from '@/api/tables/tables'
import * as checkUtils from '@/utils/checkUtils'
import { REGEX_phone } from '@/utils/checkUtils'
import TimeUtils from '@/utils/timeUtils'
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
    var validate1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择延期时间'))
      } else {
        // var index = rule.field.substr(10, 1) // tableData.0.createDate
        // var updateDate = this.tableForm.tableData[index].updateDate
        var currentTime = TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}')
        var isBool = TimeUtils.Jh_compareTimes(currentTime, value)
        if (isBool) {
          callback(new Error('延期时间必须大于当前时间!'))
        }
        // var startTime = TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}') // 当前时间
        // var endTime = TimeUtils.Jh_timeStampToTime(new Date().getTime() + 1000 * 60 * 60 * 24 * 1, '{y}-{m}-{d} {h}:{i}:{s}') // 一天后
        // var isBool2 = TimeUtils.Jh_isBetweenTimes(value, startTime, endTime)
        // if (!isBool2) {
        //   callback(new Error('延期时间必须在开始时间和结束时间内!'))
        // }
        callback()
      }
    }
    return {
      dialogLoading: false,
      levelOptions: [],
      // 弹框相关
      dialogTitle: '延期申请',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      dialogFormData: {
        expireTime: '',
        signPicture: 'https://img.yzcdn.cn/vant/cat.jpeg',
        signTime: TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}'),
        notes: ''
      },
      dialogFormRules: {
        expireTime: [{ validator: validate1, trigger: 'change' }],
        signTime: [{ required: true, message: '请选择', trigger: 'blur' }],
        notes: [
          { required: false, message: '请输入', trigger: 'blur' },
          { min: 1, max: 10, message: '10字符以内', trigger: 'blur' }
        ],

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
    },
    dialogData: function(val) {
      this.dialogFormDataData = val
    },
    dialogType: function(val) {
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
    onOpenDialog() {
      var that = this
      this.dialogLoading = true
      setTimeout(() => {
        that.dialogLoading = false
      }, 1500)
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
      if (this.dialogTitle === '延期申请') {
        editData(params).then(res => {
          that.dialogSubmitBtnLoading = false
          if (res.code === 20000) {
            that.$message.success('延期申请提交成功!')
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

.dialog-footer {
  text-align: center;
}

// ::v-deep .el-tree-node:focus > .el-tree-node__content {
//   background-color: #000 !important;
// }

</style>
