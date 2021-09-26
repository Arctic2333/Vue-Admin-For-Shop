<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名称" class="el-form-item">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="用户 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="用户密码">
              <span>{{ props.row.password }}</span>
            </el-form-item>
            <el-form-item label="用户邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="用户电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="用户角色">
              <span v-if="props.row.role === 1">管理员</span>
              <span v-else>普通用户</span>
            </el-form-item>
            <el-form-item label="用户创建时间">
              <span>{{ props.row.create_time }}</span>
            </el-form-item>
            <el-form-item label="用户更新时间">
              <span>{{ props.row.update_time }}</span>
            </el-form-item>
            <el-form-item label="微信号">
              <span>{{ props.row.wechat_openid }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="用户 ID"
        prop="id"
      />
      <el-table-column
        label="用户名称"
        prop="username"
      />
      <el-table-column
        label="邮箱"
        prop="email"
      />
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入用户名关键字搜索"
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
    <div style="margin-top: 20px">
      <el-button @click="deleteMul()" type="danger">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-drawer
      ref="drawer"
      title="修改用户!"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="密保问题" :label-width="formLabelWidth">
            <el-input v-model="form.question"></el-input>
          </el-form-item>
          <el-form-item label="密保问题的答案" :label-width="formLabelWidth">
            <el-input v-model="form.answer"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" :label-width="formLabelWidth">
            <el-select v-model="form.role" placeholder="请选择用户类型">
              <el-option label="管理员" value=1></el-option>
              <el-option label="普通用户" value=0></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="微信号" :label-width="formLabelWidth">
            <el-input v-model="form.wechat_openid"></el-input>
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
import {deleteUser, getUser, updateUser} from "@/api/user";
import {getTime} from "@/utils/get-time";

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      tableData: [],
      search: '',
      form: {
        username: '',
        password: '',
        email: '',
        phone: '',
        question: '',
        answer: '',
        role: 0,
        wechat_openid: '',
        update_time: ''
      },
      formLabelWidth: '80px',
      timer: null,
      del: {
        id: ''
      },
      multipleSelection: [],
      selectID: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUser().then(response => {
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
      deleteUser(data).then(
        response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({ message: '删除用户成功', type: 'success' })
          } else {
            this.$message.error('删除用户失败')
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
            updateUser(this.form).then(
              response => {
                this.status = response.status
                if (this.status === 20000) {
                  this.$message({message: '更新用户成功', type: 'success'})
                } else {
                  this.$message.error('更新用户失败')
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection() {
        this.$refs.multipleTable.clearSelection();
    },
    deleteMul(){
      for (let index in this.multipleSelection){
          this.selectID.push(this.multipleSelection[index].id)
      }
      this.delete(this.selectID);
    }
  }
}
</script>

<style scoped>

</style>
