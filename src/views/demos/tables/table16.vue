<template>
  <div class="app-container">
    <div class="table16-toolbar-left">
      <el-tag size="small" type="info">业务筛选区（左侧）</el-tag>
      <el-button size="mini" type="primary" plain>批量导出</el-button>
      <el-button size="mini" plain>更多操作</el-button>
    </div>

    <el-table v-table-column-setting row-key="id" :data="tableData" border style="width: 100%;" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column type="index" label="#" width="60" />
      <el-table-column prop="avatar" label="头像" width="90">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar" :size="32" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="120" />
      <el-table-column prop="dept" label="部门" min-width="130" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '在职' ? 'success' : 'info'" size="mini">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="绩效进度" min-width="160">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.score" :stroke-width="10" />
        </template>
      </el-table-column>
      <el-table-column prop="salary" label="月薪" min-width="120">
        <template slot-scope="scope">
          <span class="amount-text">{{ formatCurrency(scope.row.salary) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="joinDate" label="入职日期" min-width="130">
        <template slot-scope="scope">
          {{ formatDate(scope.row.joinDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="210" show-overflow-tooltip />
      <el-table-column prop="phone" label="手机号" min-width="140" />
      <el-table-column prop="address" label="地址" min-width="260" show-overflow-tooltip />
      <el-table-column label="操作" width="170" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleView(scope.row)">查看</el-button>
          <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TableColumnSettingDirective from '@/directives/table-column-setting/TableColumnSettingDirective'

export default {
  name: 'Table16',
  directives: {
    tableColumnSetting: TableColumnSettingDirective
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张三',
          avatar: 'https://picsum.photos/40/40?random=1',
          dept: '产品中心',
          age: 24,
          status: '在职',
          score: 82,
          salary: 12800,
          joinDate: '2022-03-18',
          email: 'zhangsan@example.com',
          phone: '13800138000',
          address: '上海市浦东新区世纪大道100号'
        },
        {
          id: 2,
          name: '李四',
          avatar: 'https://picsum.photos/40/40?random=2',
          dept: '研发中心',
          age: 29,
          status: '在职',
          score: 93,
          salary: 18600,
          joinDate: '2020-11-09',
          email: 'lisi@example.com',
          phone: '13900139000',
          address: '浙江省杭州市西湖区文三路18号'
        },
        {
          id: 3,
          name: '王五',
          avatar: 'https://picsum.photos/40/40?random=3',
          dept: '运营中心',
          age: 31,
          status: '离职',
          score: 58,
          salary: 9800,
          joinDate: '2019-05-23',
          email: 'wangwu@example.com',
          phone: '13700137000',
          address: '广东省深圳市南山区科技园南路8号'
        },
        {
          id: 4,
          name: '赵六',
          avatar: 'https://picsum.photos/40/40?random=4',
          dept: '市场中心',
          age: 27,
          status: '在职',
          score: 76,
          salary: 14500,
          joinDate: '2021-08-16',
          email: 'zhaoliu@example.com',
          phone: '13600136000',
          address: '北京市朝阳区望京街道阜通东大街6号'
        }
      ]
    }
  },
  methods: {
    formatCurrency(value) {
      return `¥${Number(value || 0).toLocaleString('zh-CN')}`
    },
    formatDate(date) {
      if (!date) return '-'
      return date
    },
    handleView(row) {
      this.$message.info(`查看：${row.name}`)
    },
    handleEdit(row) {
      this.$message.success(`编辑：${row.name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.table16-toolbar-left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.amount-text {
  color: #e6a23c;
  font-weight: 600;
}
</style>
