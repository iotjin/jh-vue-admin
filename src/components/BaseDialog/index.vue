<template>
  <!-- Dialog -->
  <el-dialog
    ref="dialogRef"
    v-drag-dialog
    :style="dialogStyle"
    v-bind="$attrs"
    :visible.sync="isShowDialog"
    :width="width"
    :top="top"
    :fullscreen="isFullscreen"
    :append-to-body="appendToBody"
    :destroy-on-close="destroyOnClose"
    :close-on-click-modal="closeOnClickModal"
    :custom-class="dialogCustomClass"
    @open="onOpenDialog"
    @opened="onOpenedDialog"
    @close="onCloseDialog"
    @closed="onClosedDialog"
  >
    <template slot="title">
      <!-- Custom Header -->
      <slot v-if="$slots.header" name="header" />
      <template v-else>
        <span class="el-dialog__title">
          <!-- Custom Title -->
          <slot name="title">{{ dialogTitle }}</slot>
        </span>
        <div class="bs-dialog-header-actions">
          <!-- Custom Header Actions -->
          <slot name="headerActions">
            <button v-if="showFullscreen" :aria-label="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'" type="button" class="el-dialog__headerbtn bs-full-btn" @click="onClickToggleFull">
              <img :src="isFullscreen ? exitFullscreenIcon : fullscreenIcon" class="bs-full-icon">
            </button>
          </slot>
        </div>
      </template>
    </template>
    <!-- Body -->
    <div v-loading="isBodyLoading" class="bs-dialog-body">
      <slot />
    </div>
    <!-- Custom Footer -->
    <template v-if="showFooter" slot="footer">
      <slot name="footer">
        <div class="bs-dialog-footer">
          <el-button v-if="showCancel" size="small" @click="onDialogCancel">
            {{ cancelText }}
          </el-button>
          <el-button v-if="showConfirm" :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import fullscreenIcon from './fullscreen.svg'
import exitFullscreenIcon from './exit-fullscreen.svg'

const DIALOG_TOP_PC = '10vh' // 默认顶距；dialogStyle 注入 --bs-dialog-top（Vue ≥ 2.6）
const DIALOG_WIDTH_PC = '60%'
// 弹框面板宽度小于本值时启用 bs-form-compact（按面板宽，不按视口）
const FORM_COMPACT_WIDTH = 960
// 退出 compact 的滞回阈值，避免滚动条出现/消失在临界附近来回切换
const FORM_COMPACT_EXIT = FORM_COMPACT_WIDTH + 24

/**
 * BaseDialog（el-dialog 封装）
 *
 * - 显隐：:visible.sync
 * - 宽/顶：>1024 用 prop；≤1024 CSS 强制 92% / 5vh，限高 90vh
 * - 限高：--bs-dialog-top 经 :style 注入（需 Vue ≥ 2.6），否则 calc 兜底 10vh
 * - 内置 Cancel：无 @cancel 时自动关；有 @cancel 须自行设 visible=false
 * - 内容区 loading：父组件 :body-loading（append-to-body 时外层 v-loading 盖不住）
 * - compact：按面板宽（FORM_COMPACT_WIDTH）；el-row 默认通栏，保留多列加 bs-form-multi-col
 * - 表内嵌 el-form-item：bs-form-table-item（通常在 el-form 内的可编辑表；宽/窄均生效）
 */
export default {
  name: 'BaseDialog',
  // 已声明 prop 不进 $attrs，其余属性透传给 el-dialog
  inheritAttrs: false,
  props: {
    // 是否显示（:visible.sync）
    visible: { type: Boolean, default: false },
    // 标题（同步内部 dialogTitle）
    title: { type: String, default: '' },
    // 是否显示 footer；false 隐藏；true 且无 #footer 用内置，有 #footer 用插槽
    showFooter: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    showConfirm: { type: Boolean, default: true },
    cancelText: { type: String, default: 'Cancel' },
    confirmText: { type: String, default: 'Confirm' },
    // >1024 用 prop；≤1024 CSS 强制 5vh
    top: { type: String, default: DIALOG_TOP_PC },
    // >1024 用 prop；≤1024 CSS 强制 92%
    width: { type: String, default: DIALOG_WIDTH_PC },
    // Dialog 是否可以通过点击 modal 关闭
    closeOnClickModal: { type: Boolean, default: false },
    appendToBody: { type: Boolean, default: true }, // 嵌套 Dialog 须为 true
    destroyOnClose: { type: Boolean, default: false },
    // 父组件 :body-loading；需要回写时再加 .sync
    bodyLoading: { type: Boolean, default: false },
    // 确定按钮 loading：:submit-loading.sync；或 ref.setSubmitBtnLoading（建议配合 .sync）
    submitLoading: { type: Boolean, default: false },
    // 标题栏是否显示全屏切换按钮
    showFullscreen: { type: Boolean, default: true },
    // 是否限制弹窗总高（true：超出时 body 滚动；false：高度随内容增高）
    limitBodyHeight: { type: Boolean, default: true },
    // 追加到 bs-dialog-class 的业务 class（与 custom-class 等价）
    customClass: { type: String, default: '' }
  },
  data() {
    return {
      fullscreenIcon,
      exitFullscreenIcon,
      // 弹框相关
      dialogTitle: '',
      isFullscreen: false,
      // 窄面板标记，驱动 bs-form-compact（阈值 FORM_COMPACT_WIDTH）
      isFormCompact: false
    }
  },
  computed: {
    // 通过计算属性实现 visible 的双向绑定，配合 :visible.sync 使用
    isShowDialog: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    // 注入 --bs-dialog-top 到 wrapper，面板继承后驱动 max-height（需 Vue ≥ 2.6）
    dialogStyle() {
      return this.top ? { '--bs-dialog-top': this.top } : null
    },
    // bs-body-limit / bs-form-compact / 业务 class
    dialogCustomClass() {
      const base = ['bs-dialog-class']
      if (this.limitBodyHeight) {
        base.push('bs-body-limit')
      }
      if (this.isFormCompact) {
        base.push('bs-form-compact')
      }
      const extra = this.customClass || this.$attrs['custom-class'] || ''
      if (extra) {
        base.push(extra)
      }
      return base.join(' ')
    },
    isBodyLoading: {
      get() {
        return this.bodyLoading
      },
      set(val) {
        this.$emit('update:bodyLoading', val)
      }
    },
    dialogSubmitBtnLoading: {
      get() {
        return this.submitLoading
      },
      set(val) {
        this.$emit('update:submitLoading', val)
      }
    }
  },
  watch: {
    title: {
      handler(val) {
        this.dialogTitle = val
      },
      immediate: true
    }
  },
  created() {
    // console.log('base-dialog created')
  },
  // 初始 visible=true 时 Element 不触发 open/opened，需自行绑 compact 监听
  mounted() {
    this.$nextTick(() => {
      if (this.visible) {
        this.bindFormCompactObserver()
      }
    })
  },
  beforeDestroy() {
    // console.log('base-dialog beforeDestroy')
    this.unbindFormCompactObserver()
  },
  methods: {
    // 取 .el-dialog 面板（测宽用）
    getDialogPanelEl() {
      const root = this.$refs.dialogRef && this.$refs.dialogRef.$el
      if (!root) {
        return null
      }
      if (root.classList && root.classList.contains('el-dialog')) {
        return root
      }
      return root.querySelector ? root.querySelector('.el-dialog') : null
    },
    // 按面板宽度更新 isFormCompact（支持滞回；可传入已测宽度避免强制重排）
    updateFormCompactByPanel(width) {
      let w = width
      if (w == null) {
        const panel = this.getDialogPanelEl()
        if (!panel) {
          return
        }
        w = panel.clientWidth
      }
      if (!(w > 0)) {
        return
      }
      const next = this.isFormCompact ? w < FORM_COMPACT_EXIT : w < FORM_COMPACT_WIDTH
      if (next !== this.isFormCompact) {
        this.isFormCompact = next
      }
    },
    // 监听面板尺寸变化；先断旧监听再绑；优先 ResizeObserver，不可用或构造失败时用 window.resize 兜底
    bindFormCompactObserver() {
      this.unbindFormCompactObserver(false)
      const panel = this.getDialogPanelEl()
      if (!panel) {
        return
      }
      this.updateFormCompactByPanel()
      if (typeof ResizeObserver !== 'undefined') {
        try {
          this._formCompactObserver = new ResizeObserver((entries) => {
            const entry = entries && entries[0]
            const w = entry && entry.contentRect && entry.contentRect.width
            if (!w) {
              return
            }
            this.updateFormCompactByPanel(w)
          })
          this._formCompactObserver.observe(panel)
          return
        } catch (e) {
          this._formCompactObserver = null
        }
      }
      this._formCompactResizeHandler = () => {
        this.updateFormCompactByPanel()
      }
      window.addEventListener('resize', this._formCompactResizeHandler)
    },
    // 断开面板尺寸监听；resetCompact 默认重置 isFormCompact
    unbindFormCompactObserver(resetCompact = true) {
      if (this._formCompactObserver) {
        this._formCompactObserver.disconnect()
        this._formCompactObserver = null
      }
      if (this._formCompactResizeHandler) {
        window.removeEventListener('resize', this._formCompactResizeHandler)
        this._formCompactResizeHandler = null
      }
      if (resetCompact) {
        this.isFormCompact = false
      }
    },
    // 弹框相关
    onOpenDialog() {
      // opened 前先测宽，尽早套上 bs-form-compact，避免动画期间布局闪变
      this.$nextTick(() => {
        this.updateFormCompactByPanel()
      })
      this.$emit('open')
    },
    // @opened：打开动画结束；父组件常用作初始化（拉数据、重置表单、聚焦等）
    onOpenedDialog() {
      this.bindFormCompactObserver()
      this.$emit('opened')
    },
    onCloseDialog() {
      this.$emit('close')
    },
    // @closed：关闭动画结束；父组件常用作收尾（清状态）；组件内重置全屏、表单窄布局
    onClosedDialog() {
      this.isFullscreen = false
      this.unbindFormCompactObserver()
      this.$emit('closed')
    },
    // 未监听 @cancel 时默认关闭；若父组件监听 @cancel，须自行将 visible 设为 false
    onDialogCancel() {
      if (this.$listeners.cancel) {
        this.$emit('cancel')
      } else {
        this.isShowDialog = false
      }
    },
    onDialogSubmit() {
      this.$emit('submit')
    },
    // 父组件通过下面方式调用，注意：这里的dialogRef 是父组件 <BaseDialog ref="dialogRef" /> 的 ref
    // this.$refs.dialogRef.setSubmitBtnLoading(true)
    setSubmitBtnLoading(isShow = false) {
      this.dialogSubmitBtnLoading = isShow
    },
    onClickToggleFull() {
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>

<style lang="scss">
// 样式挂在 custom-class 下，避免污染全局（el-dialog append-to-body 故不用 scoped）

$bs-form-controls: ('el-input', 'el-select', 'el-textarea', 'el-date-editor', 'el-autocomplete', 'el-cascader', 'el-input-number', 'input-width');

// 1. 栅格通栏；el-row 下两列变通栏；加 bs-form-multi-col 可保留多列
@mixin bs-form-single-col {
  .el-row:not(.bs-form-multi-col) > .el-col {
    float: none;
    flex: 0 0 100%;
    width: 100% !important;
    max-width: 100%; // 不加 !important，避免误伤业务自定义 max-width
  }
}

// 2. 表单纵向化（上 label、下控件 + 间距（compact）；不分是否 inline，一律生效）
@mixin bs-form-label-top {
  .el-form-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    margin-right: 0;
    margin-bottom: var(--bs-form-item-gap-compact); // 组间距（含校验错误时仍要留空）

    // 勿用 &:last-child（el-col 内会误清）
    &::before,
    &::after {
      display: none;
    }
  }

  // 仅「直接挂在 form 下」的最后一项收底边距，不影响 el-col 内的 item
  .el-form > .el-form-item:last-child {
    margin-bottom: 0;
  }

  .el-form-item__label {
    float: none;
    display: block;
    width: auto !important;
    height: auto;
    padding: 0;
    margin: 0 0 var(--bs-form-label-gap); // 组内间距：label ↔ 控件
    line-height: 1.4;
    text-align: left;
    box-sizing: border-box;
  }

  .el-form-item__content {
    margin-left: 0 !important;
    line-height: normal;
    width: 100%;
  }

  // static：组间交给 margin-bottom
  .el-form-item__error {
    position: static;
    margin-top: var(--bs-form-error-gap); // 控件 ↔ 错误文案
    padding: 0;
  }
}

// 3. 常用录入控件宽度拉满（表格、分页内除外）
// @mixin bs-form-control-block {
//   @each $c in $bs-form-controls {
//     .#{$c} {
//       width: 100% !important;
//     }
//   }
//
//   .el-table,
//   .el-pagination {
//     @each $c in $bs-form-controls {
//       .#{$c} {
//         width: auto !important;
//         max-width: none;
//       }
//     }
//   }
// }

// 3. 仅表单项内拉满；表内可编辑单元格也会跟列宽；分页一般不在 form-item 内故不命中
@mixin bs-form-control-block {
  @each $c in $bs-form-controls {
    .el-form-item .#{$c} {
      width: 100% !important;
    }
  }
}

// 4. 表内嵌 el-form-item（通常外层有 el-form）：默认贴齐单元格；错误 static 撑高行
@mixin bs-form-table-item {
  .el-table {
    .el-form-item {
      display: block;
      width: 100%;
      margin-right: 0;
      margin-bottom: 0;

      &::before,
      &::after {
        display: none;
      }

      // 列名在表头；单元格多为 label-width=0，避免空 label 占位
      > .el-form-item__label {
        display: none;
      }

      > .el-form-item__content {
        margin-left: 0 !important;
        line-height: normal;
        width: 100%;
      }

      .el-form-item__error {
        position: static;
        margin-top: var(--bs-form-error-gap);
        padding: 0;
      }
    }
  }
}

// 5. 弹框移动端适配（分页等，可继续扩展其他组件）
@mixin bs-dialog-mobile {
  // 分页两行：第 1 行 total/sizes；第 2 行从 prev 起（pager/next/jumper）
  .el-pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    white-space: normal;
    text-align: center;
    row-gap: 8px;
    column-gap: 4px;

    // 插在 sizes 与 prev 之间的整行断点（::before 作为 flex 子项）
    &::before {
      content: '';
      flex: 0 0 100%;
      order: 3;
      height: 0;
      overflow: hidden;
    }

    .el-pagination__total {
      order: 1;
      float: none;
      margin-right: 8px;
    }

    .el-pagination__sizes {
      order: 2;
      float: none;
      margin-right: 0;
    }

    .btn-prev {
      order: 4;
      float: none;
    }

    .el-pager {
      order: 5;
      float: none;
    }

    .btn-next {
      order: 6;
      float: none;
    }

    .el-pagination__jump {
      order: 7;
      float: none;
      margin-left: 0;
    }
  }

  .pagination-container {
    padding: 8px 0;
  }
}

.bs-dialog-class {
  display: flex;
  flex-direction: column;
  // // --bs-dialog-top 由 :style 注入并继承；此处不写死
  // // 限高用；默认顶距须与 script DIALOG_TOP_PC 一致； ≤1024 在 media 内改为 5vh
  // --bs-dialog-top: 10vh;

  --bs-dialog-bottom-gap: 50px;
  // --bs-form-item-gap: 28px;
  --bs-form-item-gap: 18px; // 底部间距默认为18px
  --bs-form-item-gap-compact: 12px;
  --bs-form-label-gap: 8px;
  --bs-form-error-gap: 6px;

  .el-dialog__header,
  .el-dialog__footer {
    flex: 0 0 auto;
  }

  .el-dialog__body {
    min-height: 0;
    padding: 20px; // 覆盖 Element 默认上下 30，padding: 30px 20px;
  }

  // loading 相对内容区
  .bs-dialog-body {
    position: relative;
    min-height: 0;
  }

  .bs-dialog-header-actions {
    display: inline-block;
  }

  .bs-full-btn {
    // 相对关闭钮 top:20px 下移 2px，对齐 icon-font 与 SVG 的视觉中心
    top: 22px;
    right: 48px;
  }

  .bs-full-icon {
    width: 16px;
    height: 16px;
    display: block;
  }

  .bs-full-btn:hover .bs-full-icon {
    opacity: 0.75;
  }

  .bs-dialog-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 0;

    .el-button {
      margin: 5px 0 5px 10px;
    }
  }
}

// 宽面板组距（error 仍为 absolute）；表内 @include 写在同块且在后，盖掉组距
.bs-dialog-class:not(.bs-form-compact) {
  .el-dialog__body .el-form .el-form-item {
    margin-bottom: var(--bs-form-item-gap);
  }

  .el-dialog__body {
    @include bs-form-table-item;
  }
}

// 窄面板：约束 body 内表单布局（通栏 / label-top / 控件拉满 / 表内 form-item）
.bs-dialog-class.bs-form-compact {
  .el-dialog__body {
    @include bs-form-single-col;
    @include bs-form-label-top;
    @include bs-form-control-block;
    @include bs-form-table-item;
  }
}

// 限高：超高 body 滚动，矮内容贴合
.bs-dialog-class.bs-body-limit {
  // 兜底 10vh：变量未注入时避免无效 calc
  max-height: calc(100vh - var(--bs-dialog-top, 10vh) - var(--bs-dialog-bottom-gap));
  overflow: hidden;

  .el-dialog__body {
    flex: 0 1 auto;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &.is-fullscreen {
    max-height: 100vh;
    height: 100vh;
    margin-top: 0 !important;
    overflow: hidden; // 明确由 body 滚动，压过 Element .is-fullscreen { overflow: auto }
    border-radius: 0;
  }
}

// 平板：强制宽 92%、顶 5vh；限高 90vh（!important 覆盖 :style 继承的 prop）
@media screen and (max-width: 1024px) {
  .bs-dialog-class:not(.is-fullscreen) {
    --bs-dialog-top: 5vh !important;
    width: 92% !important;
    margin-top: var(--bs-dialog-top) !important;
  }

  .bs-dialog-class.bs-body-limit:not(.is-fullscreen) {
    max-height: 90vh;
  }
}

// 移动端：收紧标题区与 body padding；内容适配走 bs-dialog-mobile
@media screen and (max-width: 768px) {
  .bs-dialog-class {
    .el-dialog__header {
      padding: 15px 15px 10px;
    }

    .el-dialog__title {
      font-size: 16px;
      line-height: 1.4;
      word-break: break-word;
    }

    .el-dialog__body {
      padding: 15px;
    }

    @include bs-dialog-mobile;
  }
}
</style>
