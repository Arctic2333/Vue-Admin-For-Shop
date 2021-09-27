<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button type="primary" @click="form = {},dialogFormVisible = true,method_t = false, method_s = false">添加父类目
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="form ={},dialogFormVisible = true,method_s = false">添加子类目</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table_date"
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="类目名"
        prop="name"
      />
      <el-table-column
        label="父类目ID"
        prop="parent_id"
      />
      <el-table-column
        label="父类目名"
        prop="parent_name"
      />
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入类目名关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="totalCount">
    </el-pagination>
    <el-dialog title="类目详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item v-if="method_t === true" label="父类目" :label-width="formLabelWidth">
          <el-select v-model="form.parent_id" placeholder="请选择父类目">
            <div v-for="(item,index) in parent_name" :key="item.index">
              <el-option :label="item" :value="parent_id[index]"/>
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false, method_s = true, method_t = true">取 消</el-button>
        <el-button
          v-if="method_s === true"
          type="primary"
          @click="dialogFormVisible = false,edit(form)"
        >确 定
        </el-button>
        <el-button v-else type="primary" @click="dialogFormVisible = false,add(form)">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getParentID, getParentName, insert, insertParent} from '@/api/category'
import {deleteData, getData, updateData} from "@/api/com";

const api_name = 'category';
export default {
  data() {
    return {
      loading: false,
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
      status: 0,
      method_t: true,
      method_s: true,
      tableData: [],
      parent_name: [],
      parent_id: [],
      search: '',
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        parent_id: ''
      },
      formLabelWidth: '120px',
      del: {
        id: ''
      }
    }
  },
  created() {
    this.loading = true
    this.fetchData()
  },
  methods: {
    handleEdit(index, row) {
      this.form.id = row.id
      this.form.name = row.name,
        this.dialogFormVisible = true,
        console.log(index, row)
    },

    handleDelete(index, row) {
      this.del.id = row.id
      this.deleteShop(this.del)
      console.log(row)
    },

    fetchData() {
      getData('', api_name).then(response => {
        this.tableData = response.data
        this.totalCount = this.tableData.length
        this.loading = false
      })
      getParentName().then(response => {
        this.parent_name = response.data
      })
      getParentID().then(response => {
        this.parent_id = response.data
      })
    },

    edit(data) {
      updateData(data, api_name).then(response => {
        this.status = response.status
        if (this.status === 20000) {
          this.$message({message: '修改成功', type: 'success'})
        } else {
          this.$message.error('修改失败')
        }
      })
      console.log(data)
      this.reload()
    },

    add(data) {
      if (this.method_t === false) {
        insertParent(data).then(
          response => {
            this.status = response.status
            if (this.status === 20000) {
              this.$message({message: '插入父类目成功', type: 'success'})
            } else {
              this.$message.error('插入父类目失败')
            }
          }
        )
        console.log(data)
      } else {
        insert(data).then(
          response => {
            this.status = response.status
            if (this.status === 20000) {
              this.$message({message: '插入类目成功', type: 'success'})
            } else {
              this.$message.error('插入类目失败')
            }
          }
        )
        console.log(data)
      }
      this.reload()
    },

    deleteShop(data) {
      deleteData(data, api_name).then(
        response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({message: '删除类目成功', type: 'success'})
          } else {
            this.$message.error('删除类目失败')
          }
        }
      )
      console.log(data)
      this.reload()
    },

    reload() {
      this.form = Object.assign({})
      this.method_s = true
      this.method_t = true
      this.dialogFormVisible = false
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
  },
  //计算属性 或者使用watch
  computed: {
    table_date() {
      let search = this.search
      if (search) {
        // 搜索结果
        let res = this.tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))
        let len = res.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        // 搜索后页长
        this.totalCount = len.length
        return res, len
      } else {
        this.totalCount = this.tableData.length
        return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
  }
}
</script>

<style scoped>

</style>
