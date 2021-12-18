<template>
  <div class="top-header bgImage">
    <div class="header">
      <!-- 左侧标题 -->
      <div class="left">{{ headerTitle }}</div>
      <!-- 右侧 -->
      <div class="right">
        <!-- <div class="right-item">
          <img class="right-item-img" :src="avatar">
        </div> -->
        <!-- 用户信息 -->
        <el-dropdown trigger="click" placement="bottom">
          <div class="right-item">
            <img class="user-avatar" :src="avatar">
            <div class="user-name">{{ name }}</div>
            <i class="el-icon-caret-bottom" style="color:white;" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/iotjin/jh-vue-admin">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/zh/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'TopHeader',
  components: {
  },
  data() {
    return {
      // 顶栏标题
      headerTitle: 'Vue在线管理系统'
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  },
  mounted() {
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-header {
  height: 60px !important;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1001;
  font-size: 15px;
}
.bgImage {
  background: url('../../../assets/images/frame/header.png') no-repeat;
  background-size: 100% 100%;
}
.header {
  display: flex;
  align-items: center;
  height: 60px !important;
}
.left {
  flex: 3;
  padding-left: 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}
.right {
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px !important;
  padding-right: 20px;
}
.right-item {
  display: flex;
  align-items: center;
  margin: 0px 10px;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.right-item-img {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.right-item-text {
  color: white;
  margin: 0px 5px;
}

.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.user-name {
  color: white;
  margin: 0px 5px;
}
</style>
