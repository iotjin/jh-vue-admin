<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="55%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div v-loading="dialogLoading" class="bs-dialog">
        <div style="margin:-10px 0px 20px;"> 选中角色：{{ roleData.name }} </div>
        <el-tabs v-model="activeName" type="card">
          <!-- 菜单权限 -->
          <el-tab-pane label="菜单权限" name="first">
            <div style="padding:0 5px 15px;">
              <el-button size="mini" type="primary" :icon="isExpandAll?'el-icon-arrow-down':'el-icon-arrow-right'" @click="onClickToggleExpand"> {{ isExpandAll ?'全部收起':'全部展开' }} </el-button>
              <el-button size="mini" type="primary" :icon="isSelectAll?'el-icon-close':'el-icon-check'" @click="onClickSelectAll"> {{ isSelectAll ?'全部取消':'全部选择' }} </el-button>
            </div>
            <div class="tree-body">
              <el-tree ref="treeRef" :data="menuTreeData" show-checkbox :check-on-click-node="true" node-key="id" highlight-current :default-checked-keys="menuIdList" :props="defaultProps">
                <span slot-scope="{node , data}">
                  <!-- <span> <i :class="data.icon" />{{ node.label }} </span> -->
                  <span>
                    <i v-if="data.icon.includes('el-icon')" :class="'iconFont '+ data.icon" />
                    <svg-icon v-else-if="data.icon.length" :icon-class="data.icon" class="iconFont" />
                    {{ node.label }}
                  </span>
                </span>
              </el-tree>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="bs-dialog-footer">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit()">保存</el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuTreeListByRoleId } from '@/api/system/menu'
import { roleSetPermissions } from '@/api/system/role'

export default {
  components: {},
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    // 传参
    dialogData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      // 弹框相关
      dialogTitle: '权限设置',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogLoading: false,
      roleData: {},
      menuTreeData: [],
      menuIdList: [],
      defaultProps: {
        label: 'title',
        children: 'children'
      },
      isExpandAll: false,
      isSelectAll: false,
      activeName: 'first'
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.$emit('update:isShow', val) // isShowDialog改变时同步父组件isShow的值
    },
    dialogData: function(val) {
      this.roleData = JSON.parse(JSON.stringify(val))
    }
  },
  created() {},
  methods: {
    // 弹框相关
    onOpenedDialog() {
      this.requestList()
    },
    onClosedDialog() {
      this.$emit('closed', {})
    },
    requestList() {
      var params = { roleId: this.roleData.id }
      this.dialogLoading = true
      getMenuTreeListByRoleId(params)
        .then((res) => {
          this.dialogLoading = false
          if (res.code === 20000) {
            this.menuTreeData = res.data.menuTree
            this.menuIdList = res.data.menuIds
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          this.dialogLoading = false
          console.log(JSON.stringify(error))
        })
    },
    onClickToggleExpand() {
      this.isExpandAll = !this.isExpandAll
      const nodes = this.$refs.treeRef.store._getAllNodes()
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].expanded = this.isExpandAll
      }
    },
    onClickSelectAll() {
      this.isSelectAll = !this.isSelectAll
      if (this.isSelectAll) {
        this.$refs.treeRef.setCheckedNodes(this.menuTreeData)
      } else {
        this.$refs.treeRef.setCheckedNodes([])
      }
    },
    onDialogSubmit() {
      this.submitRequest()
    },
    submitRequest() {
      const roleId = this.roleData.id
      const defaultMenuList = this.$refs.treeRef.getCheckedKeys()
      const menuHalfCheckedKeys = this.$refs.treeRef.getHalfCheckedKeys()
      const params = {
        roleId: roleId,
        menuIds: defaultMenuList.concat(menuHalfCheckedKeys)
      }
      console.log(JSON.stringify(params))
      this.dialogSubmitBtnLoading = true
      roleSetPermissions(params)
        .then((res) => {
          this.dialogSubmitBtnLoading = false
          if (res.code === 20000) {
            this.$message.success('角色设置权限成功!')
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
</script>

<style lang="scss" scoped>
.tree-body {
  background: white;
  // height: 400px;
  height: 50vh;
  overflow: auto;
}

.iconFont {
  font-size: 14px;
  color: #999;
}
</style>
