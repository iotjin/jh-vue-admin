<template>
  <div>
    <!-- 弹框 -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" top="8vh" width="80%" :close-on-click-modal="false" @opened="onOpenedDialog" @closed="onClosedDialog">
      <div class="spp-dialog">

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
              <span class="spp-form-label" style="width: 110px">
                <i class="icon" /><i class="label">创建时间:</i>
              </span>
              <el-date-picker v-model="tableSearchParams.timeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy年MM月dd日" />
            </el-form-item>
            <el-form-item style="padding-left:30px">
              <el-button class="spp-form-btn" size="small" type="primary" @click="onSearch()">查询</el-button>
            </el-form-item>
          </el-form>

          <!-- 列表 -->
          <div class="spp-table-group spp-theme-top spp-theme-pad">
            <div class="spp-table-btns">
              <el-button size="small" type="primary" @click="onSelectAll">全选 </el-button>
              <el-button size="small" type="danger" @click="onDeleteAll">清空 </el-button>
            </div>
            <el-table ref="tableRef" v-loading="tableLoading" class="spp-table spp-theme-top" :data="tableData" :stripe="true" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" style="width: 100%" @selection-change="onSelectionChange">
              <el-table-column prop="number" type="index" label="序号" />
              <el-table-column type="selection" width="55" />
              <el-table-column prop="name1" label="操作人" width="100">
                <template slot-scope="scope">
                  <span @click="onClickRow(scope.row)"> <a style="color: #00a0e9;text-decoration:underline;">{{ scope.row.name1 }}</a> </span>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="内容" width="200">
                <template slot-scope="scope">
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
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="rowSelect(scope.row)">选择 </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination v-show="tableTotal>0" background class="spp-theme-top" :current-page="tableSearchParams.page" :page-size="tableSearchParams.limit" :page-sizes="tableSizes" :total="tableTotal" layout="prev, pager, next, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>

        <div slot="footer" class="dialog-footer spp-dialog-btns">
          <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSelect()">选择
          </el-button>
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import TimeUtils from '@/utils/timeUtils'
import { getDictLevel, getListData } from '@/api/tables/tables'

// 选择弹框
export default {
  components: {},
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    // 标题
    title: { type: String, default: '' },
    // 传参1 - 对象
    dialogData: { type: Object, default: () => ({}) },
    // 传参2 - 数组
    dialogListData: { type: Array, default: () => [] },
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 弹框相关
      dialogTitle: '选择',
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      levelOptions: [],
      // 列表相关
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
      selectionList: [] // 勾选一行或多行数据，最终所选数据
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.showDialog(val)
    },
    title: function(val) {
      this.dialogTitle = val.length ? val : this.dialogTitle
    },
    dialogData: function(val) {},
    dialogListData: function(val) {}
  },
  mounted() {},
  methods: {
    showDialog(isShow) {
      this.$emit('update:isShow', isShow) // isShowDialog改变时同步父组件show的值
    },
    // 字典
    requestDict() {
      var that = this
      getDictLevel()
        .then((res) => {
          if (res.code === 20000) {
            that.levelOptions = res.data
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error))
        })
    },
    // 加载列表数据
    requestList() {
      var that = this
      var params = {}
      params = this.tableSearchParams
      params.startDate = this.tableSearchParams.timeRange ? TimeUtils.startOfDay(this.tableSearchParams.timeRange[0]) : ''
      params.endDate = this.tableSearchParams.timeRange ? TimeUtils.endOfDay(this.tableSearchParams.timeRange[1]) : ''
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
    getName(value, data) {
      var tempData = data
      for (var i = 0; i < tempData.length; i++) {
        if (tempData[i].value === value) {
          return tempData[i].label
        }
      }
    },
    // 弹框相关
    onOpenedDialog() {
      this.requestDict()
      this.requestList()
    },
    onClosedDialog() {
      this.$emit('closed', []) // 传出选择数据
    },
    onDialogSelect() {
      this.submitRequest()
    },
    // 搜索列表
    onSearch() {
      this.handleCurrentChange(1)
    },
    // table相关
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
    onSelectAll() {
      this.$refs.tableRef.toggleAllSelection()
    },
    onDeleteAll() {
      this.$refs.tableRef.clearSelection()
    },
    onSelectionChange(val) {
      this.selectionList = val
    },
    rowSelect(row) {
      this.selectionList = [row]
      this.isShowDialog = false
      this.$emit('select', this.selectionList) // 传出选择数据
    },
    // 通过下划线点击row
    onClickRow(row) {
      console.log(JSON.stringify(row))
      this.$message.info(row.name1)
    },
    submitRequest() {
      // this.dialogSubmitBtnLoading = true
      var params = [...this.selectionList]
      this.isShowDialog = false
      this.$emit('select', params) // 传出选择数据
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
