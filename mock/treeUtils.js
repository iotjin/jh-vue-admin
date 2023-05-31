const Mock = require('mockjs')

// 自定义拓展
/**
 * 生成多层tree结构的列表数据
 * @param template Mockjs数据模板
 * @param number {?number} 一级树结构的数量
 * @param max {?number} 最深层级数量
 * @param min {?number} 最浅层级数量
 */
function treeCallback(template, number = 5, max = 3, min = 0) {
  const treeNodeList = []
  let index = 0
  while (index < (Math.round(Math.random() * number) || 1)) {
    // 随机一个子项有几个层级
    const len = Math.round(Math.random() * (max - min)) + min
    // 造一个临时数据
    const tempTemplate = { ...template }
    // 如果随机到有子项，插入一条子项，数量是1-随机最大值
    if (len) {
      tempTemplate[`children|1-${Math.round(Math.random() * number)}`] =
        treeCallback(template, 1, len - 1)
    } else {
      tempTemplate['children'] = []
    }

    treeNodeList[index++] = tempTemplate
  }
  return treeNodeList
}

// 注册到mockjs内
Mock.Random.extend({
  diyTreeNode: treeCallback
})

// 使用
// const getTreeList = () => {
//   return Mock.mock({
//     code: 20000,
//     msg: 'success',
//     data: Mock.Random.diyTreeNode({
//       id: '@id',
//       name: '@cname',
//       parentId: '@id'
//     })
//   })
// }
