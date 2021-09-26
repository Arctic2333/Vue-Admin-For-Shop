<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称" style="width: 45%">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="商品父类" style="width: 45%">
        <el-select v-model="form.category_id" placeholder="请选择">
          <div v-for="(item,index) in parent_name" :key="item.index">
            <el-option :label="item" :value="parent_id[index]"/>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="商品描述" style="width: 45%">
        <el-input v-model="form.subtitle"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" style="width: 45%">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" style="width: 45%">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item label="商品状态" style="width: 45%">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="在售" value="1"/>
          <el-option label="下架" value="0"/>
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
import {getParentID, getParentName} from "@/api/category";
import {getTime} from "@/utils/get-time";
import {addProduct} from "@/api/product";

export default {
  data() {
    return {
      parent_name: [],
      parent_id: [],
      status: 0,
      form: {
        name: '',
        category_id: '',
        subtitle: '',
        price: 10,
        stock: 10,
        status: 1,
        create_time: '',
        update_time: ''
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      this.form.create_time = getTime()
      this.form.update_time = getTime()
      this.add(this.form)
      console.log(this.form);
    },
    fetchData() {
      getParentName().then(response => {
        this.parent_name = response.data
      })
      getParentID().then(response => {
        this.parent_id = response.data
      })
    },
    add(data) {
      addProduct(data).then(response => {
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
