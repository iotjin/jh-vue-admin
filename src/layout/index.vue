<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 不带顶栏 -->
    <div v-if="!hasTopHeader">
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
      </div>
    </div>

    <!-- 带顶栏 -->
    <div v-if="hasTopHeader" :class="{hasTopHeader:hasTopHeader}">
      <sidebar class="sidebar-container" style="top:60px;" />
      <top-header />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-top-header':fixedHeader}">
          <hamburger />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
      </div>
    </div>

    <!-- 系统设置 -->
    <right-panel v-if="showSettings">
      <settings />
    </right-panel>

  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { TopHeader, Hamburger } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import RightPanel from '@/components/RightPanel'
import { Settings } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView, // 新增tagsView
    TopHeader,
    Hamburger,
    RightPanel, // 新增Settings
    Settings
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    needTagsView() {
      return this.$store.state.settings.tagsView
    },
    hasTopHeader() {
      return this.$store.state.settings.topHeader
    },
    showSettings() {
      return this.$store.state.settings.showSettings
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

/* TopHeader */
.hasTopHeader {
  padding-top: 60px;
  .fixed-top-header {
    position: fixed;
    top: 60;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }
  .fixed-top-header + .app-main {
    padding-top: 50px;
  }
  .hasTagsView {
    .fixed-top-header + .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      padding-top: 84px;
    }
  }
}
.hideSidebar .fixed-top-header {
  width: calc(100% - 54px);
}
</style>
