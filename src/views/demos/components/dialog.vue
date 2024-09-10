<template>
  <div>
    <div style="margin: 20px;">
      <el-button @click="onClickShowDialog">点击打开 BaseDialog 带表单</el-button>
    </div>

    <div style="margin: 20px;">
      <el-button @click="onClickShowDialog2">点击打开 BaseDialog </el-button>
    </div>

    <div style="margin: 20px;">
      <el-button @click="dialogVisible = true">点击打开 el-dialog</el-button>
    </div>

    <BaseDialog ref="dialogRef" :is-show.sync="isShowDialog" append-to-body @opened="onOpenedDialog" @closed="onClosedDialog" @submit="onDialogSubmit">
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

      <div style="margin: 20px;">
        <el-button @click="onClickShowDialog2">点击打开 BaseDialog </el-button>
      </div>
    </BaseDialog>

    <BaseDialog ref="dialogRef2" :is-show.sync="isShowDialog2" append-to-body @opened="onOpenedDialog" @closed="onClosedDialog" @submit="onDialogSubmit2">
      <div>这是一个弹框, header可拖拽</div>
    </BaseDialog>

    <el-dialog ref="dialogRef0" v-drag-dialog title="提示" :visible.sync="dialogVisible" width="30%" :fullscreen="isfull" @dragDialog="handleDrag">
      <template slot="title">
        <div style="display:flex;justify-content: space-between;">
          <div class="el-dialog__title"> 这是标题 </div>
          <button type="button" class="el-dialog__headerbtn" style="margin-right: 25px;" @click="isfull = !isfull">
            <i class="el-icon-full-screen" />
          </button>
        </div>
      </template>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// import { getDeptList, getStationTree } from '@/api/base/base'
import { getDictLevel } from '@/api/tables/tables'
import * as checkUtils from '@/utils/checkUtils'
import { REGEX_phone } from '@/utils/checkUtils'

export default {
  components: {},
  data() {
    return {
      isfull: false,
      dialogVisible: false,
      isShowDialog2: false,
      // 弹框相关
      dialogType: '',
      isShowDialog: false,
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
      },
      levelOptions: [],
      dialogIsLook: false
    }
  },
  created() {
    this.requestDict()
  },
  methods: {
    requestDict() {
      getDictLevel()
        .then((res) => {
          if (res.code === 20000) {
            this.levelOptions = res.data
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error))
        })
    },
    onClickShowDialog() {
      this.isShowDialog = true
    },
    onClickShowDialog2() {
      this.isShowDialog2 = true
    },
    // 弹框相关
    onOpenedDialog() {
      console.log('onOpenedDialog')
      if (this.levelOptions.length === 0) {
        this.requestDict()
      }
    },
    onClosedDialog() {
      console.log('onClosedDialog')
    },
    onDialogSubmit() {
      this.$refs['dialogFormRef'].validate((valid) => {
        if (valid) {
          this.submitRequest()
        }
      })
    },
    submitRequest() {
      console.log('验证通过 开始提交数据 。。。submitRequest')
      this.$refs.dialogRef.showSubmitBtnLoading(true)
      setTimeout(() => {
        this.$refs.dialogRef.showSubmitBtnLoading(false)
        this.isShowDialog = false
      }, 2000)
    },
    onDialogSubmit2() {
      this.$refs.dialogRef2.showSubmitBtnLoading(true)
      setTimeout(() => {
        this.$refs.dialogRef2.showSubmitBtnLoading(false)
        this.isShowDialog2 = false
      }, 2000)
    },
    handleDrag() {
      console.log('handleDrag')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

