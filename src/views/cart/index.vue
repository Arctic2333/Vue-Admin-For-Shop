<template>
  <div class="app-container">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column
        label="用户 ID"
        prop="user_id"
      />
      <el-table-column
        label="商品id"
        prop="product_id"
      />
      <el-table-column
        label="数量"
        prop="quantity"
      />
      <el-table-column
        label="选择"
        prop="checked"
      >
        <template slot-scope="scope">
          <el-col v-if="scope.row.checked === 1">已勾选</el-col>
          <el-col v-else>未勾选</el-col>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入商品名关键字搜索"
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

    <el-dialog title="购物车" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model="form.user_id"></el-input>
        </el-form-item>
        <el-form-item label="产品ID" :label-width="formLabelWidth">
          <el-input v-model="form.product_id"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.quantity"></el-input>
        </el-form-item>
        <el-form-item label="是否勾选" :label-width="formLabelWidth">
          <el-select v-model="form.checked" placeholder="勾选情况">
            <el-option label="未勾选" value=0></el-option>
            <el-option label="已勾选" value=1></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="method_t === true"
          type="primary"
          @click="dialogFormVisible = false,edit(form)"
        >确 定
        </el-button>
        <el-button v-else type="primary" @click="dialogFormVisible = false,add(form)">添 加</el-button>
      </div>
    </el-dialog>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="handleAdd()">添加购物车信息</el-button>
    </div>

  </div>
</template>

<script>
import {addData, deleteData, getData, updateData} from "@/api/com";

const api_name  = 'cart'
export default {
  data() {
    return {
      method_t: true,
      tableData: [],
      search: '',
      status: 0,
      dialogFormVisible: false,
      form: {
        user_id: '',
        product_id: '',
        quantity: '',
        checked: '',
        update_time: ''
      },
      formLabelWidth: '80px',
      del: {
        user_id: '',
        product_id: ''
      }
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
    }, handleAdd() {
      this.method_t = false
      this.form = {}
      this.dialogFormVisible = true
    },
    handleEdit(index, row) {
      this.form = row
      this.dialogFormVisible = true
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.del.user_id = row.user_id
      this.del.product_id = row.product_id
      this.delete(this.del)
      this.reload()
      console.log(index, row)
    },
    add(data) {
      addData(data, api_name).then(response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({message: '新增购物车信息成功', type: 'success'})
          } else {
            this.$message.error('新增购物车信息失败')
          }
        }
      )
      this.reload()
    },
    delete(data) {
      deleteData(data, api_name).then(
        response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({message: '删除购物车信息成功', type: 'success'})
          } else {
            this.$message.error('删除购物车失败')
          }
        }
      )
      this.reload()
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

    reload() {
      this.method_t = true
      this.dialogFormVisible = false
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
}


</script>

<style scoped>

</style>
