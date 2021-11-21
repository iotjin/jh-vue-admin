<template>
  <div>

    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="90%" :close-on-click-modal="false" @open="onOpenDialog" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="spp-dialog">
        <div class="title">工作负责人变动情况:</div>
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="false" size="small" label-width="200px" :rules="dialogFormRules">
          <div class="leaderRow">
            <div class="text">原工作负责人</div>
            <el-form-item label="" prop="beforeLeader" :rules="dialogFormRules.beforeLeader" label-width="0px">
              <el-select v-model="dialogFormData.beforeLeader" filterable placeholder="请选择" clearable @change="onChange0">
                <el-option v-for="item in leaderOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <div class="text2">离去，变更</div>
            <el-form-item label="" prop="currentLeader" :rules="dialogFormRules.currentLeader" label-width="0px">
              <el-select v-model="dialogFormData.currentLeader" filterable placeholder="请选择" clearable @change="onChange0">
                <el-option v-for="item in leaderOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <div class="text2">为工作负责人</div>
          </div>
          <div class="title">工作人员变动情况:</div>
          <div class="spp-table-group spp-theme-top spp-dialog" style="padding-left:100px">
            <el-table ref="tableRef1" class="my-table" :data="dialogFormData.addList" :stripe="true" :header-cell-style="headerCellStyle" :cell-style="cellStyle" :row-class-name="rowClassName" border>
              <el-table-column label="新增人员">
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <el-form-item :prop="`addList.${scope.$index}.fullName`" :rules="dialogFormRules.fullName" label-width="0px" class="err">
                      <el-input v-model="scope.row.fullName" style="width:260px;" maxlength="30" placeholder="请输入" clearable @input="onChange" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="变更时间" width>
                  <template slot-scope="scope">
                    <el-form-item :prop="`addList.${scope.$index}.changeDate`" :rules="dialogFormRules.changeDate" label-width="0px" class="err">
                      <el-date-picker v-model="scope.row.changeDate" style="width:260px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable @change="onChange" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-plus" @click="rowAdd(scope.row)" />
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="rowDelete(scope.row)" />
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div style="padding:10px" />
          <div class="spp-table-group spp-theme-top spp-dialog" style="padding-left:100px">
            <el-table ref="tableRef2" class="my-table" :data="dialogFormData.leaveList" :stripe="true" :header-cell-style="headerCellStyle" :cell-style="cellStyle" :row-class-name="rowClassName" border>
              <el-table-column label="离开人员">
                <el-table-column label="姓名" width>
                  <template slot-scope="scope">
                    <el-form-item :prop="`leaveList.${scope.$index}.fullName`" :rules="dialogFormRules.fullName2" label-width="0px" class="err">
                      <el-input v-model="scope.row.fullName" style="width:260px;" maxlength="30" placeholder="请输入" clearable @input="onChange2" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="变更时间" width>
                  <template slot-scope="scope">
                    <el-form-item :prop="`leaveList.${scope.$index}.changeDate`" :rules="dialogFormRules.changeDate2" label-width="0px" class="err">
                      <el-date-picker v-model="scope.row.changeDate" style="width:260px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable @change="onChange2" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-plus" @click="rowAdd2(scope.row)" />
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="rowDelete2(scope.row)" />
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <el-form-item label="工作负责人签名:" prop="signPicture">
            <img :src="dialogFormData.signPicture" style="width:200px;height:50px;">
          </el-form-item>
          <el-form-item label="签字时间:" prop="signTime">
            <el-date-picker v-model="dialogFormData.signTime" style="width:310px;" type="datetime" format="yyyy年MM月dd日 HH时mm分" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable />
          </el-form-item>
          <el-form-item label="备注:" prop="remarks">
            <el-input v-model="dialogFormData.remarks" style="width:310px" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" />
          </el-form-item>
        </el-form>

        <div v-if="!dialogIsLook" slot="footer" class="dialog-footer spp-dialog-btns">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit(dialogFormData)">确定</el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>

      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getDeptList, getStationTree } from '@/api/base/base'
import { getDictLevel, getDictLeader, addData, editData } from '@/api/tables/tables'
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
    return {
      dialogLoading: false,
      levelOptions: [],
      leaderOptions: [],
      // 弹框相关
      dialogTitle: '人员变更申请',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      dialogFormData: {
        id: '',
        beforeLeader: '',
        currentLeader: '',
        signPicture: 'https://img.yzcdn.cn/vant/cat.jpeg',
        signTime: TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}'),
        notes: '',
        addList: [{
          fullName: '',
          changeDate: '',
          changeType: '1'
        }],
        leaveList: [{
          fullName: '',
          changeDate: '',
          changeType: '0'
        }]
      },
      dialogFormRules: {
        beforeLeader: [{ required: false, message: '请选择', trigger: 'blur' }],
        currentLeader: [{ required: false, message: '请选择', trigger: 'blur' }],
        signPicture: [{ required: true, message: '请选择', trigger: 'blur' }],
        signTime: [{ required: true, message: '请选择', trigger: 'blur' }],
        remarks: [
          { required: false, message: '请输入', trigger: 'blur' },
          { min: 1, max: 100, message: '100字以内', trigger: 'blur' }
        ],
        fullName: [
          { required: false, message: '请输入', trigger: 'blur' },
          { min: 1, max: 100, message: '100字以内', trigger: 'blur' }
        ],
        changeDate: [{ required: false, message: '请选择', trigger: 'blur' }],
        fullName2: [
          { required: false, message: '请输入', trigger: 'blur' },
          { min: 1, max: 100, message: '100字以内', trigger: 'blur' }
        ],
        changeDate2: [{ required: false, message: '请选择', trigger: 'blur' }]
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

      getDictLeader().then(res => {
        if (res.code === 20000) {
          that.leaderOptions = res.data
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
      //
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
      this.dialogFormData = {
        id: '',
        beforeLeader: '',
        currentLeader: 'leader2',
        signPicture: 'https://img.yzcdn.cn/vant/cat.jpeg',
        signTime: TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}'),
        notes: '这是备注',
        addList: [{
          fullName: '1',
          changeDate: '',
          changeType: '1'
        }],
        leaveList: [{
          fullName: '',
          changeDate: '',
          changeType: '0'
        }]
      }
      this.onChange0()
      this.onChange()
      this.onChange2()
    },
    onClosedDialog() {
      if (!this.dialogIsLook) {
        this.$refs['dialogFormRef'].resetFields() // 仅清除验证
      }
      this.$emit('closed', {}) // 传出选择对象
    },
    rowAdd(row) {
      const item = {
        'xh': '',
        'fullName': '',
        'changeDate': '',
        'changeType': '1'
      }
      this.dialogFormData.addList.push(item)
    },
    rowDelete(row) {
      console.log(JSON.stringify(row.xh))
      if (this.dialogFormData.addList.length === 1) {
        this.dialogFormData.addList = [{
          'xh': '',
          'fullName': '',
          'changeDate': '',
          'changeType': '1'
        }]
        this.dialogFormRules.fullName[0].required = false
        this.dialogFormRules.changeDate[0].required = false
      } else {
        this.dialogFormData.addList.splice(row.xh - 1, 1)
      }
    },
    onChange0(e) {
      this.dialogFormRules.beforeLeader[0].required = !!((this.dialogFormData.beforeLeader || this.dialogFormData.currentLeader))
      this.dialogFormRules.currentLeader[0].required = !!((this.dialogFormData.beforeLeader || this.dialogFormData.currentLeader))
    },
    onChange(e) {
      console.log(e)
      let isTrue = false
      this.dialogFormData.addList.forEach(item => {
        if (item.fullName || item.changeDate) {
          isTrue = true
        }
      })
      this.dialogFormRules.fullName[0].required = isTrue
      this.dialogFormRules.changeDate[0].required = isTrue
    },
    rowAdd2(row) {
      const item = {
        'xh': '',
        'fullName': '',
        'changeDate': '',
        'changeType': '0'
      }
      this.dialogFormData.leaveList.push(item)
    },
    rowDelete2(row) {
      console.log(JSON.stringify(row.xh))
      if (this.dialogFormData.leaveList.length === 1) {
        this.dialogFormData.leaveList = [{
          'xh': '',
          'fullName': '',
          'changeDate': '',
          'changeType': '0'
        }]
        this.dialogFormRules.fullName2[0].required = false
        this.dialogFormRules.changeDate2[0].required = false
      } else {
        this.dialogFormData.leaveList.splice(row.xh - 1, 1)
      }
    },
    onChange2(e) {
      this.dialogFormData.leaveList.forEach(item => {
        if (item.fullName || item.changeDate) {
          this.dialogFormRules.fullName2[0].required = true
          this.dialogFormRules.changeDate2[0].required = true
        }
      })
    },
    onDialogSubmit() {
      this.$refs['dialogFormRef'].validate((valid) => {
        if (valid) {
          const isTrue1 = this.dialogFormData.beforeLeader && this.dialogFormData.currentLeader
          const isTrue2 = this.dialogFormData.addList[0].fullName || this.dialogFormData.leaveList[0].fullName
          console.log()
          if (!isTrue1 && !isTrue2) {
            this.$message.warning('请选择至少一种人员变更')
            return
          }

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
      if (this.dialogTitle === '人员变更申请') {
        editData(params).then(res => {
          that.dialogSubmitBtnLoading = false
          if (res.code === 20000) {
            that.$message.success('人员变更提交成功!')
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
  width: 80%;
}

.dialog-footer {
  text-align: center;
}

.el-form-item {
  padding: 10px;
  margin-bottom: 0px;
}

.el-form-item.is-error {
  padding: 10px;
  margin-bottom: 20px;
}

.err ::v-deep .el-form-item__error {
  padding-top: 2px;
  padding-left: 15px;
  // background: yellow;
}

// ::v-deep .el-tree-node:focus > .el-tree-node__content {
//   background-color: #000 !important;
// }

.title {
  font-weight: bold;
  padding: 10px;
  width: 200px;
  text-align: right;
}
.text {
  padding: 20px 10px;
  width: 200px;
  text-align: right;
}
.text2 {
  padding: 20px 10px;
}
.leaderRow {
  display: inline-flex;
}
</style>
