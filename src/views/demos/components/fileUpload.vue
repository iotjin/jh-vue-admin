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
      fileList5: []
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
