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
            <el-form-item label="轮播图 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="位置">
              <span>{{ props.row.position }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.details }}</span>
            </el-form-item>
            <el-form-item label="Link">
              <span>{{ props.row.link }}</span>
            </el-form-item>
            <el-form-item label="Type">
              <span> {{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="Status">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="商品ID">
              <span>{{ props.row.product_id }}</span>
            </el-form-item>
            <el-form-item label="广告ID">
              <span>{{ props.row.activity_id }}</span>
            </el-form-item>
            <el-form-item label="开始时间">
              <span>{{ props.row.begin_time }}</span>
            </el-form-item>
            <el-form-item label="结束时间">
              <span>{{ props.row.end_time }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.create_time }}</span>
            </el-form-item>
            <el-form-item label="最后更新时间">
              <span>{{ props.row.update_time }}</span>
            </el-form-item>
            <el-form-item label="图片">
              <el-image
                style="width: 400px; height: 300px"
                :src="url + props.row.image"
                :fit="fit"></el-image>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="轮播图 ID"
        prop="id"
      />
      <el-table-column
        label="描述"
        prop="detail"
      />
      <el-table-column
        label="商品 ID"
        prop="product_id"
      />
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入轮播图描述搜索"
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
      title="修改轮播图!"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" label-width="80px">
          <el-form-item label="位置编号" style="width: 45%">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="明细" style="width: 45%">
            <el-input v-model="form.detail"></el-input>
          </el-form-item>
          <el-form-item label="产品编号" style="width: 45%">
            <el-input v-model="form.product_id"></el-input>
          </el-form-item>
          <el-form-item label="图片文件名" style="width: 45%" >
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://localhost:8080/backstage/advert/upload.do"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
              :before-upload="beforeUpload"
              :file-list="fileList"
              list-type="picture"
              :auto-upload="false"
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">选择上传一张jpg/png文件，且不超过500kb</div>
            </el-upload>
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
import {deleteData, getData, updateData} from "@/api/com";
import {getTime} from "@/utils/get-time";

const api_name = 'advert'
const base_image_url = 'http://localhost:8080/dist/resource/'
export default {
  inject: ['reload'],
  data() {
    return {
      url: base_image_url,
      fit: 'contain',
      fileList: [],
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
        id: 0,
        position: 1,
        detail: '',
        image: '',
        link: null,
        type: 1,
        status: 1,
        product_id: 1,
        activity_id: null,
        begin_time: '',
        end_time: '',
        create_time: '',
        update_time: ''
      },
      formLabelWidth: '80px',
      timer: null,
      del: {
        id: ''
      },
    }
  },
  created() {
    this.load = true
    this.fetchData()
  },
  methods: {
    fetchData() {
      getData('', api_name).then(response => {
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
    delete(data) {
      deleteData(data, api_name).then(
        response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({message: '删除成功', type: 'success'})
          } else {
            this.$message.error('删除失败')
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
            this.$refs.upload.submit()
            console.log(this.form.image)
            updateData(this.form, api_name).then(
              response => {
                this.status = response.status
                if (this.status === 20000) {
                  this.$message({message: '更新轮播图成功', type: 'success'})
                  this.$refs.upload.clearFiles()
                } else {
                  this.$message.error('更新轮播图失败')
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file){
      this.form.image = file.name
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '警告！只能选择一个文件',
        type: 'warning'
      });
    },
  },
  computed: {
    table_date() {
      let search = this.search
      if (search) {
        // 搜索结果
        let res = this.tableData.filter(data => !search || data.detail.toLowerCase().includes(search.toLowerCase()))
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
