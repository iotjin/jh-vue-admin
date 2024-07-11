import Vue from 'vue'
import { setStorage, getStorage } from '@/utils/storage'
import { getCheckUpgrade } from '@/api/user'
const kCheckUpdateVersion = 'checkUpdateVersion'

export const getVersion = () => {
  return getStorage(kCheckUpdateVersion)
}

export const setVersion = (newVersion) => {
  setStorage(kCheckUpdateVersion, newVersion)
}

let activeCount = 0
const MAX_INACTIVE_COUNT = 5
const MAX_INACTIVE_COUNT_HIDDEN = 1
let pollingInterval = null
const normalInterval = 1000 * 60 * 30
const isLimitTimer = true

export function startPolling(callback, interval = normalInterval) {
  // 首次执行
  callback()

  pollingInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      if (isLimitTimer) {
        activeCount++
        if (activeCount >= MAX_INACTIVE_COUNT) {
          stopPolling()
        }
      } else {
        activeCount = 0
      }
      callback() // 执行轮询任务的回调函数
    } else {
      activeCount++
      if (activeCount >= MAX_INACTIVE_COUNT_HIDDEN) {
        stopPolling()
      }
    }
  }, interval)
}

export function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval)
    pollingInterval = null
  }
}

export function visibilityChange(callback, interval = normalInterval) {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      activeCount = 0
      stopPolling()
      // 页面可见时重新开始轮询
      startPolling(callback, interval)
    } else {
      activeCount++
      if (activeCount >= MAX_INACTIVE_COUNT_HIDDEN) {
        stopPolling()
      }
    }
  })
}

/**
 * @description: 比较版本号
 * @param {string} version1
 * @param {string} version2
 * @return {*} version1>version2 返回 1；如果小于返回 -1；如果相等 返回 0
 */
export function compareVersions(version1, version2) {
  const parts1 = version1.split('.')
  const parts2 = version2.split('.')

  const maxLength = Math.max(parts1.length, parts2.length)

  for (let i = 0; i < maxLength; i++) {
    const num1 = parseInt(parts1[i] || 0)
    const num2 = parseInt(parts2[i] || 0)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
    // 如果相等，则继续比较下一个部分
  }

  return 0 // 如果版本号完全相等
}

export function requestCheckUpgrade() {
  return new Promise((resolve, reject) => {
    getCheckUpgrade()
      .then((res) => {
        if (res.code === 20000) {
          var data = res.data
          var needUpgrade = false
          const version = getVersion()
          // console.log('version', JSON.stringify(version))
          // console.log('data.version', JSON.stringify(data.version))
          if (!version) {
            needUpgrade = true
          } else {
            console.log('needUpgrade', compareVersions(data.version, version))
            if (compareVersions(data.version, version) === 1) {
              needUpgrade = true
            }
          }

          var dict = { needUpgrade: needUpgrade, upgradeData: data }
          resolve(dict)
        } else {
          reject(res.msg)
          Vue.prototype.$message.warning(res.msg)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
