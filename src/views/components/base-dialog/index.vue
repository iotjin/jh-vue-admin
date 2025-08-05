<template>
  <div>
    <!-- dialog -->
    <el-dialog
      ref="dialogRef"
      v-drag-dialog
      v-bind="$attrs"
      :title="dialogTitle"
      :visible.sync="isShowDialog"
      :top="top"
      :width="width"
      :fullscreen="isFullscreen"
      :append-to-body="appendToBody"
      :destroy-on-close="destroyOnClose"
      :close-on-click-modal="closeOnClickModal"
      @open="onOpenDialog"
      @opened="onOpenedDialog"
      @closed="onClosedDialog"
    >
      <!-- 自定义header -->
      <template slot="title">
        <div style="display:flex;justify-content: space-between;">
          <div class="el-dialog__title"> {{ dialogTitle }} </div>
          <button type="button" class="el-dialog__headerbtn" style="margin-right: 25px;" @click="onClickToggleFull">
            <i v-if="!isFullscreen" class="el-icon-full-screen" />
            <svg-icon v-if="isFullscreen" icon-class="exit-fullscreen" />
          </button>
        </div>
      </template>
      <div class="bs-dialog">
        <slot />
      </div>
      <div v-if="isShowFooter" slot="footer" class="bs-dialog-footer">
        <el-button size="small" @click="onDialogCancel()"> {{ cancelText }} </el-button>
        <el-button :loading="dialogSubmitBtnLoading" size="small" type="primary" @click="onDialogSubmit()"> {{ confirmText }} </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 是否显示
    isShow: { type: Boolean, default: false },
    // 标题：默认按类型设置为新增、编辑、查看，传值优先级更高
    title: { type: String, default: '' },
    isShowFooter: { type: Boolean, default: true },
    cancelText: { type: String, default: '取消' },
    confirmText: { type: String, default: '确定' },
    // Dialog CSS 中的 margin-top 值
    top: { type: String, default: '8vh' },
    // Dialog 的宽度
    width: { type: String, default: '55%' },
    // Dialog 是否可以通过点击 modal 关闭
    closeOnClickModal: { type: Boolean, default: false },
    // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    appendToBody: { type: Boolean, default: false },
    // Dialog 关闭时是否销毁内部元素，设置ture后拖动指令会失效
    destroyOnClose: { type: Boolean, default: false }
  },
  data() {
    return {
      // 弹框相关
      dialogTitle: '提示',
      isShowDialog: false,
      isFullscreen: false,
      dialogSubmitBtnLoading: false
    }
  },
  // computed: {
  //   dialogVisible: {
  //     get() {
  //       return this.isShow
  //     },
  //     set(val) {
  //       this.$emit('update:isShow', val)
  //     }
  //   }
  // },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.$emit('update:isShow', val) // isShowDialog改变时同步父组件isShow的值
    },
    title: {
      handler(val) {
        this.dialogTitle = val.length ? val : this.dialogTitle
      },
      immediate: true
    }
  },
  created() {
    // console.log('base-dialog created')
  },
  beforeDestroy() {
    // console.log('base-dialog beforeDestroy')
  },
  methods: {
    // 弹框相关
    onOpenDialog() {
      this.$emit('open', {})
    },
    onOpenedDialog() {
      this.$emit('opened', {})
    },
    onClosedDialog() {
      this.$emit('closed', {})
    },
    onDialogCancel() {
      if (this.$listeners.cancel) {
        this.$emit('cancel', {})
      } else {
        this.isShowDialog = false
      }
    },
    onDialogSubmit() {
      this.$emit('submit', {})
    },
    // 父组件通过下面方式调用
    // this.$refs.dialogRef.showSubmitBtnLoading(true)
    showSubmitBtnLoading(isShow = false) {
      this.dialogSubmitBtnLoading = isShow
    },
    onClickToggleFull() {
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-dialog-footer {
  text-align: center;
}
</style>

