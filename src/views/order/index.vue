<template>
  <div class="app-container">
  <el-table
    ref="multipleTable"
    v-loading.fullscreen.lock="load"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="table_date"
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户 ID">
            <span>{{ props.row.user_id }}</span>
          </el-form-item>
          <el-form-item label="订单号">
            <span>{{ props.row.order_no }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.product_id}}</span>
          </el-form-item>
          <el-form-item label="商品 图片">
            <span>{{ props.row.product_image}}</span>
          </el-form-item>
          <el-form-item label="商品名称">
            <span>{{ props.row.product_name }}</span>
          </el-form-item>
          <el-form-item label="商品单价">
            <span> {{props.row.current_unit_price}}</span>
          </el-form-item>
          <el-form-item label="购买数量">
            <span>{{ props.row.quantity }}</span>
          </el-form-item>
          <el-form-item label="总价">
            <span>{{ props.row.total_price }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.create_time }}</span>
          </el-form-item>
          <el-form-item label="最后更新时间">
            <span>{{ props.row.update_time }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="用户 ID"
      prop="user_id"
    />
    <el-table-column
      label="订单编号"
      prop="order_no"
    />
    <el-table-column
      label="商品名称"
      prop="product_name"
    />
    <el-table-column
      align="right"
    >
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入商品名称搜索"
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
    <el-drawer
      ref="drawer"
      title="修改订单!"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="用户ID" :label-width="formLabelWidth">
            <el-input v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form.order_no"></el-input>
          </el-form-item>
          <el-form-item label="产品ID" :label-width="formLabelWidth">
            <el-input v-model="form.product_id"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" :label-width="formLabelWidth">
            <el-input v-model="form.product_name"></el-input>
          </el-form-item>
          <el-form-item label="产品图片" :label-width="formLabelWidth">
            <el-input v-model="form.product_image"></el-input>
          </el-form-item>
          <el-form-item label="单价(元)" :label-width="formLabelWidth">
            <el-input v-model="form.current_unit_price"></el-input>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="form.quantity"></el-input>
          </el-form-item>
          <el-form-item label="总价(元)" :label-width="formLabelWidth">
            <el-input v-model="form.total_price"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="$refs.drawer.closeDrawer()">
            {{ loading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>

import {getTime} from "@/utils/get-time";
import {deleteData, getData, updateData} from "@/api/com";

const api_name = 'orderitem'
export default {
  inject: ['reload'],
  data() {
    return {
      load: false,
      currentPage: 1,
      totalCount: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      dialog: false,
      loading: false,
      tableData: [],
      search: '',
      form: {
        user_id: 0,
        order_no: 0,
        product_id: 0,
        product_name: '',
        product_image: '',
        current_unit_price: 0.00,
        quantity: 0,
        total_price: 0.00,
        update_time: ''
      },
      formLabelWidth: '80px',
      timer: null,
      del: {
        id: 0,
      },
    }
  },
  created() {
    this.load = true
    this.fetchData()
  },
  methods: {
    fetchData() {
      getData('',api_name).then(response => {
          this.tableData = response.data
          this.load = false
        }
      )
    },
    handleEdit(index, row) {
      this.form = row
      this.dialog = true
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.del.id = row.id
      this.delete(this.del)
      this.reload()
      console.log(index, row)
    },
    delete(data){
      deleteData(data,api_name).then(
        response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({ message: '删除订单成功', type: 'success' })
          } else {
            this.$message.error('删除订单失败')
          }
        }
      )
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 更新
            this.form.update_time = getTime()
            updateData(this.form,api_name).then(
              response => {
                this.status = response.status
                if (this.status === 20000) {
                  this.$message({message: '更新订单成功', type: 'success'})
                } else {
                  this.$message.error('更新订单失败')
                }
              }
            )
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 50)
          }, 100)
          this.reload()
        })
        .catch(_ => {
        })
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },

    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
  computed: {
    table_date() {
      let search = this.search
      if (search) {
        // 搜索结果
        let res = this.tableData.filter(data => !search || data.product_name.toLowerCase().includes(search.toLowerCase()))
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
