<template>
  <div class="chart" />
</template>

<script>
// import { merge } from 'lodash'
// import { BASIC_OPTION } from './default_option'
// import { COLOR_ARRAY } from './color'
// import ResizeListener from "element-resize-detector";

// import * as echarts from 'echarts' // 全量引入
import echarts from '@/utils/echarts' // 按需引入

export default {
  name: 'ChartPie',
  props: {
    options: {
      type: Object,
      required: true,
      default: () => ({})
    },
    clickPointEvent: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    // 动态监听父元素传过来的参数
    options: {
      deep: true,
      handler() {
        this.updateChartView()
      }
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
    this.updateChartView()
    window.addEventListener('resize', this.handleWindowResize)
    // this.addChartResizeListener();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    /**
     * 将业务数据加入到基础样式配置中
     * @returns {Object} 完整的echart配置
     */
    assembleDataToOption() {
      // 这部分的图例formatter取决于UI要求，如果你的项目中不需要，就可以不写formatter
      // 由于echarts版本的迭代，这里的写法也有稍许改变
      // const formatter = (name) => {
      //   const total = this.seriesData.reduce((acc, cur) => acc + cur.value, 0);
      //   const data = this.seriesData.find((item) => item.name === name) || {};
      //   const percent = data.value
      //     ? `${Math.round((data.value / total) * 100)}%`
      //     : "0%";
      //
      //   return `${name} ${percent}`;
      // };
      // alert(JSON.stringify(this.seriesData));
      // console.log("图表参数1："+JSON.stringify(BASIC_OPTION));
      // console.log("图表参数2："+JSON.stringify(this.options));
      // let assignArray = merge(this.options,BASIC_OPTION);
      const assignArray = this.options
      return assignArray
    },

    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    // addChartResizeListener() {
    //   const instance = ResizeListener({
    //     strategy: "scroll",
    //     callOnAdd: true
    //   });

    //   instance.listenTo(this.$el, () => {
    //     if (!this.chart) return;
    //     this.chart.resize();
    //   });
    // },

    /**
     * 更新echart视图
     */
    updateChartView() {
      const that = this
      if (!that.chart) return
      const fullOption = that.assembleDataToOption()
      that.chart.setOption(fullOption, true)
      that.chart.on('click', function(params) {
        // that.$emit('clickPointEvent');
        // alert("子触发");
        that.$emit('clickPointEvent', params)
      })
    },

    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return
      this.chart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
