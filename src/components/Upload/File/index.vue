<template>
  <div>
    <el-upload
      v-if="showUploadBtn"
      ref="upload"
      v-bind="$attrs"
      :action="fileUploadUrl"
      :file-list="documentList"
      :limit="limit"
      :show-file-list="true"
      :multiple="multiple"
      :drag="drag"
      :list-type="listType"
      :http-request="uploadRequest"
      :on-remove="onRemove"
      :before-upload="onBeforeUpload"
      :on-exceed="onExceed"
      :on-preview="onPreview"
    >
      <template v-if="listType==='text' || listType==='picture'">
        <i v-if="drag" class="el-icon-upload" />
        <div v-if="drag" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <el-button v-else slot="trigger" size="small" type="primary">{{ uploadBtnText }}</el-button>
        <div slot="tip" class="el-upload__tip">{{ describeText }}</div>
      </template>
      <template v-else-if="listType==='picture-card'">
        <i class="el-icon-plus" />
      </template>
    </el-upload>

    <el-dialog :visible.sync="isShowDialogImg">
      <img width="100%" :src="previewImage" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { uploadFile } from '@/api/file'
import { isImageFormat, openNewWindowTab, isExcelFormat } from '@/utils/downloadFile'

export default {
  props: {
    fileList: { type: Array, default: () => [], required: true },
    actions: { type: String, default: '' },
    showUploadBtn: { type: Boolean, default: true }, // 是否显示上传按钮
    uploadBtnText: { type: String, default: 'Upload' }, // 上传按钮文本
    describeText: { type: String, default: 'No larger than 20M' }, // 上传文件描述
    limit: { type: Number, default: 9 }, // 最大允许上传个数
    multiple: { type: Boolean, default: true }, // 是否支持多选文件
    drag: { type: Boolean, default: false }, // 是否启用拖拽上传
    listType: { type: String, default: 'text' }, // 文件列表的类型,text/picture/picture-card,
    uploadType: { type: String, default: 'all' }, // 验证上传文件类型, all/image/excel/video/file
    beforeUpload: { type: Function, default: null }
  },
  data() {
    return {
      documentList: [],
      fileUploadUrl: `${process.env.VUE_APP_BASE_API}/api/v1/files`,
      isShowDialogImg: false,
      previewImage: ''
    }
  },
  watch: {
    actions: {
      handler(val) {
        this.fileUploadUrl = val
      },
      immediate: true
    },
    fileList: {
      handler(val) {
        this.documentList = val
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    onBeforeUpload(file) {
      // console.log('file', file)
      if (this.beforeUpload) {
        return this.beforeUpload(file) // 使用传入的自定义方法
      }
      return this.defaultBeforeUpload(file) // 使用默认
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
    defaultBeforeUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20
      const isEXE = file.type === 'application/x-msdownload'
      const isJS = file.type === 'text/javascript'
      if (isEXE || isJS) {
        this.$message.error('This type of file is not allowed!')
        return false
      }
      if (!isLt20M) {
        this.$message.error('File size should be less than 20MB!')
        return false
      }
      if (this.uploadType === 'image' && !isImageFormat(file.name)) {
        this.$message.error('Please upload image file!')
        return false
      }
      if (this.uploadType === 'excel' && !isExcelFormat(file.name)) {
        this.$message.error('Please upload excel file!')
        return false
      }
      return true
    },
    uploadRequest(request) {
      uploadFile(request.file)
        .then((res) => {
          if (res.code === 20000) {
            const tempDocument = {
              id: res.data.id,
              url: res.data.path,
              uid: request.file.uid,
              name: request.file.name
            }
            this.uploadSuccess(tempDocument)
          } else {
            this.$message.warning('Failed to upload file. Error details: ' + res.msg)
          }
        })
        .catch((e) => {
          this.$message.error('Failed to upload file. Error details: ', e)
        })
    },
    // 文件超出个数限制时的钩子
    onExceed(files, fileList) {
      this.$message.warning(`最多选择 ${this.limit} 个文件`)
    },
    uploadSuccess(document) {
      this.documentList.push(document)
      this.$emit('success', document)
    },
    // 文件列表移除文件. file: 当前文件 fileList: 文件列表
    onRemove(file, fileList) {
      const foundIndex = this.documentList.findIndex((item) => item.uid === file.uid || item.id === file.id)
      if (foundIndex !== -1) {
        this.documentList.splice(foundIndex, 1)
      }
      this.$emit('remove', file, fileList)
    },
    // 点击文件列表中已上传的文件
    onPreview(file) {
      if (isImageFormat(file.name)) {
        this.previewImage = file.url
        this.isShowDialogImg = true
      } else {
        openNewWindowTab(file.url)
      }
      this.$emit('preview', file)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
