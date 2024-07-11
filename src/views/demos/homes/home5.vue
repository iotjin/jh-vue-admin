<template>
  <div class="app-container">
    <div style="margin:10px" />
    <div class="chart-bg">
      <div id="myChart1" class="charts" />
    </div>

    <el-dialog :visible.sync="dialogVisible" title="提示" width="30%">
      <span>点击了：{{ dialogText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'

export default {
  components: {},
  data() {
    return {
      myChart1: null,
      dialogVisible: false,
      dialogText: ''
    }
  },
  created() {},
  mounted() {
    this.init_echarts1()
    this.requestChartData1()
  },
  methods: {
    // 初始化chart
    init_echarts1() {
      var chartData = {
        xData: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-15'],
        listData: []
      }
      this.myChart1 = echarts.init(document.getElementById('myChart1'))
      this.myChart1.setOption(this.getOption1(chartData))
      // 跟随窗口变化刷新chart
      var that = this
      window.addEventListener('resize', () => {
        that.myChart1.resize()
      })
      // 柱子点击事件，点击柱形中有数据的部分生效，而对于没有数据的区域，点击无效
      this.myChart1.on('click', function(params) {
        const data = params.data
        console.log(JSON.stringify(data))
        that.dialogText = data.name + '（' + data.type + '），' + 'code: ' + data.code
        that.dialogVisible = true
      })
    },
    getOption1(chartData) {
      var option = {
        grid: { left: '3%', right: '6%', bottom: '15%', containLabel: true },
        tooltip: {
          trigger: 'item',
          // trigger: 'axis', // 类型不一样formatter返回的数据结构不一样
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params, ticket, callback) {
            const data = params.data
            return data.name + '（' + data.type + '）' + '<br/>' + 'code: ' + data.code
          }
        },
        // ----- 不显示垂直缩放 -----
        xAxis: [{ data: chartData.xData, axisLabel: { color: '#333' }}],
        yAxis: [{ data: [] }], // 不显示y轴刻度（如果同一时间段有多个相同数据可使用这个）
        // dataZoom: [{}],
        dataZoom: [
          { type: 'slider', bottom: '2%' }, // 有单独的滑动条，用户在滑动条上进行缩放或漫游
          { type: 'inside', bottom: '2%' } // 内置于坐标系中，用户在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系
        ],
        // ----- 显示垂直缩放 -----
        // xAxis: [{ data: chartData.xData, axisLabel: { color: '#333' }}],
        // yAxis: {},
        // yAxis: {
        //   axisTick: { show: false },
        //   splitLine: { show: false },
        //   axisLine: { show: false },
        //   axisLabel: { show: false },
        //   min: 0,
        //   max: chartData.listData.length
        // },
        // dataZoom: [
        //   { type: 'slider', bottom: '2%' }, // 有单独的滑动条，用户在滑动条上进行缩放或漫游
        //   { type: 'inside', bottom: '2%' }, // 内置于坐标系中，用户在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系
        //   { type: 'slider', yAxisIndex: 0 },
        //   { type: 'inside', yAxisIndex: 0 }
        // ],
        series: [
          {
            type: 'custom',
            renderItem: function(params, api) {
              const data = chartData.listData[api.value(0)]
              const text = data.name + '（' + data.code + '）'
              const color = data.bgColor

              var categoryIndex = api.value(0)
              var start = api.coord([api.value(1), categoryIndex])
              var end = api.coord([api.value(2), categoryIndex])
              var width = end[0] - start[0]
              if (data.startTime === data.endTime) {
                width = 30
              }
              var height = 24
              // if (categoryIndex === 0) {
              //   height = 48
              // }

              return {
                type: 'rect',
                shape: echarts.graphic.clipRectByRect(
                  {
                    x: start[0],
                    y: start[1] - height / 2,
                    width: width,
                    height: height
                  },
                  {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                  }
                ),
                // 柱状图样式设置，方式二，同时设置优先级高于方式一
                // style: api.style()
                style: api.style({
                  text: text, // 文字
                  fill: 'orange', // 背景色
                  // stroke: 'black', // 边框颜色
                  stroke: color,
                  lineWidth: 2, // 边框宽度
                  textFill: 'black', // 文字颜色
                  fontWeight: 'bold',
                  fontSize: '10',
                  opacity: 1
                })
              }
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: chartData.listData,
            // 柱状图样式设置，方式一
            itemStyle: {
              // color: 'red', // 柱图背景色
              color: 'transparent',
              borderColor: 'red',
              borderWidth: 1
            },
            label: {
              show: true, // 开启显示
              // position: 'top', // 上方显示
              position: 'inside', // 内部显示
              textStyle: {
                color: 'green',
                fontSize: 15
              }
            }
          }
        ]
      }
      return option
    },
    requestChartData1() {
      // 间隔一致，保证开始结束时间都在x轴点上
      var chartData = {
        xData: [
          '2021-01-01',
          '2021-01-15',
          '2021-02-01',
          '2021-02-15',
          '2021-03-01',
          '2021-03-15',
          '2021-04-01',
          '2021-04-15',
          '2021-05-01',
          '2021-05-15',
          '2021-06-01',
          '2021-06-15',
          '2021-07-01',
          '2021-07-15',
          '2021-08-01',
          '2021-08-15',
          '2021-09-01',
          '2021-09-15',
          '2021-10-01',
          '2021-10-15',
          '2021-11-01',
          '2021-11-15',
          '2021-12-01',
          '2021-12-15',
          '2022-01-01',
          '2022-01-15',
          '2022-02-01',
          '2022-02-15',
          '2022-03-01',
          '2022-03-15',
          '2022-04-01',
          '2022-04-15',
          '2022-05-01',
          '2022-05-15',
          '2022-06-01',
          '2022-06-15',
          '2022-07-01',
          '2022-07-15',
          '2022-08-01',
          '2022-08-15',
          '2022-09-01',
          '2022-09-15',
          '2022-10-01',
          '2022-10-15',
          '2022-11-01',
          '2022-11-15',
          '2022-12-01',
          '2022-12-15'
        ],
        listData: [
          { name: '类型1', type: 'type1', code: '0001', startTime: '2021-01-01', endTime: '2021-01-15' },
          { name: '类型2', type: 'type2', code: '0002', startTime: '2021-02-01', endTime: '2021-02-15' },
          { name: '类型3', type: 'type3', code: '0003', startTime: '2021-03-01', endTime: '2021-03-15' },
          { name: '类型4', type: 'type4', code: '0004', startTime: '2021-04-01', endTime: '2021-04-15' },
          { name: '类型5', type: 'type5', code: '0005', startTime: '2021-05-01', endTime: '2021-05-15' },
          { name: '类型6', type: 'type6', code: '0006', startTime: '2021-06-01', endTime: '2021-06-15' },
          { name: '类型7', type: 'type7', code: '0007', startTime: '2021-07-01', endTime: '2021-07-15' },
          { name: '类型8', type: 'type8', code: '0008', startTime: '2021-08-01', endTime: '2021-08-15' },
          { name: '类型9', type: 'type9', code: '0009', startTime: '2021-09-01', endTime: '2021-09-15' },
          { name: '类型10', type: 'type10', code: '0010', startTime: '2021-10-01', endTime: '2021-10-15' },
          { name: '类型11', type: 'type11', code: '0011', startTime: '2021-11-01', endTime: '2021-11-15' },
          { name: '类型12', type: 'type12', code: '0012', startTime: '2021-12-01', endTime: '2021-12-15' },
          { name: '类型13', type: 'type13', code: '0013', startTime: '2022-01-01', endTime: '2022-01-15' },
          { name: '类型14', type: 'type14', code: '0014', startTime: '2022-02-01', endTime: '2022-02-15' },
          { name: '类型15', type: 'type15', code: '0015', startTime: '2022-03-01', endTime: '2022-03-15' },
          { name: '类型16', type: 'type16', code: '0016', startTime: '2022-04-01', endTime: '2022-04-15' },
          { name: '类型17', type: 'type17', code: '0017', startTime: '2022-05-01', endTime: '2022-05-15' },
          { name: '类型18', type: 'type18', code: '0018', startTime: '2022-06-01', endTime: '2022-06-15' },
          { name: '类型19', type: 'type19', code: '0019', startTime: '2022-07-01', endTime: '2022-07-15' },
          { name: '类型20', type: 'type20', code: '0020', startTime: '2022-08-01', endTime: '2022-08-15' },
          { name: '类型21', type: 'type21', code: '0021', startTime: '2022-01-01', endTime: '2022-01-01' } // 特殊
          // { name: '类型22', type: 'type22', code: '0022', startTime: '2022-06-01', endTime: '2022-09-15' },
          // { name: '类型23', type: 'type23', code: '0023', startTime: '2022-06-01', endTime: '2022-10-15' },
          // { name: '类型24', type: 'type24', code: '0024', startTime: '2022-06-01', endTime: '2022-11-15' }
        ]
      }
      chartData = this.handleData(chartData)
      // console.log(JSON.stringify(chartData));

      this.myChart1.showLoading()
      setTimeout(() => {
        this.myChart1.setOption(this.getOption1(chartData), true)
        this.myChart1.hideLoading()
      }, 1000)
    },
    handleData(chartData) {
      var newChartData = JSON.parse(JSON.stringify(chartData))
      const newArr = newChartData.listData.map((item, index) => {
        return {
          name: item.name,
          value: [index, item.startTime, item.endTime], // index(0,1,2)代表y轴的索引，后两位代表x轴数据开始和结束
          type: item.type,
          code: item.code,
          startTime: item.startTime,
          endTime: item.endTime,
          bgColor: this.getRandomColor()
        }
      })
      newChartData.listData = newArr
      return newChartData
    },
    // 随机生成颜色
    getRandomColor(alpha = 1) {
      let color = ''
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      color = `rgba(${r}, ${g}, ${b}, ${alpha})`
      return color // 所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
    },
    getRandomColor2() {
      return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
    }
    // color: function() { return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16); },
  }
}
</script>
<style lang="scss" scoped>
.chart-bg {
  width: 90%;
  height: 40vh;
  background: yellow;
}

.charts {
  // width: 95%;
  width: 100%;
  height: 100%;
}
</style>
