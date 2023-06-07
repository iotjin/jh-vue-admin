// 通用工具类

/* eslint-disable no-unused-vars */
// import cloneDeep from 'lodash/cloneDeep' // 按需引入
// import lodash from 'lodash' // 全量引入

import { cloneDeep } from 'lodash-es' // 按需引入
// import { throttle, debounce } from 'lodash-es' // 按需引入
// import lodash from 'lodash-es' // 全量引入

module.exports = {
  Jh_getSafeRandomNum,
  Jh_getRandomNum,
  deepCopy
}

// 创建 min-max 之间的随机整数
function Jh_getSafeRandomNum(min, max) {
  var seed = new Date().getTime()
  seed = (seed * 9301 + 49297) % 233280
  var rand = seed / 233280.0
  var range = max - min
  return Math.floor(rand * (range + 1) + min)
}

// 创建 min-max 之间的随机整数
function Jh_getRandomNum(min, max) {
  var range = max - min
  var rand = Math.random()
  return Math.floor(rand * (range + 1) + min)
}

// 深拷贝（使用Lodash库实现 ）
function deepCopy(objects) {
  return cloneDeep(objects)
}
/*
  lodash库： https://www.lodashjs.com
  安装：npm i --save lodash

  lodash-es库：按需引用打包体积更小
  npm i --save lodash-es
*/

/*

浅拷贝 ： 只是将数据中所有的数据引用下来，依旧指向同一个存放地址，拷贝之后的数据修改之后，也会影响到原数据的中的对象数据。例如:Object.assign(),...扩展运算符

深拷贝： 将数据中所有的数据拷贝下来，对拷贝之后的数据进行修改不会影响到原数据。

JSON.parse(JSON.stringify(obj))深拷贝的问题

1、如果obj里面存在时间对象,JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。
2、如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象。
3、如果obj里有函数，undefined，则序列化的结果会把函数， undefined丢失。
4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null。
5、JSON.stringify()只能序列化对象的可枚举的自有属性。如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor。
6、如果对象中存在循环引用的情况也无法正确实现深拷贝。
 */

/*  使用
import CommonUtils from '@/common/commonUtils.js'
const CommonUtils = require('@/common/commonUtils.js');

CommonUtils.Jh_getRandomNum(1，10)

*/
