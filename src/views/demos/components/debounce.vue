<template>

  <div class="spp-theme-body spp-theme-pad">

    <h1 style="margin:10px 0px 30px;">防抖/节流指令</h1>

    <div> 未处理前 </div>
    <el-form :inline="true" size="small" :model="queryParams" class="spp-form-search spp-theme-top">
      <el-form-item>
        <span class="spp-form-label" style="width:80px">
          <i class="icon" /><i class="label">名称:</i>
        </span>
        <el-input v-model="queryParams.name" maxlength="20" placeholder="请输入" clearable @input="onChange" @keyup.enter.native="onSearch" />
      </el-form-item>
      <el-form-item>
        <el-button class="spp-form-btn" size="small" type="primary" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="spp-theme-top"> 指令实现 - 搜索框防抖（0.5秒） / 点击按钮节流（3秒内） </div>
    <el-form :inline="true" size="small" :model="queryParams2" class="spp-form-search spp-theme-top">
      <el-form-item>
        <span class="spp-form-label" style="width:80px">
          <i class="icon" /><i class="label">名称:</i>
        </span>
        <el-input v-model="queryParams2.name" v-debounce:500="onChange2" maxlength="20" placeholder="请输入" clearable @keyup.enter.native="onSearch2" />
      </el-form-item>
      <el-form-item>
        <el-button v-debounce:300.click="onSearch2" class="spp-form-btn" size="small" type="primary" style="width: 120px;">查询（按钮防抖）</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-throttle:3000="onSearch3" class="spp-form-btn" size="small" type="primary" style="width: 120px;">查询（按钮节流）</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableHeight: 170,
      tableLoading: false,
      tableData: [],
      queryParams: {
        name: '',
        page: 1,
        limit: this.pageGroup.size
      },
      queryParams2: {
        name: '',
        page: 1,
        limit: this.pageGroup.size
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    onChange(val) {
      console.log(val)
    },
    onSearch() {
      console.log('点击搜索按钮 请求...')
      console.log(JSON.stringify(this.queryParams))
    },
    // 搜索框防抖 - 指令实现
    onChange2() {
      console.log('录入的文字', this.queryParams2.name)
      // Do some things
      this.getListByKeyword()
    },
    getListByKeyword() {
      // 请求...
      console.log('根据关键字 请求...')
      console.log(this.queryParams2.name)
      console.log(JSON.stringify(this.queryParams2))
    },
    // 按钮防抖 - 指令实现
    onSearch2() {
      // Do some things
      this.requestList()
    },
    // 按钮节流 - 指令实现
    onSearch3() {
      // Do some things
      this.requestList()
    },
    requestList() {
      // 请求...
      console.log('点击搜索按钮 请求...')
      console.log(JSON.stringify(this.queryParams2))
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__icon:after {
  height: auto;
}
</style>
