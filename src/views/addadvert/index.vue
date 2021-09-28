<template>
<div class="app-container">
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
        action="/backstage/advert/upload.do"
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
const api_name = 'advert'
export default {
  inject: ['reload'],
  data() {
    return {
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
      fileList: []
    };
  },
  created() {
    this.form ={}
  },
  methods: {
    onSubmit() {
      this.form.create_time = getTime()
      this.form.update_time = getTime()
      this.form.begin_time = getTime()
      this.form.end_time = getTime()
      this.add(this.form)
      console.log('submit!');
    },
    add(data) {
      this.$refs.upload.submit();
      console.log(this.form.image)
      addData(data,api_name).then(response => {
          this.status = response.status
          if (this.status === 20000) {
            this.$message({message: '添加成功', type: 'success'})
            this.$refs.upload.clearFiles()
          } else {
            this.$message.error('添加失败')
          }
        }
      )
      this.reload()
      this.form = {}
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '警告！只能选择一个文件',
        type: 'warning'
      });
    },
    beforeUpload(file){
      this.form.image = file.name
    },
  }
}
</script>

<style scoped>

</style>
