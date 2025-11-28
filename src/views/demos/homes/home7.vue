<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-refresh" :loading="tableLoading" @click="requestList">
      刷新数据
    </el-button>

    <el-row style="margin:15px;">
      <div class="box-card">
        <span style="margin-right: 20px;">Hide Column:</span>
        <el-checkbox v-model="hideColumnData.colors">Colors</el-checkbox>
        <el-checkbox v-model="hideColumnData.times">Times</el-checkbox>
      </div>
    </el-row>

    <el-table ref="tableRef" v-loading="tableLoading" :data="tableData" stripe border :header-cell-style="{textAlign: 'center'}" :cell-style="cellStyle" style="width: 100%">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="sales" label="总销售额" />
      <!-- <el-table-column v-if="!hideColumnData.colors" prop="sales" label="测试颜色" class-name="customColumn" width="50" /> -->
      <el-table-column v-if="!hideColumnData.colors" prop="sales" label="测试颜色" class-name="customColumnHeader" width="50" />
      <el-table-column v-if="!hideColumnData.colors" prop="sales" label="测试颜色" class-name="customColumnCell" width="50" />
      <el-table-column label="折线图" width="400">
        <template slot-scope="scope">
          <!-- <div :id="`myChart_${scope.$index}`" class="chart-container" /> -->
          <div :id="'myChart_' + scope.$index" style="width:100%;height: 150px;" @click="openBigChart(scope.row)" />
        </template>
      </el-table-column>

      <template v-if="!hideColumnData.times">
        <el-table-column v-for="(item, index) in dateList" :key="index" :label="item" :prop="item" width="100">
          <template slot-scope="scope">
            <div :class="getCellClass(scope.row[item])">
              {{ scope.row[item] }}
            </div>
          </template>
        </el-table-column>
      </template>

    </el-table>

    <el-dialog :visible.sync="isShowDialog" width="60%" title="折线图" @opened="renderBigChart">
      <div id="bigChart" style="width: 100%; height: 400px;" />
    </el-dialog>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { debounce2 } from '@/utils/index'
const Mock = require('mockjs')

export default {
  name: 'Home7',
  data() {
    return {
      tableLoading: false,
      tableData: [],
      dateList: [],
      chartList: [], // 存储 {chart, resizeHandler} 对象
      hideColumnData: {
        colors: false,
        times: false
      },
      isShowDialog: false,
      currentChartData: null,
      bigChartInstance: null,
      bigChartResizeHandler: null
    }
  },
  watch: {
    hideColumnData: {
      handler() {
        this.renderCharts()
      },
      deep: true
    }
  },
  mounted() {
    this.requestList()
  },
  beforeDestroy() {
    // 销毁所有图表实例
    this.destroyListCharts()
    this.destroyBigChart()
  },
  methods: {
    destroyListCharts() {
      // 销毁所有图表实例
      this.chartList.forEach((item) => {
        if (item.chart) {
          item.chart.dispose()
        }
        if (item.resizeHandler) {
          window.removeEventListener('resize', item.resizeHandler)
        }
      })
      this.chartList = []
    },
    destroyBigChart() {
      // 销毁大图表实例
      if (this.bigChartInstance) {
        this.bigChartInstance.dispose()
        this.bigChartInstance = null
      }
      if (this.bigChartResizeHandler) {
        window.removeEventListener('resize', this.bigChartResizeHandler)
        this.bigChartResizeHandler = null
      }
    },
    getCellClass(value) {
      if (value > 300) {
        return 'cellClass1'
      } else if (value > 200 && value <= 300) {
        return 'cellClass2'
      } else {
        return 'cellClass3'
      }
    },
    // 设置表内容样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 大于第6列的数值进行样式设置，注意：columnIndex是从0开始计数的
      // const isDateColumn = columnIndex >= 6
      const isDateColumn = this.dateList.includes(column.property)
      if (isDateColumn) {
        const cellValue = row[column.property]
        // 非数字值不处理
        if (typeof cellValue !== 'number') return {}
        if (cellValue > 300) {
          return {
            textAlign: 'center',
            'background-color': '#fff2f0', // 浅红色背景
            color: '#f56c6c' // 红色文字
          }
        } else if (cellValue > 200 && cellValue <= 300) {
          return {
            textAlign: 'center',
            'background-color': '#fffbee', // 浅黄色背景
            color: '#faad14' // 黄色文字
          }
        }
      }

      return { textAlign: 'center' }
    },
    requestList() {
      this.dateList = []
      this.tableLoading = true
      setTimeout(() => {
        const generateYears = () => [1980, 1990, 2000, 2010, 2020]

        var tempArr = Mock.mock({
          'items|10': [
            {
              id: () => Mock.Random.guid(),
              name: '产品@increment',
              'sales|50-500': 1,
              chartData() {
                const years = generateYears()
                return Mock.mock({
                  'items|5': [
                    {
                      date: () => years.shift().toString(),
                      'value|100-500': 1,
                      money: '@float(0, 1000, 1, 2)'
                    }
                  ]
                }).items
              }
            }
          ]
        }).items

        // handle data
        var tempTimeArr = Array.from(new Set(tempArr.flatMap((item) => item.chartData.map((item2) => item2.date))))
        tempArr.forEach((item) =>
          item.chartData.forEach((item2) => {
            item[item2.date] = item2.value
          })
        )

        this.dateList = JSON.parse(JSON.stringify(tempTimeArr))
        this.tableData = JSON.parse(JSON.stringify(tempArr))
        this.tableLoading = false

        // console.log('this.tableData', JSON.stringify(this.tableData))

        this.renderCharts()
      }, 1000)
    },
    renderCharts() {
      // 先销毁之前的图表实例
      this.destroyListCharts()

      this.$nextTick(() => {
        setTimeout(() => {
          this.tableData.forEach((row, index) => {
            this.initChart(index, row.chartData)
          })
        }, 200)
      })
    },
    initChart(index, chartData) {
      const chartDom = document.getElementById(`myChart_${index}`)
      if (!chartDom) return

      var newChartData = {
        xData: [],
        seriesData: []
      }
      chartData.forEach((item) => {
        newChartData.xData.push(item.date)
        newChartData.seriesData.push(item.value)
      })

      const myChart = echarts.init(chartDom)
      // myChart.showLoading()
      // 随机使用两种不同的图表配置
      const option = index % 2 === 1 ? this.getOption(newChartData) : this.getOption2(newChartData)
      myChart.setOption(option)
      // myChart.setOption(this.getOption(newChartData))
      // myChart.hideLoading()

      // 窗口大小改变时重绘图表
      const resizeHandler = debounce2(() => myChart.resize(), 300)
      window.addEventListener('resize', resizeHandler)

      this.chartList.push({
        chart: myChart,
        resizeHandler
      })
    },
    openBigChart(row) {
      this.currentChartData = row.chartData
      this.isShowDialog = true
    },
    renderBigChart() {
      this.destroyBigChart()

      const chartDom = document.getElementById('bigChart')
      if (!chartDom) return

      var newChartData = {
        xData: [],
        seriesData: []
      }
      this.currentChartData.forEach((item) => {
        newChartData.xData.push(item.date)
        newChartData.seriesData.push(item.value)
      })

      this.bigChartInstance = echarts.init(chartDom)
      const option = this.getOption2(newChartData)
      this.bigChartInstance.setOption(option)

      // 窗口大小改变时重绘图表
      this.bigChartResizeHandler = debounce2(() => {
        if (this.bigChartInstance) {
          this.bigChartInstance.resize()
        }
      }, 300)
      window.addEventListener('resize', this.bigChartResizeHandler)
    },
    getOption(chartData) {
      return {
        // animation: true,
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          show: false,
          data: chartData.xData
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: chartData.seriesData,
            type: 'line',
            smooth: true,
            // smooth: false, // 平滑曲线
            // symbol: 'none', // 不显示数据点
            symbol: 'emptyCircle', // 显示数据圆点  emptyCircle | circle
            symbolSize: 6,
            lineStyle: {
              width: 3,
              color: '#5b8ff9'
            }
          }
        ]
      }
    },
    getOption2(chartData) {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: { color: '#333' },
          formatter: function(params) {
            const param = params[0]
            // console.log('param', JSON.stringify(param))
            return `<div style="font-weight: bold;">${param.name}</div>
                      <div>回报率: <span style="color: ${param.color}">${param.value}%</span></div>`
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: chartData.xData,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [
          {
            name: '投资回报率',
            type: 'line',
            data: chartData.seriesData,
            symbol: 'circle',
            symbolSize: 8,
            smooth: true,
            // 在折线图代表 鼠标悬停时 标记点 样式
            emphasis: {
              scale: true,
              symbolSize: 10
            },
            // 在折线图代表 折线样式
            lineStyle: {
              width: 3,
              color: '#5b8ff9'
            },
            // 在折线图代表 标记点 样式
            itemStyle: {
              color: '#5b8ff9',
              borderColor: '#fff',
              borderWidth: 2
            },
            // 折线图下方区域填充样式
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(91, 143, 249, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(91, 143, 249, 0)'
                  }
                ]
              }
            }
          }
        ]
      }
    },
    getOption3(chartData) {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 2,
          right: 2,
          bottom: 2,
          left: 2,
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: '销售额',
            type: 'line',
            smooth: false,
            data: chartData,
            itemStyle: {
              color: '#409EFF'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
                { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
              ])
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e6e6e6;
}

.chart-container {
  width: 100%;
  height: 150px; /* 单元格内图表高度 */
}
.cellClass1 {
  background: green;
  color: white;
}

.cellClass2 {
  background: red;
  color: white;
}

.cellClass3 {
  background: orange;
  color: white;
}

// 同时控制表头和单元格
::v-deep .el-table .customColumn {
  background: pink !important;
}

// 仅表头
::v-deep .el-table .el-table__header .customColumnHeader {
  background: yellow !important;
}

/* 只设置数据单元格样式，不设置表头 - 方式1 */
// ::v-deep .el-table .el-table__body-wrapper .customColumnCell {
//   background: orange !important;
// }

/* 只设置数据单元格样式，不设置表头 - 方式2 */
::v-deep .el-table .el-table__body .customColumnCell {
  background: lightblue !important;
}

// // ::v-deep .el-table th {
// //   background-color: #f5f5f5 !important;
// // }
// ::v-deep .el-table__header th {
//   background-color: #f5f5f5 !important;
// }
</style>
