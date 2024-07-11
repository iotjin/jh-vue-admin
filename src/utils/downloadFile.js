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
