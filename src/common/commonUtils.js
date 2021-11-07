// 通用工具类

module.exports = {
  Jh_getSafeRandomNum,
  Jh_getRandomNum
}

// 创建 min-max 之间的随机整数
function Jh_getSafeRandomNum(min, max) {
  var seed = (new Date()).getTime()
  seed = (seed * 9301 + 49297) % 233280
  var rand = seed / (233280.0)
  var range = max - min
  return Math.floor(rand * (range + 1) + min)
}

// 创建 min-max 之间的随机整数
function Jh_getRandomNum(min, max) {
  var range = max - min
  var rand = Math.random()
  return Math.floor(rand * (range + 1) + min)
}

/*  使用
import CommonUtils from '@/common/commonUtils.js'
const CommonUtils = require('@/common/commonUtils.js');

CommonUtils.Jh_getRandomNum(1，10)

*/
