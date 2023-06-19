<template>
  <div class="bs-page-body">
    <Hamburger />
    <!-- Search start -->
    <el-form :inline="true" size="small" :model="queryParams" class="bs-form-search mt10">
      <el-form-item>
        <span class="bs-form-label" style="width:120px"> <i class="icon">菜单名称:</i> </span>
        <el-input v-model="queryParams.title" maxlength="20" placeholder="请输入菜单名称" clearable @keyup.enter.native="requestList" />
      </el-form-item>
      <el-form-item>
        <span class="bs-form-label" style="width:120px"> <i class="icon">菜单编码:</i> </span>
        <el-input v-model="queryParams.code" maxlength="20" placeholder="请输入菜单编码" clearable @keyup.enter.native="requestList" />
      </el-form-item>
      <el-form-item>
        <el-button class="bs-form-btn" size="small" type="primary" @click="requestList">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- Search end -->

    <!-- Table start -->
    <div class="bs-page-table">
      <div class="bs-table-btns">
        <el-button v-permission="{action:'menu-add'}" size="small" type="primary" icon="el-icon-plus" @click="onClickAdd"> 新增 </el-button>
        <el-button v-permission="{action:'menu-edit'}" size="small" type="primary" icon="el-icon-edit" :disabled="selectedRows.length!==1" @click="onClickEdit"> 编辑 </el-button>
        <el-button v-permission="{action:'menu-look'}" size="small" type="primary" icon="el-icon-search" :disabled="selectedRows.length!==1" @click="onClickLook"> 查看 </el-button>
        <el-button v-permission="{action:'menu-delete'}" size="small" type="danger" icon="el-icon-delete" :disabled="selectedRows.length!==1" @click="onClickDelete"> 删除 </el-button>
        <el-button plain size="small" :icon="isExpandAll?'el-icon-arrow-down':'el-icon-arrow-right'" @click="onClickToggleExpand"> {{ isExpandAll ?'全部收起':'全部展开' }} </el-button>
      </div>
      <el-table
        ref="tableRef"
        v-loading="tableLoading"
        class="bs-table"
        :data="tableData"
        :tree-props="treeProps"
        row-key="id"
        :default-expand-all="false"
        :stripe="true"
        :header-cell-style="headerStyle"
        :cell-style="cellStyle"
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="55px" />
        <el-table-column label="菜单名称" min-width="180px">
          <template slot-scope="scope">
            <span @click="onClickLook(scope.row)">
              <a style="color: #00a0e9;text-decoration:underline;">
                <i v-if="scope.row.icon.includes('el-icon')" :class="'iconFont '+ scope.row.icon" />
                <svg-icon v-else-if="scope.row.icon.length" :icon-class="scope.row.icon" class="iconFont" />
                {{ scope.row.title }}
              </a>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="菜单类型" min-width="130">
          <template slot-scope="scope">
            <div :class="customStyle(scope.row)">{{ getDictLabel(scope.row.menuType,menuTypeOptions) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="菜单编码" min-width="170px" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column label="可见">
          <template slot-scope="scope"> {{ scope.row.menuType==='button' ? '' : (scope.row.hidden ? '隐藏':'显示') }} </template>
        </el-table-column>
        <el-table-column prop="component" label="组件路径" min-width="220px" />
        <el-table-column prop="parentTitle" label="上级菜单" />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-permission="{action:'menu-edit'}" size="mini" icon="el-icon-edit-outline" @click="onClickEdit(scope.row)" />
            <el-button v-permission="{action:'menu-delete'}" size="mini" icon="el-icon-delete" type="danger" @click="onClickDelete(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- Table end -->

    <!-- add/edit dialog -->
    <AddDialog :dialog-type="dialogType" :is-show.sync="isShowDialog" :dialog-data="dialogFormData" :dialog-tree-data="dialogTreeData" @success="requestList" @closed="onClosedDialog" />

  </div>
</template>
<script>
import { getAllMenuTreeList, deleteMenu } from '@/api/system/menu'
import { dictMenuType } from '@/views/system/menu/dict'
import Hamburger from '@/components/Hamburger/index2'
import AddDialog from './addDialog'

export default {
  components: {
    Hamburger,
    AddDialog
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      queryParams: {
        title: '',
        code: ''
      },
      treeProps: {
        children: 'children',
        hasChildren: 'hasChildren'
      },
      selectedRows: [], // 勾选一行或多行数据
      // 字典项
      menuTypeOptions: dictMenuType,
      isExpandAll: false,
      // 弹框相关
      isShowDialog: false,
      dialogType: '',
      dialogFormData: {},
      dialogTreeData: []
    }
  },
  mounted() {
    this.requestList()
  },
  methods: {
    requestList() {
      const params = JSON.parse(JSON.stringify(this.queryParams))
      console.log(JSON.stringify(params))

      this.tableLoading = true
      getAllMenuTreeList(params)
        .then((res) => {
          this.tableLoading = false
          if (res.code === 20000) {
            this.tableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          this.tableLoading = false
          console.log(JSON.stringify(error))
        })
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (column['label'] === '菜单名称') {
        return { textAlign: 'left', paddingLeft: '10px' }
      }
      return { textAlign: 'center' }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return { textAlign: column['label'] === '菜单名称' ? 'left' : 'center' }
    },
    customStyle(row) {
      return 'b-tag b-tag-' + row.menuType
    },
    onSelectionChange(val) {
      this.selectedRows = val
    },
    getDictLabel(value, dictList) {
      const foundIndex = dictList.findIndex((item) => item.value === value)
      if (foundIndex !== -1) {
        return dictList[foundIndex].label
      }
    },
    // 操作按钮
    onClickAdd() {
      this.dialogType = 'add'
      this.dialogFormData = {} // 新增使用的内部初始值
      this.dialogTreeData = this.tableData
      this.isShowDialog = true
    },
    onClickEdit(row) {
      const params = JSON.parse(JSON.stringify(row && row.id ? row : this.selectedRows[0]))
      this.dialogType = 'edit'
      this.dialogFormData = params
      this.dialogTreeData = this.tableData
      this.isShowDialog = true
    },
    onClickLook(row) {
      const params = JSON.parse(JSON.stringify(row && row.id ? row : this.selectedRows[0]))
      this.dialogType = 'look'
      this.dialogFormData = params
      this.dialogTreeData = this.tableData
      this.isShowDialog = true
    },
    onClickDelete(row) {
      var title = ''
      if (row && row.id) {
        title = row.title
      } else {
        title = this.selectedRows.map((item) => item.title).join(',')
      }

      this.$confirm(`确定要删除菜单 ${title} （如果包含子菜单，将一并删除），此操作将永久删除, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = { ids: [] }
        if (row && row.id) {
          params.ids = [row.id]
        } else {
          const tempArr = this.selectedRows.map((item) => item.id)
          params.ids = tempArr.join(',')
        }
        this.deleteRequest(params)
      })
    },
    deleteRequest(params) {
      console.log(JSON.stringify(params))
      deleteMenu(params).then((res) => {
        if (res.code === 20000) {
          this.$message.success('删除成功!')
          this.requestList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onClickToggleExpand() {
      this.isExpandAll = !this.isExpandAll
      this.toggleRowExpansionAll(this.tableData, this.isExpandAll)
    },
    toggleRowExpansionAll(data, isExpansion) {
      data.forEach((item) => {
        this.$refs.tableRef.toggleRowExpansion(item, isExpansion)
        if (item.children !== undefined && item.children !== null) {
          this.toggleRowExpansionAll(item.children, isExpansion)
        }
      })
    },
    // 弹框相关
    onClosedDialog() {
      this.$refs.tableRef.clearSelection()
    }
  }
}
</script>

<style lang="scss" scoped>
.iconFont {
  font-size: 14px;
  color: #999;
}

.b-tag {
  display: inline-block;
  margin: 0.2rem;
  padding: 0px 15px;
  font-size: 12px;
  border: 1px solid #e8eaec;
  border-radius: 4px;
}

.b-tag-catalog {
  color: #722ed1;
  background: #f9f0ff;
  border-color: #d3adf7;
}

.b-tag-menu {
  color: #2f54eb;
  background: #f0f5ff;
  border-color: #adc6ff;
}

.b-tag-button {
  color: #52c41a;
  background: #f6ffed;
  border-color: #b7eb8f;
}

.b-tag-button2 {
  display: inline-block;
  margin: 0.2rem;
  padding: 0px 15px;
  font-size: 12px;
  color: #1890ff;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
}
</style>
