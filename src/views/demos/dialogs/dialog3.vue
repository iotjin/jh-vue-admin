<!-- 树 弹框 -->

<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="90%" :close-on-click-modal="false" @open="onOpenDialog" @opened="onOpenedDialog" @closed="onClosedDialog">

      <div class="content">
        <div v-loading.fullscreen.lock="dialogLoading" class="left">
          <!-- 单选树，只能勾选末级节点 -->
          <el-tree ref="tree" node-key="id" show-checkbox highlight-current :data="treeData" :props="defaultProps" :default-expand-all="true" @check-change="handleCheckChange" />
        </div>
        <div class="right">
          <div class="spp-dialog">
            <el-form ref="dialogFormRef" :model="dialogFormData" :inline="false" :rules="dialogFormRules" size="small" label-width="200px" :disabled="dialogIsLook">
              <el-form-item label="选择树:" prop="deptName">
                <el-input v-model="dialogFormData.deptName" placeholder="请点击右侧选择" disabled />
              </el-form-item>
              <el-form-item label="有效期延长到:" prop="expireTime">
                <el-date-picker v-model="dialogFormData.expireTime" style="width:310px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable />
              </el-form-item>
              <el-form-item label="签字时间:" prop="signTime">
                <el-date-picker v-model="dialogFormData.signTime" style="width:310px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable />
              </el-form-item>
              <el-form-item label="备注:" prop="notes">
                <el-input v-model="dialogFormData.notes" style="width:310px" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" />
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer spp-dialog-btns">
        <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit(dialogFormData)">确定</el-button>
        <el-button size="small" @click="isShowDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getDeptList, getStationTree } from '@/api/base/base'
import { getDictLevel, getDictDeptTree, addData } from '@/api/tables/tables'
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
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogLoading: false,
      levelOptions: [],
      // 弹框相关
      dialogTitle: '延期申请',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      treeData: [],
      dialogFormData: {
        deptId: '',
        deptName: '',
        expireTime: '',
        signTime: TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}'),
        notes: ''
      },
      dialogFormRules: {
        deptName: [{ required: true, message: '请选择', trigger: 'change' }],
        expireTime: [{ required: true, message: '请选择', trigger: 'change' }],
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
        level: [{ required: true, message: '请选择', trigger: 'change' }],
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

      getDictDeptTree().then(res => {
        if (res.code === 20000) {
          var data = res.data
          console.log(JSON.stringify(data))
          data[0].label = '一级目录一级目录一级目录一级目录一级目录一级目录一级目录一级目录一级目录一级目录一级目录一级目录'
          that.treeData = data
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
    handleNodeClick(data) {
      console.log('点击树选择的id===' + data.id)
      console.log(JSON.stringify(data))
      this.dialogFormData.deptId = data.id
      this.dialogFormData.deptName = data.label
      this.$refs.tree.setCheckedKeys([data.id], true)
    },
    handleCheckChange(data, checked) {
      // data 即为选择的集合值
      if (checked) {
        this.dialogFormData.deptId = data.id
        this.dialogFormData.deptName = data.label
        this.$refs.tree.setCheckedKeys([data.id], true)
      }
    },
    showDialog(isShow) {
      this.$emit('update:isShow', isShow) // isShowDialog改变时同步父组件show的值
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
      var params = {}
      params = this.dialogFormData
      console.log(JSON.stringify(params))

      var that = this
      this.dialogSubmitBtnLoading = true

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
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: 60vh;
  overflow: auto;
  border: 1px solid gray;
}
.left {
  flex: 30;
  min-width: 30%;
  min-height: 55vh;
  padding-right: 20px;
  overflow-x: auto;
  overflow-y: auto;
}
.right {
  flex: 70;
  min-width: 70%;
  padding-top: 10px;
  border-left: 1px solid gray;
}
.dialog-footer {
  text-align: center;
}
.form-bg {
  padding: 15px 30px 30px 10px;
}

// ::v-deep .el-tree-node:focus > .el-tree-node__content {
//   background-color: #000 !important;
// }
::v-deep .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner {
    display: inline-block;
  }
  .el-checkbox .el-checkbox__inner {
    display: none;
  }
}

.tree {
  overflow-y: hidden;
  overflow-x: scroll;
  width: 80px;
  height: 500px;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
</style>
