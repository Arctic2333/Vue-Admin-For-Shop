<template>
  <div class="app-container">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称" class="el-form-item">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="父类 ID">
              <span>{{ props.row.category_id }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品库存">
              <span>{{ props.row.stock }}</span>
            </el-form-item>
            <el-form-item label="商品状态">
              <span v-if="props.row.status === 1">在售</span>
              <span v-else>下架</span>
            </el-form-item>
            <el-form-item label="商品创建时间">
              <span>{{ props.row.create_time }}</span>
            </el-form-item>
            <el-form-item label="商品更新时间">
              <span>{{ props.row.update_time }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.subtitle }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="id"
      />
      <el-table-column
        label="商品名称"
        prop="name"
      />
      <el-table-column
        label="描述"
        prop="subtitle"
      />
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
    <el-drawer
      ref="drawer"
      title="修改商品!"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="form.subtitle" autocomplete="off" />
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off" />
          </el-form-item>
          <el-form-item label="商品库存" :label-width="formLabelWidth">
            <el-input v-model="form.stock" autocomplete="off" />
          </el-form-item>
          <el-form-item label="商品状态" :label-width="formLabelWidth">
            <el-select v-model="form.status">
              <el-option label="在售" value="1" />
              <el-option label="下架" value="0" />
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
import { deletePro, getTable, updatePro } from '@/api/product'
import {getTime} from "@/utils/get-time";

export default {
  data() {
    return {
      tableData: [],
      search: '',
      status: 0,
      dialog: false,
      loading: false,
      form: {
        id: 0,
        name: '',
        subtitle: '',
        price: 100,
        stock: 100,
        status: 1,
        update_time: ''
      },
      formLabelWidth: '80px',
      timer: null,
      del: {
        id: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTable().then(response => {
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
      this.del.id = row.id
      this.delete(this.del)
      this.reload()
      console.log(index, row)
    },
    delete(data) {
      deletePro(data).then(
        response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({ message: '删除商品成功', type: 'success' })
          } else {
            this.$message.error('删除商品失败')
          }
        }
      )
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
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
            updatePro(this.form).then(
              response => {
                this.status = response.status
                if (this.status === 20000) {
                  this.$message({ message: '更新商品成功', type: 'success' })
                } else {
                  this.$message.error('更新商品失败')
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
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
