<template>
  <div>
    <div class="content-bg">

      <!-- 标题一 -->
      <div class="left">
        <div class="header">
          <img class="header-img" src="../../../assets/images/static/icon2.png">
          <div class="header-title">标题一</div>
        </div>
        <div v-for="item in dataArr1" :key="item.id" class="row-bg" @click="onClickItem(item)">
          <div class="row-top">
            <img class="row-img" src="../../../assets/images/static/icon2.png">
            <div class="row-time">{{ item.time }}</div>
            <div class="row-content">{{ item.content }}</div>
          </div>
          <div class="line" />
        </div>
      </div>

      <!-- 标题二 -->
      <div class="right">
        <div class="header">
          <img class="header-img" src="../../../assets/images/static/icon2.png">
          <div class="header-title">标题二</div>
        </div>
        <div v-for="item in dataArr2" :key="item.id" class="row-bg" @click="onClickItem(item)">
          <div class="row-top">
            <div class="row-left">
              <div class="dot" />
              <div class="type">{{ item.docType }}</div>
              <img class="img-more" src="../../../assets/images/static/icon2.png">
              <div class="row-content">{{ item.title }}</div>
            </div>
            <div class="row-right">
              <div class="row-time2">{{ item.time }}</div>
            </div>
          </div>
          <div class="line2" />
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dataArr1: [],
      dataArr2: []
    }
  },
  mounted() {
    this.requestData()
    this.requestData()
  },
  methods: {
    requestData() {
      const tempArr = []
      for (let index = 0; index < 18; index++) {
        tempArr.push({
          id: index,
          time: '2020-02-20 09:10:15',
          content:
            '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容0'
        })
      }
      this.dataArr1 = tempArr

      const tempArr2 = []
      for (let index = 0; index < 18; index++) {
        tempArr2.push({
          id: index,
          docType: '小标题一',
          time: '2020-02-20',
          title: '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题0'
        })
      }
      this.dataArr2 = tempArr2
    }
  }
}
</script>

<style lang="scss" scoped>
.content-bg {
  display: flex;
  padding: 10px;
}

.left {
  flex: 1;
  width: 0;
  margin-right: 5px;
  border: 1px solid #e6e6e6;
}

.right {
  flex: 1;
  margin-left: 5px;
  border: 1px solid #e6e6e6;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid green;
}

.header-img {
  width: 35px;
  height: 35px;
  margin: 0px 10px;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
}

.row-bg {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.row-img {
  width: 20px;
  height: 20px;
}

.row-time {
  min-width: 130px;
  margin-left: 10px;
}

.row-content {
  white-space: nowrap; //强制文本在一行内输出
  overflow: hidden; //隐藏溢出部分
  text-overflow: ellipsis; //对溢出部分加上...
}

.row-top {
  display: flex;
  align-items: center;
}

.line {
  margin-left: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.row-bg2 {
  display: flex;
  align-items: center;
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.row-left {
  display: flex;
  flex: 95;
  align-items: center;
  width: 0;
}

.row-right {
  flex: 5;
}

.dot {
  min-width: 6px;
  min-height: 6px;
  margin: 0 5px;
  border-radius: 3px;
  background: orange;
}

.type {
  min-width: 50px;
}

.img-more {
  width: 10px;
  height: 15px;
  margin: 0 7px;
}

.row-time2 {
  min-width: 80px;
  text-align: right;
}

.line2 {
  margin-left: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
