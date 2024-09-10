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
        <el-button class="spp-form-btn" size="small" type="primary" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <div class="spp-table-group spp-theme-top spp-theme-pad">
      <el-table
        ref="tableRef"
        v-drag-table="{ onStart: onStart, onEnd: onEnd }"
        v-loading="tableLoading"
        row-key="id"
        class="spp-table spp-theme-top"
        :data="tableData"
        :stripe="true"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{textAlign: 'center'}"
        style="width: 100%"
        @selection-change="onSelectionChange"
      >
        <el-table-column prop="number" type="index" label="序号" />
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name1" label="操作人" width="100">
          <template slot-scope="scope">
            <span @click="onClickRow(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.name1 }}</a> </span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200" />
        <el-table-column prop="money" label="金额" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="createDate" label="创建时间" width="180" />
        <el-table-column prop="updateDate" label="更新时间" width="180" />
        <el-table-column fixed="right" label="操作" width="200">
          <template>
            <el-button size="mini" icon="el-icon-edit-outline" />
            <el-button size="mini" icon="el-icon-delete" type="danger" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="tableTotal>0" background class="spp-theme-top" :current-page="tableSearchParams.page" :page-size="tableSearchParams.limit" :page-sizes="tableSizes" :total="tableTotal" layout="prev, pager, next, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
// 使用指令v-drag-table实现拖拽排序，必须要设置row-key="id"

import { getListData } from '@/api/tables/tables'
// import Sortable from 'sortablejs'

export default {
  // directives: {
  //   'drag-table2': {
  //     inserted(el, binding, vnode) {
  //       const vm = vnode.context
  //       const table = vm.$el.querySelector('.el-table__body-wrapper > table')
  //       const tbody = table.querySelector('tbody')
  //       const { onStart, onEnd } = binding.value || {}
  //       new Sortable(tbody, {
  //         animation: 300,
  //         handle: '.el-table__row',

  //         onStart: (evt) => {
  //           if (onStart) {
  //             onStart(evt)
  //           }
  //         },
  //         onEnd: (evt) => {
  //           const oldIndex = evt.oldIndex
  //           const newIndex = evt.newIndex
  //           vm.tableData.splice(newIndex, 0, vm.tableData.splice(oldIndex, 1)[0])
  //           if (onEnd) {
  //             onEnd(evt)
  //           }
  //         }
  //       })
  //     }
  //   }
  // },
  data() {
    return {
      tableHeight: 170,
      tableLoading: false,
      tableData: [],
      tableSearchParams: {
        name1: '',
        page: 1,
        limit: this.pageGroup.size
      },
      tableTotal: 1000, // 默认数据总数
      tableSizes: this.pageGroup.sizes, // 显示条数分组
      selectionList: [] // 勾选一行或多行数据
    }
  },
  mounted() {
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
      console.log(JSON.stringify(params))
      this.tableLoading = true
      getListData(params)
        .then((res) => {
          that.tableLoading = false
          if (res.code === 20000) {
            that.tableData = res.data
            that.tableTotal = res.total
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch((error) => {
          that.tableLoading = false
          console.log(JSON.stringify(error))
        })
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
    onSelectionChange(val) {
      this.selectionList = val
    },
    onClickRow(row) {
      console.log('row', JSON.stringify(row))
    },
    onStart(evt) {
      console.log('onStart', evt)
    },
    onEnd(evt) {
      console.log('onEnd', evt)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
