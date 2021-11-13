<template>
  <div class="spp-theme-body spp-theme-pad">
    <!-- 列表查询条件 -->
    <el-form :inline="true" size="small" :model="tableSearchParams" class="spp-form-search spp-theme-top">
      <el-form-item>
        <span class="spp-form-label" style="width:80px">
          <i class="icon" /><i class="label">名称:</i>
        </span>
        <el-input v-model="tableSearchParams.name1" maxlength="20" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <span class="spp-form-label" style="width:80px">
          <i class="icon" /><i class="label">级别:</i>
        </span>
        <el-select v-model="tableSearchParams.level" placeholder="请选择" collapse-tags clearable>
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <span class="spp-form-label" style="width: 150px">
          <i class="icon" /><i class="label">创建时间:</i>
        </span>
        <el-date-picker v-model="tableSearchParams.timeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy年MM月dd日" />
      </el-form-item>
      <el-form-item>
        <el-button class="spp-form-btn" size="small" type="primary" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <div class="spp-table-group spp-theme-top spp-theme-pad">
      <div class="spp-table-btns">
        <el-button size="small" type="primary" @click="onAdd"><i class="el-icon-plus" />新增 </el-button>
        <el-button size="small" type="primary" @click="onEdit"><i class="el-icon-edit" />编辑 </el-button>
        <el-button size="small" type="primary" @click="onLook"><i class="el-icon-search" />查看 </el-button>
        <el-button size="small" type="warning" @click="onExport"><i class="el-icon-download" />导出 </el-button>
        <el-button size="small" type="danger" @click="onDelete"><i class="el-icon-delete" />删除 </el-button>
        <!-- <el-button v-permission="{action:'menu-add'}" size="small" type="primary" @click="onAdd"><i class="el-icon-plus" />新增 </el-button>
        <el-button v-permission="{action:'menu-edit'}" size="small" type="primary" @click="onEdit"><i class="el-icon-edit" />编辑 </el-button>
        <el-button v-permission="{action:'menu-export'}" size="small" type="warning" @click="onExport"><i class="el-icon-download" />导出 </el-button>
        <el-button v-permission="{action:'menu-delete'}" size="small" type="danger" @click="onDelete"><i class="el-icon-delete" />删除 </el-button> -->
      </div>
      <el-table v-loading="tableLoading" class="spp-table spp-theme-top" :data="tableData" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" style="width: 100%" @selection-change="selectionLineChangeHandle">
        <el-table-column prop="number" type="index" label="序号" />
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name1" label="操作人" width="100">
          <template slot-scope="scope">
            <span @click="onClickRow(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.name1 }}</a> </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name1" label="操作人" /> -->
        <!-- <el-table-column prop="content" label="内容" /> -->
        <!-- <el-table-column prop="level" label="级别" /> -->
        <el-table-column prop="content" label="内容" width="200">
          <template scope="scope">
            <el-tooltip :visible-arrow="false" class="item" effect="light" :content="scope.row.content" placement="bottom">
              <span class="tab-line-max-show-css">
                {{ scope.row.content }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="级别" sortable width="150">
          <template slot-scope="scope"> {{ getName(scope.row.level,levelOptions) }} </template>
        </el-table-column>
        <el-table-column prop="status" label="处理状态">
          <template slot-scope="scope"> {{ scope.row.status==0 ?'未处理':'已处理' }} </template>
        </el-table-column>
        <el-table-column prop="isUse" label="启用">
          <template slot-scope="scope"> {{ scope.row.isUse==0 ?'停用':'启用' }} </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200" />
        <el-table-column prop="money" label="金额" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="createDate" label="创建时间" width="180" />
        <el-table-column prop="updateDate" label="更新时间" width="180" />

        <!-- <el-table-column prop="updateDate" label="更新时间" width="150">
          <template scope="scope"> <span> {{ scope.row.updateDate ? scope.row.updateDate.substring(0, 16) : "" }} </span> </template>
        </el-table-column> -->
        <!-- <el-table-column label="操作" fixed="right">
          <template scope="scope">
            <el-button size="mini" type="primary" @click="onHandle(scope.row)">处理</el-button>
          </template>
        </el-table-column> -->

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit-outline" @click="rowEdit(scope.row)" />
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="rowDelete(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="tableTotal>0" background class="spp-theme-top" :current-page="tableSearchParams.page" :page-size="tableSearchParams.limit" :page-sizes="tableSizes" :total="tableTotal" layout="prev, pager, next, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <!-- 新增 编辑弹框 -->
    <Dialog1 :title="dialogTitle" :is-show="isShowDialog" :dialog-data="dialogForm" jump-page="table2页面" @success="requestList()" />

  </div>
</template>

<script>

import TimeUtils from '@/utils/timeUtils'
// import { getDeptList } from '@/api/base/base'
import { getDictLevel, getListData, getDataById, deleteData } from '@/api/tables/tables'
import Dialog1 from './dialog1.vue'

export default {
  components: {
    Dialog1
  },
  data() {
    return {
      tableHeight: 170,
      tableLoading: false,
      tableData: [],
      tableSearchParams: {
        name1: '',
        time: '',
        level: '',
        page: 1,
        limit: this.pageGroup.size
      },
      tableTotal: 1000, // 默认数据总数
      tableSizes: this.pageGroup.sizes, // 显示条数分组
      selectionList: [], // 勾选一行或多行数据
      // 弹框相关
      dialogTitle: '',
      isShowDialog: false,
      dialogIsLook: false,
      dialogForm: {},
      // 字典项
      deptOptions: [],
      levelOptions: [],
      selectId: ''
    }
  },
  mounted() {
    this.requestDict()
    this.requestList()
  },
  methods: {
    // 搜索列表
    onSearch() {
      this.handleCurrentChange(1)
    },
    // 加载列表数据
    requestList() {
      var that = this
      var params = {}
      params = this.tableSearchParams
      params.startDate = this.tableSearchParams.timeRange ? TimeUtils.startOfDay(this.tableSearchParams.timeRange[0]) : ''
      params.endDate = this.tableSearchParams.timeRange ? TimeUtils.endOfDay(this.tableSearchParams.timeRange[1]) : ''
      // params.name1 = this.tableSearchParams.name1
      // params.page = this.tableSearchParams.page
      // params.limit = this.tableSearchParams.limit
      console.log(JSON.stringify(params))

      this.tableLoading = true
      getListData(params).then(res => {
        that.tableLoading = false
        if (res.code === 20000) {
          that.tableData = res.data
          that.tableTotal = res.total
        } else {
          that.$message.error(res.msg)
        }
      }).catch(error => {
        that.tableLoading = false
        console.log(JSON.stringify(error))
      })
    },
    // 字典
    requestDict() {
      var that = this
      // getDeptList().then(res => {
      //   if (res.code === 20000) {
      //     that.deptOptions = res.data
      //   }
      // }).catch(error => {
      //   console.log(JSON.stringify(error))
      // })
      getDictLevel().then(res => {
        if (res.code === 20000) {
          that.levelOptions = res.data
        }
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    },
    getName(value, data) {
      var tempData = data
      for (var i = 0; i < tempData.length; i++) {
        if (tempData[i].value === value) {
          return tempData[i].label
        }
      }
    },
    // 页容量改变时会触发
    handleSizeChange(size) {
      this.tableSearchParams.page = 1
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
    // 操作按钮
    onAdd() {
      this.dialogForm = {
        name1: '',
        content: '',
        level: '',
        createDate: '',
        updateDate: '',
        isUse: '',
        status: '',
        phone: '',
        money: '',
        age: ''
      }
      this.dialogTitle = '新增'
      this.dialogIsLook = false
      this.isShowDialog = true
    },
    onLook() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择记录')
        return
      } else if (this.selectionList.length > 1) {
        this.$message.warning('只能选择一条记录！')
        return
      } else {
        this.selectId = this.selectionList[0].id
        this.dialogTitle = '查看'
        this.dialogIsLook = true
        this.dialogForm = this.selectionList[0]
        this.isShowDialog = true
      }
    },
    onEdit() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择记录')
        return
      } else if (this.selectionList.length > 1) {
        this.$message.warning('只能选择一条记录！')
        return
      } else {
        this.selectId = this.selectionList[0].id
        this.dialogTitle = '编辑'
        this.dialogIsLook = false
        this.dialogForm = this.selectionList[0]
        this.isShowDialog = true
      }
    },
    onExport() {
      if (this.selectionList.length === 0) {
        var params = {
          name1: '',
          time: '',
          level: '',
          page: 1,
          limit: this.tableTotal
        }
        var _this = this
        getListData(params).then(response => {
          const {
            data
          } = response
          _this.handelExcel(data)
        }).catch(error => {
          console.log(JSON.stringify(error))
        })
      } else {
        this.handelExcel(this.selectionList)
      }
    },
    handelExcel(tableData) {
      var newTableDate = {}
      newTableDate = tableData
      newTableDate.forEach(item => {
        item.levelName = this.getName(item.level, this.levelOptions)
        item.statusText = item.status === 1 ? '已处理' : '未处理'
      })
      require.ensure([], () => {
        var { export_json_to_excel } = require('../../../../vendor/Export2Excel.js')
        var tHeader = ['操作人', '级别', '手机号', '金额', '年龄', '创建时间', '更新时间', '状态']
        var filterVal = ['name1', 'levelName', 'phone', 'money', 'age', 'createDate', 'updateDate', 'statusText']
        var list = newTableDate
        var data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, 'Excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    onDelete() {
      var that = this
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择记录')
        return
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var tempArr = []
        for (var item of that.selectionList) {
          tempArr.push(item.id)
        }
        var arrStr = tempArr.join(',')
        var params = { ids: arrStr }
        that.deleteRequest(params)
      }).catch(() => {
      })
    },
    deleteRequest(params) {
      var that = this
      console.log(JSON.stringify(params))
      deleteData(params).then(res => {
        if (res.code === 20000) {
          that.$message.success('删除成功!')
          that.isShowDialog = false
          that.requestList()
        } else {
          that.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    },
    // 通过下划线点击row
    onClickRow(row) {
      console.log(JSON.stringify(row))
      this.selectId = row.id
      this.dialogTitle = '查看'
      this.dialogIsLook = true
      this.dialogForm = row
      this.isShowDialog = true
    },
    // 行内处理
    onHandle(row) {
      console.log(JSON.stringify(row))
      var that = this
      getDataById(row.id).then(res => {
        if (res.code === 20000) {
          that.dialogTitle = '查看'
          that.dialogIsLook = true
          that.dialogForm = res.data
          that.isShowDialog = true
        } else {
          that.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    },

    // 行编辑
    rowEdit(row) {
      console.log(JSON.stringify(row))
      this.dialogTitle = '编辑'
      this.dialogIsLook = false
      this.dialogForm = row
      this.isShowDialog = true
    },
    // 行删除
    rowDelete(row) {
      console.log(JSON.stringify(row))
      var that = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.deleteRequest(row.id)
      }).catch((error) => {
        console.log(JSON.stringify(error))
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
