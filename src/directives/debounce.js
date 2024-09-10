/**
 * 防抖指令，用法：v-debounce
 *
 * v-debounce:500="handleInput" 防抖时间 500ms
 * v-debounce:click="handleClick" 防抖点击事件
 * v-debounce:500.click="handleClick" 防抖点击事件，防抖时间 500ms
 */
export function debounceDirective(Vue) {
  function debounce(func, wait) {
    let timeout
    return function(...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  Vue.directive('debounce', {
    bind(el, binding) {
      const debounceTime = binding.arg || 300 // 默认防抖时间 300ms
      const eventType = binding.modifiers.click ? 'click' : 'input' // 默认事件类型为 input

      const debouncedFunction = debounce(() => {
        binding.value()
      }, debounceTime)

      el.addEventListener(eventType, debouncedFunction)
      el._onEvent = debouncedFunction // 保存引用以便 unbind 时移除
      el._onEventType = eventType // 保存事件类型以便 unbind 时移除
    },
    unbind(el) {
      const eventType = el._onEventType || 'input'
      el.removeEventListener(eventType, el._onEvent)
    }
  })
}
