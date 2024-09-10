const Mock = require('mockjs')

module.exports = [
  {
    url: '/api/v1/files',
    type: 'post',
    response: (config) => {
      // 生成一个随机图片 URL
      const wh = Mock.Random.integer(100, 1000)
      const color = Mock.Random.color()
      const imageUrl = Mock.Random.image(`${wh}x${wh}`, color, '#FFF', 'Image')
      return {
        code: 20000,
        msg: 'success',
        data: {
          id: Mock.mock('@id'),
          url: imageUrl,
          path: imageUrl
        }
      }
    }
  }
]
