<template>
  <div>
    <el-select ref="selectRef" v-model="selectText" :placeholder="placeholder" :style="'width:'+ width" clearable @clear="onClear">
      <el-input v-model="keyword" class="select-input" :placeholder="inputPlaceholder" clearable />
      <el-option :value="treeProps.value" :label="treeProps.label" style="height:200px;overflow: auto;background:#fff;">
        <el-tree ref="treeRef" :node-key="treeProps.value" :data="treeData" highlight-current :filter-node-method="onFilterNode" :props="treeProps" @node-click="onClickNode" />
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value', // 要存在于proops
    event: 'change' // 当组件的值发生改变时要emit的事件名
  },
  props: {
    value: { type: [String, Array], default: null },
    data: { type: Array, default: () => [] },
    props: {
      type: Object,
      default: () => ({
        value: 'id', // ID
        label: 'name', // 显示名称
        children: 'children', // 子级字段名
        parentId: 'parentId' // 父id
      })
    },
    placeholder: { type: String, default: '请选择' },
    inputPlaceholder: { type: String, default: '检索关键字' },
    width: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      treeData: [],
      treeProps: {},
      keyword: '',
      selectText: '',
      selectValue: ''
    }
  },
  watch: {
    selectText: function(val) {
      var tempValue = this.selectValue || null
      this.$emit('change', tempValue)
    },
    value: {
      handler(val) {
        if (val && val.length) {
          const selectIds = Array.isArray(val) ? val : [val]
          this.$nextTick(function() {
            this.$refs.treeRef.setCheckedKeys(selectIds)
            const selectValues = this.$refs.treeRef.getCheckedNodes()
            if (selectValues && selectValues.length > 0) {
              this.setLableValue(selectValues[0][this.treeProps.label], selectValues[0][this.treeProps.value])
            } else {
              this.setLableValue('', '')
            }
          })
        } else {
          this.setLableValue('', '')
        }
      },
      immediate: true
    },
    data: {
      handler(val) {
        this.treeData = val && val.length ? val : []
      },
      immediate: true
    },
    props: {
      handler(val) {
        this.treeProps = val
      },
      immediate: true
    },
    keyword: function(val) {
      this.$refs.treeRef.filter(val)
    }
  },
  created() {},
  methods: {
    onFilterNode(value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    },
    onClear() {
      this.setLableValue('', '')
    },
    onClickNode: function(node) {
      this.$refs.selectRef.blur()
      this.setLableValue(node[this.treeProps.label], node[this.treeProps.value])
      this.$emit('selected', node[this.treeProps.value], node)
    },
    setLableValue(label, value) {
      this.selectText = label
      this.selectValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__item {
  padding: 0px;
}

.select-input {
  padding: 0 5px;
  box-sizing: border-box;
  margin-bottom: 5px;
}

/* ::v-deep .el-tree-node.is-current > .el-tree-node__content {
  background: #f0fcff;
  font-weight: bold;
  color: #00ccb8;
} */
</style>
