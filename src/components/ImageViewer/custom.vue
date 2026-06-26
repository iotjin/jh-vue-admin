<template>
  <transition name="image-viewer-fade">
    <div v-if="visible && imageList.length" ref="viewer" class="image-viewer" :style="{ zIndex }" @click.self="handleMaskClick">
      <button class="image-viewer__close" type="button" @click="closeViewer">
        <i class="el-icon-close" />
      </button>

      <button
        v-if="imageList.length > 1"
        class="image-viewer__btn image-viewer__btn--prev"
        :class="{ 'is-disabled': isFirst && !infinite }"
        type="button"
        @click.stop="prevImage"
      >
        <i class="el-icon-arrow-left" />
      </button>

      <div class="image-viewer__content" @click.stop @wheel.prevent="handleWheel">
        <transition name="image-viewer-media-fade">
          <img
            v-if="renderUrl && !isImageLoading"
            class="image-viewer__image"
            :class="{ 'is-draggable': true, 'is-dragging': isDragging, 'is-original-mode': !isContainMode }"
            :src="renderUrl"
            alt=""
            draggable="false"
            :style="imageStyle"
            @mousedown="startDrag"
            @touchstart.stop.prevent="handleTouchStart"
          >
        </transition>
        <transition name="image-viewer-mask-fade">
          <div v-if="isImageLoading" class="image-viewer__loading-mask">
            <div class="image-viewer__loading-spinner">
              <span class="image-viewer__loading-circle" />
              <!-- <span class="image-viewer__loading-text">加载中...</span> -->
            </div>
          </div>
        </transition>
        <transition name="image-viewer-mask-fade">
          <div v-if="loadError" class="image-viewer__error-mask">
            <i class="el-icon-warning-outline image-viewer__error-icon" />
            <div class="image-viewer__error-text">图片加载失败</div>
            <button class="image-viewer__error-retry" type="button" @click.stop="retryLoadCurrent">
              点击重试
            </button>
          </div>
        </transition>
      </div>

      <div class="image-viewer__bottom">
        <div v-if="showProgress" class="image-viewer__count">{{ currentIndex + 1 }} / {{ imageList.length }}</div>

        <div v-if="showToolbar" class="image-viewer__toolbar" @click.stop>
          <button class="image-viewer__tool" type="button" title="缩小" @click="zoomOut">
            <i class="el-icon-zoom-out" />
          </button>
          <button class="image-viewer__tool" type="button" title="放大" @click="zoomIn">
            <i class="el-icon-zoom-in" />
          </button>
          <button class="image-viewer__tool" type="button" title="全屏" @click="toggleFullscreen">
            <i class="el-icon-full-screen" />
          </button>
          <!-- <button class="image-viewer__tool" type="button" :title="isContainMode ? '原始尺寸' : '自适应'" @click="toggleMode">
            <i :class="isContainMode ? 'el-icon-c-scale-to-original' : 'el-icon-full-screen'" />
          </button> -->
          <button class="image-viewer__tool" type="button" title="左旋转" @click="rotateLeft">
            <i class="el-icon-refresh-left" />
          </button>
          <button class="image-viewer__tool" type="button" title="右旋转" @click="rotateRight">
            <i class="el-icon-refresh-right" />
          </button>
          <button class="image-viewer__tool" type="button" title="重置" @click="resetTransform">
            <i class="el-icon-refresh" />
          </button>
        </div>
      </div>

      <button
        v-if="imageList.length > 1"
        class="image-viewer__btn image-viewer__btn--next"
        :class="{ 'is-disabled': isLast && !infinite }"
        type="button"
        @click.stop="nextImage"
      >
        <i class="el-icon-arrow-right" />
      </button>
    </div>
  </transition>
</template>

<script>
// 图片展示预览，负责展示图片，并提供预览功能 - 自定义实现
export default {
  name: 'CustomImageViewer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    urlList: {
      type: Array,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    infinite: {
      type: Boolean,
      default: true
    },
    zoomRate: {
      type: Number,
      default: 1.2
    },
    minScale: {
      type: Number,
      default: 0.2
    },
    maxScale: {
      type: Number,
      default: 7
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      currentIndex: 0,
      renderUrl: '',
      isImageLoading: false,
      loadError: false,
      imageLoadToken: 0,
      loadingHideTimer: null,
      scale: 1,
      rotateDeg: 0,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      isTouchDragging: false,
      isFullscreen: false,
      isSwitching: false,
      switchLockTimer: null,
      dragStartX: 0,
      dragStartY: 0,
      touchStartX: 0,
      touchStartY: 0,
      touchBaseX: 0,
      touchBaseY: 0,
      mode: 'contain'
    }
  },
  computed: {
    imageList() {
      return this.urlList.filter(Boolean)
    },
    currentUrl() {
      return this.imageList[this.currentIndex] || ''
    },
    isFirst() {
      return this.currentIndex <= 0
    },
    isLast() {
      return this.currentIndex >= this.imageList.length - 1
    },
    imageStyle() {
      const style = {
        transform: `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale}) rotate(${this.rotateDeg}deg)`
      }
      if (this.mode === 'contain') {
        style.maxWidth = '100%'
        style.maxHeight = '100%'
      } else {
        style.maxWidth = 'none'
        style.maxHeight = 'none'
      }
      return style
    },
    hasActiveImage() {
      return !!this.renderUrl && !this.isImageLoading && !this.loadError
    },
    isContainMode() {
      return this.mode === 'contain'
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.setCurrentIndex(this.initialIndex)
          this.mode = 'contain'
          this.resetTransform()
          this.loadImageByIndex(this.currentIndex)
          document.addEventListener('keydown', this.handleKeydown)
          document.addEventListener('mousemove', this.handleMouseMove)
          document.addEventListener('mouseup', this.stopDrag)
          document.addEventListener('touchmove', this.handleTouchMove, { passive: false })
          document.addEventListener('touchend', this.handleTouchEnd)
          document.addEventListener('fullscreenchange', this.handleFullscreenChange)
        } else {
          document.removeEventListener('keydown', this.handleKeydown)
          document.removeEventListener('mousemove', this.handleMouseMove)
          document.removeEventListener('mouseup', this.stopDrag)
          document.removeEventListener('touchmove', this.handleTouchMove)
          document.removeEventListener('touchend', this.handleTouchEnd)
          document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
          this.stopDrag()
          if (this.isFullscreen) {
            this.exitFullscreen()
          }
          this.renderUrl = ''
          this.isImageLoading = false
          this.loadError = false
          this.imageLoadToken++
          this.clearLoadingHideTimer()
          this.clearSwitchLockTimer()
        }
      },
      immediate: true
    },
    currentIndex(val) {
      if (this.visible) {
        this.loadImageByIndex(val)
      }
    },
    initialIndex(val) {
      if (this.visible) {
        this.setCurrentIndex(val)
      }
    },
    urlList() {
      if (this.visible) {
        this.setCurrentIndex(this.currentIndex)
      }
    },
    imageList() {
      if (this.visible) {
        this.loadImageByIndex(this.currentIndex)
      } else {
        this.renderUrl = ''
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.stopDrag)
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    this.stopDrag()
    this.clearLoadingHideTimer()
    this.clearSwitchLockTimer()
  },
  methods: {
    // 清理 loading 延时器，避免旧回调写入当前状态。
    clearLoadingHideTimer() {
      if (this.loadingHideTimer) {
        clearTimeout(this.loadingHideTimer)
        this.loadingHideTimer = null
      }
    },
    // 清理切图锁定定时器，恢复切图能力。
    clearSwitchLockTimer() {
      if (this.switchLockTimer) {
        clearTimeout(this.switchLockTimer)
        this.switchLockTimer = null
      }
      this.isSwitching = false
    },
    // 切图短暂加锁，防止连续点击导致索引抖动。
    lockSwitch() {
      this.clearSwitchLockTimer()
      this.isSwitching = true
      this.switchLockTimer = setTimeout(() => {
        this.isSwitching = false
        this.switchLockTimer = null
      }, 120)
    },
    // 在 contain/original 之间切换显示模式。
    toggleMode() {
      if (!this.hasActiveImage) {
        return
      }
      this.mode = this.isContainMode ? 'original' : 'contain'
      this.resetTransform()
    },
    // 点击遮罩时按配置决定是否关闭预览。
    handleMaskClick() {
      if (!this.maskClosable) {
        return
      }
      this.closeViewer()
    },
    // 统一处理索引越界与循环/非循环逻辑。
    setCurrentIndex(index) {
      const maxIndex = this.imageList.length - 1
      if (maxIndex < 0) {
        this.currentIndex = 0
        return
      }
      if (!this.infinite) {
        if (index < 0) {
          this.currentIndex = 0
          return
        }
        if (index > maxIndex) {
          this.currentIndex = maxIndex
          return
        }
      }
      if (index < 0) {
        this.currentIndex = maxIndex
        return
      }
      if (index > maxIndex) {
        this.currentIndex = 0
        return
      }
      this.currentIndex = index
    },
    // 通知父组件关闭预览器。
    closeViewer() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    // 切换到上一张。
    prevImage() {
      if (this.isSwitching) {
        return
      }
      if (!this.infinite && this.isFirst) {
        return
      }
      this.lockSwitch()
      this.setCurrentIndex(this.currentIndex - 1)
      this.resetTransform()
      this.$emit('switch', this.currentIndex)
    },
    // 切换到下一张。
    nextImage() {
      if (this.isSwitching) {
        return
      }
      if (!this.infinite && this.isLast) {
        return
      }
      this.lockSwitch()
      this.setCurrentIndex(this.currentIndex + 1)
      this.resetTransform()
      this.$emit('switch', this.currentIndex)
    },
    // 放大图片。
    zoomIn() {
      if (!this.hasActiveImage) {
        return
      }
      this.scaleTo(this.scale * this.zoomRate)
    },
    // 缩小图片。
    zoomOut() {
      if (!this.hasActiveImage) {
        return
      }
      this.scaleTo(this.scale / this.zoomRate)
    },
    // 统一缩放入口，并限制在最小/最大缩放区间。
    scaleTo(nextScale) {
      const target = Math.min(this.maxScale, Math.max(this.minScale, nextScale))
      this.scale = Number(target.toFixed(3))
      if (this.scale <= 1) {
        this.translateX = 0
        this.translateY = 0
      }
    },
    // 左旋转 90 度。
    rotateLeft() {
      if (!this.hasActiveImage) {
        return
      }
      this.rotateDeg -= 90
    },
    // 右旋转 90 度。
    rotateRight() {
      if (!this.hasActiveImage) {
        return
      }
      this.rotateDeg += 90
    },
    // 重置位移、旋转、缩放到初始状态。
    resetTransform() {
      this.scale = 1
      this.rotateDeg = 0
      this.translateX = 0
      this.translateY = 0
    },
    // 对当前图片执行重试加载。
    retryLoadCurrent() {
      this.loadImageByIndex(this.currentIndex)
    },
    // 预加载指定索引图片，并维护 loading/error 两种状态。
    loadImageByIndex(index) {
      const targetUrl = this.imageList[index] || ''
      // 切图开始即隐藏旧图，只展示占位与 loading。
      this.renderUrl = ''
      this.isImageLoading = true
      this.loadError = false
      this.clearLoadingHideTimer()
      const currentToken = ++this.imageLoadToken
      if (!targetUrl) {
        this.isImageLoading = false
        this.loadError = true
        return
      }
      const preloader = new Image()
      preloader.onload = () => {
        if (currentToken !== this.imageLoadToken) {
          return
        }
        this.renderUrl = targetUrl
        this.loadingHideTimer = setTimeout(() => {
          if (currentToken !== this.imageLoadToken) {
            return
          }
          this.isImageLoading = false
          this.loadError = false
          this.loadingHideTimer = null
        }, 80)
      }
      preloader.onerror = () => {
        if (currentToken !== this.imageLoadToken) {
          return
        }
        // 加载失败时兜底显示目标地址，避免预览层空白
        this.renderUrl = ''
        this.loadError = true
        this.loadingHideTimer = setTimeout(() => {
          if (currentToken !== this.imageLoadToken) {
            return
          }
          this.isImageLoading = false
          this.loadingHideTimer = null
        }, 80)
      }
      preloader.src = targetUrl
    },
    // 处理滚轮缩放方向。
    handleWheel(event) {
      if (event.deltaY < 0) {
        this.zoomIn()
      } else {
        this.zoomOut()
      }
    },
    // 鼠标按下开始拖拽，记录拖拽基线。
    startDrag(event) {
      if (event.button !== 0) {
        return
      }
      if (this.isImageLoading) {
        return
      }
      event.preventDefault()
      this.isDragging = true
      this.dragStartX = event.clientX - this.translateX
      this.dragStartY = event.clientY - this.translateY
    },
    // 触摸开始，单指拖拽生效。
    handleTouchStart(event) {
      if (this.isImageLoading || this.loadError) {
        return
      }
      if (!event.touches || event.touches.length !== 1) {
        return
      }
      const touch = event.touches[0]
      this.isTouchDragging = true
      this.touchStartX = touch.clientX
      this.touchStartY = touch.clientY
      this.touchBaseX = this.translateX
      this.touchBaseY = this.translateY
    },
    // 触摸移动时更新图片位移。
    handleTouchMove(event) {
      if (!this.isTouchDragging || !event.touches || event.touches.length !== 1) {
        return
      }
      const touch = event.touches[0]
      this.translateX = this.touchBaseX + touch.clientX - this.touchStartX
      this.translateY = this.touchBaseY + touch.clientY - this.touchStartY
      event.preventDefault()
    },
    // 触摸结束，清理拖拽状态。
    handleTouchEnd() {
      this.isTouchDragging = false
    },
    // 鼠标移动拖拽更新位移。
    handleMouseMove(event) {
      if (!this.isDragging) {
        return
      }
      this.translateX = event.clientX - this.dragStartX
      this.translateY = event.clientY - this.dragStartY
    },
    // 统一停止鼠标与触摸拖拽状态。
    stopDrag() {
      this.isDragging = false
      this.isTouchDragging = false
    },
    // 全屏切换入口。
    async toggleFullscreen() {
      if (this.isFullscreen) {
        await this.exitFullscreen()
        return
      }
      try {
        const target = this.$refs.viewer
        if (target && target.requestFullscreen) {
          await target.requestFullscreen()
          this.isFullscreen = true
        }
      } catch (e) {
        this.isFullscreen = false
      }
    },
    // 退出全屏并同步状态。
    async exitFullscreen() {
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen()
        }
      } catch (e) {
        // ignore
      } finally {
        this.isFullscreen = false
      }
    },
    // 浏览器全屏状态变更同步。
    handleFullscreenChange() {
      this.isFullscreen = !!document.fullscreenElement
    },
    // 键盘快捷键总入口。
    handleKeydown(event) {
      if (!this.visible) {
        return
      }
      if (event.key === 'Escape') {
        this.closeViewer()
      }
      if (event.key === 'ArrowLeft') {
        this.prevImage()
      }
      if (event.key === 'ArrowRight') {
        this.nextImage()
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        this.zoomIn()
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        this.zoomOut()
      }
      if (event.key === ' ') {
        event.preventDefault()
        this.toggleMode()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-viewer {
  --viewer-fade-duration: 0.22s;
  --viewer-interaction-duration: 0.2s;
  --viewer-content-shift-y: 60px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(98, 100, 107, 0.92);
}

.image-viewer__content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: calc(90vh - 140px);
  min-height: 260px;
  max-width: 1200px;
  margin-bottom: calc(var(--viewer-content-shift-y) * 2);
}

.image-viewer__image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: opacity var(--viewer-fade-duration) ease;
}

.image-viewer__image.is-draggable {
  cursor: grab;
}

.image-viewer__image.is-dragging {
  cursor: grabbing;
}

.image-viewer__bottom {
  position: absolute;
  right: 0;
  bottom: 26px;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  gap: 12px;
}

.image-viewer__count {
  position: static;
  min-width: 72px;
  padding: 2px 10px;
  border-radius: 0;
  background: transparent;
  color: #f2f4f8;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.image-viewer__close,
.image-viewer__btn {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  color: #fff;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.35);
}

.image-viewer__close {
  top: 30px;
  right: 30px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 22px;
}

.image-viewer__btn {
  top: calc(50% - var(--viewer-content-shift-y));
  width: 52px;
  height: 52px;
  margin-top: 0;
  border-radius: 50%;
  font-size: 24px;
  transform: translateY(-50%);
}

.image-viewer__btn.is-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.image-viewer__btn--prev {
  left: 26px;
}

.image-viewer__btn--next {
  right: 26px;
}

@media (max-width: 768px) {
  .image-viewer {
    --viewer-content-shift-y: 44px;
  }

  .image-viewer__content {
    width: 94vw;
    height: calc(100vh - 132px);
    min-height: 180px;
    max-width: none;
  }

  .image-viewer__btn {
    width: 42px;
    height: 42px;
    font-size: 20px;
  }

  .image-viewer__btn--prev {
    left: 12px;
  }

  .image-viewer__btn--next {
    right: 12px;
  }

  .image-viewer__close {
    top: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  .image-viewer__bottom {
    bottom: 14px;
    gap: 8px;
  }

  .image-viewer__toolbar {
    padding: 8px 10px;
    border-radius: 18px;
    gap: 6px;
  }

  .image-viewer__tool {
    width: 30px;
    height: 30px;
    font-size: 20px;
  }
}

.image-viewer__close:hover,
.image-viewer__btn:hover {
  background: rgba(0, 0, 0, 0.55);
}

.image-viewer__btn.is-disabled:hover {
  background: rgba(0, 0, 0, 0.35);
}

.image-viewer__toolbar {
  position: static;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  gap: 10px;
  pointer-events: auto;
}

.image-viewer__tool {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 0;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  background: transparent;
  transition: color var(--viewer-interaction-duration), transform var(--viewer-interaction-duration), opacity var(--viewer-interaction-duration);
}

.image-viewer__tool:hover {
  opacity: 0.9;
}

.image-viewer__tool:active {
  transform: scale(0.95);
}

.image-viewer__tool i {
  pointer-events: none;
}

.image-viewer__loading-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border-radius: 8px;
  // background: rgba(98, 100, 107, 0.92);
  background: transparent;
  transition: opacity var(--viewer-fade-duration) ease;
}

.image-viewer__loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.image-viewer__loading-circle {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.14);
  border-top-color: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  animation: image-viewer-loading-spin 1.2s linear infinite;
}

.image-viewer__loading-text {
  color: rgba(238, 242, 255, 0.72);
  font-size: 12px;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.image-viewer__error-mask {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  background: rgba(58, 62, 70, 0.3);
}

.image-viewer__error-icon {
  color: rgba(255, 196, 77, 0.95);
  font-size: 38px;
}

.image-viewer__error-text {
  color: #f2f4f8;
  font-size: 14px;
}

.image-viewer__error-retry {
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 14px;
  color: #f2f4f8;
  font-size: 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.08);
  transition: background-color var(--viewer-interaction-duration);
}

.image-viewer__error-retry:hover {
  background: rgba(255, 255, 255, 0.18);
}

@keyframes image-viewer-loading-spin {
  to {
    transform: rotate(360deg);
  }
}

.image-viewer-fade-enter-active,
.image-viewer-fade-leave-active {
  transition: opacity var(--viewer-fade-duration);
}

.image-viewer-fade-enter,
.image-viewer-fade-leave-to {
  opacity: 0;
}

.image-viewer-media-fade-enter-active,
.image-viewer-media-fade-leave-active,
.image-viewer-mask-fade-enter-active,
.image-viewer-mask-fade-leave-active {
  transition: opacity var(--viewer-fade-duration) ease;
}

.image-viewer-media-fade-enter,
.image-viewer-media-fade-leave-to,
.image-viewer-mask-fade-enter,
.image-viewer-mask-fade-leave-to {
  opacity: 0;
}
</style>
