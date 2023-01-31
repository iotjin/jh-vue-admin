<template>
  <div>

    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="90%" :close-on-click-modal="false" @open="onOpenDialog" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="spp-dialog">
        <!-- <div> -->
        <div class="spp-table-group spp-theme-top spp-theme-pad">
          <div class="spp-table-btns">
            <el-button size="small" type="primary" @click="onAdd"><i class="el-icon-plus" />新增 </el-button>
            <el-button size="small" type="danger" @click="onDelete"><i class="el-icon-delete" />删除 </el-button>
          </div>
          <el-form ref="formRef" :model="dialogFormData" label-width="120px" :inline="true" :rules="formRules" size="small" label-position="center">
            <!-- class="spp-table spp-theme-top my-table -->
            <el-table ref="tableRef" class="my-table" :data="dialogFormData.tableData" :stripe="true" :header-cell-style="headerCellStyle" :cell-style="cellStyle" :row-class-name="rowClassName" border @selection-change="onSelectionChange">
              <el-table-column label="">
                <el-table-column prop="xh" type="index" label="序号" width="80px" />
                <!-- <el-table-column prop="createDate">
            <template slot="header"> <span style="color:red;padding-right:3px">*</span><span>测试header红星</span> </template>
          </el-table-column> -->
                <el-table-column type="selection" width="55px" />
                <el-table-column label="名称" :render-header="addRedStar" :min-width="columnWidth">
                  <template slot-scope="scope">
                    <el-form-item :prop="`tableData.${scope.$index}.name`" :rules="formRules.name">
                      <el-input v-model="scope.row.name" maxlength="20" placeholder="请输入" clearable />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="部门" :render-header="addRedStar" :min-width="columnWidth">
                  <template slot-scope="scope">
                    <el-form-item :prop="`tableData.${scope.$index}.dept`" :rules="formRules.dept">
                      <el-select v-model="scope.row.dept" placeholder="请选择" collapse-tags clearable>
                        <el-option v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作人" :render-header="addRedStar" :min-width="columnWidth">
                  <template slot-scope="scope">
                    <el-form-item :prop="`tableData.${scope.$index}.operator`" :rules="formRules.operator">
                      <el-input v-model="scope.row.operator" maxlength="10" placeholder="请输入" clearable />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="内容" :render-header="addRedStar" :min-width="columnWidth">
                  <template slot-scope="scope">
                    <el-form-item :prop="`tableData.${scope.$index}.content`" :rules="formRules.content">
                      <el-input v-model="scope.row.content" maxlength="100" placeholder="请输入" type="textarea" :autosize="{ minRows: 2, maxRows: 2}" clearable />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" :render-header="addRedStar" :width="columnWidth">
                  <template slot-scope="scope">
                    <el-form-item :prop="`tableData.${scope.$index}.createDate`" :rules="formRules.createDate">
                      <el-date-picker v-model="scope.row.createDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择日期" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" :render-header="addRedStar" :width="columnWidth">
                  <template slot-scope="scope">
                    <el-form-item :prop="`tableData.${scope.$index}.updateDate`" :rules="formRules.updateDate">
                      <el-date-picker v-model="scope.row.updateDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择日期" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120px">
                  <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-edit-outline" @click="rowEdit(scope.row)" />
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="rowDelete(scope.row)" />
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-form>

          <div style="padding:20px" />
          <div v-if="!dialogIsLook" slot="footer" class="dialog-footer spp-dialog-btns">
            <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit(dialogFormData)">确定</el-button>
            <el-button size="small" @click="isShowDialog = false">取消</el-button>
          </div>

        </div>

      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getDeptList, getStationTree } from '@/api/base/base'
import { getDictLevel, getDictDept, addData, editData } from '@/api/tables/tables'
// import * as checkUtils from '@/utils/checkUtils'
// import { REGEX_phone } from '@/utils/checkUtils'
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
        callback(new Error('请选择创建时间'))
      } else {
        var index = rule.field.substr(10, 1) // tableData.0.createDate
        var updateDate = this.dialogFormData.tableData[index].updateDate
        var isBool = TimeUtils.Jh_compareTimes(value, updateDate)
        if (isBool) {
          callback(new Error('创建时间不能大于操作时间!'))
        }
        // var startTime = TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}') // 当前时间
        // var endTime = TimeUtils.Jh_timeStampToTime(new Date().getTime() + 1000 * 60 * 60 * 24 * 1, '{y}-{m}-{d} {h}:{i}:{s}') // 一天后
        // var isBool2 = TimeUtils.Jh_isBetweenTimes(value, startTime, endTime)
        // if (!isBool2) {
        //   callback(new Error('创建时间必须在开始时间和结束时间内!'))
        // }
        callback()
      }
    }
    var validate2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择操作时间'))
      } else {
        var index = rule.field.substr(10, 1)
        var isBool = TimeUtils.Jh_compareTimes(value, this.dialogFormData.tableData[index].createDate)
        if (!isBool) {
          callback(new Error('操作时间不能小于创建时间!'))
        }
        callback()
      }
    }
    return {
      columnWidth: 280,
      dialogLoading: false,
      levelOptions: [],
      deptOptions: [],
      // 弹框相关
      dialogTitle: '提示',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      dialogFormData: {
        tableData: []
        // tableData: [{
        //   'name': '',
        //   'dept': '',
        //   'operator': '',
        //   'content': '',
        //   'createDate': '',
        //   'updateDate': ''
        // }]
      },
      formRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        dept: [{ required: true, message: '请选择部门', trigger: 'change' }],
        operator: [{ required: true, message: '请输入操作人名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        createDate: [{ validator: validate1, trigger: 'change' }],
        updateDate: [{ validator: validate2, trigger: 'change' }]
        // createDate: [{ required: true, message: '请选择创建时间', trigger: 'change' }],
        // updateDate: [{ required: true, message: '请选择操作时间', trigger: 'change' }]
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
      this.dialogFormData = val
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

      getDictDept().then(res => {
        if (res.code === 20000) {
          that.deptOptions = res.data
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
    // 设置表头样式
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      // return { textAlign: 'center' }
      if (rowIndex === 0 && columnIndex === 0) {
        // 隐藏头部
        return { textAlign: 'center', background: '#eef1f6', display: 'none' }
      } else {
        return { textAlign: 'center', background: '#f5f5f5' }
      }
    },
    // 设置表内容样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return { textAlign: 'center' }
    },
    // 其中row是行对象，rowindex是行号，从0开始。所以这样就能实现了序号(xh属性)递增并且取值为行号加1。
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    addStar(obj) {
      // console.log(obj)
      // if (obj.columnIndex === 0 || obj.columnIndex === 1) {
      return 'star'
      // }
    },
    addRedStar(h, { column }) { // 给表头加必选标识
      return [h('span', { style: 'color: red' }, '*'), h('span', ' ' + column.label)]
    },
    onSelectionChange(val) {
      this.selectionList = val
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
        this.$refs['formRef'].resetFields() // 仅清除验证
      }
      this.$emit('closed', {}) // 传出选择对象
    },
    onAdd() {
      var item = {
        'id': '',
        'name': '',
        'dept': '',
        'operator': '',
        'content': '',
        'createDate': '',
        'updateDate': ''
      }
      this.dialogFormData.tableData.push(item)
    },
    // 编辑
    onEdit() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择记录')
        return
      } else if (this.selectionList.length > 1) {
        this.$message.warning('只能选择一条记录！')
        return
      } else {
        // this.isShowEditDialog = true;
        // this.editRuleForm = this.selectionList[0];
      }
    },
    // 删除
    onDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择记录')
        return
      }
      // console.log(JSON.stringify(this.selectionList));
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 主要实现步骤，先把表格行数存到一个新数组
        var tempArr = []
        for (let i = 0; i < this.selectionList.length; i++) {
          tempArr.push(this.selectionList[i].xh)
        }
        // 数字数组排序，因为选择框是根据先选择的顺序存到checkedDetail里面，所以需要排序
        tempArr.sort(function(a, b) {
          return a - b
        })
        console.log('新数组排序后：' + tempArr)
        // 逐个根据下标删除
        for (let i = 0; i < tempArr.length; i++) {
          this.dialogFormData.tableData.splice(tempArr[i] - i - 1, 1)
        }
        this.$message.success('删除成功!')
      }).catch(() => {
      })
    },
    rowEdit(row) {
      console.log(JSON.stringify(row))
    },
    rowDelete(row) {
      console.log(JSON.stringify(row))
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormData.tableData.splice(row.xh - 1, 1)
        this.$message.success('删除成功!')
      }).catch(() => {
      })
    },
    onDialogSubmit() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.submitRequest()
        } else {
          console.log('error submit!!')
          this.$message.warning('有未输入项')
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
      if (this.dialogTitle === '编辑' || this.dialogTitle === '提示') {
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
.my-table {
  margin-top: 10px;
}

.el-form-item {
  padding: 10px;
  margin-bottom: 0px;
}

.el-form-item.is-error {
  padding: 10px;
  margin-bottom: 20px;
}
</style>
