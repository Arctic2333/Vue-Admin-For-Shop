<template>
<div class="app-container">
  <el-form :model="form" label-width="80px">
    <el-form-item label="订单号" style="width: 45%">
      <el-input v-model="form.order_no"></el-input>
    </el-form-item>
    <el-form-item label="用户ID" style="width: 45%">
      <el-input v-model="form.user_id"></el-input>
    </el-form-item>
    <el-form-item label="支付平台" style="width: 45%">
      <el-select v-model="form.pay_platform" placeholder="请选择支付平台">
        <el-option label="支付宝" value=1 ></el-option>
        <el-option label="微信" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="支付平台流水号" style="width: 45%">
      <el-input v-model="form.platform_number"></el-input>
    </el-form-item>
    <el-form-item label="支付平台交易状态" style="width: 45%">
      <el-select v-model="form.platform_status">
        <el-option label="支付成功" value="TRADE_SUCCESS"></el-option>
        <el-option label="等待支付" value="WAIT_BUYER_PAY"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {getTime} from "@/utils/get-time";
import {addData} from "@/api/com";

const api_name = 'payinfo'
export default {
  inject: ['reload'],
  data(){
    return{
      form: {
        order_no: 0,
        user_id: 0,
        pay_platform: 1,
        platform_number: '',
        platform_status: '',
        update_time: '',
        create_time: ''
      },
    }
  },
  created() {
    this.form ={}
  },
  methods: {
    onSubmit() {
      this.form.create_time = getTime()
      this.form.update_time = getTime()
      this.add(this.form)
      console.log('submit!');
    },
    add(data) {
      addData(data, api_name).then(response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({message: '添加成功', type: 'success'})
          } else {
            this.$message.error('添加失败')
          }
        }
      )
      this.reload()
      this.form = {}
    },
  }
}
</script>

<style scoped>

</style>
