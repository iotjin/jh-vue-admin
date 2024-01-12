<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="60%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="spp-dialog">
        <el-form ref="dialogFormRef" :model="dialogFormData" :inline="false" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
          <el-row v-for="(product, index) in dialogFormData.products" :key="index">
            <el-col :span="15">
              <el-form-item :label="'product '+ (index + 1)" :prop="`products.${index}.productName`" label-width="130px" :rules="dialogFormRules.product">
                <el-input v-model="product.productName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button v-show="dialogFormData.products.length>1" icon="el-icon-delete" type="danger" size="mini" @click="removeProduct(index)">Remove</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="3" :md="5" style="margin-left: 40px;">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="addProduct">Add new product</el-button>
            </el-col>
          </el-row>
          <div style="margin-top:20px;" />
          <el-form-item label="备注:" prop="notes">
            <el-input v-model="dialogFormData.notes" placeholder="请输入备注" type="textarea" maxlength="100" show-word-limit clearable class="input-width" />
          </el-form-item>
          <el-form-item label="测试拦截切换1">
            <el-select ref="selectRef" v-model="dialogFormData.testSwitch" filterable clearable>
              <el-option v-for="item in optionList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="测试拦截切换2">
            <el-select ref="selectRef2" v-model="dialogFormData.testSwitch2" filterable clearable @click.native="onFocus()">
              <el-option v-for="item in optionList" :key="item.value" :label="item.label" :value="item.value" @click.native="handleClick(item)" />
            </el-select>
          </el-form-item>

        </el-form>
        <div v-if="!dialogIsLook" slot="footer" class="dialog-footer spp-dialog-btns">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit()">保存</el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
    title: { type: String, default: '' },
    isRefresh: { type: Boolean, default: false }
  },
  data() {
    return {
      // 弹框相关
      dialogTitle: '提示',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogIsLook: false,
      initFormData: {},
      dialogFormData: {
        id: '',
        products: [
          {
            productId: '',
            productName: ''
          }
        ],
        notes: '',
        testSwitch: '',
        testSwitch2: ''
      },
      dialogFormRules: {
        product: [
          { required: true, message: '请输入产品', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '10字符以内', trigger: ['blur', 'change'] }
        ],
        notes: [
          { required: false, message: '请输入', trigger: ['blur', 'change'] },
          { min: 1, max: 100, message: '100字符以内', trigger: ['blur', 'change'] }
        ]
      },
      optionList: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' },
        { label: '选项4', value: 'value4' },
        { label: '选项5', value: 'value5' }
      ],
      switchValue: 'value3',
      lastSelect: ''
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
    isRefresh: function(val) {
      if (val) {
        console.log('Request data')
      }
    }
  },
  created() {
    this.initFormData = JSON.parse(JSON.stringify(this.dialogFormData))
  },
  mounted() {
    this.initProxy()
    // this.initDefineProperty()
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
    initProxy() {
      // Proxy 拦截
      const that = this
      this.dialogFormData = new Proxy(
        this.dialogFormData,
        {
          set: (obj, prop, value) => {
            // console.log('obj', JSON.stringify(obj))
            // console.log('prop', JSON.stringify(prop))
            // console.log('value', JSON.stringify(value))
            if (prop === 'testSwitch' && value === this.switchValue) {
              that
                .$confirm('是否切换到选项三', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
                .then(() => {
                  obj[prop] = value
                  that.$refs.selectRef.blur()
                })
                .catch(() => {
                  that.$refs.selectRef.blur()
                })
            } else {
              obj[prop] = value
            }
            return true
          }
        }
      )
    },
    initDefineProperty() {
      // Object.defineProperty 拦截
      const that = this
      var tempVal = null
      Object.defineProperty(this.dialogFormData, 'testSwitch', {
        get() {
          return tempVal
        },
        set(value) {
          if (value === that.switchValue) {
            that
              .$confirm('是否切换到选项三', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
              .then(() => {
                tempVal = value
                that.$forceUpdate()
                that.$refs.selectRef.blur()
              })
              .catch(() => {
                that.$refs.selectRef.blur()
              })
          } else {
            tempVal = value
            that.$forceUpdate()
            that.$refs.selectRef.blur()
          }
        }
      })
    },

    /*
     `Object.defineProperty` 和 `Proxy` 是 JavaScript 中用于拦截对象操作的两种不同机制。

      1. `Object.defineProperty` ：它是 ES5 引入的一个方法，用于直接在一个对象上定义一个新属性或修改现有属性。
          它通过修改对象的属性描述符来实现拦截效果，可以对单个属性进行拦截。
          常见的属性描述符选项包括 `value`、`writable`、`enumerable` 和 `configurable`。
          使用 `Object.defineProperty` 可以拦截属性的读取和写入操作，但无法拦截其他操作，如删除属性或遍历属性等。

      2. `Proxy`：它是 ES6 引入的一个特性，提供了一个强大的拦截器机制，可以对整个对象进行拦截。
          通过创建一个代理对象，可以拦截并重定义对象的底层操作，例如读取、写入、删除、函数调用等。`Proxy` 通过定义捕获器（`handler`）来指定拦截行为，
          每个捕获器都对应一种拦截操作，例如 `get`、`set`、`deleteProperty` 等。使用 `Proxy` 可以实现更细粒度的拦截和自定义逻辑。

      主要区别如下：

      - `Object.defineProperty` 只能拦截单个属性的读取和写入操作，而 `Proxy` 可以拦截整个对象的操作。
      - `Object.defineProperty` 在定义属性时必须指定属性描述符选项，如 `value`、`writable` 等，而 `Proxy` 可以通过捕获器来定义拦截行为，更加灵活。
      - `Object.defineProperty` 是修改现有对象的属性描述符，而 `Proxy` 是创建一个新的代理对象，原始对象保持不变。
      - `Object.defineProperty` 兼容性较好，适用于 ES5 环境，而 `Proxy` 是 ES6 引入的新特性，需要较新的 JavaScript 运行环境支持。

      如果你需要对整个对象进行拦截和自定义操作，推荐使用 `Proxy`。而如果只需要对单个属性进行拦截，或者需要在较旧的 JavaScript 环境中使用，可以考虑使用 `Object.defineProperty`。

    */
    onFocus() {
      this.lastSelect = this.dialogFormData.testSwitch2
    },
    handleClick(item) {
      if (item.value === this.switchValue) {
        this.$confirm('是否切换到选项三', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$refs.selectRef2.blur()
          })
          .catch(() => {
            this.dialogFormData.testSwitch2 = this.lastSelect
            this.$refs.selectRef2.blur()
          })
      }
    },
    onDialogSubmit() {
      this.$refs['dialogFormRef'].validate((valid) => {
        if (valid) {
          this.submitRequest()
        }
      })
    },
    addProduct() {
      this.dialogFormData.products.push({
        productId: '',
        productName: ''
      })
    },
    removeProduct(index) {
      this.dialogFormData.products.splice(index, 1)
    },
    submitRequest() {
      const params = JSON.parse(JSON.stringify(this.dialogFormData))
      console.log('params', JSON.stringify(params))
      this.isShowDialog = false
      this.$emit('success', {})
    }
  }
}
</script>

<style lang="scss" scoped>
.input-width {
  width: 300px;
}

::v-deep .el-form-item__content .el-input {
  width: 300px;
}
</style>
