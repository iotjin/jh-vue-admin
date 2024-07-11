
<template>
  <div>
    <div style="padding: 20px;">
      <el-button type="primary" @click="test(word)">测试word</el-button>
      <el-button type="primary" @click="test(excel)">测试excel</el-button>
      <el-button type="primary" @click="test(ppt)">测试ppt</el-button>
      <el-button type="primary" @click="test(mp4)">测试视频</el-button>
      <el-button type="primary" @click="test(txt)">测试txt</el-button>
      <el-button type="primary" @click="test(pdf)">测试pdf</el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const type1 = 'https://view.officeapps.live.com/op/view.aspx?src='
const type2 = 'http://vw.usdoc.cn/?src=' // https://usdoc.cn/index.html
const type3 = 'http://www.pfile.com.cn/api/profile/onlinePreview?url=' // https://www.pfile.com.cn/
const type4 = 'https://view.xdocin.com/view?src=' // https://view.xdocin.com/
export default {
  data() {
    return {
      word: 'http://usdoc.cn/vw/文件模板.docx',
      excel: 'http://usdoc.cn/vw/文件预览服务.xlsx',
      ppt: 'http://usdoc.cn/vw/PPT文件预览.pptx',
      wps: 'http://usdoc.cn/vw/三好学生申请书.wps',
      pdf: 'http://usdoc.cn/vw/PDF在线预览.pdf',
      mp4: 'http://usdoc.cn/vw/视频文件.mp4',
      txt: 'http://usdoc.cn/vw/新建文本文档v1.txt'
    }
  },
  methods: {
    test(urlAndfileName) {
      const type = type2
      var suffix = urlAndfileName.split('.')[urlAndfileName.split('.').length - 1]
      if (!suffix) {
        this.$message.warning('无法预览')
        return
      }
      suffix = suffix.toLowerCase()
      // word / excel / ppt
      if (suffix.indexOf('doc') !== -1 || suffix.indexOf('xls') !== -1 || suffix.indexOf('ppt') !== -1 || suffix.indexOf('wps') !== -1) {
        window.open(type + encodeURIComponent(urlAndfileName))
      } else {
        // txt, mp4, pdf
        window.open(urlAndfileName)
      }
    }
  }
}
</script>

<style>
</style>
