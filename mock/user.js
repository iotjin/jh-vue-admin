
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  editor2: {
    token: 'editor-token2'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'editor-token2': {
    roles: ['editor2'],
    introduction: 'I am an editor2',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor2'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/v1/api/checkUpgrade',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        msg: 'success',
        data: {
          isForceUpgrade: false,
          version: '2.1.0',
          // descList: []
          descList: ['1. 新增xxx功能', '2. 优化xxx功能', '3. 修复xxx功能']
          // descList: [
          //   '1. 新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能',
          //   '2. 优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能',
          //   '3. 修复xxx功能',
          //   '1. 新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能',
          //   '2. 优化xxx功能',
          //   '3. 修复xxx功能',
          //   '1. 新增xxx功能',
          //   '2. 优化xxx功能',
          //   '3. 修复xxx功能',
          //   '3. 修复xxx功能',
          //   '1. 新增xxx功能'
          // ]
        }
      }
    }
  }
]
