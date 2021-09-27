<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名" style="width: 45%">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" style="width: 45%">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" style="width: 45%">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" style="width: 45%">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="密保问题" style="width: 45%">
      <el-input v-model="form.question"></el-input>
    </el-form-item>
    <el-form-item label="密保问题的答案" style="width: 45%">
      <el-input v-model="form.answer"></el-input>
    </el-form-item>
    <el-form-item label="用户类型" style="width: 45%">
      <el-select v-model="form.role" placeholder="请选择用户类型" style="width: 45%">
        <el-option label="管理员" value=1></el-option>
        <el-option label="普通用户" value=0></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="微信号" style="width: 45%">
      <el-input v-model="form.wechat_openid"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {getTime} from "@/utils/get-time";
import {addData} from "@/api/com";

const api_name = 'user'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        phone: '',
        question: '',
        answer: '',
        role: '',
        wechat_openid: '',
        create_time: '',
        update_time: ''
      }
    }
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
    },
    reload() {
      this.form = Object.assign({})
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>

</style>
