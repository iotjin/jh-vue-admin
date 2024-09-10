import { Message } from 'element-ui'

/**
 * 复制指令，用法：v-copy
 */
export const copyDirective = (Vue) => {
  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (err) {
      console.error('Unable to copy to clipboard', err)
    }
    document.body.removeChild(textArea)
  }
  async function copyToClipboard(text) {
    try {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(text)
      } else {
        unsecuredCopyToClipboard(text)
      }
      Message({ message: '复制成功', type: 'success' })
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  Vue.directive('copy', {
    bind(el, { value }) {
      el.$value = value
      el.handler = () => {
        if (!el.$value) {
          // console.log('无复制内容')
          return
        }
        copyToClipboard(el.$value)
      }
      // 绑定点击事件
      el.addEventListener('click', el.handler)
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
      el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
      el.removeEventListener('click', el.handler)
    }
  })
}
