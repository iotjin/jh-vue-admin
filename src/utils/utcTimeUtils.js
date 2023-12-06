import moment from 'moment'

/**
 * @description: 获取当前毫秒级时间戳（13位）
 * @return {*}  返回值：1556640000000，13位时间戳
 */
export function Jh_getTimeStamp() {
  // let timestamp2 = Date.parse(new Date())
  // const timestamp = Date.now()
  const timestamp = new Date().getTime()
  return timestamp
}

/**
 * 将某个时间转化成 指定格式时间
 * @param {date} time 时间  2020-07-19 20:33:00 | 2020/07/19 20:33:00 | 1556640000000
 * @param {string} cFormat 默认格式：'YYYY-MM-DD HH:mm:ss'
 * @return {*}  返回值：2019-05-20 00:00:00
 */
export const timeFormat = (time, cFormat = 'YYYY-MM-DD HH:mm:ss') => {
  time = time || Jh_getTimeStamp()
  const formattedTime = moment(time).format(cFormat)
  return formattedTime
}

/**
 * 将某个时间转化成 'YYYY-MM-DD HH:mm:ss'
 * @param {date} time 时间  2020-07-19 20:33:00 | 2020/07/19 20:33:00 | 1556640000000
 * @return {*}  返回值：2019-05-20 00:00:00
 */
export const timeToYMDHMS = (time) => {
  time = time || Jh_getTimeStamp()
  return timeFormat(time)
}

// --------------------------------------------------------------------------------------
// UTC 时间处理

/**
 * @description: 获取当前的UTC时间
 * @return {*}  返回值：2020-07-19T12:33:00.000Z
 */
export const getUTCTime = () => {
//   time = time || Jh_getTimeStamp()
//   return moment.utc(time).toISOString()
  return moment.utc().toISOString()
//   return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
}

/**
 * @description: 将某个时间转化成 指定格式的UTC时间
 * @param {date} time 时间  2020-07-19 20:33:00 | 2020/07/19 20:33:00 | 1556640000000
 * @param {string} cFormat 默认格式：'YYYY-MM-DD HH:mm:ss'
 * @return {*}  返回值：2019-05-20 00:00:00
 */
export const utcTimeFormat = (time, cFormat = 'YYYY-MM-DD HH:mm:ss') => {
  const formattedTime = moment.utc(time).format(cFormat)
  return formattedTime
}

/**
 * @description: 将某个UTC时间转化成 指定格式的UTC时间
 * @param {date} time 时间  2020-07-19 20:33:00 | 2020/07/19 20:33:00 | 1556640000000
 * @param {string} cFormat 默认格式：'YYYY-MM-DD HH:mm:ss'
 * @return {*}  返回值：2019-05-20 00:00:00
 */
export const utcTimeToYMDHMS = (time, cFormat = 'YYYY-MM-DD HH:mm:ss') => {
  const formattedTime = utcTimeFormat(time, cFormat)
  return formattedTime
}

/**
 * @description: 将某个UTC时间转化成 指定格式的本地时间
 * @param {date} time 时间  2020-07-19 20:33:00 | 2020/07/19 20:33:00 | 1556640000000
 * @param {string} cFormat 默认格式：'YYYY-MM-DD HH:mm:ss'
 * @return {*}  返回值：2019-05-20 00:00:00
 */
export const utcTimeToLocal = (time, cFormat = 'YYYY-MM-DD HH:mm:ss') => {
  const formattedTime = moment.utc(time).local().format(cFormat)
  return formattedTime
}

/**
 * @description: 将某个本地时间转化成 指定格式的UTC时间
 * @param {date} time 时间  2020-07-19 20:33:00 | 2020/07/19 20:33:00 | 1556640000000
 * @param {string} cFormat 默认格式：'YYYY-MM-DD HH:mm:ss'
 * @return {*}  返回值：2019-05-20 00:00:00
 */
export const localTimeToUTCTime = (time, cFormat = 'YYYY-MM-DD HH:mm:ss') => {
  const formattedTime = moment.utc(time).format(cFormat)
  return formattedTime
}

/*
  使用方法：

    import { timeFormat, timeToYMDHMS } from '@/utils/utcTimeUtils'
    import { getUTCTime, utcTimeFormat, utcTimeToYMDHMS, utcTimeToLocal, localTimeToUTCTime } from '@/utils/utcTimeUtils'

  created() {
    console.log('created')
    const currentTime = new Date().getTime()
    console.log('currentTime', JSON.stringify(currentTime))
    console.log('---------- Local ----------')
    console.log('timeFormat', timeFormat(currentTime))
    console.log('timeToYMDHMS', timeToYMDHMS(currentTime))
    console.log('---------- UTC ----------')
    const utcTime = utcTimeFormat(currentTime)
    console.log('utcTime', utcTime)
    console.log('getUTCTime', getUTCTime())
    console.log('utcTimeFormat', utcTimeFormat(currentTime, 'YYYY-MM-DDTHH:mm:ss'))
    console.log('utcTimeToYMDHMS', utcTimeToYMDHMS(utcTime))
    console.log('utcTimeToLocal', utcTimeToLocal(utcTime))
    console.log('localTimeToUTCTime', localTimeToUTCTime(currentTime))
  }

  */
