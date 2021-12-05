const level = [
  { value: '1', label: '一级' },
  { value: '2', label: '二级' },
  { value: '3', label: '三级' }
]

const leader = [
  { value: 'leader1', label: '负责人1' },
  { value: 'leader2', label: '负责人2' },
  { value: 'leader3', label: '负责人3' },
  { value: 'leader4', label: '负责人4' },
  { value: 'leader5', label: '负责人5' }
]

const dept = [{
  'id': 'f505a4b97b151d141d122a3d323c87ee1',
  'label': '部门一',
  'value': 'dept1',
  'type': '这是描述1',
  'sort': 0
},
{
  'id': 'f505a4b97b151d141d122a3d323c87ee2',
  'label': '部门二',
  'value': 'dept2',
  'type': '这是描述2',
  'sort': 1
},
{
  'id': 'f505a4b97b151d141d122a3d323c87ee3',
  'label': '部门三',
  'value': 'dept3',
  'type': '这是描述3',
  'sort': 2
}]

const deptTree = [{
  id: '1',
  label: '一级 1',
  children: [{
    id: '4',
    label: '二级 1-1',
    children: [{
      id: '9',
      label: '三级 1-1-1'
    }, {
      id: '10',
      label: '三级 1-1-2'
    }]
  }]
}, {
  id: '2',
  label: '一级 2',
  children: [{
    id: '5',
    label: '二级 2-1'
  }, {
    id: '6',
    label: '二级 2-2'
  }]
}, {
  id: '3',
  label: '一级 3',
  children: [{
    id: '7',
    label: '二级 3-1'
  }, {
    id: '8',
    label: '二级 3-2'
  }]
}]

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
  },
  {
    url: '/v1/api/dict/leader',
    type: 'get',
    response: config => {
      const tempArr = leader
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  },
  {
    url: '/v1/api/dict/dept',
    type: 'get',
    response: config => {
      const tempArr = dept
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  },
  {
    url: '/v1/api/dict/tree',
    type: 'get',
    response: config => {
      const tempArr = deptTree
      return {
        code: 20000,
        msg: 'success',
        total: tempArr.length,
        data: tempArr
      }
    }
  }
]

