<template>
  <div>
    <div v-for="(item, index) in limitedList" :key="index" class="item-bg">
      <div class="item-content">
        <div class="item-info">{{ item.info }}</div>
      </div>
    </div>
    <button @click="toggleShowAll">{{ isShowAll ?'折叠':'显示全部' }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: Array.from({ length: 5 }, (_, index) => ({
        info: `info ${index + 1}`
      })),
      isShowAll: false
    }
  },
  computed: {
    limitedList() {
      if (this.isShowAll) {
        return this.list
      } else {
        if (this.list.length > 3) {
          return this.list.slice(0, 3)
        }
        return this.list
      }
    }
  },
  methods: {
    toggleShowAll() {
      this.isShowAll = !this.isShowAll
    }
  }
}
</script>

<style>
.item-bg {
  width: 200px;
  height: 50px;
  margin: 10px;
  border: 1px solid #000;
}

.item-content {
  padding: 10px;
}

.item-info {
  font-size: 16px;
}
</style>
