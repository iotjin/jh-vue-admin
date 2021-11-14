<template>
  <div class="spp-user-body spp-theme-body spp-theme-pad">

    <!--页面头部-->
    <!-- <hamburger class="hamburger-container" /> -->

    <div class="page-item">
      <span class="pageTitle" style="margin: 10px 0">数据中心</span>
      <div class="data-center">
        <template v-for="item in dataCenterList">
          <div :key="item.title" class="item">
            <el-image class="left" :src="item.icon" />
            <div class="right">
              <span class="title">{{ item.title }}</span>
              <span :class="'line '+item.lineColor" />
              <div>
                <span class="quantity">{{ item.quantity }}</span>
                <span class="quantity-other">{{ item.quantityOther }}</span>
                <span class="unit">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- <el-row style="margin-top: 10px">
      <el-col :span="15">
        <div class="page-item page-chart" style="margin-right: 5px">
          <span class="pageTitle" style="margin-top: 10px">访问量统计</span>
          <div  style="height:295px;">
            <ChartPie :options="option"/>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="page-item page-chart"  style="margin-left: 5px">
          <span class="pageTitle" style="margin-top: 10px">状态统计</span>
          <div  style="height:295px;">
            <ChartPie :options="statusOption"/>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-col :span="12">
        <div class="page-item page-chart" style="margin-right: 5px">
          <span class="pageTitle" style="margin-top: 10px">专业统计</span>
          <div  style="height:295px;">
            <ChartPie :options="staticOption"/>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="page-item page-chart"  style="margin-left: 5px">
          <span class="pageTitle" style="margin-top: 10px">阶段统计</span>
          <div  style="height:295px;">
            <ChartPie :options="stageOption"/>
          </div>
        </div>
      </el-col>
    </el-row> -->

    <!-- 三个图表 -->
    <el-row style="margin-top: 10px">
      <el-col :span="12">
        <div class="page-item page-chart" style="margin-right: 5px">
          <span class="pageTitle" style="margin-top: 10px">专业统计</span>
          <div style="height:540px;">
            <ChartPie :options="staticOption" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row :span="12">
          <div class="page-item page-chart" style="margin-left: 5px">
            <span class="pageTitle" style="margin-top: 10px">状态统计</span>
            <div style="height:240px;">
              <ChartPie :options="statusOption" />
            </div>
          </div>
        </el-row>
        <el-row :span="12">
          <div class="page-item page-chart" style="margin-left: 5px;margin-top: 25px">
            <span class="pageTitle" style="margin-top: 10px">阶段统计</span>
            <div style="height:240px;">
              <ChartPie :options="stageOption" />
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>

// import Hamburger from '@/components/Hamburger/index2.vue'
import ChartPie from '@/views/components/Echarts'

export default {
  components: {
    ChartPie
    // Hamburger
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: [
            '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [10, 15, 12, 16, 14, 16, 12, 17, 14, 16, 14, 17, 13, 16, 11, 15, 10, 18, 14, 16, 12, 20, 18, 20, 17, 19, 12, 15, 18, 16],
            type: 'line',
            areaStyle: {
              opacity: 0.1
            }
          }
        ]
      },
      // 状态统计
      statusOption: {
        color: ['#3585F4', '#00CA99'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['25%', '60%'],
            // right: '35%',
            top: '-15%',
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 10
            },
            label: {
              show: false,
              position: 'center',
              normal: {
                show: true,
                // formatter: '{a}{b}:{c}%（元）'// {a}：系列名。{b}：数据名。{c}：数据值。
                formatter: '{b}: {c} 元({d}%)'
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 17.58, name: '已发送合计' },
              { value: 25.27, name: '未发送合计' }
            ]
          }
        ]
      },
      // 专业统计
      staticOption: {
        color: ['#1D75EA'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: ['互联网专业', '财务专业', '营销专业', '发展专业', '调控专业', '设备专业']
        },
        series: [
          {
            data: [45, 110, 100, 25, 30, 89],
            name: '',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                barBorderRadius: [15, 15, 15, 15],
                label: {
                  show: true, // 是否显示
                  position: 'right', // 显示位置
                  // formatter: '{a}{b}:{c}%（元）'// {a}：系列名。{b}：数据名。{c}：数据值。
                  formatter: '{c} 元'// c后面加单位
                }
              }
            }
          }
        ]
      },
      // 阶段统计
      stageOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: ['按月', '按周', '按天']
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '20%',
            data: [45, 30, 60],
            itemStyle: {
              normal: {
                barBorderRadius: [15, 15, 15, 15],
                label: {
                  show: true, // 是否显示
                  position: 'right', // 显示位置
                  // formatter: '{a}{b}:{c}%（元）'// {a}：系列名。{b}：数据名。{c}：数据值。
                  formatter: '{c} 元'// c后面加单位
                },
                color: function(params) {
                  // let colorList = ['#FEC336', '#3585F4', '#00CA99'];
                  // return colorList[params.dataIndex];
                  if (params.name === '按天') {
                    return '#00CA99'
                  }
                  if (params.name === '按周') {
                    return '#3585F4'
                  }
                  if (params.name === '按月') {
                    return '#FEC336'
                  }
                }
              }
            }
          }
        ]
      },
      // 数据中心显示数据
      dataCenterList: [
        {
          title: '当前登录',
          icon: require('../../../assets/images/static/icon.png'),
          lineColor: 'blue',
          quantity: '1',
          quantityOther: '/100',
          unit: '人'
        },
        {
          title: '本周访问量',
          icon: require('../../../assets/images/static/icon2.png'),
          lineColor: 'green',
          quantity: '300',
          quantityOther: '',
          unit: '次'
        },
        {
          title: '本月访问量',
          icon: require('../../../assets/images/static/icon3.png'),
          lineColor: 'yellow',
          quantity: '300',
          quantityOther: '',
          unit: '次'
        },
        {
          title: '本年访问量',
          icon: require('../../../assets/images/static/icon4.png'),
          lineColor: 'blue',
          quantity: '1000',
          quantityOther: '',
          unit: '次'
        },
        {
          title: '创建组',
          icon: require('../../../assets/images/static/icon5.png'),
          lineColor: 'purple',
          quantity: '100',
          quantityOther: '',
          unit: '组'
        }
      ]
    }
  },
  created() {
    // this.$nextTick(() => {
    // this.requestData();
    // })
    this.requestData()
  },
  methods: {
    requestData: function() {
      var that = this
      setTimeout(() => {
        var data1 = [{ name: '互联网专业', value: '100' },
          { name: '财务专业', value: '110' },
          { name: '营销专业', value: '120' },
          { name: '发展专业', value: '130' },
          { name: '调控专业', value: '140' },
          { name: '设备专业', value: '150' }]

        var chartData1 = this.getChartXdataAndSeriesData(data1)
        // 专业统计
        that.staticOption.yAxis.data = chartData1.xData
        that.staticOption.series[0].data = chartData1.seriesData

        const data2 = [
          { name: '已发送合计', value: 150 },
          { name: '未发送合计', value: 49 }
        ]
        // 状态统计
        that.statusOption.series[0].data = data2

        var data3 = [{ name: '按天', value: '50' },
          { name: '按周', value: '100' },
          { name: '按月', value: '120' }]

        var chartData3 = this.getChartXdataAndSeriesData(data3)
        // 阶段统计
        that.stageOption.yAxis.data = chartData3.xData.reverse()
        that.stageOption.series[0].data = chartData3.seriesData.reverse()
      }, 1000)
    },
    // 把原始数据转换成图表数据
    getChartXdataAndSeriesData(data) {
      var tempArrName = []
      var tempArrValue = []
      data.forEach(item => {
        tempArrName.push(item.name)
        tempArrValue.push(item.value)
      })
      var chartData = {
        xData: tempArrName,
        seriesData: tempArrValue
      }
      return chartData
    }
  }
}
</script>

<style lang="scss" scoped>
.page-item {
  display: flex;
  flex-direction: column;
}
.pageTitle {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.data-center {
  display: flex;
  flex-direction: row;
  .item {
    flex: 1;
    padding: 0 10px;
    border-radius: 7.5px;
    min-height: 90px;
    background-color: white;
    border: 1px solid #f5f5f5;
    display: flex;
    flex-direction: row;
    align-items: center;
    .left {
      width: 48px;
      height: 48px;
    }
    .right {
      margin-left: 5px;
      display: flex;
      flex-direction: column;
      > * {
        margin-top: 2px;
      }
      .title {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
      }
      .line {
        width: 20px;
        height: 2px;
        border-radius: 3px;
      }
      .unit {
        margin-left: 10px;
        font-size: 8px;
        color: lightgray;
      }
      .quantity {
        font-size: 17px;
        color: #333333;
        font-weight: bold;
      }
      .quantity-other {
        font-size: 14px;
        color: lightgray;
      }
    }
  }
  .item + .item {
    margin-left: 15px;
  }
}
.page-chart {
  padding: 0 10px;
  min-height: 200px;
  border-radius: 7.5px;
  background-color: white;
  border: 1px solid #f5f5f5;
}
.blue {
  background-color: cornflowerblue;
}
.green {
  background-color: forestgreen;
}
.yellow {
  background-color: yellow;
}
.purple {
  background-color: mediumpurple;
}
</style>
