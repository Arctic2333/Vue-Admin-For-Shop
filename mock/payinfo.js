const Mock = require('mockjs')

const data = Mock.mock({
  'tableData|10': [{
    user_id: '@id',
    order_no: '@id',
    shipping_id: '@id',
    'payment|1-100': 0,
    'payment_type|0-1': 1,
    'postage|1-100': 0,
    status: '@pick(["0", "10", "20", "40", "50", "60"])',
    'pay_platform|1-2': 1,
    platform_number: '@id',
    platform_status:'@pick(["TRADE_SUCCESS", "WAIT_BUYER_PAY"])',
    create_time: '@datetime',
    update_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/payinfo/list.do',
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
    url: '/payinfo/delete.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/payinfo/edit.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },

  {
    url: '/payinfo/add.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },
]
