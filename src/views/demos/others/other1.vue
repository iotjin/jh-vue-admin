<template>

  <div class="spp-theme-body spp-theme-pad">

    <h1 style="margin:10px 0px 30px;">防抖与节流</h1>

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

    <div class="spp-theme-top"> lodash实现 - 搜索框防抖（0.5秒） / 点击按钮节流（3秒内） </div>
    <el-form :inline="true" size="small" :model="queryParams2" class="spp-form-search spp-theme-top">
      <el-form-item>
        <span class="spp-form-label" style="width:80px">
          <i class="icon" /><i class="label">名称:</i>
        </span>
        <el-input v-model="queryParams2.name" maxlength="20" placeholder="请输入" clearable @input="onChange2" @keyup.enter.native="onSearch2" />
      </el-form-item>
      <el-form-item>
        <el-button class="spp-form-btn" size="small" type="primary" @click="onSearch2()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="spp-form-btn" size="small" type="primary" style="width: 120px;" @click="onSearch22()">查询（方式2）</el-button>
      </el-form-item>
    </el-form>

    <div class="spp-theme-top"> utils实现 - 搜索框防抖（0.5秒） / 点击按钮节流（3秒内） </div>
    <el-form :inline="true" size="small" :model="queryParams2" class="spp-form-search spp-theme-top">
      <el-form-item>
        <span class="spp-form-label" style="width:80px">
          <i class="icon" /><i class="label">名称:</i>
        </span>
        <el-input v-model="queryParams3.name" maxlength="20" placeholder="请输入" clearable @input="onChange3" @keyup.enter.native="onSearch3" />
      </el-form-item>
      <el-form-item>
        <el-button class="spp-form-btn" size="small" type="primary" @click="onSearch3()">查询</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import lodash from 'lodash'
import { debounce2, throttle } from '@/utils/index'

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
      },
      queryParams3: {
        name: '',
        page: 1,
        limit: this.pageGroup.size
      }
    }
  },
  created() {
    // 按钮节流 - lodash实现 - 方式2
    this.onSearch22 = lodash.throttle(this.onSearch22, 3000)
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
    // lodash文档： https://www.lodashjs.com/
    //
    // 搜索框防抖 - lodash实现
    // 不要在debounce里写箭头函数，否则this的指向就是undefined，而不是Vue实例对象。
    // 注意这里若是使用箭头函数的话， this为 undefined https://github.com/vue-styleguidist/vue-docgen-api/issues/23
    onChange2: lodash.debounce(function() {
      // Do some things
      this.getListByKeyword()
    }, 500),
    getListByKeyword() {
      // 请求...
      console.log('根据关键字 请求...')
      console.log(this.queryParams2.name)
      console.log(JSON.stringify(this.queryParams2))
    },
    // 按钮节流 - lodash实现 - 方式1
    onSearch2: lodash.throttle(function() {
      // Do some things
      this.requestList()
    }, 3000),
    requestList() {
      // 请求...
      console.log('点击搜索按钮 请求...')
      console.log(JSON.stringify(this.queryParams2))
    },
    // 按钮节流 - lodash实现 - 方式2
    onSearch22() {
      // Do some things
      this.requestList3()
    },
    // 防抖
    // 项目工具类
    // 如果需要加参数，则在function空的形参列表里加入
    onChange3: debounce2(function(val) {
      console.log('录入的文字', val)
      // Do some things
      this.getListByKeyword3()
    }, 500),
    getListByKeyword3() {
      // 请求...
      console.log('根据关键字 请求...')
      console.log(this.queryParams3.name)
      console.log(JSON.stringify(this.queryParams3))
    },
    onSearch3: throttle(function() {
      // Do some things
      this.requestList3()
    }, 3000),
    requestList3() {
      // 请求...
      console.log('点击搜索按钮 请求...')
      console.log(JSON.stringify(this.queryParams3))
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__icon:after {
  height: auto;
}
</style>
