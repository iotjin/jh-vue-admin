<template>
  <div class="spp-theme-body spp-theme-pad">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div class="spp-table-group spp-theme-top spp-theme-pad">
      <el-table :data="tableData" border highlight-current-row class="spp-table spp-theme-top" style="width: 100%;">
        <el-table-column v-if="tableData.length" label="Index" width="60" type="index" prop="index" />
        <el-table-column v-for="(item,index) in tableHeader" :key="index" :prop="item" :label="item" />
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/ExcelUpload/index.vue'

export default {
  name: 'ExcelUpload',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message.warning('Please do not upload files larger than 1m in size.')
      return false
    },
    handleSuccess({ results, header }) {
      console.log('results', JSON.stringify(results))
      console.log('header', JSON.stringify(header))

      if (results.length === 0) {
        this.$message.warning('No data in the file')
        return
      }
      // 处理数据
      var newResults = JSON.parse(JSON.stringify(results))
      newResults.forEach((item) => {
        header.forEach((key) => {
          if (!(key in item)) {
            item[key] = '' // 添加缺失的键，值为 ""
          }
        })
      })
      // 遍历数组添加index
      console.log('newResults', JSON.stringify(newResults))
      this.tableData = newResults
      this.tableHeader = header
    }
  }
}
</script>

