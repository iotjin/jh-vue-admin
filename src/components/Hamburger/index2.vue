<template>
  <!--子页面头部-->
  <div class="hamburger-container">
    <svg :class="{'is-active':sidebar.opened}" class="hamburger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64" @click="toggleClick">
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
    </svg>
    <div class="back-home" @click="backClick">
      <span>返回首页</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleClick() {
      // this.$emit('toggleClick')
      this.$store.dispatch('app/toggleSideBar')
    },
    backClick() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
$hamburger_text_color: #4ea1f8;
$hamburger_text_hover_color: #409eff;

.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}

.hamburger-container {
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: flex-start;
  color: white;
  background: white;

  > svg {
    cursor: pointer;
  }

  .back-home {
    display: inline-block;
    margin-left: 10px;

    > span {
      display: inline-block;
      height: 16px;
      line-height: 16px;
      padding-left: 5px;
      font-size: 15px;
      color: $hamburger_text_color;
      border-left: 3px solid $hamburger_text_color;
      cursor: pointer;

      &:hover {
        color: $hamburger_text_hover_color;
      }
    }
  }
}
</style>
