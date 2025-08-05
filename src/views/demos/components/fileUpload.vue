<template>
  <div>
    <H2>上传文件</H2>
    <div class="bg">
      <UploadFile ref="uploadRef1" :file-list="fileList1" />
    </div>
    <H2>上传图片</H2>
    <div class="bg">
      <UploadFile ref="uploadRef2" :file-list="fileList2" upload-type="image" describe-text="只能上传图片，且不超过20M" />
    </div>
    <H2>上传图片，图片展示</H2>
    <div class="bg">
      <UploadFile ref="uploadRef3" :file-list="fileList3" :before-upload="onBeforeUpload" upload-type="image" list-type="picture-card" />
    </div>
    <H2>上传图片，图片展示</H2>
    <div class="bg">
      <UploadFile ref="uploadRef4" :file-list="fileList4" upload-type="image" list-type="picture" />
    </div>
    <H2>拖拽上传文件</H2>
    <div class="bg">
      <UploadFile ref="uploadRef5" :file-list="fileList5" drag />
    </div>
    <div style="margin-bottom: 30px;">
      <el-button @click="onSubmit">提交</el-button>
    </div>

    <div style="margin-bottom: 30px;">
      <el-button @click="onClickShowDialog">弹框上传文件</el-button>
    </div>

    <BaseDialog ref="dialogRef" title="通过Excel批量上传数据" :is-show.sync="isShowDialog" width="35%" append-to-body @opened="onOpenedDialog" @closed="onClosedDialog" @submit="onDialogSubmit">
      <el-form label-width="120px" size="small">
        <el-form-item label="模版下载:">
          <el-button type="primary" icon="el-icon-download" @click="onClickDownTemplate()">下载模板</el-button>
        </el-form-item>
        <el-form-item label="文件上传:">
          <UploadFile ref="uploadRef6" :file-list="fileList6" upload-type="excel" describe-text="请上传.xls，.xlsx格式Excel文件，文件不超过20M" drag />
        </el-form-item>
      </el-form>
    </BaseDialog>

  </div>
</template>

<script>
import UploadFile from '@/components/Upload/File/index.vue'
export default {
  components: {
    UploadFile
  },
  data() {
    return {
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      isShowDialog: false,
      fileList6: []
    }
  },
  mounted() {},
  methods: {
    //  ---- file ----
    onBeforeUpload(file) {
      console.log('file', file)
      return true
    },
    onSubmit() {
      console.log('fileList1', JSON.stringify(this.fileList1))
      console.log('fileList2', JSON.stringify(this.fileList2))
      console.log('fileList3', JSON.stringify(this.fileList3))
      console.log('fileList4', JSON.stringify(this.fileList4))
      console.log('fileList5', JSON.stringify(this.fileList5))
    },
    onClickShowDialog() {
      this.isShowDialog = true
    },
    // 弹框相关
    onOpenedDialog() {
      console.log('onOpenedDialog')
    },
    onClosedDialog() {
      console.log('onClosedDialog')
    },
    onDialogSubmit() {
      console.log('onDialogSubmit')
      this.isShowDialog = false
      console.log('fileList6', JSON.stringify(this.fileList6))
    },
    onClickDownTemplate() {
      // 模版下载
      console.log('点击下载模版')
      // 这里可以调用接口下载模版文件
      // 比如使用 window.open('/api/download/template') 或者其他方式
      this.$message.success('模版下载功能待实现')
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  margin: 30px;
  width: 60%;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
