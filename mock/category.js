const Mock = require('mockjs')

const data = Mock.mock({
  'tableData|10': [{
    id: '@id',
    parent_id: '@id',
    name: '@sentence(1, 3)',
    parent_name: '@sentence(1, 3)'
  }]
})

module.exports = [
  {
    url: '/category/list.do',
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
    url: '/category/parentname.do',
    type: 'get',
    response: () => {
      let parent_name = []
      for (let i = 0; i < data.tableData.length; i++) {
        parent_name.push(data.tableData[i].parent_name)
      }
      return {
        status: 20000,
        data: parent_name,
      }
    }
  },
  {
    url: '/category/parentid.do',
    type: 'get',
    response: () => {
      let parent_id = []
      for (let i = 0; i < data.tableData.length; i++) {
        parent_id.push(data.tableData[i].parent_id)
      }
      return {
        status: 20000,
        data: parent_id
      }
    }
  },
  {
    url: '/category/update.do',
    type: 'post',
    response: () => {
      return {
        status: 20000
      }
    }
  },
  {
    url: '/category/delete.do',
    type: 'post',
    response: () => {
      return {
        status: 20000
      }
    }
  },
  {
    url: '/category/insert.do',
    type: 'post',
    response: () => {
      return {
        status: 20000
      }
    }
  },
  {
    url: '/category/insertparent.do',
    type: 'post',
    response: () => {
      return {
        status: 20000
      }
    }
  },
]
