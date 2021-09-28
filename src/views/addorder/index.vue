<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户ID" style="width: 45%">
        <el-input v-model="form.user_id"></el-input>
      </el-form-item>
      <el-form-item label="订单号" style="width: 45%">
        <el-input v-model="form.order_no"></el-input>
      </el-form-item>
      <el-form-item label="产品ID" style="width: 45%">
        <el-input v-model="form.product_id"></el-input>
      </el-form-item>
      <el-form-item label="产品名称" style="width: 45%">
        <el-input v-model="form.product_name"></el-input>
      </el-form-item>
      <el-form-item label="产品图片URL" style="width: 45%">
        <el-input v-model="form.product_image"></el-input>
      </el-form-item>
      <el-form-item label="单价(元)" style="width: 45%">
        <el-input v-model="form.current_unit_price"></el-input>
      </el-form-item>
      <el-form-item label="数量" style="width: 45%">
        <el-input v-model="form.quantity"></el-input>
      </el-form-item>
      <el-form-item label="总价(元)" style="width: 45%">
        <el-input v-model="form.total_price"></el-input>
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

const api_name = 'order'
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        user_id: 0,
        order_no: 0,
        product_id: 0,
        product_name: '',
        product_image: '',
        current_unit_price: 0.00,
        quantity: 0,
        total_price: 0.00,
        update_time: '',
        create_time: ''
      }
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
      addData(data,api_name).then(response => {
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
