// echarts 按需引入

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'

// 引入图表类型，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from 'echarts/charts'
// 自定义类型的图表
import { CustomChart } from 'echarts/charts'

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent
} from 'echarts/components'

// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import { CanvasRenderer } from 'echarts/renderers'
import { SVGRenderer } from 'echarts/renderers'

// 将以上引入的组件使用use()方法注册
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  CustomChart,
  // 提示框，标题，直角坐标系，数据集 等组件
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
  // 标签自动布局、全局过渡动画等特性
  LabelLayout,
  UniversalTransition,
  // Canvas 渲染器
  // CanvasRenderer
  SVGRenderer
])

// 导出
export default echarts
