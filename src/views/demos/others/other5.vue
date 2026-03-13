
<template>
  <div v-loading="loading">
    <div style="padding: 20px;">
      <el-button type="primary" @click="downFile(0)">浏览器新开页面</el-button>
      <el-button type="primary" @click="downFile(1)">浏览器预览打印</el-button>
      <el-button type="primary" @click="downFile(2)">下载并打印PDF(Lodop)</el-button>
      <el-button type="primary" @click="downFile(3)">静默打印PDF(electron-hiprint)</el-button>
    </div>
  </div>
</template>

<script>
import { previewPrintPDFFile } from '@/utils/downloadFile'
import { getLodop } from '@/common/LodopFuncs.js'
import { io } from 'socket.io-client'
import axios from 'axios'

export default {
  data() {
    return {
      url: 'https://raw.githubusercontent.com/iotjin/jh-vue-admin/main/src/assets/document/Test%20PDF.pdf',
      url2: '/document/TestPDF.pdf',
      loading: false,
      socket: null,
      clientInfo: null,
      printerList: [],
      defaultPrinter: null
    }
  },
  created() {
    this.initSocket()
  },
  beforeDestroy() {
    console.log('页面销毁，断开 socket')
    this.closeSocket()
  },
  methods: {
    downFile(type) {
      axios
        .get(this.url, {
          responseType: 'blob'
        })
        .then((res) => {
          const blob = res.data
          console.log('blob:', blob)

          if (type === 0) {
            this.openNewTab(blob)
          }
          if (type === 1) {
            this.toPreviewPrintPDF(blob)
          }
          if (type === 2) {
            this.printFileByLodop(blob)
          }
          if (type === 3) {
            this.silentPrintFileBySocket(blob)
          }
        })
        .catch((e) => {
          console.log('e', JSON.stringify(e))
          this.loading = false
          this.$message.error('Failed to print file. Error details: ' + e)
        })
    },
    openNewTab(blob) {
      // 确保blob是PDF类型
      // const pdfBlob = blob.type === '' || blob.type === 'application/octet-stream' ? new Blob([blob], { type: 'application/pdf' }) : blob
      const pdfBlob = new Blob([blob], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(pdfBlob)
      // 使用新窗口打开
      const newWindow = window.open(url, '_blank')
      // 监听窗口关闭事件，释放URL
      if (newWindow) {
        newWindow.onload = () => {
          setTimeout(() => {
            window.URL.revokeObjectURL(url)
          }, 1000)
        }
      } else {
        // 如果弹窗被阻止，给出提示
        alert('请允许弹出窗口')
      }
    },
    toPreviewPrintPDF(blobData) {
      previewPrintPDFFile(blobData)
        .then(() => {
          console.log('浏览器预览')
          this.loading = false
          console.log('File is sent to print!')
        })
        .catch((err) => {
          this.loading = false
          console.error('Print error:', err)
          this.$message.error('Failed to preview print file. Error details: ' + err)
        })
    },
    silentPrintFileBySocket(blobData) {
      if (this.socket.connected) {
        const client = this.clientInfo ? this.clientInfo.hostname : ''
        // const client = '';
        // const printer = this.printerList.length > 0 ? this.printerList[0].name : '';
        const printer = ''
        this.socket.emit('news', {
          client,
          printer,
          type: 'blob_pdf',
          // side: 'duplex', // duplex, duplexshort, duplexlong, and simplex
          // templateId: '自定义Id，用于判断任务是否成功',
          // 设成时间戳
          templateId: new Date().getTime(),
          pdf_blob: blobData
        })
      } else {
        this.$message.error(`Socket is not connected. Please confirm that the PC printing client 'Hiprint' is running and refresh the current page.`)
      }
    },
    initSocket() {
      const socket = io('http://localhost:17521', {
        transports: ['websocket'],
        auth: {
          token: 'vue-plugin-hiprint'
        }
      })
      socket.on('connect', () => {
        console.log('Socket 连接成功')
        console.log('socket.connected', JSON.stringify(this.socket.connected))
        // TODO: Do something for your project
      })
      socket.on('disconnect', () => {
        console.log('Socket disconnected')
        // TODO: Do something for your project
      })
      // socket.on('connect_error', () => {
      //   console.log('Socket 错误关闭连接')
      // })
      socket.on('clientInfo', (clientInfo) => {
        console.log('clientInfo', JSON.stringify(clientInfo))
        this.clientInfo = clientInfo
      })
      socket.on('printerList', (printerList) => {
        console.log('打印机列表 printerList', JSON.stringify(printerList))
        this.printerList = printerList
        // 找出printerList 中默认的打印机（isDefault=true），如果没有找到，则取列表中的第一个
        this.defaultPrinter = printerList.find((printer) => printer.isDefault) || printerList[0] || null
        console.log('this.defaultPrinter', JSON.stringify(this.defaultPrinter))
      })
      socket.on('success', (res) => {
        console.log('suc', JSON.stringify(res)) // suc {"msg":"打印成功","templateId":1772522175150}
        this.$message.success('It has been sent to the printer for printing. Please check.')
      })
      socket.on('error', (err) => {
        console.log('err', JSON.stringify(err)) // {"msg":"blob_pdf类型打印缺少pdf_blob参数","templateId":1772522277619}
        // 这里有问题需要自己在源码中进行修改抛出的err.msg
        if (err && err.msg) {
          this.$message.error('Failed to print file. Error details: ' + err.msg)
        } else {
          this.$message.error('Failed to print file. Error details: ' + JSON.stringify(err))
        }
      })
      this.socket = socket
    },
    closeSocket() {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
      }
    },
    printFileByLodop(blobData) {
      try {
        this.loading = false
        const lodop = getLodop() // 获取 Lodop 对象

        if (!lodop) {
          alert('Lodop 打印插件未安装或加载失败')
          return
        }

        // // 打印二维码和文字
        // lodop.PRINT_INIT('打印控件功能演示_Lodop功能_整页缩放打印输出');
        // lodop.ADD_PRINT_TEXT(50, 231, 260, 39, '打印内容');
        // lodop.ADD_PRINT_BARCODE(115, 15, 100, 100, 'QRCode', 'xxxxxxxxxxxxx');
        // lodop.SET_PRINT_STYLEA(0, 'Stretch', 1); // (可变形)扩展缩放模式

        // // 打印PDF 方法1：直接使用URL（需要PDF文件可通过URL访问）
        // // const pdfUrl = 'http://usdoc.cn/vw/PDF在线预览.pdf';
        // lodop.ADD_PRINT_PDF(0, 0, '100%', '100%', 'http://localhost:8000/CLodopDemos/PDFDemo.pdf');
        // lodop.SET_PRINT_PAGESIZE(3, 0, 0, '');// 纸张设置为自定义模式
        // lodop.SET_PRINT_STYLEA(0, 'PDFScalMode', 1);// 参数值含义：0-缩小大页面 、1-实际大小（选它）、2-适合纸张

        // // 开始打印
        // lodop.PREVIEW(); // 打印预览
        // // lodop.PRINT(); // 或者使用来直接打印
        // //

        // 打印PDF 方法2：将PDF文件转换为Base64字符串
        this.convertBlobToBase64(blobData)
          .then((base64Data) => {
            console.log('b', JSON.stringify(base64Data))
            // 不要整个base64字符串，而是要去掉前缀部分（data:application/pdf;base64,）
            const pureBase64 = base64Data.split(',')[1]

            // 打印PDF = 2 - base64
            lodop.ADD_PRINT_PDF(0, 0, '100%', '100%', pureBase64)
            lodop.SET_PRINT_PAGESIZE(3, 0, 0, '') // 纸张设置为自定义模式
            lodop.SET_PRINT_STYLEA(0, 'PDFScalMode', 1) // 参数值含义：0-缩小大页面 、1-实际大小（选它）、2-适合纸张
            lodop.PREVIEW() // 打印预览
            // lodop.PRINT();
          })
          .catch((err) => {
            console.error('Failed to convert blob to base64. Error details: ', err)
            this.$message.error('Failed to print order invoice. Error details: ' + err)
          })
      } catch (error) {
        this.loading = false
        console.error('打印出错：', error)
      }
    },
    convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          // reader.result 的格式类似: "data:image/png;base64,iVBORw0KGgoAAA..."
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsDataURL(blob) // 关键方法：读取为Data URL（内含Base64）
      })
    }
  }
}
</script>

<style>
</style>
