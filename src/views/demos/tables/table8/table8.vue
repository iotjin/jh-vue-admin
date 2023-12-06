<template>
  <div class="spp-theme-body spp-theme-pad">
    <!-- 列表查询条件 -->
    <el-form :inline="true" size="small" :model="queryParams" class="spp-form-search spp-theme-top">
      <el-form-item>
        <span class="spp-form-label" style="width:80px">
          <i class="icon" /><i class="label">名称:</i>
        </span>
        <el-input v-model="queryParams.name1" maxlength="20" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button class="spp-form-btn" size="small" type="primary" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <div class="spp-table-group spp-theme-top spp-theme-pad">
      <div class="spp-table-btns">
        <el-checkbox v-model="isExpandAll" style="padding: 3px 0;" @change="onChangeExpand">Unfold All</el-checkbox>
      </div>
      <el-table ref="tableRef" v-loading="tableLoading" class="spp-table spp-theme-top" :data="tableData" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" style="width: 100%" @selection-change="onSelectionChange" @expand-change="expandChange">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <TableFold :fold-list="scope.row.foldList" @toggleShowAll="toggleShowAll" />
          </template>
        </el-table-column>
        <el-table-column prop="number" type="index" label="序号" />
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name1" label="操作人" width="100">
          <template slot-scope="scope">
            <span @click="onClickRow(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.name1 }}</a> </span>
          </template>
        </el-table-column>
        <el-table-column prop="isUse" label="启用">
          <template slot-scope="scope"> {{ scope.row.isUse==0 ?'停用':'启用' }} </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200" />
        <el-table-column prop="money" label="金额" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="createDate" label="创建时间" width="180" />
        <el-table-column prop="updateDate" label="更新时间" width="180" />
        <el-table-column label="操作" width="120">
          <template>
            <el-button size="mini" icon="el-icon-edit-outline" />
            <el-button size="mini" icon="el-icon-delete" type="danger" />
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-show="tableTotal>0" :total="tableTotal" :page.sync="queryParams.page" :limit.sync="queryParams.limit" @pagination="requestList" />
    </div>

  </div>
</template>

<script>
import { getListData, getDataById } from '@/api/tables/tables'
import Pagination from '@/components/Pagination'
import TableFold from './tableFold'
const Mock = require('mockjs')

export default {
  components: {
    Pagination,
    TableFold
  },
  data() {
    return {
      tableTotal: 0,
      tableLoading: false,
      tableData: [],
      isExpandAll: false,
      queryParams: {
        name1: '',
        page: 1,
        limit: this.pageGroup.size
      },
      selectionList: [] // 勾选一行或多行数据
    }
  },
  mounted() {
    this.requestList()
  },
  methods: {
    requestList() {
      var params = this.queryParams
      console.log(JSON.stringify(params))
      this.tableLoading = true
      getListData(params)
        .then((res) => {
          this.tableLoading = false
          if (res.code === 20000) {
            this.tableData = this.handleData(res.data)
            this.tableTotal = res.total
            this.onChangeExpand()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          this.tableLoading = false
          console.log(JSON.stringify(error))
        })
    },
    handleData(list) {
      var tempArr = list
      for (let i = 0; i < tempArr.length; i++) {
        const foldList = Mock.mock({
          'items|1-8': [
            {
              id: '@id',
              name: '@cname',
              'content|1-18': '这是内容',
              createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              updateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              phone: /^1[387][0-9]{9}$/,
              money: '@float(0, 1000, 1, 2)'
            }
          ]
        })
        tempArr[i]['foldList'] = foldList.items
      }
      return tempArr
    },
    onSearch() {
      this.queryParams.page = 1
      this.requestList()
    },
    onSelectionChange(val) {
      this.selectionList = val
    },
    onClickRow(row) {
      console.log(JSON.stringify(row))
      this.$message.warning(row.name1)
    },
    onChangeExpand() {
      this.$nextTick(() => {
        this.toggleRowExpansionAll(this.tableData, this.isExpandAll)
      })
    },
    toggleRowExpansionAll(data, isExpansion) {
      data.forEach((item) => {
        this.$refs.tableRef.toggleRowExpansion(item, isExpansion)
      })
    },
    toggleShowAll() {
      // this.$nextTick(() => {
      //   this.$refs.tableRef.doLayout()
      //   this.$forceUpdate()
      // })
    },
    expandChange(row, rows) {
      const isExpend = rows.some((r) => r.id === row.id)
      if (isExpend) {
        this.getDetails(row.id)
      }
    },
    getDetails(id) {
      console.log('展开params: ' + id)
      this.tableLoading = true
      getDataById(id)
        .then((res) => {
          this.tableLoading = false
          if (res.code === 20000) {
            this.detailData = res.data
          } else {
            this.$message.warning('Failed to get table detail. Error details: ' + res.msg)
          }
        })
        .catch((e) => {
          this.$message.error('Failed to get table detail. Error details: ', e)
          this.tableLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
