<template>
  <div class="image-viewer">
    <div v-if="previewList.length" class="image-viewer__grid">
      <el-image
        v-for="(url, index) in previewList"
        :key="`${url}-${index}`"
        class="image-viewer__item"
        :style="thumbStyle"
        :src="url"
        :fit="fit"
        :preview-src-list="previewList"
        :initial-index="index"
        :z-index="zIndex"
        :hide-on-click-modal="hideOnClickModal"
      />
    </div>
    <el-empty v-else :image-size="80" description="暂无图片" />
  </div>
</template>

<script>
// 图片展示预览，负责展示图片，并提供预览功能 - 基于 Element UI 的 el-image 组件实现
export default {
  name: 'ImageViewer',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    urlKey: {
      type: String,
      default: 'url'
    },
    thumbWidth: {
      type: [Number, String],
      default: 180
    },
    thumbHeight: {
      type: [Number, String],
      default: 120
    },
    fit: {
      type: String,
      default: 'cover'
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    hideOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    previewList() {
      return this.images
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
    thumbStyle() {
      return {
        width: this.formatSize(this.thumbWidth),
        height: this.formatSize(this.thumbHeight)
      }
    }
  },
  methods: {
    formatSize(value) {
      return typeof value === 'number' ? `${value}px` : value
    }
  }
}
</script>

<style lang="scss" scoped>
.image-viewer__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.image-viewer__item {
  overflow: hidden;
  border-radius: 6px;
  background: #f5f7fa;
}
</style>
