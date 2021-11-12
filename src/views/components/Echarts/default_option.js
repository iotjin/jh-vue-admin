// 这里的数据会被深度合并
const BASIC_OPTION = {
  backgroundColor: '#fff',
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    show: true,
    data: [],
    top: 5,
    itemWidth: 14,
    itemHeight: 14
  },
  grid: {
    top: 60,
    left: 50,
    right: 30,
    bottom: 50,
    containLabel: false
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      align: 'center'
    },
    axisPointer: {
    },
    data: []
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true
    },
    axisTick: {
      show: false,
      interval: 0
    }
  },
  series: []
}

export { BASIC_OPTION }
