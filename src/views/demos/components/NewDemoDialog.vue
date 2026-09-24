<template>
  <BaseDialog
    ref="dialogRef"
    title="综合录入示例"
    :visible.sync="isShowDialog"
    cancel-text="取消"
    confirm-text="保存"
    @opened="onOpened"
    @closed="onClosed"
    @submit="onSubmit"
  >
    <!-- 上方表格：人员列表 -->
    <div class="demo-block">
      <div class="demo-block__title">人员列表</div>
      <el-table :data="staffTableData" border stripe size="small" style="width: 100%;">
        <el-table-column prop="id" label="工号" width="80" />
        <el-table-column prop="name" label="姓名" min-width="90" />
        <el-table-column prop="dept" label="部门" min-width="100" />
        <el-table-column prop="role" label="岗位" min-width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '在职' ? 'success' : 'info'" size="mini">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" size="small">
      <!-- 组1：el-row + el-col -->
      <div class="demo-block">
        <div class="demo-block__title">基本信息（el-row + el-col）</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="dept">
              <el-select v-model="form.dept" placeholder="请选择部门" clearable>
                <el-option label="研发部" value="rd" />
                <el-option label="产品部" value="pd" />
                <el-option label="运营部" value="op" />
                <el-option label="市场部" value="mk" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期" prop="joinDate">
              <el-date-picker v-model="form.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 组2：平铺，无 row/col -->
      <div class="demo-block">
        <div class="demo-block__title">补充信息（平铺，无 row/col）</div>
        <el-form-item label="职级" prop="level">
          <el-select v-model="form.level" placeholder="请选择职级" clearable>
            <el-option label="P5" value="P5" />
            <el-option label="P6" value="P6" />
            <el-option label="P7" value="P7" />
            <el-option label="P8" value="P8" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item label="是否在职" prop="onJob">
          <el-switch v-model="form.onJob" active-text="在职" inactive-text="离职" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" maxlength="200" show-word-limit />
        </el-form-item>
      </div>
    </el-form>

    <!-- 下方表格：设备列表（与上方数据不同） -->
    <div class="demo-block">
      <div class="demo-block__title">设备列表</div>
      <el-table :data="deviceTableData" border stripe size="small" style="width: 100%;">
        <el-table-column prop="code" label="资产编号" min-width="110" />
        <el-table-column prop="name" label="设备名称" min-width="120" />
        <el-table-column prop="type" label="类型" min-width="90" />
        <el-table-column prop="owner" label="领用人" min-width="90" />
        <el-table-column prop="buyDate" label="采购日期" min-width="110" />
      </el-table>
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/BaseDialog'
import { REGEX_phone } from '@/utils/checkUtils'

function createForm() {
  return {
    name: '',
    phone: '',
    dept: '',
    joinDate: '',
    level: '',
    email: '',
    onJob: true,
    remark: ''
  }
}

/**
 * 独立业务弹框示例：内部 import BaseDialog，对外用 :is-show.sync 控制显隐
 */
export default {
  name: 'NewDemoDialog',
  components: { BaseDialog },
  props: {
    isShow: { type: Boolean, default: false }
  },
  data() {
    return {
      isShowDialog: false,
      staffTableData: [
        { id: 'E001', name: '张三', dept: '研发部', role: '前端', status: '在职' },
        { id: 'E002', name: '李四', dept: '产品部', role: '产品经理', status: '在职' },
        { id: 'E003', name: '王五', dept: '运营部', role: '运营专员', status: '离职' }
      ],
      deviceTableData: [
        { code: 'EQ-1001', name: 'MacBook Pro', type: '笔记本', owner: '张三', buyDate: '2023-05-12' },
        { code: 'EQ-1002', name: '显示器 27寸', type: '显示器', owner: '李四', buyDate: '2022-11-03' },
        { code: 'EQ-1003', name: '机械键盘', type: '外设', owner: '赵六', buyDate: '2024-01-20' },
        { code: 'EQ-1004', name: '台式机主机', type: '主机', owner: '钱七', buyDate: '2021-08-18' }
      ],
      form: createForm(),
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: REGEX_phone, message: '请输入正确手机号', trigger: 'blur' }
        ],
        dept: [{ required: true, message: '请选择部门', trigger: 'change' }],
        joinDate: [{ required: true, message: '请选择入职日期', trigger: 'change' }]
      }
    }
  },
  watch: {
    isShow(val) {
      this.isShowDialog = val
    },
    isShowDialog(val) {
      this.$emit('update:isShow', val)
    }
  },
  methods: {
    onOpened() {
      this.form = createForm()
      this.$nextTick(() => {
        if (this.$refs.formRef) {
          this.$refs.formRef.clearValidate()
        }
      })
    },
    onClosed() {
      if (this.$refs.formRef) {
        this.$refs.formRef.resetFields()
      }
      this.$emit('closed')
    },
    onSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return
        }
        this.$refs.dialogRef.setSubmitBtnLoading(true)
        setTimeout(() => {
          this.$refs.dialogRef.setSubmitBtnLoading(false)
          this.$message.success('保存成功')
          this.$emit('success', { ...this.form })
          this.isShowDialog = false
        }, 800)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-block {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    margin-bottom: 10px;
    padding-left: 8px;
    border-left: 3px solid #409eff;
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    line-height: 1.4;
  }
}
</style>
