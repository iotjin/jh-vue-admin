<template>
  <treeselect
    ref="treeselect"
    v-model="treeValue"
    :options="optionsData"
    :multiple="multiple"
    :disabled="disabled"
    :z-index="zIndex"
    :disable-branch-nodes="!multiple"
    :normalizer="normalizer"
    :placeholder="placeholder"
    :value-consists-of="valueConsistsOf"
    no-options-text="暂无数据"
    no-results-text="暂无搜索结果"
    :max-height="200"
    :append-to-body="appendToBody"
    class="treeselect-main"
    @input="onInput"
    @select="onSelect"
  />
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'BaseTree',
  components: {
    Treeselect
  },
  model: {
    prop: 'value', // 要存在于proops
    event: 'change'// 当组件的值发生改变时要emit的事件名
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    // 默认单选
    multiple: { type: Boolean, default: false },
    // 保证父组件中，v-bind:value可以正常设置值
    value: { type: [String, Array], default: null },
    placeholder: { type: String, default: '请选择' },
    disabled: { type: Boolean, default: false },
    zIndex: { type: [String, Number], default: 9999 },
    appendToBody: { type: Boolean, default: false },
    // https://www.vue-treeselect.cn/#prevent-value-combining
    // value 在多选模式下，数组中应包括哪种节点。
    // 可接受的值："ALL", "BRANCH_PRIORITY", "LEAF_PRIORITY" or "ALL_WITH_INDETERMINATE".
    // "ALL" - 选中的所有节点都将包含在 value 数组中
    // "BRANCH_PRIORITY"（默认）-如果选中了分支节点，则其所有后代将被排除在value 数组之外
    // "LEAF_PRIORITY" - 如果选中了分支节点，则此节点本身及其分支后代将从value阵列中排除，但其叶后代将包括在内
    // "ALL_WITH_INDETERMINATE" -选中的任何节点将包括在value 数组中，另外还有不确定的节点
    valueConsistsOf: { type: String, default: 'LEAF_PRIORITY' }
  },
  data() {
    return {
      treeValue: null,
      optionsData: [],
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
      }
    }
  },
  watch: {
    // 这里检测data中的值，一旦发生变化就提交事件到父组件
    treeValue: function(newVal, oldVal) {
      var tempValue = newVal || null
      // if (this.multiple && Array.isArray(tempValue)) {
      //   tempValue = newVal.join(',')
      // }
      this.$emit('change', tempValue)
    },
    value: function(newVal, oldVal) {
      this.treeValue = newVal === '' ? null : newVal
    },
    options: function(newVal, oldVal) {
      this.optionsData = newVal
    }
  },
  mounted() {
    this.treeValue = this.value === '' ? null : this.value
  },
  methods: {
    onSelect(value, instanceId) {
      var dict = this.getAncestorIds(value.id)
      this.$emit('select', value, dict) // 传出选择对象
    },
    getAncestorIds(id) {
      var leafId = id
      var ancestorNodes = this.$refs.treeselect.forest.nodeMap[leafId].ancestors
      var ancestorIds = ancestorNodes.map(ancestorNode => ancestorNode.id)
      var ancestorNames = ancestorNodes.map(ancestorNode => ancestorNode.label)
      return {
        ancestorIds: ancestorIds,
        ancestorNames: ancestorNames
      }
    },
    onInput(value, instanceId) {
    }
  }
}
</script>

<style lang="scss" scoped>
// .treeselect-main {
//   display: inline-block;
//   height: 20px;
//   line-height: 32px;
//   ::v-deep .vue-treeselect__placeholder {
//     line-height: 30px;
//   }
//   ::v-deep .vue-treeselect__control {
//     height: 30px;
//     background: #f5f5f5;
//   }

//   ::v-deep .vue-treeselect__menu-container {
//     position: absolute;
//     left: 0;
//     background: red;
//     width: 100%;
//     overflow: visible;
//     -webkit-transition: 0s;
//     margin-top: 10px;
//   }
// }

</style>

<!--

<base-tree :options="treeOptions" v-model="addRuleForm.stationIds" multiple />

      this.treeOptions = [{
        id: "7a8cf3d209cb42da83290c72d4c8b8b2",
        name: "北京分部",
        parentId: "",
        parentName: "",
        children: [{
          id: "124123232422422423232512321",
          name: "北京运维一班",
          parentId: "7a8cf3d209cb42da83290c72d4c8b8b2",
          parentName: "北京分部",
          children: [{
            id: "132123",
            name: "北京运维一班一组",
            parentId: "7a8cf3d209cb42da83290c72d4c8b8b2",
            parentName: "北京运维一班",
            "children": []
          }]
        }],
      },
      {
        id: "7a8cf3d209cb42da83290c72d4c8b8b3",
        name: "上海分部",
        parentId: "",
        parentName: "",
        children: [{
          id: "124123232422422423232512322",
          name: "上海运维一班",
          parentId: "7a8cf3d209cb42da83290c72d4c8b8b3",
          parentName: "上海分部",
          children: [{
            id: "1321232",
            name: "上海运维一班一",
            parentId: "7a8cf3d209cb42da83290c72d4c8b8b3",
            parentName: "上海运维一班",
            "children": []
          }]
        }],
      },
      ];

 -->
