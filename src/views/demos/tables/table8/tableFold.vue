
<template>
  <div>
    <el-card>
      <!-- list start -->
      <el-row style="display:flex; align-items: center;">
        <el-col :span="6">
          <div class="header-text">Responses:</div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" size="mini" @click="toggleShowAll">{{ isShowAll ?'Fold Responses':'Show All Responses' }} </el-button>
        </el-col>
      </el-row>
      <div style="height: 15px;" />
      <el-timeline v-for="(item, index) in limitedList" :key="index">
        <el-timeline-item :timestamp="item.createDate" placement="top">
          <div class="box-card">
            <el-row>
              <el-col>
                <div style="display:flex;">
                  <div class="header-text">{{ item.name }} : </div>
                  <div style="flex: 1;"> {{ item.content }} </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-timeline-item>
      </el-timeline>
      <!-- list end -->
    </el-card>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    foldList: { type: Array, default: () => [] }
  },
  data() {
    return {
      isShowAll: false,
      newFoldList: [],
      // img dialog
      isShowDialogImg: false,
      previewImage: ''
    }
  },
  computed: {
    limitedList() {
      if (this.isShowAll) {
        return this.newFoldList
      } else {
        if (this.newFoldList.length > 3) {
          return this.newFoldList.slice(0, 3)
        }
        return this.newFoldList
      }
    }
  },
  watch: {
    foldList: {
      handler(newVal, oldVal) {
        this.newFoldList = newVal
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    toggleShowAll() {
      this.isShowAll = !this.isShowAll
      this.$emit('toggleShowAll', this.isShowAll)
    }
  }
}
</script>

<style lang="scss" scoped>

.box-card {
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e6e6e6;
}

.header-text {
  font-weight: bold;
  font-size: 16px;
  color: #606266;
  padding-right: 10px;
}

.content-text {
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all;
  padding-right: 10px;
}
</style>
