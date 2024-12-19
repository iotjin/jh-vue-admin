<template>
  <div class="app-container">
    <div style="height: 200px;width:auto;background: yellow;" />
    <div ref="scrollbarRef0" class="custom-scrollbar" style="width: calc(100% - 18px)">
      <div class="custom-scrollbar-content" :style="{ width:scrollbarWidth0 }" />
    </div>
    <div style="margin-top: 20px;" />
    <el-table ref="tableRef" :data="tableData" max-height="500" style="width: 100%;" border stripe fit>
      <el-table-column label="日期" prop="date" width="800" />
      <el-table-column label="姓名" prop="name" width="800" />
      <el-table-column label="地址" prop="address" width="800" />
      <el-table-column label="地址" prop="address" width="500" />
      <el-table-column fixed="right2" label="操作" width="100">
        <template slot-scope="scope">
          <!-- scope.$index 从0开始 -->
          <el-button size="small" type="primary" @click="tableData.splice(scope.$index,1)">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 400px;width:auto;background: yellow;" />

    <div style="margin-top: 50px;" />

    <div ref="scrollbarRef" class="custom-scrollbar custom-scrollbar2" :style="{ width:scrollbarBgWidth }">
      <div class="custom-scrollbar-content" :style="{ width:scrollbarWidth }" />
    </div>

    <!-- <div class="bottom-div">
      我在底部一直悬停
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      scrollbarWidth0: 0,
      scrollbarWidth: 0,
      tableDom: null
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    device() {
      return this.$store.state.app.device
    },
    scrollbarBgWidth() {
      const sidebarWidth = this.device === 'mobile' ? 0 : this.sidebar.opened ? 210 : 54
      const other = 20 * 2 + 18
      return `calc(100% - ${sidebarWidth + other}px)`
    }
  },
  watch: {
    scrollbarWidth0: {
      // 两个滚动条同时滚动
      handler(newVal, oldVal) {
        // 监听滚动条
        this.$nextTick(() => {
          this.tableDom = this.$refs.tableRef.bodyWrapper
          this.tableDom.addEventListener('scroll', () => {
            // 自定义滚动条滚动条与表格底部同步
            const scrollLeft = this.tableDom.scrollLeft
            this.$refs.scrollbarRef0.scrollTo(scrollLeft, 0)
          })

          const scrollbar = this.$refs.scrollbarRef0
          scrollbar.addEventListener('scroll', () => {
            // 表格底部滚动条与自定义滚动条同步
            const scrollLeft = this.$refs.scrollbarRef0.scrollLeft
            this.$refs.tableRef.bodyWrapper.scrollTo(scrollLeft, 0)
          })
        })
      },
      deep: true
    },
    scrollbarWidth: {
      // 两个滚动条同时滚动
      handler(newVal, oldVal) {
        // 监听滚动条
        this.$nextTick(() => {
          this.tableDom = this.$refs.tableRef.bodyWrapper
          this.tableDom.addEventListener('scroll', () => {
            // 自定义滚动条滚动条与表格底部同步
            const scrollLeft = this.tableDom.scrollLeft
            this.$refs.scrollbarRef.scrollTo(scrollLeft, 0)
          })

          const scrollbar = this.$refs.scrollbarRef
          scrollbar.addEventListener('scroll', () => {
            // 表格底部滚动条与自定义滚动条同步
            const scrollLeft = this.$refs.scrollbarRef.scrollLeft
            this.$refs.tableRef.bodyWrapper.scrollTo(scrollLeft, 0)
          })
        })
      },
      deep: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleTableScroll) // 监听窗口尺寸变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleTableScroll)
  },
  created() {
    this.getData()
  },
  methods: {
    handleTableScroll() {
      this.setScrollWidth()
    },
    setScrollWidth() {
      // 设置滚动条宽度值为表格的滚动宽度
      this.$nextTick(() => {
        this.scrollbarWidth0 = this.$refs.tableRef.bodyWrapper.scrollWidth + 'px'
        this.scrollbarWidth = this.$refs.tableRef.bodyWrapper.scrollWidth + 'px'
      })
    },
    getData() {
      setTimeout(() => {
        var tempList = []
        for (let i = 0; i < 40; i++) {
          tempList.push({
            date: 2016 + i + '-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          })
        }
        this.tableData = tempList
        this.setScrollWidth()
      }, 1000)
    }
  }
}

/*

  修改 elementUI 的 Table 滚动条样式  https://juejin.cn/post/7269431378903531560

  el-table 横向滚动条固定在可视窗口底部  https://blog.csdn.net/s_156/article/details/131477378

  如何让 Element UI 表头、表尾、横向滚动条吸顶吸底固定 https://lruihao.cn/projects/el-table-sticky/

  // 三方库

  "el-table-horizontal-scroll": "^1.2.5",
  "@cell-x/el-table-sticky": "^1.0.4",

  */
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep {
    .el-table th {
      background: #ddeeff;
    }
  }
}

// 浮动列
.app-container ::v-deep .el-table__fixed-right {
  bottom: 0px !important;
}
.app-container ::v-deep .el-table__fixed-body-wrapper {
  padding-bottom: 20px !important;
}

// 滚动条的宽度
.app-container ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 18px; // 纵向滚动条的宽度
  height: 18px; // 横向滚动条的高度
  // height: 0px;
}
// 滚动条的滑块
.app-container ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: red;
  border-radius: 3px;
}

.custom-scrollbar {
  width: 100%;
  overflow-x: auto;
}

.custom-scrollbar-content {
  height: 1px; // 高度不设置的话滚动条出不来
}

.custom-scrollbar2 {
  position: fixed;
  bottom: 0;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: white;
  // background-color: darkgray;
  // width: calc(100% - 210px - 40px - 18px); // 通过js设置
}

.custom-scrollbar::-webkit-scrollbar {
  width: 18px; // 纵向滚动条的宽度
  height: 18px; // 横向滚动条的高度
}

// 设置滚动条轨道的样式
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; // 轨道的背景颜色
}

// 设置滚动条的样式
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888; // 滚动条的颜色
  background: green;
}

// 设置当鼠标悬停在滚动条上时的样式
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; // 滚动条的颜色
  background: red;
}

.bottom-div {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  opacity: 0.5;
  padding: 10px 0;
}
</style>
