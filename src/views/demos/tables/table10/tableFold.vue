
<template>
  <div>
    <div class="spp-table-group spp-theme-top spp-theme-pad">
      <el-table ref="tableRef" v-loading="tableLoading" class="spp-table spp-theme-top" :data="newFoldList" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" style="width: 100%">
        <el-table-column prop="number" type="index" label="序号" width="55" />
        <el-table-column prop="name" label="产品名称" width="100" />
        <el-table-column prop="isUse" label="状态" width="100">
          <template slot-scope="scope"> {{ scope.row.isUse==0 ?'下降':'上架' }} </template>
        </el-table-column>
        <el-table-column prop="money" label="价格" width="100" />
        <el-table-column prop="content" label="介绍" min-width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="占位" width="200" />
        <el-table-column label="Actions" align="center" fixed="right" width="120">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button size="small" type="warning" @click="newFoldList.splice(scope.$index,1)">Remove</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    foldList: { type: Array, default: () => [] }
  },
  data() {
    return {
      tableLoading: false,
      newFoldList: []
    }
  },
  watch: {
    foldList: {
      handler(newVal, oldVal) {
        this.newFoldList = newVal
      },
      immediate: true
    }
  },
  created() {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.el-button:hover {
  background-color: #409EFF;
  border-color: #409EFF;
}

// .el-table__expanded-cell .el-table td, .el-table th {
//   padding: 0px !important;
// }

</style>
