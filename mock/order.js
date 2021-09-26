const Mock = require('mockjs')

const data = Mock.mock({
  'tableData|10': [{
    user_id: '@id',
    order_no: '@id',
    product_id: '@id',
    product_name: '@name',
    product_image: '@url',
    'current_unit_price|1-100': 0,
    'quantity|1-100': 0,
    'total_price|1-1000': 0,
    create_time: '@datetime',
    update_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/order/list.do',
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
    url: '/order/delete.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/order/edit.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/order/add.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },
]
