<template>
  <div>
    <div class="content-bg">
      <!-- 左侧 -->
      <div class="left">
        <!-- 标题一 -->
        <div class="left-item">
          <div class="header">
            <img class="header-img" src="../../../assets/images/static/icon2.png">
            <div class="header-title">标题一</div>
          </div>
          <div v-for="item in dataArr1" :key="item.id" class="row-bg" @click="onClickItem(item)">
            <div class="row-top">
              <div class="dot" />
              <div class="row-time">{{ item.time }}</div>
              <div class="row-content">{{ item.content }}</div>
            </div>
            <div class="line" />
          </div>
        </div>
        <!-- 标题二 -->
        <div class="left-item">
          <div class="header">
            <img class="header-img" src="../../../assets/images/static/icon2.png">
            <div class="header-title">标题二</div>
          </div>
          <div v-for="item in dataArr1" :key="item.id" class="row-bg" @click="onClickItem(item)">
            <div class="row-top">
              <div class="dot" />
              <div class="row-time">{{ item.time }}</div>
              <div class="row-content">{{ item.content }}</div>
            </div>
            <div class="line" />
          </div>
        </div>
        <!-- 标题三 -->
        <div class="left-item">
          <div class="header">
            <img class="header-img" src="../../../assets/images/static/icon2.png">
            <div class="header-title">标题三</div>
          </div>
          <div v-for="item in dataArr1" :key="item.id" class="row-bg" @click="onClickItem(item)">
            <div class="row-top">
              <div class="dot" />
              <div class="row-time">{{ item.time }}</div>
              <div class="row-content">{{ item.content }}</div>
            </div>
            <div class="line" />
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <div class="header">
          <img class="header-img" src="../../../assets/images/static/icon2.png">
          <div class="header-title">标题四</div>
        </div>
        <div class="chart-bg">
          <div id="myChart1" class="charts" />
        </div>
        <div class="header">
          <img class="header-img" src="../../../assets/images/static/icon2.png">
          <div class="header-title">标题五</div>
        </div>
        <div class="chart-bg">
          <div id="myChart2" class="charts" />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  components: {},
  data() {
    return {
      dataArr1: [],
      dataArr2: [],
      myChart1: null,
      myChart2: null
    }
  },
  mounted() {
    this.init_echarts1()
    this.init_echarts2()
    this.requestData()
    this.requestChartData1()
    this.requestChartData2()
  },
  methods: {
    requestData() {
      const tempArr = []
      for (let index = 0; index < 6; index++) {
        tempArr.push({
          id: index,
          time: '2020-02-20 09:10:15',
          content:
            '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容0'
        })
      }
      this.dataArr1 = tempArr

      const tempArr2 = []
      for (let index = 0; index < 6; index++) {
        tempArr2.push({
          id: index,
          docType: '天气预报',
          time: '2020-02-20',
          title: '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题0'
        })
      }
      this.dataArr2 = tempArr2
    },
    requestChartData1() {
      this.myChart1.showLoading()
      setTimeout(() => {
        const res = {
          'month': ['12月12日', '12月12日', '12月12日', '12月12日', '12月12日', '12月12日', '12月12日'],
          'general': [2, 4, 7, 4, 2, 4, 5],
          'serious': [1, 3, 2, 1, 4, 2, 1],
          'crisis': [0, 1, 4, 2, 4, 1, 0]
        }
        const dataArr = [
          { name: '一般', data: res.general },
          { name: '严重', data: res.serious },
          { name: '危险', data: res.crisis }
        ]
        dataArr.forEach(item => {
          item.type = 'bar'
          item.barWidth = '15'
        })
        var chartData = {
          legendData: ['一般', '严重', '危险'],
          xData: res.month,
          seriesData: dataArr
        }
        this.myChart1.setOption(this.getOption(chartData, 1), true)
        this.myChart1.hideLoading()
      }, 1000)
    },
    requestChartData2() {
      this.myChart2.showLoading()
      setTimeout(() => {
        const res = {
          'month': ['12月12日', '12月12日', '12月12日', '12月12日', '12月12日', '12月12日', '12月12日'],
          'overhaul': [2, 4, 7, 4, 2, 4, 5],
          'devOps': [1, 3, 2, 1, 4, 2, 1],
          'infrastructure': [0, 1, 4, 2, 4, 1, 0]
        }
        const dataArr = [
          { name: '类别1', data: res.overhaul },
          { name: '类别2', data: res.devOps },
          { name: '类别3', data: res.infrastructure }
        ]
        dataArr.forEach(item => {
          item.type = 'bar'
          item.barWidth = '15'
        })
        var chartData = {
          legendData: ['类别1', '类别2', '类别3'],
          xData: res.month,
          seriesData: dataArr
        }
        this.myChart2.setOption(this.getOption(chartData, 2), true)
        this.myChart2.hideLoading()
      }, 1000)
    },
    // 初始化图表
    init_echarts1() {
      var chartData = {
        legendData: ['一般', '严重', '危险'],
        xData: [],
        seriesData: []
      }
      this.myChart1 = echarts.init(document.getElementById('myChart1'))
      this.myChart1.setOption(this.getOption(chartData, 1))
    },
    init_echarts2() {
      var chartData = {
        legendData: ['类别1', '类别2', '类别3'],
        xData: [],
        seriesData: []
      }
      this.myChart2 = echarts.init(document.getElementById('myChart2'))
      this.myChart2.setOption(this.getOption(chartData, 2))
    },
    // 图表配置
    getOption(chartData, type) {
      var option = {
        color: type === 1 ? ['#36A88C', '#6088C1', '#A46EC3'] : ['#1990E2', '#36A88C', '#F5A245'],
        grid: { left: '3%', right: '2%', bottom: '15%', containLabel: true },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 10, data: chartData.legendData },
        xAxis: [{ data: chartData.xData, axisLabel: { interval: 0 }}],
        yAxis: { name: chartData.seriesData.length ? '单位:条' : '' },
        series: chartData.seriesData
      }
      return option
    },
    onClickItem(item) {
      console.log(JSON.stringify(item))
    }
  }
}
</script>

<style lang="scss" scoped>
.content-bg {
  display: flex;
  padding: 10px;
}

.left {
  flex: 1;
  width: 0;
  margin-right: 5px;
  border: 1px solid #e6e6e6;
}

.right {
  flex: 1;
  margin-left: 5px;
  border: 1px solid #e6e6e6;
}

.left-item {
  max-height: 33vh;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 0;
  background: #f0f0f0;
  border-bottom: 1px solid green;
}

.header-img {
  width: 35px;
  height: 35px;
  margin: 0px 10px;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
}

.row-bg {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.row-img {
  width: 20px;
  height: 20px;
}

.dot {
  min-width: 6px;
  min-height: 6px;
  margin: 0 5px;
  border-radius: 3px;
  background: #00938b;
}

.row-time {
  min-width: 130px;
  margin-left: 10px;
}

.row-content {
  white-space: nowrap; //强制文本在一行内输出
  overflow: hidden; //隐藏溢出部分
  text-overflow: ellipsis; //对溢出部分加上...
}

.row-top {
  display: flex;
  align-items: center;
}

.line {
  margin-left: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.chart-bg {
  width: 100%;
  height: 40vh;
  // background: yellow;
}

.charts {
  width: 100%;
  height: 100%;
}
</style>
