
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
