<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogState.reportConfigDialog" top="8vh" width="70%" @closed="onCloseEditLabelDialog()">

      <div class="content">
        <div v-loading.fullscreen.lock="createGroup_treeLoading" class="left">
          <el-tree :data="iscUserTreeData" :props="defaultProps" highlight-current :expand-on-click-node="true" node-key="id" :default-expanded-keys="['1']" :default-checked-keys="['1']" @node-click="handleNodeClick" />
          <el-tree ref="tree" :data="taskNameTreeData" node-key="id" show-checkbox default-expand-all highlight-current @check-change="handleCheckChange" />
        </div>
        <div class="right" />
      </div>

      <div slot="footer" class="spp-dialog-btns footer-center">
        <el-button :loading="dialogState.typeDialogSubmitBtnLoading" type="primary" size="small" @click="allClick()">确定</el-button>
        <el-button size="small" @click="dialogState.reportConfigDialog = false">取消</el-button>
      </div>

      <div slot="footer" class="spp-dialog-btns footer-center">
        <el-button type="primary" size="small" @click="onClickCreateGroupFirstBtn">确定</el-button>
        <el-button size="small" @click="createGroup_dialogVisible = false">取消</el-button>
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
.footer-center {
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
