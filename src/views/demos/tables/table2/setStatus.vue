<template>
  <div class="app-container">
    <el-row>
      <el-col :span="22">
        <el-transfer v-model="ids" :data="statusList" :filter-method="filterMethod" :titles="['Select All', 'Status']" target-order="push" filterable @change="handleChange" />
      </el-col>
    </el-row>
    <div style="margin: 10px 0;font-weight: bold;font-size: 25px;">Selected Status:</div>
    <div style="margin-left: 10px;margin-bottom: 10px;">Drag to sort status</div>
    <div v-if="selectStatusList.length" class="dndList">
      <draggable v-model="selectStatusList" group="noraml" chosen-class="chosen" @start="onStart" @end="onEnd">
        <div v-for="(item, index) in selectStatusList" :key="index" class="list-item">
          <div style="display: flex;align-items: center;">
            <div style="flex:9">
              <div style="color: #000; font-weight: bold;"> {{ item.label }} </div>
              <div style="color: #000; margin-top: 10px;">
                <span style="margin-right: 5px;">Can Read</span>
                <el-switch v-model="item.canRead" @change="onChange" />
                <span style="margin-right: 10px;" />
                <span style="margin-right: 5px;">Can Write</span>
                <el-switch v-model="item.canWrite" @change="onChange" />
              </div>
            </div>
            <div style="color: #000; font-weight: bold;"> {{ item.order }} </div>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>

import { getDictStatus } from '@/api/base/base'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: {
    // add，edit
    type: { type: String, default: 'add' },
    editStatusList: { type: Array, default: () => [] }
  },
  data() {
    return {
      statusList: [],
      selectStatusList: [],
      ids: []
    }
  },
  watch: {
    editStatusList: {
      handler: function(val, oldVal) {
        this.handleEditData(val)
      },
      immediate: true
    }
  },
  created() {
    this.getDictStatus()
  },
  mounted() {},
  methods: {
    handleEditData(val) {
      if (this.type === 'add') {
        return
      }
      var tempArr = []
      for (let i = 0; i < val.length; i++) {
        var item = {
          key: i,
          label: val[i].statusName,
          value: val[i].statusId,
          canRead: val[i].canRead,
          canWrite: val[i].canWrite,
          order: val[i].order
        }
        const foundIndex = this.statusList.findIndex((item) => item.value === val[i].statusId)
        if (foundIndex !== -1) {
          item.key = this.statusList[foundIndex].key
        }
        tempArr.push(item)
      }
      tempArr.sort((a, b) => {
        return a.order !== b.order ? a.order - b.order : a.label.localeCompare(b.label)
        // if (a.order !== b.order) {
        //   return a.order - b.order // 按 order 升序排列
        // } else {
        //   return a.label.localeCompare(b.label) // 按字母表顺序排列
        // }
      })
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].order = i
      }
      this.ids = tempArr.map((item) => item.key)
      this.selectStatusList = tempArr
    },
    getDictStatus() {
      getDictStatus().then((res) => {
        if (res.code === 20000) {
          var list = res.data
          var tempArr = []
          for (let i = 0; i < list.length; i++) {
            tempArr.push({
              key: i,
              label: list[i].label,
              value: list[i].value
            })
            if (this.type === 'add') {
              tempArr[i].canRead = false
              tempArr[i].canWrite = false
            }
          }
          this.statusList = JSON.parse(JSON.stringify(tempArr))
        } else {
          // this.$message.error(res.msg)
          this.$message.warning('Failed to get status list. Error details: ' + res.msg)
        }
      })
    },
    filterMethod(query, item) {
      var tempInput = ''
      const tempItem = item.label.toLowerCase()
      if (query) {
        tempInput = query.toLowerCase()
      }
      return tempItem.indexOf(tempInput) > -1
    },
    handleChange(value, direction, movedKeys) {
      //   console.log(value, direction, movedKeys);
      // console.log('ids', JSON.stringify(this.ids))
      var tempArr = []
      var status = JSON.parse(JSON.stringify(this.statusList))
      this.ids.forEach((id, index) => {
        const foundIndex = this.statusList.findIndex((item) => item.key === id)
        if (foundIndex !== -1) {
          var item = status[foundIndex]
          item.order = index
          tempArr.push(item)
        }
      })
      tempArr.forEach((item, index) => {
        const foundIndex = this.selectStatusList.findIndex((item2) => item.value === item2.value)
        if (foundIndex !== -1) {
          tempArr[index].canRead = this.selectStatusList[foundIndex].canRead
          tempArr[index].canWrite = this.selectStatusList[foundIndex].canWrite
        }
      })
      this.selectStatusList = tempArr
      this.onChange()
    },
    onStart() {
      console.log('onStart')
    },
    onEnd() {
      console.log('onEnd')
      for (let i = 0; i < this.selectStatusList.length; i++) {
        var item = this.selectStatusList[i]
        item.order = i
        this.$set(this.selectStatusList, i, item)
      }
      this.onChange()
    },
    onChange() {
      console.log('selectStatusList', JSON.stringify(this.selectStatusList))
      var tempArr = this.selectStatusList.map((item) => {
        return {
          statusId: item.value,
          canRead: item.canRead,
          canWrite: item.canWrite,
          order: item.order
        }
      })
      this.$emit('change', tempArr)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-transfer-panel {
  width: 260px !important;
}

.list-item {
  padding: 15px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
.chosen {
  border: solid 1px #3089dc !important;
}
</style>
