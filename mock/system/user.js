const Mock = require('mockjs')

const listData = {
  id: '@id',
  name: '@cname',
  loginName: '@first',
  userNumber: '@integer(10000000,99999999)',
  'deptId|1': ['dept1', 'dept2', 'dept3'],
  'status|1': ['0', '1'],
  userExpiryDate: '@datetime("yyyy-MM-dd")',
  phone: /^1[387][0-9]{9}$/,
  'notes|1-18': '这是内容',
  age: '@integer(1,100)',
  money: '@float(0, 1000, 1, 2)',
  'level|1': ['1', '2', '3'],
  loginDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  loginIp: '@ip',
  createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  updateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  updateBy: '@cname',
  'delFlag|1': ['0', '1']
}

function createListData(params, listData) {
  var itemData = listData
  if (!params.noData || params.noData === 'false') {
    var data = []
    var page = Number(params.page)
    var limit = params.limit ? params.limit : 10
    limit = Number(limit)
    var maxCount = params.maxCount ? params.maxCount : 1300
    maxCount = Number(maxCount)
    var skip = page * limit
    var length = skip + limit
    for (var i = skip; i < length; i++) {
      var temp = Mock.mock(itemData)
      temp.name += i
      if (i === 10) {
        temp.loginName = 'super admin'
      }
      data.push(temp)
    }
    return skip >= maxCount ? '' : data
  } else {
    return ''
  }
}

module.exports = [
  // 查询列表
  {
    url: '/v1/api/user/list',
    type: 'get',
    response: (config) => {
      const params = config.query
      const tempArr = createListData(params, listData)
      return {
        code: 20000,
        msg: 'success',
        total: 1000,
        data: tempArr
      }
    }
  },
  // 新增、编辑
  {
    url: '/v1/api/user/save',
    type: 'post',
    response: (config) => {
      const params = config.query
      const tempArr = createListData(params, listData)
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  },
  // 删除
  {
    url: '/v1/api/user/delete',
    type: 'post',
    response: (config) => {
      const params = config.query
      const tempArr = createListData(params, listData)
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  },
  // 单条查询
  {
    url: '/v1/api/user/',
    type: 'get',
    response: (config) => {
      const params = config.query
      params.page = 1
      params.limit = 1
      const tempArr = createListData(params, listData)
      return {
        code: 20000,
        msg: 'success',
        total: 1,
        data: tempArr[0]
      }
    }
  },
  // 重置密码
  {
    url: '/v1/api/user/resetPwd',
    type: 'post',
    response: (config) => {
      const params = config.query
      const tempArr = createListData(params, listData)
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  },
  // 用户分配角色
  {
    url: '/v1/api/user/assignRole',
    type: 'post',
    response: (config) => {
      const params = config.query
      const tempArr = createListData(params, listData)
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  }
]
