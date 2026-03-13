<template>
  <div>
    <div v-for="(group, index) in groupList" :key="group.groupName + index">
      <!-- 组复选框 -->
      <el-checkbox v-model="group.selected" :indeterminate="isIndeterminate(group)" @change="handleCheckAllChange(group,$event)">
        {{ group.groupName }}
      </el-checkbox>

      <!-- 子项的 checkbox -->
      <div>
        <el-checkbox-group v-model="selectedList">
          <div v-for="(item, index2) in group.itemList" :key="item.value+index2" style="padding-left: 20px;">
            <el-checkbox :label="item.value" @change="handleCheckChange(group,index,$event)">{{ item.label }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <!-- 子项样式二 -->
      <div class="box-card">
        <el-checkbox-group v-model="selectedList">
          <span v-for="(item, index2) in group.itemList" :key="item.value+index2" style="padding-left: 20px;">
            <el-checkbox :label="item.value" @change="handleCheckChange(group,index,$event)">{{ item.label }}</el-checkbox>
          </span>
        </el-checkbox-group>
      </div>
    </div>

    <div style="margin-top: 20px;">
      <el-button type="primary" @click="handleGetSelectedList">获取选中的值</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupList: [
        {
          groupName: 'BB',
          selected: false, // 初始选中状态
          itemList: [
            { label: 'test name1', value: '11' },
            { label: 'test name2', value: '22' },
            { label: 'test name3', value: '33' },
            { label: 'test name4', value: '44' },
            { label: 'test name5', value: '55' }
          ]
        },
        {
          groupName: 'AA',
          selected: false, // 初始选中状态
          itemList: [
            { label: 'test name6', value: '66' },
            { label: 'test name7', value: '77' },
            { label: 'test name8', value: '88' },
            { label: 'test name9', value: '99' },
            { label: 'test name10', value: '100' }
          ]
        }
      ],
      // 用于存储选中的 checkbox 值
      selectedList: []
    }
  },
  methods: {
    handleCheckAllChange(group, selected) {
      // 选中时，将该组内所有 itemList 的 value 添加到 selectedList 中，注意去重
      if (selected) {
        this.selectedList = [...new Set([...this.selectedList, ...group.itemList.map((item) => item.value)])]
      } else {
        // 取消选中时，将该组内所有 itemList 的 value 从 selectedList 中移除
        this.selectedList = this.selectedList.filter((value) => !group.itemList.map((item) => item.value).includes(value))
      }
    },
    // 判断当前组的复选框是否是部分选中（indeterminate）
    isIndeterminate(group) {
      const itemList = group.itemList || []
      const selectedInGroup = itemList.filter((item) => this.selectedList.includes(item.value))
      return selectedInGroup.length > 0 && selectedInGroup.length < itemList.length
    },
    handleCheckChange(group, val) {
      // 更新当前组的 全选/取消全选 状态
      group.selected = group.itemList.every((item) => this.selectedList.includes(item.value))
    },
    handleGetSelectedList() {
      console.log('selectedList', JSON.stringify(this.selectedList))
    }
  }
}
</script>

<style scoped>
.box-card {
  margin: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e6e6e6;
}
</style>
