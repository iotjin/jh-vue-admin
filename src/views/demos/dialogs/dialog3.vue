<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="70%" :close-on-click-modal="false" @opened="onOpenDialog" @closed="onClosedDialog">

      <div class="content">
        <div v-loading.fullscreen.lock="createGroup_treeLoading" class="left">
          <el-tree :data="iscUserTreeData" :props="defaultProps" highlight-current :expand-on-click-node="true" node-key="id" :default-expanded-keys="['1']" :default-checked-keys="['1']" @node-click="handleNodeClick" />
          <el-tree ref="tree" :data="taskNameTreeData" node-key="id" show-checkbox default-expand-all highlight-current @check-change="handleCheckChange" />
        </div>
        <div class="right" />
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
export default {
  components: {
  },
  data() {
    return {
      tableHeight: 170,
      tableLoading: false,
      tableData: []
    }
  },
  mounted() {
  },
  methods: {
    handleNodeClick(data) {
      console.log('点击树选择的id===' + data.id)
      console.log(JSON.stringify(data))
      this.dialogForm.shortNameId = data.id
      this.dialogForm.shortName = data.label
    },
    handleCheckChange(data, checked) {
      // data 即为选择的集合值
      if (checked) {
        this.$refs.tree.setCheckedKeys([data.id])
        this.dialogForm.shortNameId = data.id
        this.dialogForm.shortName = data.label
      }
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
  flex: 25;
  min-width: 25%;
  max-height: 55vh;
  overflow-x: auto;
  overflow-y: auto;
}
.right {
  flex: 75;
  min-width: 60%;
}
.dialog-footer {
  text-align: center;
}
.form-bg {
  padding: 15px 30px 30px 10px;
}

// ::v-deep .el-tree-node:focus > .el-tree-node__content {
//   background-color: #000 !important;
// }
::v-deep .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner {
    display: inline-block;
  }
  .el-checkbox .el-checkbox__inner {
    display: none;
  }
}
</style>
