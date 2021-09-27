<template>
  <div class="app-container">
    <el-table
      :data="tableData.filter(data => !search || data.user_id.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户编号">
              <span>{{ props.row.user_id }}</span>
            </el-form-item>
            <el-form-item label="订单编号">
              <span>{{ props.row.order_no }}</span>
            </el-form-item>
            <el-form-item label="收货地址编号">
              <span>{{ props.row.shipping_id }}</span>
            </el-form-item>
            <el-form-item label="支付金额">
              <span>{{ props.row.payment }}</span>
            </el-form-item>
            <el-form-item label="支付方式">
              <span v-if="props.row.payment_type === 1">在线支付</span>
              <span v-else>货到付款</span>
            </el-form-item>
            <el-form-item label="运费">
              <span> {{ props.row.postage }}</span>
            </el-form-item>
            <el-form-item label="支付状态">
              <span v-if="props.row.status === '0'">已取消</span>
              <span v-else-if="props.row.status ==='10'">未付款</span>
              <span v-else-if="props.row.status ==='20'">已付款</span>
              <span v-else-if="props.row.status ==='40'">已发货</span>
              <span v-else-if="props.row.status ==='50'">交易成功</span>
              <span v-else-if="props.row.status ==='60'">交易关闭</span>
            </el-form-item>
            <el-form-item label="支付平台">
              <span v-if="props.row.pay_platform === 1">支付宝</span>
              <span v-else>微信</span>
            </el-form-item>
            <el-form-item label="支付平台状态">
              <span v-if="props.row.platform_status === 'TRADE_SUCCESS'">支付成功</span>
              <span v-else>等待支付</span>
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
        label="用户编号"
        prop="user_id"
      />
      <el-table-column
        label="订单编号"
        prop="order_no"
      />
      <el-table-column
        label="收货地址编号"
        prop="shipping_id"
      />
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入用户名ID搜索"
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

    <el-drawer
      ref="drawer"
      title="修改支付信息!"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form.order_no"></el-input>
          </el-form-item>
          <el-form-item label="用户ID" :label-width="formLabelWidth">
            <el-input v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="收货地址ID" :label-width="formLabelWidth">
            <el-input v-model="form.shipping_id"></el-input>
          </el-form-item>
          <el-form-item label="实际付款金额(元)" :label-width="formLabelWidth">
            <el-input v-model="form.payment"></el-input>
          </el-form-item>
          <el-form-item label="支付类型" :label-width="formLabelWidth">
            <el-select v-model="form.payment_type" placeholder="请选择支付类型">
              <el-option label="网上支付" value=1></el-option>
              <el-option label="货到付款" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运费(元)" :label-width="formLabelWidth">
            <el-input v-model="form.postage"></el-input>
          </el-form-item>
          <el-form-item label="支付状态" :label-width="formLabelWidth">
            <el-select v-model="form.status" placeholder="请选择支付状态">
              <el-option label="已取消" value='0'></el-option>
              <el-option label="非付款" value='10'></el-option>
              <el-option label="已付款" value='20'></el-option>
              <el-option label="已发货" value='40'></el-option>
              <el-option label="交易成功" value='50'></el-option>
              <el-option label="交易关闭" value='60'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付平台" :label-width="formLabelWidth">
            <el-select v-model="form.pay_platform" placeholder="请选择支付平台">
              <el-option label="支付宝" value=1></el-option>
              <el-option label="微信" value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付平台流水号" :label-width="formLabelWidth">
            <el-input v-model="form.platform_number"></el-input>
          </el-form-item>
          <el-form-item label="支付平台交易状态" :label-width="formLabelWidth">
            <el-select v-model="form.platform_status">
              <el-option label="支付成功" value="TRADE_SUCCESS"></el-option>
              <el-option label="等待支付" value="WAIT_BUYER_PAY"></el-option>
            </el-select>
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

const api_name = 'payinfo'
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      tableData: [],
      search: '',
      form: {
        order_no: '',
        user_id: '',
        shipping_id: '',
        payment: '',
        payment_type: '',
        postage: '',
        status: '',
        pay_platform: '',
        platform_number: '',
        platform_status: '',
        update_time: ''
      },
      formLabelWidth: '80px',
      timer: null,
      del: {
        user_id: '',
        order_no: ''
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getData('', api_name).then(response => {
          this.tableData = response.data
        }
      )
    },
    handleEdit(index, row) {
      this.form = row
      this.dialog = true
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.del.user_id = row.user_id
      this.del.order_no = row.order_no
      this.delete(this.del)
      this.reload()
      console.log(index, row)
    },
    delete(data) {
      deleteData(data, api_name).then(
        response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({message: '删除支付信息成功', type: 'success'})
          } else {
            this.$message.error('删除支付信息失败')
          }
        }
      )
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
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
            updateData(this.form, api_name).then(
              response => {
                this.status = response.status
                if (this.status === 20000) {
                  this.$message({message: '更新支付信息成功', type: 'success'})
                } else {
                  this.$message.error('更新支付信息失败')
                }
              }
            )
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 50)
          }, 100)
        })
        .catch(_ => {
        })
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
  },

}
</script>

<style scoped>

</style>
