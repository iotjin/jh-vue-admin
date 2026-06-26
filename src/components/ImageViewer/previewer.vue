<template>
  <div class="image-viewer-controller">
    <div class="image-viewer-controller__triggers">
      <el-image
        v-for="(url, index) in innerList"
        :key="`${url}-${index}`"
        ref="previewTrigger"
        class="image-viewer-controller__trigger"
        :src="url"
        fit="cover"
        :preview-src-list="innerList"
        :initial-index="index"
        :z-index="zIndex"
      />
    </div>
  </div>
</template>

<script>
// 图片预览器，仅预览功能，不负责展示 - 基于 Element UI 的 el-image 组件实现
export default {
  name: 'Previewer',
  props: {
    // 支持的数据类型示例：
    // 1) 字符串数组：['https://a.com/1.png', 'https://a.com/2.png']
    // 2) 对象数组（配合 urlKey 取值）：[{ url: 'https://a.com/1.png' }, { url: 'https://a.com/2.png' }]
    images: {
      type: Array,
      default: () => []
    },
    urlKey: {
      type: String,
      default: 'url'
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      innerList: []
    }
  },
  watch: {
    images: {
      handler(list) {
        // 统一图片数据源，确保外部更新后预览列表同步。
        this.innerList = this.normalizeImages(list)
      },
      immediate: true
    }
  },
  methods: {
    // 支持字符串数组或对象数组，最终转换为纯 URL 列表。
    normalizeImages(list) {
      if (!Array.isArray(list)) {
        return []
      }
      return list
        .map((item) => {
          if (typeof item === 'string') {
            return item
          }
          if (item && typeof item === 'object') {
            return item[this.urlKey]
          }
          return ''
        })
        .filter(Boolean)
    },
    // 外部通过 ref 调用，按指定下标打开 Element UI 原生预览器。
    open(index = 0, list) {
      if (Array.isArray(list)) {
        this.innerList = this.normalizeImages(list)
      }
      const maxIndex = this.innerList.length - 1
      if (maxIndex < 0) {
        return
      }
      const targetIndex = Math.min(maxIndex, Math.max(0, Number(index) || 0))
      this.$nextTick(() => {
        // 通过隐藏 el-image 实例触发 click，复用内置预览能力。
        const refs = this.$refs.previewTrigger || []
        const target = refs[targetIndex]
        if (!target) {
          return
        }
        if (typeof target.clickHandler === 'function') {
          target.clickHandler()
          return
        }
        if (target.$el) {
          target.$el.click()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-viewer-controller {
  width: 0;
  height: 0;
  overflow: hidden;
}

.image-viewer-controller__triggers {
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
