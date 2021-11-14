<!-- 动态增减表单 -->

<template>
  <div class="spp-user-body spp-theme-body spp-theme-pad">

    <!-- 列表查询条件 -->
    <el-form :inline="true" size="small" :model="tableSearchParams" class="spp-form-search spp-theme-top">
      <el-form-item>
        <span class="spp-form-label" style="width: 150px">
          <i class="icon" /><i class="label">名称:</i>
        </span>
        <el-input v-model="tableSearchParams.name" maxlength="20" placeholder="请输入" clearable />
      </el-form-item>

      <el-form-item>
        <span class="spp-form-label" style="width: 150px">
          <i class="icon" /><i class="label">部门:</i>
        </span>
        <el-select v-model="tableSearchParams.dept" placeholder="请选择" collapse-tags clearable>
          <el-option v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <span class="spp-form-label" style="width: 150px">
          <i class="icon" /><i class="label">时间:</i>
        </span>
        <el-date-picker v-model="tableSearchParams.time" type="daterange" value-format="yyyy-MM-dd HH:mm" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <el-button class="spp-form-btn" size="small" type="primary" @click="search()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <div class="spp-table-group spp-theme-top spp-theme-pad">
      <div class="spp-table-btns">
        <el-button size="small" type="primary" @click="onAdd"><i class="el-icon-plus" />新增 </el-button>
        <el-button size="small" type="danger" @click="onDelete"><i class="el-icon-delete" />删除 </el-button>
      </div>
      <el-form ref="tableFormRef" :model="tableForm" label-width="120px" :inline="true" :rules="tableRules" size="small">
        <el-table v-loading="tableLoading" class="spp-table spp-theme-top" :data="tableForm.tableData" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center',}" style="width: 100%" :row-class-name="rowClassName" @selection-change="selectionLineChangeHandle">
          <el-table-column prop="xh" type="index" label="序号" />
          <!-- <el-table-column prop="createDate">
            <template slot="header"> <span style="color:red;padding-right:3px">*</span><span>测试header红星</span> </template>
          </el-table-column> -->
          <el-table-column type="selection" width="55px" />
          <el-table-column label="名称" :render-header="addRedStar" width="200px">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.name`" :rules="tableRules.name">
                <el-input v-model="scope.row.name" maxlength="20" placeholder="请输入" clearable />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="时间" :render-header="addRedStar" width="260px">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.createDate`" :rules="tableRules.createDate">
                <el-date-picker v-model="scope.row.createDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择日期" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="部门" :render-header="addRedStar" width="200px">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.dept`" :rules="tableRules.dept">
                <el-select v-model="scope.row.dept" placeholder="请选择" collapse-tags clearable>
                  <el-option v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作人" :render-header="addRedStar" width="200px">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.operator`" :rules="tableRules.operator">
                <el-input v-model="scope.row.operator" maxlength="10" placeholder="请输入" clearable />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" :render-header="addRedStar" width="260px">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.updateDate`" :rules="tableRules.updateDate">
                <el-date-picker v-model="scope.row.updateDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择日期" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120px">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit-outline" @click="rowEdit(scope.row)" />
              <el-button size="mini" icon="el-icon-delete" type="danger" @click="rowDelete(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <div class="spp-table-btns" align="center" style="padding:20px;">
        <el-button :loading="dialogSubmitBtnLoading" type="primary" size="small" @click="onClickSave()">保存</el-button>
        <el-button type="primary" size="small" @click="onClickReset()">重置</el-button>
      </div>

    </div>

  </div>
</template>
<script>
// import { getDeptList } from '@/api/base/base'
// import { getListData, editData, getDataById, exportById } from '@/api/table/table'
export default {
  components: {
  },
  data() {
    return {
      tableHeight: 170,
      tableLoading: false,
      tableSearchParams: {
        name: '',
        dept: '',
        time: '',
        page: 1,
        limit: this.pageGroup.size
      },
      tableTotal: 1000, // 默认数据总数
      tableSizes: this.pageGroup.sizes, // 显示条数分组
      tableForm: {
        tableData: []
      },
      tableRules: {
        dept: [{ required: true, message: '请选择部门', trigger: 'change' }],
        createDate: [{ required: true, message: '请选择时间', trigger: 'change' }],
        updateDate: [{ required: true, message: '请选择操作时间', trigger: 'change' }],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ],
        operator: [
          { required: true, message: '请输入操作人名称', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
        ]
      },
      selectionList: [], // 勾选一行或多行数据
      // 字典项
      deptOptions: [], // 部门
      dialogSubmitBtnLoading: false
    }
  },
  mounted() {
    this.requestList()
    this.requestDict()
  },
  methods: {
    // 搜索列表
    search() {
      this.requestList()
    },
    // 加载列表数据
    requestList() {
      const params = this.tableSearchParams
      // this.tableLoading = true;
      console.log('参数：' + JSON.stringify(params))
      // requestList(params).then(response => {
      //   const {
      //     data
      //   } = response
      //   this.tableForm.tableData = data;
      //   this.tableTotal = response.count;
      //   this.tableLoading = false;
      // }).catch(error => {
      //   this.tableLoading = false;
      // });
      const tempArr = []
      for (let index = 0; index < 2; index++) {
        tempArr.push({
          'id': index,
          dept: 'dept' + (index + 1),
          'name': '名称' + index,
          'createDate': '2021-08-17 09:00:00',
          'operator': '操作人',
          'updateDate': '2021-08-17 09:00:00'
        })
      }
      this.tableForm.tableData = tempArr
    },
    // 字典
    requestDict() {
      // getDict().then(res => {
      //   this.options = res.data;
      // }).catch(error => {
      // });

      this.deptOptions = [{
        'id': 'f505a4b97b151d141d122a3d323c87ee',
        'label': '部门一',
        'value': 'dept1',
        'type': '这是描述1',
        'sort': 0
      },
      {
        'id': 'f505a4b97b151d141d122a3d323c87ee',
        'label': '部门二',
        'value': 'dept2',
        'type': '这是描述2',
        'sort': 1
      }]
    },
    // 其中row是行对象，rowindex是行号，从0开始。所以这样就能实现了序号(xh属性)递增并且取值为行号加1。
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    addStar(obj) {
      console.log(obj)
      // if (obj.columnIndex === 0 || obj.columnIndex === 1) {
      return 'star'
      // }
    },
    addRedStar(h, { column }) { // 给表头加必选标识
      return [h('span', { style: 'color: red' }, '*'), h('span', ' ' + column.label)]
    },
    // 页容量改变时会触发
    handleSizeChange(size) {
      this.tableSearchParams.limit = size
      this.requestList()
    },
    // 当前页改变时会触发
    handleCurrentChange(currentPage) {
      this.tableSearchParams.page = currentPage
      this.requestList()
    },
    selectionLineChangeHandle(val) {
      this.selectionList = val
    },
    onAdd() {
      const item = {
        'id': '',
        'name': '',
        'dept': '',
        'createDate': '',
        'operator': '',
        'updateDate': ''
      }
      this.tableForm.tableData.push(item)
    },
    // 编辑
    onEdit() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择记录')
        return
      } else if (this.selectionList.length > 1) {
        this.$message.warning('只能选择一条记录！')
        return
      } else {
        // this.isShowEditDialog = true;
        // this.editRuleForm = this.selectionList[0];
      }
    },
    // 删除
    onDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择记录')
        return
      }
      // console.log(JSON.stringify(this.selectionList));
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 主要实现步骤，先把表格行数存到一个新数组
        const tempArr = []
        for (let i = 0; i < this.selectionList.length; i++) {
          tempArr.push(this.selectionList[i].xh)
        }
        // 数字数组排序，因为选择框是根据先选择的顺序存到checkedDetail里面，所以需要排序
        tempArr.sort(function(a, b) {
          return a - b
        })
        console.log('新数组排序后：' + tempArr)
        // 逐个根据下标删除
        for (let i = 0; i < tempArr.length; i++) {
          this.tableForm.tableData.splice(tempArr[i] - i - 1, 1)
        }
        this.$message.success('删除成功!')
      }).catch(() => {
      })
    },
    rowEdit(row) {
      console.log(JSON.stringify(row))
    },
    rowDelete(row) {
      console.log(JSON.stringify(row))
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableForm.tableData.splice(row.xh - 1, 1)
        this.$message.success('删除成功!')
      }).catch(() => {
      })
    },
    onClickReset() {
      this.$refs['tableFormRef'].resetFields()
    },
    onClickSave() {
      this.$refs['tableFormRef'].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.tableForm))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  padding: 10px;
  margin-bottom: 0px;
}

.el-form-item.is-error {
  padding: 10px;
  margin-bottom: 20px;
}
</style>

