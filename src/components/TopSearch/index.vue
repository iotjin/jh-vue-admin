<template>
  <div ref="topSearchRef" :class="['app-search', { 'is-collapsed': !resolvedIsExpand }]">
    <slot />
    <div class="app-search-item app-search-actions">
      <slot name="actions">
        <el-button v-if="showSearch" :icon="searchIcon" :type="searchType" @click="onClickSearch">
          {{ searchText }}
        </el-button>
        <el-button v-if="showReset" :icon="resetIcon" :type="resetType" @click="onClickReset">
          {{ resetText }}
        </el-button>
        <!-- 图标放在文字右侧 -->
        <el-button v-if="shouldShowToggle" :type="toggleType" @click="onClickToggle">
          {{ resolvedIsExpand ? collapseText : expandText }}
          <i :class="[resolvedIsExpand ? collapseIcon : expandIcon, 'el-icon--right']" />
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import { getStorage, setStorage } from '@/utils/storage'

const MOBILE_WIDTH = 1024
const EXPAND_CACHE_PREFIX = 'top_search_expand_'

export default {
  name: 'TopSearch',
  props: {
    // ---- 折叠 ----
    // 不传：内部按路由缓存管理
    // is-expand / :is-expand="true|false"：仅作初始值，仍由组件内部管理（可点击折叠）
    // :is-expand.sync="isExpand"：页面手动控制展开状态（需在 data 中声明 isExpand）
    isExpand: {
      type: Boolean,
      default: undefined,
      validator(val) {
        return val === undefined || typeof val === 'boolean'
      }
    },
    // 折叠时可见的查询项数量
    collapseCount: {
      type: Number,
      default: 3
    },

    // ---- 搜索按钮 ----
    showSearch: {
      type: Boolean,
      default: true
    },
    searchText: {
      type: String,
      default: 'Search'
    },
    searchIcon: {
      type: String,
      default: 'el-icon-search'
    },
    searchType: {
      type: String,
      default: 'primary'
    },

    // ---- 重置按钮 ----
    showReset: {
      type: Boolean,
      default: true
    },
    resetText: {
      type: String,
      default: 'Reset'
    },
    resetIcon: {
      type: String,
      default: 'el-icon-refresh'
    },
    resetType: {
      type: String,
      default: 'default'
    },

    // ---- 展开折叠按钮 ----
    // 是否显示展开/折叠按钮
    // true | false | 'auto'（auto：查询项数大于 collapseCount 时显示）
    // false：最高优先级，强制显示全部查询项，忽略 isExpand / collapseCount / 移动端折叠
    showToggle: {
      type: [Boolean, String],
      default: 'auto'
    },
    expandText: {
      type: String,
      default: 'Expand'
    },
    collapseText: {
      type: String,
      default: 'Collapse'
    },
    // 折叠态图标（点击展开）
    expandIcon: {
      type: String,
      default: 'el-icon-arrow-down'
    },
    // 展开态图标（点击收起）
    collapseIcon: {
      type: String,
      default: 'el-icon-arrow-up'
    },
    // 展开折叠按钮 type
    toggleType: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      // 组件内部展开状态（未使用 .sync 时使用）
      innerIsExpand: true,
      // 插槽内查询项数量（供 showToggle=auto 判断）
      itemCount: 0,
      // 上一次是否为移动端，用于检测屏幕切换
      wasMobile: false
    }
  },
  computed: {
    /**
     * showToggle=false 时强制展示全部查询项（优先级最高）
     */
    forceShowAll() {
      return this.showToggle === false
    },
    /**
     * 是否由外部 :is-expand.sync 控制（有 update:isExpand 监听才算受控）
     */
    isExpandControlled() {
      return typeof this.isExpand === 'boolean' && !!this.$listeners['update:isExpand']
    },
    /**
     * 最终生效的展开状态：forceShowAll 恒为 true；否则 .sync 受控用 isExpand，否则用 innerIsExpand
     */
    resolvedIsExpand: {
      get() {
        if (this.forceShowAll) {
          return true
        }
        return this.isExpandControlled ? this.isExpand : this.innerIsExpand
      },
      set(val) {
        this.setIsExpand(val)
      }
    },
    /**
     * 使用路由 name 作为缓存 key（列表页均有 name）
     */
    routeName() {
      return String(this.$route.name)
    },
    shouldShowToggle() {
      if (this.forceShowAll) return false
      if (this.showToggle === true) return true
      return this.itemCount > this.collapseCount
    }
  },
  watch: {
    resolvedIsExpand() {
      this.$nextTick(this.updateCollapsedItems)
    },
    collapseCount() {
      this.$nextTick(this.updateCollapsedItems)
    },
    showToggle() {
      this.$nextTick(this.updateCollapsedItems)
    },
    // keep-alive 切页时按新路由重新加载展开状态
    '$route.name'() {
      this.loadIsExpand()
      this.collapseIfMobile()
      this.$nextTick(this.updateCollapsedItems)
    }
  },
  mounted() {
    this.wasMobile = this.isMobileScreen()
    this.loadIsExpand()
    // 进入即为移动端时强制折叠并持久化
    this.collapseIfMobile()
    this._onResize = debounce(this.handleResize, 200)
    window.addEventListener('resize', this._onResize)
    this.$nextTick(this.updateCollapsedItems)
  },
  beforeDestroy() {
    if (this._onResize) {
      window.removeEventListener('resize', this._onResize)
    }
  },
  methods: {
    /**
     * 当前视口是否为移动端（宽度 < 1024px）
     */
    isMobileScreen() {
      if (typeof window === 'undefined') {
        return false
      }
      return window.innerWidth < MOBILE_WIDTH
    },
    /**
     * 设置展开状态：外部控制时抛出 update:isExpand，否则写内部状态并缓存
     */
    setIsExpand(val) {
      if (this.forceShowAll) {
        return
      }
      const next = !!val
      if (this.isExpandControlled) {
        this.$emit('update:isExpand', next)
      } else {
        this.innerIsExpand = next
        this.persistIsExpand()
      }
    },
    /**
     * 加载展开状态：
     * - showToggle=false：跳过（强制全部展示）
     * - .sync 受控：跳过
     * - 传了 :is-expand="true|false"：优先用该初值（覆盖缓存）
     * - 否则读路由缓存，无缓存则默认展开
     */
    loadIsExpand() {
      if (this.forceShowAll || this.isExpandControlled) {
        return
      }
      if (typeof this.isExpand === 'boolean') {
        this.innerIsExpand = this.isExpand
        return
      }
      const value = getStorage(`${EXPAND_CACHE_PREFIX}${this.routeName}`)
      this.innerIsExpand = value === null || value === undefined ? true : !!value
    },
    /**
     * 按路由 name 持久化当前展开状态
     */
    persistIsExpand() {
      setStorage(`${EXPAND_CACHE_PREFIX}${this.routeName}`, !!this.innerIsExpand)
    },
    /**
     * 获取默认插槽中的查询项（排除操作按钮区）
     */
    getSearchItems() {
      const topSearchRef = this.$refs.topSearchRef
      if (!topSearchRef) return []
      return Array.from(topSearchRef.children).filter((el) => {
        return el.classList && el.classList.contains('app-search-item') && !el.classList.contains('app-search-actions')
      })
    },
    /**
     * 仅切换显隐 class，不修改任何查询条件的值。
     * 带 skip-collapse 的查询项折叠时仍显示（与前 collapseCount 项叠加）
     */
    updateCollapsedItems() {
      const items = this.getSearchItems()
      this.itemCount = items.length
      items.forEach((el, index) => {
        const skipCollapse = el.classList.contains('skip-collapse')
        if (!this.forceShowAll && !this.resolvedIsExpand && index >= this.collapseCount && !skipCollapse) {
          el.classList.add('is-collapsed-hidden')
        } else {
          el.classList.remove('is-collapsed-hidden')
        }
      })
    },
    /**
     * 移动端强制折叠并持久化（showToggle=false 时跳过）
     */
    collapseIfMobile() {
      if (this.forceShowAll) {
        return
      }
      if (this.isMobileScreen() && this.resolvedIsExpand) {
        this.setIsExpand(false)
      }
    },
    /**
     * 屏幕切换为移动端时折叠并持久化
     */
    handleResize() {
      const mobile = this.isMobileScreen()
      if (mobile && !this.wasMobile) {
        this.collapseIfMobile()
      }
      this.wasMobile = mobile
    },
    onClickSearch() {
      this.$emit('search')
    },
    onClickReset() {
      this.$emit('reset')
    },
    /**
     * 切换展开状态。隐藏的查询项保留原值
     */
    onClickToggle() {
      this.setIsExpand(!this.resolvedIsExpand)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-search {
  ::v-deep .app-search-actions .el-button {
    -webkit-tap-highlight-color: transparent;
  }

  // PC：保留 hover；鼠标移开后清掉残留 focus（不用 inherit，会继承到父级深色边框）
  @media (hover: hover) {
    ::v-deep .app-search-actions .el-button:focus:not(:hover) {
      outline: none;
      color: #606266;
      border-color: #dcdfe6;
      background-color: #fff;

      &.el-button--primary {
        color: #fff;
        border-color: #409eff;
        background-color: #409eff;
      }
    }
  }

  // 触控：松开后清 sticky hover/focus；按下时用 :active 给反馈
  @media (hover: none) {
    ::v-deep .app-search-actions .el-button {
      &:hover:not(:active),
      &:focus:not(:active) {
        outline: none;
        color: #606266;
        border-color: #dcdfe6;
        background-color: #fff;

        &.el-button--primary {
          color: #fff;
          border-color: #409eff;
          background-color: #409eff;
        }
      }

      &:active {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;

        &.el-button--primary {
          color: #fff;
          border-color: #66b1ff;
          background-color: #66b1ff;
        }
      }
    }
  }
}
</style>

<!--
  TopSearch：配合列表页使用，需搭配 base.scss 中的 .app-search / .app-search-item / .app-search-actions。
  可复用的列表顶部搜索栏，支持折叠与重置（折叠仅控制显隐，不修改查询条件的值）。
  支持内部管理展开状态（按路由 name 缓存）和页面手动控制展开状态。
  折叠时可见查询项数量可配置；支持 Search / Reset / Expand 按钮；移动端自动强制折叠。
  传入 actions 具名插槽时，会整块替换默认的 Search / Reset / Expand 按钮。
  查询项加 class="skip-collapse" 可跳过折叠，折叠时仍显示（与前 collapseCount 项叠加）。

  用法示例：
  1）内部管理展开状态（按路由缓存）
  <top-search @search="onSearch" @reset="onReset">
    <div class="app-search-item">...</div>
  </top-search>

  2）指定初始展开状态（无需 data；优先于路由缓存；移动端仍会强制折叠）
  <top-search is-expand @search="onSearch" @reset="onReset">
    <div class="app-search-item">...</div>
  </top-search>
  等价写法：:is-expand="true" / :is-expand="false"

  3）页面手动控制展开状态（需 .sync + data 中声明 isExpand）
  <top-search :is-expand.sync="isExpand" @search="onSearch" @reset="onReset">
    <div class="app-search-item">...</div>
  </top-search>

  data() {
    return {
      isExpand: true
    }
  }

  4）设置折叠时可见查询项数量
  <top-search :collapse-count="3" @search="onSearch" @reset="onReset">
    <div class="app-search-item">...</div>
  </top-search>

  5）隐藏展开按钮并强制显示全部查询项（优先级最高）
  <top-search :show-toggle="false" @search="onSearch" @reset="onReset">
    <div class="app-search-item">...</div>
  </top-search>

  6）某个查询项跳过折叠（折叠时前 3 项 + 该项都会显示）
  <div class="app-search-item skip-collapse">...</div>
-->
