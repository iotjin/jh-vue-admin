/**
 * @description: filter el-cascader case insensitive , use: supplier
 * @return {*}
 */
export const filterCaseInsensitive = (node, keyword) => {
  const allLabelText = node.text.toLowerCase()
  if (allLabelText.indexOf(keyword.toLowerCase()) !== -1) {
    return true
  }
}

/**
 * @description: check is mobile
 * @return {*}
 */
export const isMobile = () => {
  const isMobile = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return isMobile
}

/**
 * @description: create random color
 * @param {*} alpha
 * @return {*}
 */
export const getRandomColor = (alpha = 1) => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * @description: create random color
 * @return {*}
 */
export const getRandomColor2 = () => {
  return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
}
