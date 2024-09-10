import { throttle } from '@/utils/index'

/**
 * 节流指令，用法：v-throttle
 *
 * v-throttle:500="handleInput" 节流时间 500ms
 * v-throttle:click="handleClick" 节流点击事件
 * v-throttle:500.click="handleClick" 节流点击事件，节流时间 500ms
 */
export function throttleDirective(Vue) {
  Vue.directive('throttle', {
    bind(el, binding) {
      const throttleTime = binding.arg || 500 // 默认节流时间 500ms
      const eventType = binding.modifiers.input ? 'input' : 'click' // 默认事件类型为 click

      const throttledFunction = throttle(() => {
        binding.value()
      }, throttleTime)

      el.addEventListener(eventType, throttledFunction)
      el._onEvent = throttledFunction // 保存引用以便 unbind 时移除
      el._onEventType = eventType // 保存事件类型以便 unbind 时移除
    },
    unbind(el) {
      const eventType = el._onEventType || 'click'
      el.removeEventListener(eventType, el._onEvent)
    }
  })
}
