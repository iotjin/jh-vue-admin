<template>
  <div @click="showDialog = true">
    <el-tooltip placement="bottom" content="搜索">
      <div class="item-center">
        <i class="el-icon-search nav-search-trigger" />
      </div>
    </el-tooltip>
    <el-dialog
      :visible.sync="showDialog"
      append-to-body
      top="10vh"
      title=""
      custom-class="nav-search-dialog"
      min-height="200px"
      width="750px"
      :show-close="false"
      close-on-press-escape
      @opened="focusSearchInput"
      @closed="reset"
    >
      <el-input ref="searchInputRef" v-model="searchKey" placeholder="输入菜单名称搜索" size="large" clearable prefix-icon="el-icon-search" />

      <div v-if="searchList.length > 0" class="search-list">
        <div v-for="(item, index) in searchList" :key="'nav-search-' + index" ref="searchItem" class="search-item item-center" :class="{ active: index === activeIndex }" @click="handleRedirect" @mouseenter="handleMouseenter(index)">
          <div class="item-center">
            <i v-if="isElIcon(item.meta.icon)" :class="[item.meta.icon, 'search-item-icon']" />
            <svg-icon v-else-if="item.meta.icon" :icon-class="item.meta.icon" class="search-item-svg" />
            <span class="search-item-title">
              <span v-for="(part, segIndex) in splitTitle(item.meta.title)" :key="segIndex" :class="{ 'search-item-keyword': part.match }">{{ part.text }}</span>
            </span>
          </div>
          <svg-icon icon-class="confirm" class="search-item-enter" />
        </div>
      </div>
      <el-empty v-else description="暂无匹配菜单" :image-size="64" />
      <div slot="footer" class="footer">
        <div class="item-center">
          <svg-icon icon-class="confirm" class="icon" />
          <span>确认</span>
        </div>
        <div class="item-center">
          <svg-icon icon-class="up" class="icon" />
          <svg-icon icon-class="down" class="icon" />
          <span>切换</span>
        </div>
        <div class="item-center">
          <svg-icon icon-class="esc" class="icon" />
          <span>关闭</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'lodash-es'
import { deepClone } from '@/utils'

export default {
  name: 'NavSearch',
  data() {
    return {
      showDialog: false,
      searchKey: '',
      activeIndex: -1,
      searchList: []
    }
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  watch: {
    searchKey(val) {
      this.debouncedSearch(val)
    },
    activeIndex() {
      this.$nextTick(() => {
        this.scrollActiveIntoView()
      })
    }
  },
  created() {
    this.debouncedSearch = debounce(this.handleSearchMenu, 250)
  },
  mounted() {
    this._onKeydown = (e) => {
      if (!this.showDialog) {
        return
      }
      const navigatingList = (e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.searchList.length > 0
      if (navigatingList) {
        e.preventDefault()
      }
      if (e.key === 'Enter') {
        this.handleRedirect()
      } else if (e.key === 'ArrowUp') {
        this.handleUp()
      } else if (e.key === 'ArrowDown') {
        this.handleDown()
      }
    }
    document.addEventListener('keydown', this._onKeydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._onKeydown)
    if (this.debouncedSearch && this.debouncedSearch.cancel) {
      this.debouncedSearch.cancel()
    }
  },
  methods: {
    focusSearchInput() {
      this.$nextTick(() => {
        const input = this.$refs.searchInputRef
        if (input && typeof input.focus === 'function') {
          input.focus()
        }
      })
    },
    /** 与 Sidebar/Item.vue 一致：含 el-icon 用字体图标，否则走 svg-icon */
    isElIcon(icon) {
      return icon && String(icon).indexOf('el-icon') !== -1
    },
    handleSearchMenu(val) {
      const keyword = (val && String(val).trim().toLowerCase()) || ''
      if (!keyword) {
        this.searchList = []
        this.activeIndex = -1
        return
      }
      this.searchList = this.filterMenu(deepClone(this.permission_routes), keyword)
      this.activeIndex = this.searchList.length > 0 ? 0 : -1
    },
    /** 根据搜索词拆分标题，命中片段标红 */
    splitTitle(title) {
      const text = title == null ? '' : String(title)
      const keyword = (this.searchKey && String(this.searchKey).trim()) || ''
      if (!keyword) {
        return [{ text, match: false }]
      }
      const result = []
      const textLower = text.toLowerCase()
      const keywordLower = keyword.toLowerCase()
      const len = keyword.length
      let start = 0
      let idx = textLower.indexOf(keywordLower, start)

      while (idx !== -1) {
        if (idx > start) {
          result.push({ text: text.slice(start, idx), match: false })
        }
        result.push({ text: text.slice(idx, idx + len), match: true })
        start = idx + len
        idx = textLower.indexOf(keywordLower, start)
      }

      if (start < text.length) {
        result.push({ text: text.slice(start), match: false })
      }
      return result.length ? result : [{ text, match: false }]
    },
    filterMenu(menuList, keyword, parent) {
      const res = []
      menuList.forEach((item) => {
        if (item && item.meta && JSON.stringify(item.meta) !== '{}') {
          Object.assign(item.meta, {
            icon: item.meta.icon ? item.meta.icon : parent && parent.meta && parent.meta.icon ? parent.meta.icon : '', // 有子菜单时，子菜单的 icon 优先级高于父菜单
            title: parent ? `${parent.meta.title ?? ''} > ${item.meta.title ?? ''}` : item.meta.title ?? ''
          })
          const titleStr = (item.meta.title || '').toLowerCase()
          const hidden = item.hidden || item.meta.hidden
          if (!hidden && titleStr.indexOf(keyword) !== -1) {
            if (!item.children || !item.children.length) {
              res.push(item)
            }
          }
          if (!item.meta.hideChildren && item.children) {
            res.push(...this.filterMenu(item.children, keyword, item))
          }
        }
      })
      return res
    },
    handleRedirect() {
      if (this.searchList.length === 0 || this.activeIndex < 0) {
        return
      }
      const target = this.searchList[this.activeIndex]
      if (!target || !target.name) {
        return
      }
      this.showDialog = false
      this.$router.push({ name: target.name })
      this.reset()
    },
    handleMouseenter(index) {
      this.activeIndex = Number(index)
    },
    /** 键盘/高亮切换时让当前项在列表滚动区内可见 */
    scrollActiveIntoView() {
      if (this.activeIndex < 0 || !this.searchList.length) {
        return
      }
      const items = this.$refs.searchItem
      const el = Array.isArray(items) ? items[this.activeIndex] : items
      if (!el || typeof el.scrollIntoView !== 'function') {
        return
      }
      el.scrollIntoView({ block: 'nearest', behavior: 'auto', inline: 'nearest' })
    },
    handleUp() {
      if (!this.searchList.length) {
        return
      }
      this.activeIndex--
      if (this.activeIndex < 0) {
        this.activeIndex = this.searchList.length - 1
      }
    },
    handleDown() {
      if (!this.searchList.length) {
        return
      }
      this.activeIndex++
      if (this.activeIndex > this.searchList.length - 1) {
        this.activeIndex = 0
      }
    },
    reset() {
      this.searchKey = ''
      this.searchList = []
      this.activeIndex = -1
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-search-trigger {
  font-size: 18px;
  cursor: pointer;
}

.search-item-icon {
  font-size: 20px;
  color: inherit;
}

.search-item-svg {
  font-size: 20px;
}

.search-item-enter {
  font-size: 16px;
  flex-shrink: 0;
}

.search-item-keyword {
  color: #f56c6c;
}

.item-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-list {
  margin-top: 15px;
  max-height: min(50vh, 480px);
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 4px;

  .search-item {
    height: 54px;
    justify-content: space-between;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 16px;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    &.active {
      background-color: #409eff;
      color: #fff;
      box-shadow: 0 1px 3px rgba(0, 21, 41, 0.08);
    }
    & + .search-item {
      margin-top: 8px;
    }
    .search-item-title {
      margin-left: 8px;
      font-size: 16px;
    }

    .search-item-icon {
      margin-right: 2px;
    }

    .search-item-svg {
      margin-right: 2px;
    }
  }
}

.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0px 20px;
  padding-left: 10px;
  color: #606266;

  .icon {
    padding: 3px;
    margin-right: 5px;
    border-radius: 2px;
    font-size: 20px;
    vertical-align: middle;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4);
  }
}
</style>

<!-- custom-class 挂在 Element 生成的 .el-dialog 根节点上，无本组件 data-v，故外壳样式需非 scoped；插槽 DOM 仍为本组件 scoped -->
<style lang="scss">
.nav-search-dialog {
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  .el-dialog__body {
    padding-top: 0 !important;
    min-height: 200px;
  }
}
</style>
