<template>
  <div>
    <!-- add/edit dialog -->
    <el-dialog :title="dialogTitle" destroy-on-close :visible.sync="isShowDialog" top="8vh" width="55%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="bs-dialog">
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="true" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
          <el-form-item label="菜单类型:" prop="menuType">
            <el-select v-model="dialogFormData.menuType" placeholder="请选择菜单类型" :disabled="dialogType!=='add'" collapse-tags clearable @change="onChange">
              <el-option v-for="item in menuTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名称:" prop="title">
            <el-input v-model="dialogFormData.title" placeholder="请输入菜单名称" clearable />
          </el-form-item>
          <el-form-item v-if="dialogFormData.menuType !== 'catalog'" label="上级菜单:" prop="parentId">
            <SingleSelectTree v-model="dialogFormData.parentId" placeholder="请选择上级菜单" :props="treeProps" :data="menuTreeData" @selected="getTreeValue" />
            <!-- <SelectTree height="400" width="200" size="small" :data="menuTreeData" :obj="treeProps2" clearable multiple @getValue="getTreeValue" /> -->
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <el-input v-model="dialogFormData.sort" type="number" placeholder="请输入排序" clearable />
          </el-form-item>
          <el-form-item label="菜单编码:" prop="code">
            <template slot="label">
              <span>菜单编码:</span>
              <el-tooltip class="item" :content="dialogFormData.menuType !== 'button' ? '对应路由path和name' :'定义的按钮权限标识'" effect="dark"> <i class="el-icon-question" /> </el-tooltip>
            </template>
            <el-input v-model="dialogFormData.code" placeholder="请输入菜单编码" clearable />
          </el-form-item>
          <el-form-item v-if="dialogFormData.menuType === 'menu'" label="组件路径:" prop="component" class="input-width">
            <el-input v-model="dialogFormData.component" placeholder="请输入组件路径" clearable>
              <span slot="prepend">src/views/</span>
            </el-input>
          </el-form-item>
          <el-form-item label="图标:" prop="icon">
            <el-input v-model="dialogFormData.icon" placeholder="请输入图标" clearable />
          </el-form-item>
          <el-form-item v-if="dialogFormData.menuType !== 'button'" label="状态:" prop="hidden">
            <el-radio-group v-model="dialogFormData.hidden">
              <el-radio :label="true">隐藏</el-radio>
              <el-radio :label="false">显示</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div v-if="!dialogIsLook" slot="footer" class="bs-dialog-footer">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit()">保存</el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, editMenu, saveMenu } from '@/api/system/menu'
import { dictMenuType } from '@/views/system/menu/dict'
import SingleSelectTree from '@/views/system/menu/select-tree'
import SelectTree from '@/views/components/select-tree'

export default {
  components: {
    SingleSelectTree,
    // eslint-disable-next-line vue/no-unused-components
    SelectTree
  },
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    // add，edit，look
    dialogType: { type: String, default: 'add' },
    // 传参
    dialogData: { type: Object, default: () => ({}) },
    // 标题：默认按类型设置为新增、编辑、查看，传值优先级更高
    title: { type: String, default: '' },
    // 传参
    dialogTreeData: { type: Array, default: () => [] }
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
        menuType: 'menu', // catalog | menu | button
        title: '',
        parentId: '',
        parentTitle: '',
        sort: '',
        code: '',
        component: '', //  "Layout" | "system/menu" | ""
        icon: '',
        hidden: ''
      },
      initFormData: {},
      dialogFormRules: {
        menuType: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
        title: [
          { required: true, message: '请输入', trigger: ['blur', 'change'] },
          { min: 1, max: 32, message: '32字符以内', trigger: ['blur', 'change'] }
        ],
        parentId: [{ required: false, message: '请选择', trigger: ['blur', 'change'] }],
        sort: [
          { required: true, message: '请输入正确的排序号', trigger: ['blur'] },
          { pattern: /^[1-9]\d{0,2}$/, message: '请输入0-999之间的正整数', trigger: ['blur'] }
        ],
        code: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 32, message: '32字符以内', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入', trigger: ['blur', 'change'] },
          { min: 1, max: 32, message: '32字符以内', trigger: ['blur', 'change'] }
        ],
        hidden: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      // 字典项
      menuTypeOptions: dictMenuType,
      menuTreeData: [],
      treeProps: {
        value: 'id',
        label: 'title',
        children: 'children'
      },
      treeProps2: {
        id: 'id',
        label: 'title',
        children: 'children'
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
    dialogType: function(val) {
      this.dialogTitle = this.title || (val === 'add' ? '新增' : val === 'edit' ? '编辑' : val === 'look' ? '查看' : this.dialogTitle)
      this.dialogIsLook = val === 'look'
    },
    dialogData: function(val) {
      if (this.dialogType === 'add') {
        // 新增使用的初始值
        this.dialogFormData = JSON.parse(JSON.stringify(this.initFormData))
      } else {
        this.dialogFormData = JSON.parse(JSON.stringify(val))
      }
    },
    title: function(val) {
      this.dialogTitle = val.length ? val : this.dialogTitle
    },
    dialogTreeData: function(val) {
      const treeData = JSON.parse(JSON.stringify(val))
      this.menuTreeData = this.filterTree(treeData, 'button')
    }
  },
  created() {
    this.initFormData = JSON.parse(JSON.stringify(this.dialogFormData))
  },
  methods: {
    // 弹框相关
    onOpenedDialog() {
      if (this.dialogType === 'add') {
        this.$refs['dialogFormRef'].clearValidate() // 清空校验
      }
    },
    onClosedDialog() {
      if (!this.dialogIsLook) {
        this.$refs['dialogFormRef'].resetFields() // 仅清除验证
      }
      this.$emit('closed', {})
    },
    // 过滤数据中menuType为button的
    filterTree(tree, type) {
      return tree.filter((node) => {
        if (node.menuType === type) {
          return false
        }
        if (node.children && node.children.length > 0) {
          node.children = this.filterTree(node.children, type)
        }
        return true
      })
    },
    filterTree2(tree, type) {
      return tree.flatMap((node) => {
        if (node.menuType === type) {
          return []
        }
        if (node.children && node.children.length > 0) {
          node.children = this.filterTree(node.children, type)
        }
        return node
      })
    },
    onDialogSubmit() {
      this.$refs['dialogFormRef'].validate((valid) => {
        if (valid) {
          this.submitRequest()
        }
      })
    },
    getTreeValue(key, data) {
      console.log(JSON.stringify(key))
      console.log(JSON.stringify(data))
    },
    onChange() {
      this.dialogFormData.parentId = ''
      this.dialogFormData.parentTitle = ''
      this.dialogFormData.code = ''
      this.dialogFormData.component = ''
      this.dialogFormData.hidden = ''
      this.$refs['dialogFormRef'].clearValidate() // 清空校验
    },
    submitRequest() {
      var params = JSON.parse(JSON.stringify(this.dialogFormData))
      if (this.dialogFormData.menuType === 'catalog') {
        params.component = 'Layout'
      }
      if (this.dialogType === 'edit') {
        delete params.children
      }

      console.log(JSON.stringify(params))
      const msg = this.dialogType === 'edit' ? '编辑成功!' : '新增成功!'
      this.dialogSubmitBtnLoading = true
      saveMenu(params)
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
      if (this.dialogFormData.menuType === 'catalog') {
        params.component = 'Layout'
      }
      if (this.dialogType === 'edit') {
        delete params.children
      }

      console.log(JSON.stringify(params))
      this.dialogSubmitBtnLoading = true
      if (this.dialogType === 'add') {
        addMenu(params)
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
        editMenu(params)
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
.input-width ::v-deep .el-input-group__prepend {
  width: 75px;
  padding: 0 5px;
}

.input-width ::v-deep .el-input .el-input__inner {
  width: calc(300px - 75px);
}
</style>
