<template>
  <div>
    <h1 style="margin:10px 0px 30px;">复制指令</h1>

    <div style="width: 60%;">
      <el-input v-model="inputValue" placeholder="请输入内容">
        <template slot="append">
          <el-button v-copy="inputValue"> 复制 </el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      inputValue: '123456'
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
