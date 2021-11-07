const level = [
  { value: '1', label: '一级' },
  { value: '2', label: '二级' },
  { value: '3', label: '三级' }
]

module.exports = [
  {
    url: '/v1/api/dict/level',
    type: 'get',
    response: config => {
      const tempArr = level
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  }
]
