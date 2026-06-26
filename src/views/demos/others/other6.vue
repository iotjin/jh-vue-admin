<template>
  <div class="app-container image-viewer-demo">
    <div class="demo-title">ImageViewer 组件</div>

    <div class="demo-section">
      <div class="demo-section__title">1) index.vue：缩略图 + 预览一体组件</div>
      <ImageViewer :images="galleryList" :thumb-width="180" :thumb-height="120" fit="cover" />
    </div>

    <div class="demo-section">
      <div class="demo-section__title">2) previewer.vue：仅预览控制器</div>
      <div class="image-list">
        <div v-for="(url, index) in previewOnlyList" :key="`preview-only-${url}`" class="image-item" @click="openPreview(index)">
          <el-image class="image-thumb" :src="url" fit="cover" />
        </div>
      </div>
      <Previewer ref="previewer" :images="previewOnlyList" />
    </div>

    <div class="demo-section">
      <div class="demo-section__title">3) custom.vue：自定义预览器</div>
      <div class="image-list">
        <div v-for="(url, index) in customList" :key="`custom-${url}`" class="image-item" @click="openCustomPreview(index)">
          <el-image class="image-thumb" :src="url" fit="cover" />
        </div>
      </div>
      <CustomImageViewer :visible.sync="customVisible" :url-list="customList" :initial-index="customIndex" />
    </div>
  </div>
</template>

<script>
import ImageViewer from '@/components/ImageViewer/index'
import Previewer from '@/components/ImageViewer/previewer'
import CustomImageViewer from '@/components/ImageViewer/custom'

export default {
  name: 'ImageViewerDemo',
  components: {
    ImageViewer,
    Previewer,
    CustomImageViewer
  },
  data() {
    return {
      galleryList: [
        'https://picsum.photos/id/1015/900/600',
        'https://picsum.photos/id/1016/900/600',
        'https://picsum.photos/id/1025/900/600',
        'https://picsum.photos/id/1035/900/600',
        'https://picsum.photos/id/1043/900/600'
      ],
      previewOnlyList: [
        'https://picsum.photos/id/1020/900/600',
        'https://picsum.photos/id/1024/900/600',
        'https://picsum.photos/id/1041/900/600',
        'https://picsum.photos/id/1067/900/600',
        'https://picsum.photos/id/1043/900/600'
      ],
      customVisible: false,
      customIndex: 0,
      customList: [
        'https://picsum.photos/id/1084/900/600',
        'https://picsum.photos/id/1074/900/600',
        'https://picsum.photos/id/1071/900/600',
        'https://picsum.photos/id/1060/900/600',
        'https://picsum.photos/id/1059/900/600'
      ]
    }
  },
  methods: {
    // 展示层点击后，调用仅预览控制器打开对应图片。
    openPreview(index) {
      this.$refs.previewer.open(index, this.previewOnlyList)
    },
    // 展示层点击后，打开 custom.vue 自定义预览器。
    openCustomPreview(index) {
      this.customIndex = index
      this.customVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.image-viewer-demo {
  min-height: calc(100vh - 84px);
  background: #fff;
}

.demo-title {
  margin-bottom: 8px;
  color: #303133;
  font-size: 20px;
  font-weight: 600;
}

.demo-section {
  margin-top: 24px;
}

.demo-section__title {
  margin-bottom: 12px;
  color: #606266;
  font-size: 16px;
  font-weight: 600;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.image-item {
  width: 180px;
  height: 120px;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  background: #f5f7fa;
}

.image-thumb {
  width: 100%;
  height: 100%;
}
</style>
