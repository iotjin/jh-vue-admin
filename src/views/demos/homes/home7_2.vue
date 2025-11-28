<template>
  <div class="roi-chart-container">
    <div class="chart-controls">
      <h2>投资回报率趋势分析</h2>
      <div class="date-filter">
        <label>时间范围:</label>
        <select v-model="timeRange" @change="updateChart">
          <option value="monthly">月度数据</option>
          <option value="quarterly">季度数据</option>
          <option value="yearly">年度数据</option>
        </select>
      </div>
    </div>

    <div ref="chart" class="chart-wrapper" />

    <div class="chart-info">
      <p>投资回报率(ROI) = (投资收益 - 投资成本) / 投资成本 × 100%</p>
      <div class="stats-box">
        <div class="stat-item">
          <span class="stat-label">平均ROI</span>
          <span class="stat-value">{{ averageRoi.toFixed(2) }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最高ROI</span>
          <span class="stat-value">{{ maxRoi.toFixed(2) }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最低ROI</span>
          <span class="stat-value">{{ minRoi.toFixed(2) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'RoiLineChart',
  data() {
    return {
      // 图表实例
      chartInstance: null,
      // 时间范围选择
      timeRange: 'monthly',
      // 投资回报率数据
      roiData: {
        monthly: {
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          data: [4.2, 5.1, 4.8, 6.3, 7.5, 8.2, 7.9, 9.1, 8.7, 10.2, 11.5, 12.3]
        },
        quarterly: {
          xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
          data: [4.7, 7.3, 8.5, 11.2]
        },
        yearly: {
          xAxis: ['2020', '2021', '2022', '2023', '2024'],
          data: [5.2, 6.8, 7.5, 9.3, 10.8]
        }
      },
      // 统计数据
      averageRoi: 0,
      maxRoi: 0,
      minRoi: 0
    }
  },
  mounted() {
    // 组件挂载后初始化图表
    this.initChart()
    this.updateStats()
  },
  beforeDestroy() {
    // 组件销毁前清理
    window.removeEventListener('resize', this.handleResize)
    if (this.chartInstance) {
      this.chartInstance.dispose()
    }
  },
  methods: {
    // 计算统计数据
    calculateStats(data) {
      const avg = data.reduce((sum, val) => sum + val, 0) / data.length
      const max = Math.max(...data)
      const min = Math.min(...data)
      return { avg, max, min }
    },

    // 更新统计数据
    updateStats() {
      const { avg, max, min } = this.calculateStats(this.roiData[this.timeRange].data)
      this.averageRoi = avg
      this.maxRoi = max
      this.minRoi = min
    },

    // 初始化图表
    initChart() {
      if (this.$refs.chart) {
        // 销毁已有实例
        if (this.chartInstance) {
          this.chartInstance.dispose()
        }

        // 创建新实例
        this.chartInstance = echarts.init(this.$refs.chart)

        // 设置图表配置
        const option = this.getChartOption()
        this.chartInstance.setOption(option)

        // 监听窗口大小变化
        window.addEventListener('resize', this.handleResize)
      }
    },

    // 处理窗口大小变化
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    },

    // 获取图表配置
    getChartOption() {
      const currentData = this.roiData[this.timeRange]

      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: { color: '#333' },
          formatter: function(params) {
            const param = params[0]
            return `<div style="font-weight: bold;">${param.name}</div>
                      <div>投资回报率: <span style="color: ${param.color}">${param.value}%</span></div>`
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
          data: currentData.xAxis,
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
            data: currentData.data,
            symbol: 'circle',
            symbolSize: 8,
            emphasis: {
              scale: true,
              symbolSize: 10
            },
            lineStyle: {
              width: 3,
              color: '#5b8ff9'
            },
            itemStyle: {
              color: '#5b8ff9',
              borderColor: '#fff',
              borderWidth: 2
            },
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
            },
            smooth: true
          }
        ]
      }
    },

    // 更新图表数据
    updateChart() {
      this.updateStats()
      if (this.chartInstance) {
        this.chartInstance.setOption(this.getChartOption())
      }
    }
  }
}
</script>

  <style scoped>
.roi-chart-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.chart-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-filter select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.chart-wrapper {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}

.chart-info {
  color: #666;
  font-size: 14px;
}

.stats-box {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.stat-item {
  padding: 10px 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  min-width: 120px;
}

.stat-label {
  display: block;
  color: #888;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #5b8ff9;
}

@media (max-width: 768px) {
  .chart-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .stats-box {
    flex-direction: column;
    gap: 10px;
  }

  .chart-wrapper {
    height: 300px;
  }
}
</style>
