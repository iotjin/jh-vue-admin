<template>
  <div>
    <div>home7</div>
  </div>
</template>

<script>
// import { getDeptList } from '@/api/base/base'
// import { getDictLevel, getListData, getDataById, addData, deleteData, editData, exportById } from '@/api/tables/tables'

export default {
  components: {},
  data() {
    return {
      tableHeight: 170,
      tableLoading: false,
      tableData: []
    }
  },
  mounted() {
    console.log(this.GLOBAL.title)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
