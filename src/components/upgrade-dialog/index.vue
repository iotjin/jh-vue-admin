<template>
  <div class="upgrade-dialog-bg">
    <!-- :width="dialogConfig.width" destroy-on-close -->
    <el-dialog :visible.sync="isShowDialog" :append-to-body="dialogConfig.appendToBody" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" class="upgrade-dialog">
      <template slot="title">
        <div class="upgrade-title">
          <div class="upgrade-title-warp">
            <span class="upgrade-title-warp-txt">{{ dialogConfig.title }}</span>
            <span class="upgrade-title-warp-version">v{{ upgradeInfo.version }}</span>
          </div>
        </div>
      </template>
      <div class="upgrade-content">
        <div v-for="(item, index) in upgradeInfo.descList" :key="index">
          <div style="margin-bottom: 10px">{{ item }}</div>
          <!-- <div :style="{ marginBottom: index === upgradeInfo.descList.length - 1 ? '0' : '10px' }">{{ item }}</div> -->
        </div>
        <div class="b-tag-warning">{{ dialogConfig.note }}</div>
      </div>
      <div class="upgrade-btn">
        <el-button v-if="!upgradeInfo.isForceUpgrade" round size="default" type="info" text @click="onCancel">{{ dialogConfig.cancelText }}</el-button>
        <el-button :loading="dialogSubmitBtnLoading" type="primary" round size="default" @click="onUpgrade">{{ dialogConfig.confirmText }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<!--
  当用户的视角离开页面的时候停止发送请求，用户回到页面视角继续请求
  活跃状态把轮询次数清0，非活跃状态轮询次数+1，超过x次停止轮询
-->
<script>
// eslint-disable-next-line
import { getVersion, setVersion } from './upgradeUtils'

export default {
  components: {},
  props: {
    isShow: { type: Boolean, default: false },
    upgradeData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      isShowDialog: false,
      dialogSubmitBtnLoading: false,
      dialogConfig: {
        appendToBody: true,
        width: '50%',
        // title: 'New version',
        // cancelText: 'Cancel',
        // confirmText: 'Update',
        // note: 'Note: The system has been updated. Click the confirm button to refresh the page (please make sure the current page data has been saved before refreshing).'
        title: '发现新版本',
        cancelText: '残忍拒绝',
        confirmText: '马上更新',
        note: '注意：系统已更新，点击确定按钮刷新页面(请在刷新前确认当前页面数据已保存)。'
      },
      upgradeInfo: {
        isForceUpgrade: false,
        version: '1.2.0',
        descList: ['1. 新增xxx功能', '2. 优化xxx功能', '3. 修复xxx功能']
        // descList: ['1. add xxx func', '2. optimize xxx func', '3. fix xxx bug']
        // descList: [
        //   '1. 新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能',
        //   '2. 优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能优化xxx功能',
        //   '3. 修复xxx功能',
        //   '1. 新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能新增xxx功能',
        //   '2. 优化xxx功能',
        //   '3. 修复xxx功能',
        //   '1. 新增xxx功能',
        //   '2. 优化xxx功能',
        //   '3. 修复xxx功能',
        //   '3. 修复xxx功能',
        //   '1. 新增xxx功能'
        // ]
      }
    }
  },
  watch: {
    isShow: function(val) {
      this.isShowDialog = val // isShow改变是同步子组件isShowDialog的值
    },
    isShowDialog: function(val) {
      this.$emit('update:isShow', val) // isShowDialog改变时同步父组件isShow的值
    },
    upgradeData: function(val) {
      this.upgradeInfo = JSON.parse(JSON.stringify(val))
    }
  },
  mounted() {
    // this.delayShow()
  },
  methods: {
    // 延迟显示，防止刷新时界面显示太快
    delayShow() {
      setTimeout(() => {
        this.isShowDialog = true
      }, 2000)
    },
    onCancel() {
      this.isShowDialog = false
    },
    onUpgrade() {
      this.dialogSubmitBtnLoading = true
      setTimeout(() => {
        if (this.upgradeData && this.upgradeData.version) {
          setVersion(this.upgradeData.version)
        }
        window.location.reload()

        // window.location.replace(window.location.href); //没有刷新缓存
        // location.reload(true); // 刷新了缓存
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
// .upgrade-dialog {
//   .el-dialog__header {
//     padding: 0px;
//     margin-right: 0px;
//     overflow: hidden;
//   }
//   .el-dialog__body {
//     padding: 0 !important;
//     max-height: calc(90vh - 111px) !important;
//     overflow-y: auto;
//     overflow-x: hidden;
//   }
// }
</style>

<style scoped lang="scss">
.upgrade-dialog {
  .upgrade-title {
    text-align: center;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      background-color: #409eff;
      // background-color: var(--el-color-primary);
      width: 130%;
      height: 130px;
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
    }
    .upgrade-title-warp {
      z-index: 1;
      position: relative;
      .upgrade-title-warp-txt {
        color: white;
        font-size: 22px;
        letter-spacing: 3px;
      }
      .upgrade-title-warp-version {
        color: white;
        background-color: #79bbff;
        // background-color: var(--el-color-primary-light-3);
        font-size: 12px;
        position: absolute;
        display: flex;
        top: -2px;
        right: -50px;
        padding: 2px 4px;
        border-radius: 2px;
      }
    }
  }
  .upgrade-content {
    padding: 20px;
    line-height: 22px;
    .upgrade-content-desc {
      color: var(--el-color-info-light-5);
      color: #c8c9cc;
      font-size: 12px;
    }
  }
  .upgrade-btn {
    border-top: 1px solid var(--el-border-color-lighter, #ebeef5);
    border-top: 1px solid #ebeef5;
    display: flex;
    justify-content: space-around;
    padding: 15px 20px;
    .el-button {
      width: 100%;
    }
  }
}

.b-tag-warning {
  display: inline-block;
  margin: 0.2rem;
  padding: 5px 10px;
  font-size: 12px;
  color: #e6a23c;
  background: #fdf6ec;
  border: 1px solid #faecd8;
  border-radius: 4px;
}

.upgrade-dialog {
  ::v-deep .el-dialog__header {
    padding: 0px;
    margin-right: 0px;
    overflow: hidden;
  }
  ::v-deep .el-dialog__body {
    padding: 0 !important;
    max-height: calc(90vh - 111px) !important;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

// pc
@media screen and (min-width: 1024px), (min-device-width: 1024px) {
  .upgrade-dialog ::v-deep .el-dialog {
    width: max(30%, 300px);
  }
}

// 平板
@media screen and (min-width: 750px) and (max-width: 1024px), (min-device-width: 750px) and (max-device-width: 1024px) {
  .upgrade-dialog ::v-deep .el-dialog {
    width: max(50%, 300px);
  }
}
// 移动端
@media screen and (max-width: 750px), (max-device-width: 750px) {
  .upgrade-dialog ::v-deep .el-dialog {
    width: max(60%, 300px);
  }
}
</style>
