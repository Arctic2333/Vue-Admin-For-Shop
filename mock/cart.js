const Mock = require('mockjs')

const data = Mock.mock({
  'tableData|10': [{
    user_id: '@id',
    product_id: '@id',
    'quantity|1-1000': 100,
    'checked|0-1': 0
  }]
})

module.exports = [
  {
    url: '/cart/list.do',
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
    url: '/cart/delete.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/cart/edit.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/cart/add.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },
]
