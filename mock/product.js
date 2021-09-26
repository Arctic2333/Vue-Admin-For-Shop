const Mock = require('mockjs')

const data = Mock.mock({
  'tableData|10': [{
    id: '@id',
    category_id: '@id',
    name: '@sentence(1, 3)',
    subtitle: '@sentence(1,5)',
    main_image: '@sentence(1,5)',
    sub_images: '@sentence(1,5)',
    detail: '@sentence(1,5)',
    'price|1-100.1-10': 100,
    'stock|1-1000': 100,
    'status|0-1': 1,
    create_time: '@datetime',
    update_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/product/list.do',
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
    url: '/product/delete.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },
  {
    url: '/product/edit.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },
  {
    url: '/product/add.do',
    type: 'post',

    response: () => {
      return {
        status: 20000,
      }
    }
  },
]
