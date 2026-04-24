<template>
  <div class="app-container">
    <div class="table17-toolbar-left">
      <el-tag size="small" type="success">项目台账</el-tag>
      <el-select v-model="query.status" size="mini" placeholder="项目状态" clearable>
        <el-option label="进行中" value="进行中" />
        <el-option label="待启动" value="待启动" />
        <el-option label="已延期" value="已延期" />
        <el-option label="已完成" value="已完成" />
      </el-select>
      <el-input v-model="query.keyword" size="mini" placeholder="搜索项目/负责人" clearable class="table17-search" />
      <el-button size="mini" type="primary" plain @click="handleBatchExport">导出报表</el-button>
    </div>

    <el-table v-table-column-setting2 row-key="id" :data="filteredTableData" border style="width: 100%;" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
      <el-table-column type="expand" width="56" fixed="left">
        <template slot-scope="scope">
          <div class="table17-expand">
            <div class="table17-expand__summary">
              <div class="table17-expand__block">
                <div class="table17-expand__title">项目说明</div>
                <div class="table17-expand__content">{{ scope.row.description }}</div>
              </div>
              <div class="table17-expand__block">
                <div class="table17-expand__title">风险标签</div>
                <div class="table17-expand__tags">
                  <el-tag v-for="tag in scope.row.risks" :key="tag" size="mini" type="warning" effect="plain">
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </div>

            <el-table :data="scope.row.milestones" size="mini" border class="table17-expand__inner-table">
              <el-table-column prop="name" label="里程碑" min-width="180" />
              <el-table-column prop="owner" label="责任人" min-width="120" />
              <el-table-column prop="date" label="计划日期" min-width="120" />
              <el-table-column label="状态" width="110">
                <template slot-scope="inner">
                  <el-tag :type="getMilestoneType(inner.row.status)" size="mini">
                    {{ inner.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>

      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column type="index" label="#" width="60" />

      <el-table-column prop="projectName" label="项目名称" min-width="180" show-overflow-tooltip />

      <el-table-column label="负责人" min-width="150">
        <template slot-scope="scope">
          <div class="table17-owner">
            <el-avatar :src="scope.row.ownerAvatar" :size="28" />
            <span>{{ scope.row.owner }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="department" label="所属部门" min-width="120" />

      <el-table-column label="项目状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)" size="mini">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="优先级" width="100">
        <template slot-scope="scope">
          <el-tag :type="getPriorityType(scope.row.priority)" size="mini" effect="plain">
            {{ scope.row.priority }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="memberCount" label="成员数" width="90" />

      <el-table-column label="完成进度" min-width="170">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.progress" :status="scope.row.status === '已延期' ? 'exception' : null" :stroke-width="10" />
        </template>
      </el-table-column>

      <el-table-column prop="budget" label="预算" min-width="130">
        <template slot-scope="scope">
          <span class="amount-text">{{ formatCurrency(scope.row.budget) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="deadline" label="截止日期" min-width="120" />
      <el-table-column prop="region" label="区域" min-width="120" />
      <el-table-column prop="client" label="客户" min-width="160" show-overflow-tooltip />

      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleView(scope.row)">查看</el-button>
          <el-button size="mini" type="text" @click="handleFollow(scope.row)">跟进</el-button>
          <el-button size="mini" type="text" @click="handleArchive(scope.row)">归档</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TableColumnSetting2Directive from '@/directives/table-column-setting2/TableColumnSettingDirective'

export default {
  name: 'Table17',
  directives: {
    tableColumnSetting2: TableColumnSetting2Directive
  },
  data() {
    return {
      query: {
        status: '',
        keyword: ''
      },
      tableData: [
        {
          id: 1,
          projectName: '华东供应链数字化中台',
          owner: '周颖',
          ownerAvatar: 'https://picsum.photos/40/40?random=11',
          department: '供应链中心',
          status: '进行中',
          priority: 'P0',
          memberCount: 12,
          progress: 68,
          budget: 580000,
          deadline: '2026-06-30',
          region: '华东',
          client: '星云零售集团',
          description: '整合采购、仓储、配送三大流程，建立统一数据中台与预警看板。',
          risks: ['数据迁移', '第三方接口', '跨部门协同'],
          milestones: [
            { name: '需求评审', owner: '周颖', date: '2026-04-10', status: '已完成' },
            { name: '一期开发', owner: '陈枫', date: '2026-05-20', status: '进行中' },
            { name: '试点上线', owner: '李沐', date: '2026-06-15', status: '待开始' }
          ]
        },
        {
          id: 2,
          projectName: '西南区域客户运营驾驶舱',
          owner: '梁雪',
          ownerAvatar: 'https://picsum.photos/40/40?random=12',
          department: '运营中心',
          status: '已延期',
          priority: 'P1',
          memberCount: 8,
          progress: 54,
          budget: 320000,
          deadline: '2026-05-18',
          region: '西南',
          client: '天阙文旅股份',
          description: '围绕线索、转化、复购建立客户旅程分析，并提供大屏驾驶舱能力。',
          risks: ['需求变更', '数据口径不统一'],
          milestones: [
            { name: '指标口径确认', owner: '梁雪', date: '2026-03-28', status: '已完成' },
            { name: '数据接入', owner: '郑凯', date: '2026-04-18', status: '已延期' },
            { name: '驾驶舱验收', owner: '梁雪', date: '2026-05-25', status: '待开始' }
          ]
        },
        {
          id: 3,
          projectName: '北区售后工单协同平台',
          owner: '蒋川',
          ownerAvatar: 'https://picsum.photos/40/40?random=13',
          department: '服务交付部',
          status: '待启动',
          priority: 'P2',
          memberCount: 6,
          progress: 12,
          budget: 180000,
          deadline: '2026-08-12',
          region: '华北',
          client: '金石工业设备',
          description: '统一客服、工单、备件与现场工程师排班，提升售后 SLA 达成率。',
          risks: ['排班规则复杂'],
          milestones: [
            { name: '项目立项', owner: '蒋川', date: '2026-04-22', status: '已完成' },
            { name: '原型设计', owner: '孙琪', date: '2026-05-08', status: '待开始' },
            { name: '开发启动', owner: '何瑞', date: '2026-05-20', status: '待开始' }
          ]
        },
        {
          id: 4,
          projectName: '全国营销预算归因分析',
          owner: '许诺',
          ownerAvatar: 'https://picsum.photos/40/40?random=14',
          department: '市场中心',
          status: '已完成',
          priority: 'P1',
          memberCount: 10,
          progress: 100,
          budget: 410000,
          deadline: '2026-03-30',
          region: '全国',
          client: '辰海消费科技',
          description: '打通投放、销售、ROI 数据链路，输出全国营销预算归因模型。',
          risks: ['历史数据质量'],
          milestones: [
            { name: '模型验收', owner: '许诺', date: '2026-03-12', status: '已完成' },
            { name: '复盘汇报', owner: '刘泽', date: '2026-03-25', status: '已完成' }
          ]
        }
      ]
    }
  },
  computed: {
    filteredTableData() {
      return this.tableData.filter((item) => {
        const matchStatus = !this.query.status || item.status === this.query.status
        const keyword = (this.query.keyword || '').trim()
        const matchKeyword = !keyword || item.projectName.includes(keyword) || item.owner.includes(keyword) || item.client.includes(keyword)
        return matchStatus && matchKeyword
      })
    }
  },
  methods: {
    formatCurrency(value) {
      return `¥${Number(value || 0).toLocaleString('zh-CN')}`
    },
    getStatusType(status) {
      const statusMap = {
        进行中: 'primary',
        待启动: 'info',
        已延期: 'danger',
        已完成: 'success'
      }
      return statusMap[status] || 'info'
    },
    getPriorityType(priority) {
      const priorityMap = {
        P0: 'danger',
        P1: 'warning',
        P2: 'info'
      }
      return priorityMap[priority] || 'info'
    },
    getMilestoneType(status) {
      const statusMap = {
        已完成: 'success',
        进行中: 'primary',
        待开始: 'info',
        已延期: 'danger'
      }
      return statusMap[status] || 'info'
    },
    handleBatchExport() {
      this.$message.success('已触发复杂项目台账导出')
    },
    handleView(row) {
      this.$message.info(`查看项目：${row.projectName}`)
    },
    handleFollow(row) {
      this.$message.success(`已创建跟进事项：${row.projectName}`)
    },
    handleArchive(row) {
      this.$message.warning(`归档申请已提交：${row.projectName}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.table17-toolbar-left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.table17-search {
  width: 220px;
}

.table17-owner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.table17-expand {
  padding: 12px 18px;
  background: #fafafa;
}

.table17-expand__summary {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16px;
  margin-bottom: 14px;
}

.table17-expand__block {
  min-width: 0;
}

.table17-expand__title {
  margin-bottom: 6px;
  color: #606266;
  font-weight: 600;
}

.table17-expand__content {
  color: #606266;
  line-height: 1.7;
}

.table17-expand__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.table17-expand__inner-table {
  margin-top: 6px;
}

.amount-text {
  color: #e6a23c;
  font-weight: 600;
}
</style>
