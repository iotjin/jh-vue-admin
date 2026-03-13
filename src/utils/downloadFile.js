import Vue from 'vue'
import request from '@/utils/request'

/**
 * download excel file by url
 * @param {Object} url
 * @param {Object} method default post
 * @param {Object} data post request params
 * @param {Object} fileName file names must have a suffix added , eg: name.xlsx
 * @returns {Object}
 */
export function downloadExcelByUrl({
  url,
  method = 'post',
  data = {},
  fileName = 'ExcelFile.xlsx'
}) {
  return downloadFileByUrl({
    url,
    method,
    data,
    fileName
  })
}

/**
 * download file by url
 * @param {Object} url
 * @param {Object} method default get
 * @param {Object} data post request params
 * @param {Object} fileName Custom file names must have a suffix added
 * @returns {Object}
 */
export function downloadFileByUrl({
  url,
  method = 'get',
  data = {},
  fileName
}) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: method,
      responseType: 'blob',
      data: data
    })
      .then((res) => {
        if (res.status === 200) {
          downloadAttachment(res.data, url, fileName)
          resolve(res)
        } else {
          reject(res)
          Vue.prototype.$message.error('Download failed !')
        }
      })
      .catch((err) => {
        reject(err)
        Vue.prototype.$message.error('Download failed ', err.message)
      })
  })
}

function downloadAttachment(blobData, url, fileName) {
  const name = fileName || getFileName(url)
  const link = document.createElement('a')
  const blob = new Blob([blobData], { type: 'application/x-download' })
  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', name)
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function getFileName(url) {
  return url.substring(url.lastIndexOf('/') + 1)
}

export function isImageFormat(fileName) {
  var tempArr = fileName.split('.')
  if (tempArr.length === 1) {
    return false
  }
  var suffix = tempArr[tempArr.length - 1]
  if (!suffix) {
    return false
  }
  suffix = suffix.toLowerCase()
  if (
    suffix.includes('jpg') ||
    suffix.includes('jpeg') ||
    suffix.includes('jpe') ||
    suffix.includes('png') ||
    suffix.includes('gif') ||
    suffix.includes('webp') ||
    suffix.includes('svg') ||
    suffix.includes('jfif')
  ) {
    return true
  }
  return false
}

export function isExcelFormat(fileName) {
  var tempArr = fileName.split('.')
  if (tempArr.length === 1) {
    return false
  }
  var suffix = tempArr[tempArr.length - 1]
  if (!suffix) {
    return false
  }
  suffix = suffix.toLowerCase()
  if (
    suffix.includes('xls') ||
    suffix.includes('xlsx') ||
    suffix.includes('xltx') ||
    suffix.includes('xltm') ||
    suffix.includes('csv')
  ) {
    return true
  }
  return false
}

export function openNewWindowTab(fileUrl) {
  if (fileUrl.includes('.')) {
    window.open(fileUrl)
  } else {
    Vue.prototype.$message.warning('The file format is not supported')
  }
}

/**
 * 打印PDF文件
 * @param {ArrayBuffer} data PDF文件的二进制数据
 * @returns {Promise} 打印完成后的Promise对象
 */
export function previewPrintPDFFile(data) {
  return new Promise((resolve, reject) => {
    try {
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)

      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.right = '0'
      iframe.style.bottom = '0'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = '0'
      iframe.src = url

      // iframe.onload = () => {
      //   try {
      //     iframe.contentWindow.focus()
      //     iframe.contentWindow.print()

      //     // 延迟清理资源（避免部分浏览器打印失败）
      //     setTimeout(() => {
      //       window.URL.revokeObjectURL(url)
      //       document.body.removeChild(iframe)
      //       resolve()
      //     }, 1000)
      //   } catch (err) {
      //     reject(err)
      //   }
      // }

      iframe.onload = () => {
        try {
          const win = iframe.contentWindow
          win.onafterprint = () => {
            window.URL.revokeObjectURL(url)
            document.body.removeChild(iframe)
            resolve()
          }

          win.focus()
          win.print()
        } catch (err) {
          reject(err)
        }
      }

      document.body.appendChild(iframe)
    } catch (error) {
      reject(error)
    }
  })
}
