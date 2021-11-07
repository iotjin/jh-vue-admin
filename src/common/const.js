// 全局数据  https://www.kancloud.cn/victoria/victoria/1209217

/*  使用
    //通过js方式使用：
    this.GLOBAL.title
    //或在 html 结构中使用
    {{GLOBAL.title}}
*/

export default {
  install(Vue, options) {
    Vue.prototype.GLOBAL = global
  }
}

var global = {
  title: '全局',
  isBack: true,
  isAdd: false
}
