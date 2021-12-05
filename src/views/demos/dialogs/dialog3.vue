<!-- 树 弹框 -->

<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="90%" :close-on-click-modal="false" @open="onOpenDialog" @opened="onOpenedDialog" @closed="onClosedDialog">

      <div class="content">
        <div v-loading.fullscreen.lock="dialogLoading" class="left">
          <!-- 单选树，只能勾选末级节点 -->
          <el-tree ref="tree" node-key="id" :data="treeData" show-checkbox highlight-current default-expand-all :props="defaultProps" @check-change="handleCheckChange" />

          <!-- 单选树，可点击文字选中 -->
          <!-- <el-tree ref="tree" node-key="id" :data="treeData" show-checkbox check-strictly highlight-current default-expand-all :props="defaultProps" @node-click="handleNodeClick2" @check-change="handleCheckChange2" /> -->

        </div>
        <div class="right">
          <div class="spp-dialog">
            <el-form ref="dialogFormRef" :model="dialogFormData" :inline="false" :rules="dialogFormRules" size="small" label-width="200px" :disabled="dialogIsLook">
              <el-form-item label="选择树:" prop="deptName">
                <el-input v-model="deptName" placeholder="请点击右侧选择" disabled />
              </el-form-item>
              <el-form-item label="单选树:" prop="subId">
                <base-tree v-model="dialogFormData.subId" :options="treeOptions" @select="treeSelect" />
              </el-form-item>
              <el-form-item label="多选树:" prop="subIds">
                <base-tree v-model="dialogFormData.subIds" :options="treeOptions" placeholder="请选择多选树" :multiple="true" />
              </el-form-item>
              <el-form-item label="多选树2:" prop="subIds2">
                <Treeselect
                  v-model="dialogFormData.subIds2"
                  class="treeselect-main"
                  :normalizer="normalizer"
                  placeholder="请选择"
                  :options="treeOptions"
                  value-consists-of="LEAF_PRIORITY"
                  :multiple="true"
                />
              </el-form-item>
              <el-form-item label="创建时间:" prop="createDate">
                <el-date-picker v-model="dialogFormData.createDate" style="width:310px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable />
              </el-form-item>
              <el-form-item label="更新时间:" prop="updateDate">
                <el-date-picker v-model="dialogFormData.updateDate" style="width:310px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable />
              </el-form-item>
              <el-form-item label="备注:" prop="content">
                <el-input v-model="dialogFormData.content" style="width:310px" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" />
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Treeselect
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
      normalizer(node) {
        // 去掉children=[]的children属性
        if (node.children && !node.children.length) {
          delete node.children
        }
        return {
          id: node.id,
          label: node.label,
          children: node.children
        }
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogLoading: false,
      levelOptions: [],
      // 弹框相关
      dialogTitle: '树弹框',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      treeData: [],
      treeCheckedId: '',
      treeOptions: [],
      deptName: '',
      dialogFormData: {
        deptId: '',
        subId: '',
        subIds: '',
        subIds2: '',
        createDate: '',
        updateDate: '',
        content: ''
      },
      dialogFormRules: {
        deptId: [{ required: true, message: '请选择', trigger: 'change' }],
        subId: [{ required: true, message: '请选择', trigger: 'blur' }],
        subIds: [{ required: true, message: '请选择', trigger: 'change' }],
        subIds2: [{ required: true, message: '请选择', trigger: 'change' }],
        createDate: [{ required: true, message: '请选择', trigger: 'change' }],
        updateDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        content: [
          { required: false, message: '请输入', trigger: 'blur' },
          { min: 1, max: 100, message: '100字符以内', trigger: 'blur' }
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
      val.deptId = ''
      this.dialogFormData = val
      console.log(JSON.stringify(this.dialogFormData))
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
          that.treeOptions = data
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
    handleCheckChange(data, checked, node) {
      if (checked === true) {
        this.treeCheckedId = data.id
        this.dialogFormData.deptId = data.id
        this.deptName = data.label
        this.$refs.tree.setCheckedKeys([data.id])
      } else {
        if (this.treeCheckedId === data.id) {
          this.dialogFormData.deptId = data.id
          this.deptName = data.label
          this.$refs.tree.setCheckedKeys([data.id])
        }
      }
    },
    handleNodeClick2(data) { // 自己定义的editCheckId，防止单选出现混乱
      console.log('点击树选择的id===' + data.id)
      console.log(JSON.stringify(data))
      this.treeCheckedId = data.id
      this.dialogFormData.deptId = data.id
      this.deptName = data.label
      this.$refs.tree.setCheckedKeys([data.id])
    },
    handleCheckChange2(data, checked) {
      if (checked) {
        this.dialogFormData.deptId = data.id
        this.deptName = data.label
        this.$refs.tree.setCheckedKeys([data.id])
      } else {
        if (this.treeCheckedId === data.id) {
          this.dialogFormData.deptId = data.id
          this.deptName = data.label
          this.$refs.tree.setCheckedKeys([data.id])
        }
      }
    },
    treeSelect(value, item) {
      var ancestorNames = item.ancestorNames[0]
      var ancestorIds = item.ancestorIds[0]
      // var ancestorNames1 = item.ancestorNames[1]
      // var ancestorIds1 = item.ancestorIds[1]
      console.log(ancestorNames)
      console.log(ancestorIds)
      // console.log(ancestorNames1)
      // console.log(ancestorIds1)
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

// 修改tree当前行的高亮显示样式
// ::v-deep .el-tree-node:focus > .el-tree-node__content {
//   background-color: #000 !important;
// }

// 末级节点显示勾选框
::v-deep .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner {
    display: inline-block;
  }
  .el-checkbox .el-checkbox__inner {
    display: none;
  }
}

// tree显示滚动条
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

.treeselect-main {
  display: inline-block;
  width: 210px;
  min-height: 32px;
  line-height: 14px;

  ::v-deep .vue-treeselect__placeholder {
    line-height: 30px;
  }

  //最上层
  ::v-deep .vue-treeselect__control {
    height: 32px;
    width: 210px;
    background: #f5f5f5;
  }

  //上层
  ::v-deep .vue-treeselect__value-container {
    display: block;
    position: relative;
    width: 100%;
    height: 30px;
  }

  //标签外层
  ::v-deep .vue-treeselect__multi-value {
    position: absolute;
    height: 30px;
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: hidden;
  }

  //item
  ::v-deep .vue-treeselect__multi-value-item {
    display: inline-block !important;
  }

  ::v-deep .vue-treeselect__multi-value-label {
    display: block;
    white-space: nowrap;
  }

  //全部取消隐藏
  ::v-deep .vue-treeselect__x-container {
    display: none;
  }

  ::v-deep .vue-treeselect__icon {
    display: none;
  }
}
</style>
