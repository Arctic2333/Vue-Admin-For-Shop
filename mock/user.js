const Mock = require('mockjs')

const data = Mock.mock({
  'tableData|10': [{
    id: '@id',
    username: '@sentence(1, 3)',
    password: '@sentence(1,5)',
    email: '@email',
    phone: '@zip',
    question: '@sentence(1,3)',
    answer: '@sentence(1,3)',
    'role|0-1': 1,
    wechat_openid: '@sentence(1,3)',
    create_time: '@datetime',
    update_time: '@datetime'
  }]
})

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
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
          status: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        status: 20000,
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
          status: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status: 20000,
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
        status: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/user/list.do',
    type: 'get',

    response: () => {
      const item = data.tableData
      return {
        status: 20000,
        data: item
      }
    }
  },

  {
    url: '/user/edit.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/user/delete.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/user/add.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },
]
