<template>
  <div class="bs-demo-page">
    <div class="bs-demo-hero">
      <h2 class="bs-demo-hero__title">BaseDialog</h2>
      <p class="bs-demo-hero__desc">
        基于 Element UI <code>el-dialog</code> 封装。显隐用 <code>:visible.sync</code>；≤1024 强制宽 92% / 顶 5vh；面板宽 &lt; 960 时自动启用表单紧凑布局。
      </p>
    </div>

    <!-- ========== 1. 表单提交（保持原示例） ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>表单提交</h3>
        <p>表单校验通过后，用 <code>ref.setSubmitBtnLoading</code> 控制确定按钮 loading；默认 <code>appendToBody</code> 支持嵌套弹框。</p>
      </div>
      <div class="bs-demo-block__body">
        <el-button @click="isShowDialog = true">带表单 + setSubmitBtnLoading</el-button>
      </div>
    </section>

    <!-- ========== 独立弹框组件 ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>独立弹框组件</h3>
        <p>
          业务侧新建组件，内部 <code>import BaseDialog from '@/components/BaseDialog'</code>，
          页面用 <code>:is-show.sync</code> 打开；适合表单录入等封装场景。
        </p>
      </div>
      <div class="bs-demo-block__body">
        <el-button type="primary" @click="isShowNewDemoDialog = true">NewDemoDialog 综合录入</el-button>
      </div>
    </section>

    <!-- ========== 2. 基础用法 ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>基础用法</h3>
        <p>默认标题栏全屏按钮、底部取消 / 确定；监听 <code>@submit</code> 处理确认。</p>
      </div>
      <div class="bs-demo-block__body">
        <el-button @click="isShowDialog2 = true">基础弹框</el-button>
        <el-button @click="demo.size = true">自定义 width / top</el-button>
        <el-button @click="demo.mask = true">点击遮罩关闭</el-button>
        <el-button @click="demo.noFull = true">隐藏全屏按钮</el-button>
        <el-button @click="demo.destroy = true">关闭时销毁</el-button>
        <el-button @click="demo.customClass = true">customClass</el-button>
        <el-button @click="demo.noAppend = true">appendToBody=false</el-button>
        <el-button @click="openMountVisibleDemo">初始 visible=true</el-button>
      </div>
    </section>

    <!-- ========== 3. Footer ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>底部按钮</h3>
        <p>
          <code>showFooter</code> / <code>showCancel</code> / <code>showConfirm</code> 控制内置底部；
          也可通过 <code>#footer</code> 完全自定义。
        </p>
      </div>
      <div class="bs-demo-block__body">
        <el-button @click="demo.onlyOk = true">仅确定</el-button>
        <el-button @click="demo.onlyCancel = true">仅取消</el-button>
        <el-button @click="demo.noFooter = true">无底部</el-button>
        <el-button @click="demo.footerSlot = true">#footer 自定义</el-button>
      </div>
    </section>

    <!-- ========== 4. Loading ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>Loading</h3>
        <p>
          内容区用 <code>:body-loading</code>（append-to-body 时外层 v-loading 盖不住内容）；
          确定按钮用 <code>:submit-loading.sync</code> 或 <code>setSubmitBtnLoading</code>；
          整框遮罩用外层 <code>v-loading</code>。
        </p>
      </div>
      <div class="bs-demo-block__body">
        <el-button @click="demo.bodyLoading = true">内容区 bodyLoading</el-button>
        <el-button @click="demo.submitSync = true">submitLoading.sync</el-button>
        <el-button @click="demo.fullLoading = true">整框 v-loading</el-button>
      </div>
    </section>

    <!-- ========== 5. 插槽 ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>插槽</h3>
        <p>
          <code>#title</code> 自定义标题文案（保留全屏区）；
          <code>#headerActions</code> 替换全屏按钮区；
          <code>#header</code> 替换整块标题栏。
        </p>
      </div>
      <div class="bs-demo-block__body">
        <el-button @click="demo.titleSlot = true">#title</el-button>
        <el-button @click="demo.headerActions = true">#headerActions</el-button>
        <el-button @click="demo.headerSlot = true">#header</el-button>
      </div>
    </section>

    <!-- ========== 6. 事件 ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>事件</h3>
        <p>
          生命周期：<code>open → opened</code>，关闭：<code>close → closed</code>。
          监听 <code>@cancel</code> 后不会自动关闭，需自行将 <code>visible</code> 设为 false。
        </p>
      </div>
      <div class="bs-demo-block__body">
        <el-button @click="demo.lifecycle = true">open / opened / close / closed</el-button>
        <el-button @click="demo.cancel = true">@cancel 拦截</el-button>
      </div>
    </section>

    <!-- ========== 7. 高度 ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>高度策略</h3>
        <p>
          默认 <code>limitBodyHeight=true</code>：超高时 body 内滚动；
          设为 <code>false</code> 则弹框随内容增高。
        </p>
      </div>
      <div class="bs-demo-block__body">
        <el-button @click="demo.limitH = true">限高滚动（默认）</el-button>
        <el-button @click="demo.noLimitH = true">不限高</el-button>
      </div>
    </section>

    <!-- ========== 8. 窄面板表单适配 ========== -->
    <section class="bs-demo-block">
      <div class="bs-demo-block__head">
        <h3>窄面板表单适配</h3>
        <p>
          按<strong>弹框面板宽度</strong>（非视口）判断：&lt; 960px 时自动加 <code>bs-form-compact</code>（两列变通栏、控件铺满）。
          覆盖 <code>el-row / el-col</code>、平铺 / <code>inline</code>、<code>bs-form-multi-col</code>、
          校验错误、<code>bs-form-table-item</code>（宽/窄均贴齐单元格）、<code>input-width</code>。
          PC 可用窄 <code>width</code> 验证；也可缩小窗口（≤1024 时宽强制 92%）。
        </p>
      </div>
      <div class="bs-demo-block__body">
        <el-button type="success" @click="demo.compactNarrow = true">窄宽表单 row+col（700px）</el-button>
        <el-button type="success" @click="demo.compactForm = true">两列表单 row+col</el-button>
        <el-button type="success" @click="demo.compactEntry = true">录入控件 row+col</el-button>
        <el-button type="success" @click="demo.compactDate = true">时间日期 row+col</el-button>
        <el-button type="primary" @click="demo.compactMultiCol = true">保留多列 multi-col</el-button>
        <el-button type="warning" @click="demo.compactPlain = true">平铺表单项</el-button>
        <el-button type="warning" @click="demo.compactPlainNarrow = true">窄宽平铺（700px）</el-button>
        <el-button type="warning" @click="demo.compactPlainValid = true">平铺 + 校验错误</el-button>
        <el-button type="warning" @click="demo.compactInline = true">inline 表单</el-button>
        <el-button type="warning" @click="demo.compactInlineNarrow = true">窄宽 inline（700px）</el-button>
        <el-button type="success" @click="demo.compactTable = true">表格</el-button>
        <el-button type="success" @click="openCompactTableForm('90%')">表格内录入（宽）</el-button>
        <el-button type="success" @click="openCompactTableForm('700px')">表格内录入（窄）</el-button>
        <el-button type="success" @click="demo.compactLong = true">长内容限高</el-button>
      </div>
    </section>

    <!-- ==================== Dialogs ==================== -->

    <NewDemoDialog :is-show.sync="isShowNewDemoDialog" @success="onNewDemoDialogSuccess" />

    <!-- 1. 带表单 + setSubmitBtnLoading + 嵌套（appendToBody 默认 true） — 保持原实现 -->
    <BaseDialog ref="dialogRef" title="带表单弹框" :visible.sync="isShowDialog" cancel-text="取消" confirm-text="确定" @opened="onOpenedDialog" @closed="onClosedDialog" @submit="onDialogSubmit">
      <el-form ref="dialogFormRef" :model="dialogFormData" :inline="true" :rules="dialogFormRules" label-width="120px" size="small" :disabled="dialogIsLook">
        <el-form-item label="操作人:" prop="name1">
          <el-input v-model="dialogFormData.name1" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="级别:" prop="level">
          <el-select v-model="dialogFormData.level" placeholder="请选择" collapse-tags clearable>
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="dialogFormData.phone" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="金额:" prop="money">
          <el-input v-model="dialogFormData.money" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model="dialogFormData.age" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="创建时间:" prop="createDate">
          <el-date-picker v-model="dialogFormData.createDate" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="更新时间:" prop="updateDate">
          <el-date-picker v-model="dialogFormData.updateDate" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="处理状态:" prop="status">
          <el-select v-model="dialogFormData.status" placeholder="请选择" collapse-tags clearable>
            <el-option label="未处理" value="0" />
            <el-option label="已处理" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <el-input v-model="dialogFormData.content" placeholder="请输入" type="textarea" clearable />
        </el-form-item>
        <el-form-item label="启用:" prop="isUse">
          <el-radio-group v-model="dialogFormData.isUse">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="margin: 20px;">
        <el-button @click="isShowDialog2 = true">打开嵌套弹框（依赖 appendToBody）</el-button>
      </div>
    </BaseDialog>

    <!-- 基础（同时作为示例 1 的嵌套弹框） -->
    <BaseDialog title="提示" :visible.sync="isShowDialog2" width="40%" cancel-text="取消" confirm-text="确定" @submit="isShowDialog2 = false">
      <p>默认全屏按钮与底部取消 / 确定。嵌套场景依赖 <code>appendToBody</code>（默认 true）。</p>
    </BaseDialog>

    <BaseDialog title="自定义宽高位置" :visible.sync="demo.size" width="480px" top="20vh" cancel-text="取消" confirm-text="确定" @submit="demo.size = false">
      <p><code>width="480px"</code>、<code>top="20vh"</code>。视口 ≤1024 时组件仍强制 92% / 5vh。</p>
    </BaseDialog>

    <BaseDialog title="点击遮罩关闭" :visible.sync="demo.mask" width="40%" :close-on-click-modal="true" cancel-text="取消" confirm-text="确定" @submit="demo.mask = false">
      <p><code>close-on-click-modal=true</code>：点击遮罩可关闭。</p>
    </BaseDialog>

    <BaseDialog title="隐藏全屏" :visible.sync="demo.noFull" width="40%" :show-fullscreen="false" cancel-text="取消" confirm-text="确定" @submit="demo.noFull = false">
      <p><code>show-fullscreen=false</code>：标题栏不显示全屏切换。</p>
    </BaseDialog>

    <BaseDialog title="关闭时销毁" :visible.sync="demo.destroy" width="40%" :destroy-on-close="true" cancel-text="取消" confirm-text="确定" @opened="onDestroyOpened" @submit="demo.destroy = false">
      <p><code>destroy-on-close=true</code>：关闭后销毁内部 DOM。</p>
      <p>打开时间：{{ destroyDemoTime }}</p>
      <el-input v-model="destroyDemoInput" placeholder="输入后关闭再打开会重置" />
    </BaseDialog>

    <BaseDialog title="customClass" :visible.sync="demo.customClass" width="40%" custom-class="demo-dialog-highlight" cancel-text="取消" confirm-text="确定" @submit="demo.customClass = false">
      <p><code>custom-class</code> / <code>customClass</code> 会追加到 <code>bs-dialog-class</code>，用于业务样式。</p>
    </BaseDialog>

    <BaseDialog title="appendToBody=false" :visible.sync="demo.noAppend" width="40%" :append-to-body="false" cancel-text="取消" confirm-text="确定" @submit="demo.noAppend = false">
      <p><code>append-to-body=false</code>：挂在当前组件 DOM 内。嵌套弹框请保持默认 <code>true</code>。</p>
    </BaseDialog>

    <BaseDialog v-if="mountDemoAlive" title="初始 visible=true" :visible.sync="mountDemoVisible" width="700px" cancel-text="取消" confirm-text="确定" @closed="onMountDemoClosed" @submit="mountDemoVisible = false">
      <el-form :model="compactForm" label-width="90px" size="small">
        <el-form-item label="姓名">
          <el-input v-model="compactForm.name" placeholder="mounted 时 visible 已为 true" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="compactForm.dept" placeholder="请选择" clearable>
            <el-option label="研发部" value="rd" />
            <el-option label="产品部" value="pd" />
          </el-select>
        </el-form-item>
      </el-form>
      <p class="bs-demo-note">用 <code>v-if</code> 挂载且初始 <code>visible=true</code>，验证 <code>mounted</code> 内绑定 compact 监听。</p>
    </BaseDialog>

    <!-- Footer -->
    <BaseDialog title="仅确定" :visible.sync="demo.onlyOk" width="40%" :show-cancel="false" confirm-text="我知道了" @submit="demo.onlyOk = false">
      <p><code>show-cancel=false</code></p>
    </BaseDialog>

    <BaseDialog title="仅取消" :visible.sync="demo.onlyCancel" width="40%" :show-confirm="false" cancel-text="关闭">
      <p><code>show-confirm=false</code></p>
    </BaseDialog>

    <BaseDialog title="查看详情" :visible.sync="demo.noFooter" width="40%" :show-footer="false">
      <p><code>show-footer=false</code>：隐藏底部区域。</p>
      <p v-for="n in 8" :key="n">详情行 {{ n }}</p>
    </BaseDialog>

    <BaseDialog title="自定义 Footer" :visible.sync="demo.footerSlot" width="40%">
      <p>使用 <code>#footer</code> 完全自定义底部。</p>
      <template #footer>
        <div class="bs-dialog-footer">
          <el-button size="small" @click="demo.footerSlot = false">关闭</el-button>
          <el-button size="small" @click="$message.info('已重置')">重置</el-button>
          <el-button size="small" type="primary" @click="onFooterSave">保存草稿</el-button>
        </div>
      </template>
    </BaseDialog>

    <!-- Loading -->
    <BaseDialog title="内容区 Loading" :visible.sync="demo.bodyLoading" :body-loading.sync="bodyLoading" width="40%" cancel-text="取消" confirm-text="确定" @opened="onBodyLoadingOpened" @submit="demo.bodyLoading = false">
      <div v-if="detailInfo">
        <p>姓名：{{ detailInfo.name }}</p>
        <p>手机：{{ detailInfo.phone }}</p>
        <p>使用 <code>:body-loading.sync</code>，仅遮罩内容区。</p>
      </div>
    </BaseDialog>

    <BaseDialog title="submitLoading.sync" :visible.sync="demo.submitSync" width="40%" :submit-loading.sync="submitLoading" cancel-text="取消" confirm-text="确定" @submit="onSubmitSync">
      <p>使用 <code>:submit-loading.sync</code> 控制确定按钮 loading（也可用 <code>ref.setSubmitBtnLoading</code>）。</p>
    </BaseDialog>

    <BaseDialog v-loading="dialogLoading" title="整框 Loading" :visible.sync="demo.fullLoading" width="40%" cancel-text="取消" confirm-text="确定" @opened="onFullLoadingOpened" @submit="onFullLoadingSubmit">
      <p>外层 <code>v-loading</code> 覆盖标题、内容、底部。</p>
    </BaseDialog>

    <!-- 插槽 -->
    <BaseDialog :visible.sync="demo.titleSlot" width="40%" cancel-text="取消" confirm-text="确定" @submit="demo.titleSlot = false">
      <template #title>
        <span>
          <i class="el-icon-warning" style="color: #E6A23C; margin-right: 6px;" />
          自定义标题插槽
        </span>
      </template>
      <p>使用 <code>#title</code>，仍保留默认全屏按钮。</p>
    </BaseDialog>

    <BaseDialog title="自定义头部操作" :visible.sync="demo.headerActions" width="40%" cancel-text="取消" confirm-text="确定" @submit="demo.headerActions = false">
      <template #headerActions>
        <el-button type="text" size="mini" icon="el-icon-refresh" @click="$message.info('刷新')">刷新</el-button>
        <el-button type="text" size="mini" icon="el-icon-question" @click="$message.info('帮助')">帮助</el-button>
      </template>
      <p>使用 <code>#headerActions</code> 替换默认全屏按钮区域。</p>
    </BaseDialog>

    <BaseDialog :visible.sync="demo.headerSlot" width="40%" cancel-text="取消" confirm-text="确定" @submit="demo.headerSlot = false">
      <template #header>
        <div style="display: flex; align-items: center; justify-content: space-between; width: calc(100% - 40px);">
          <span class="el-dialog__title">完全自定义 Header</span>
          <el-tag size="mini" type="success">自定义</el-tag>
        </div>
      </template>
      <p>使用 <code>#header</code> 会替换整块标题栏（含默认全屏区）。</p>
    </BaseDialog>

    <!-- 事件 -->
    <BaseDialog title="生命周期事件" :visible.sync="demo.lifecycle" width="40%" cancel-text="取消" confirm-text="确定" @open="onEventOpen" @opened="onEventOpened" @close="onEventClose" @closed="onEventClosed" @submit="demo.lifecycle = false">
      <p>依次触发：open → opened；关闭时 close → closed。</p>
      <p v-for="(item, index) in eventLogs" :key="index">{{ item }}</p>
    </BaseDialog>

    <BaseDialog title="自定义取消" :visible.sync="demo.cancel" width="40%" cancel-text="取消" confirm-text="确定" @cancel="onCancelIntercept" @submit="demo.cancel = false">
      <p>监听 <code>@cancel</code> 后不会自动关闭，需自行设置 <code>visible=false</code>（本例二次确认）。</p>
    </BaseDialog>

    <!-- 高度 -->
    <BaseDialog title="限高滚动" :visible.sync="demo.limitH" width="40%" cancel-text="取消" confirm-text="确定" @submit="demo.limitH = false">
      <p>默认 <code>limit-body-height=true</code>，内容超出时 body 滚动。</p>
      <p v-for="n in 24" :key="n">长内容行 {{ n }}</p>
    </BaseDialog>

    <BaseDialog title="不限制内容高度" :visible.sync="demo.noLimitH" width="40%" :limit-body-height="false" cancel-text="取消" confirm-text="确定" @submit="demo.noLimitH = false">
      <p><code>limit-body-height=false</code>：弹框随内容增高。</p>
      <p v-for="n in 20" :key="n">长内容行 {{ n }}</p>
    </BaseDialog>

    <!-- 窄面板适配 -->
    <BaseDialog title="窄宽表单 row + col（面板 &lt; 960）" :visible.sync="demo.compactNarrow" width="700px" cancel-text="取消" confirm-text="确定" @submit="demo.compactNarrow = false">
      <el-form :model="compactForm" label-width="110px" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="compactForm.name" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="compactForm.phone" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门">
              <el-select v-model="compactForm.dept" placeholder="请选择" clearable>
                <el-option label="研发部" value="rd" />
                <el-option label="产品部" value="pd" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="bs-demo-note">width=700px 时面板宽 &lt; 960，应自动变为单列铺满。</p>
    </BaseDialog>

    <BaseDialog title="两列表单 row + col" :visible.sync="demo.compactForm" cancel-text="取消" confirm-text="保存" @submit="onCompactFormSubmit">
      <el-form ref="compactFormRef" :model="compactForm" :rules="compactFormRules" label-width="110px" size="small">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="compactForm.name" placeholder="请输入姓名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="compactForm.phone" placeholder="请输入手机号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="部门" prop="dept">
              <el-select v-model="compactForm.dept" placeholder="请选择部门" clearable>
                <el-option label="研发部" value="rd" />
                <el-option label="产品部" value="pd" />
                <el-option label="运营部" value="op" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="职级" prop="level">
              <el-select v-model="compactForm.level" placeholder="请选择职级" clearable>
                <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="入职日期" prop="joinDate">
              <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合同到期" prop="expireDate">
              <el-date-picker v-model="compactForm.expireDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="compactForm.age" :min="18" :max="65" controls-position="right" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="薪资" prop="salary">
              <el-input v-model="compactForm.salary" placeholder="请输入金额">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="compactForm.gender">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否在职" prop="onJob">
              <el-switch v-model="compactForm.onJob" active-text="在职" inactive-text="离职" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="技能" prop="skills">
              <el-checkbox-group v-model="compactForm.skills">
                <el-checkbox label="Vue" />
                <el-checkbox label="React" />
                <el-checkbox label="Node" />
                <el-checkbox label="Java" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="compactForm.remark" type="textarea" :rows="3" placeholder="请输入备注" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </BaseDialog>

    <BaseDialog title="录入控件合集 row + col" :visible.sync="demo.compactEntry" cancel-text="取消" confirm-text="确定" @submit="demo.compactEntry = false">
      <el-form :model="compactEntry" label-width="110px" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文本输入">
              <el-input v-model="compactEntry.text" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="compactEntry.password" type="password" placeholder="请输入密码" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="搜索">
              <el-input v-model="compactEntry.search" placeholder="搜索关键词" prefix-icon="el-icon-search" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数字">
              <el-input-number v-model="compactEntry.number" :min="0" :max="9999" :step="1" controls-position="right" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="前置单位">
              <el-input v-model="compactEntry.prependAmount" placeholder="请输入金额" clearable>
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="后置单位">
              <el-input v-model="compactEntry.appendWeight" placeholder="请输入重量" clearable>
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下拉单选">
              <el-select v-model="compactEntry.select" placeholder="请选择" clearable filterable>
                <el-option label="选项 A" value="a" />
                <el-option label="选项 B" value="b" />
                <el-option label="选项 C" value="c" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下拉多选">
              <el-select v-model="compactEntry.multiSelect" multiple collapse-tags placeholder="请选择" clearable>
                <el-option label="标签1" value="1" />
                <el-option label="标签2" value="2" />
                <el-option label="标签3" value="3" />
                <el-option label="标签4" value="4" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="级联选择">
              <el-cascader v-model="compactEntry.cascader" :options="cascaderOptions" clearable style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自动补全">
              <el-autocomplete v-model="compactEntry.autocomplete" :fetch-suggestions="queryAutocomplete" placeholder="输入关键词" clearable style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="input-width">
              <el-input v-model="compactEntry.inputWidth" class="input-width" placeholder="class=input-width" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评分">
              <el-rate v-model="compactEntry.rate" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="滑块">
              <el-slider v-model="compactEntry.slider" :max="100" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="多行文本">
              <el-input v-model="compactEntry.textarea" type="textarea" :rows="4" placeholder="多行内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </BaseDialog>

    <BaseDialog title="时间日期选择 row + col" :visible.sync="demo.compactDate" cancel-text="取消" confirm-text="确定" @submit="demo.compactDate = false">
      <el-form :model="compactDate" label-width="120px" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日期">
              <el-date-picker v-model="compactDate.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期时间">
              <el-date-picker v-model="compactDate.datetime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月">
              <el-date-picker v-model="compactDate.month" type="month" placeholder="选择月" value-format="yyyy-MM" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年">
              <el-date-picker v-model="compactDate.year" type="year" placeholder="选择年" value-format="yyyy" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="周">
              <el-date-picker v-model="compactDate.week" type="week" format="yyyy 第 WW 周" placeholder="选择周" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间">
              <el-time-picker v-model="compactDate.time" placeholder="选择时间" value-format="HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日期范围">
              <el-date-picker v-model="compactDate.daterange" type="daterange" range-separator="至" start-placeholder="开始" end-placeholder="结束" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="时间范围">
              <el-time-picker v-model="compactDate.timerange" is-range range-separator="至" start-placeholder="开始" end-placeholder="结束" value-format="HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日期时间范围">
              <el-date-picker v-model="compactDate.datetimerange" type="datetimerange" range-separator="至" start-placeholder="开始" end-placeholder="结束" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </BaseDialog>

    <!-- 无 row/col：直接挂 el-form-item，验证 label-top / 控件铺满 / last-child 底边距 -->
    <BaseDialog title="平铺表单项（无 row/col）" :visible.sync="demo.compactPlain" cancel-text="取消" confirm-text="确定" @submit="demo.compactPlain = false">
      <el-form :model="compactForm" label-width="110px" size="small">
        <el-form-item label="姓名">
          <el-input v-model="compactForm.name" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="compactForm.phone" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="compactForm.dept" placeholder="请选择" clearable>
            <el-option label="研发部" value="rd" />
            <el-option label="产品部" value="pd" />
            <el-option label="运营部" value="op" />
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="是否在职">
          <el-switch v-model="compactForm.onJob" active-text="在职" inactive-text="离职" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="compactForm.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <p class="bs-demo-note">表单项直接挂在 <code>el-form</code> 下，无 <code>el-row / el-col</code>。</p>
    </BaseDialog>

    <BaseDialog title="窄宽平铺（无 row/col）" :visible.sync="demo.compactPlainNarrow" width="700px" cancel-text="取消" confirm-text="确定" @submit="demo.compactPlainNarrow = false">
      <el-form :model="compactForm" label-width="110px" size="small">
        <el-form-item label="姓名">
          <el-input v-model="compactForm.name" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="compactForm.phone" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="input-width">
          <el-input v-model="compactEntry.inputWidth" class="input-width" placeholder="class=input-width，应铺满" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="compactForm.dept" placeholder="请选择" clearable>
            <el-option label="研发部" value="rd" />
            <el-option label="产品部" value="pd" />
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="compactForm.remark" type="textarea" :rows="2" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <p class="bs-demo-note">width=700px 触发 <code>bs-form-compact</code>：label 置顶、控件铺满；含 <code>input-width</code> class。</p>
    </BaseDialog>

    <BaseDialog title="inline 表单（无 row/col）" :visible.sync="demo.compactInline" cancel-text="取消" confirm-text="确定" @submit="demo.compactInline = false">
      <el-form :inline="true" :model="compactForm" label-width="80px" size="small">
        <el-form-item label="姓名">
          <el-input v-model="compactForm.name" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="compactForm.phone" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="compactForm.dept" placeholder="请选择" clearable>
            <el-option label="研发部" value="rd" />
            <el-option label="产品部" value="pd" />
            <el-option label="运营部" value="op" />
          </el-select>
        </el-form-item>
        <el-form-item label="职级">
          <el-select v-model="compactForm.level" placeholder="请选择" clearable>
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="compactForm.gender" placeholder="请选择" clearable>
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <p class="bs-demo-note">宽面板下为横向 inline；窄面板（全屏或缩窗）应变为纵向 label-top。</p>
    </BaseDialog>

    <BaseDialog title="窄宽 inline（无 row/col）" :visible.sync="demo.compactInlineNarrow" width="700px" cancel-text="取消" confirm-text="确定" @submit="demo.compactInlineNarrow = false">
      <el-form :inline="true" :model="compactForm" label-width="80px" size="small">
        <el-form-item label="姓名">
          <el-input v-model="compactForm.name" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="compactForm.phone" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="compactForm.dept" placeholder="请选择" clearable>
            <el-option label="研发部" value="rd" />
            <el-option label="产品部" value="pd" />
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-form-item>
      </el-form>
      <p class="bs-demo-note">width=700px 强制 compact：inline 应变为纵向 label-top、控件铺满。</p>
    </BaseDialog>

    <!-- 文档能力：compact 下 el-row 默认通栏；加 bs-form-multi-col 可保留多列 -->
    <BaseDialog title="保留多列 bs-form-multi-col" :visible.sync="demo.compactMultiCol" width="700px" cancel-text="取消" confirm-text="确定" @submit="demo.compactMultiCol = false">
      <el-form :model="compactForm" label-width="90px" size="small">
        <el-row :gutter="16" class="bs-form-multi-col">
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="compactForm.name" placeholder="保留两列" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="compactForm.phone" placeholder="保留两列" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="部门">
              <el-select v-model="compactForm.dept" placeholder="默认会变通栏" clearable>
                <el-option label="研发部" value="rd" />
                <el-option label="产品部" value="pd" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="默认会变通栏" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="bs-demo-note">第一行带 <code>bs-form-multi-col</code> 仍两列；第二行默认通栏。</p>
    </BaseDialog>

    <BaseDialog title="平铺 + 校验错误（无 row/col）" :visible.sync="demo.compactPlainValid" width="700px" cancel-text="取消" confirm-text="确定" @submit="onCompactPlainValidSubmit">
      <el-form ref="compactPlainValidRef" :model="compactForm" :rules="compactFormRules" label-width="110px" size="small">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="compactForm.name" placeholder="必填，点确定看错误位" clearable />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="compactForm.phone" placeholder="必填手机号" clearable />
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-select v-model="compactForm.dept" placeholder="必选" clearable>
            <el-option label="研发部" value="rd" />
            <el-option label="产品部" value="pd" />
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期" prop="joinDate">
          <el-date-picker v-model="compactForm.joinDate" type="date" placeholder="必选" value-format="yyyy-MM-dd" />
        </el-form-item>
      </el-form>
      <p class="bs-demo-note">空表直接点确定：错误文案应为 static，控件与错误间距用 <code>--bs-form-error-gap</code>。</p>
    </BaseDialog>

    <BaseDialog title="表格" :visible.sync="demo.compactTable" cancel-text="取消" confirm-text="确定" @opened="onCompactTableOpened" @submit="demo.compactTable = false">
      <el-form :inline="true" :model="compactTableQuery" size="small" class="demo-table-search">
        <el-form-item label="姓名">
          <el-input v-model="compactTableQuery.name" placeholder="请输入姓名" clearable @keyup.enter.native="onCompactTableSearch" />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="compactTableQuery.dept" placeholder="请选择" clearable>
            <el-option v-for="item in compactTableDeptOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="compactTableQuery.status" placeholder="请选择" clearable>
            <el-option label="在职" value="在职" />
            <el-option label="离职" value="离职" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onCompactTableSearch">查询</el-button>
          <el-button @click="onCompactTableReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="compactTablePageData" border stripe size="small" style="width: 100%;">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="姓名" min-width="90" />
        <el-table-column prop="dept" label="部门" min-width="100" />
        <el-table-column prop="phone" label="手机号" min-width="120" />
        <el-table-column prop="joinDate" label="入职日期" min-width="110" />
        <el-table-column prop="status" label="状态" min-width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '在职' ? 'success' : 'info'" size="mini">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$message.info(scope.row.name)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="compactTableTotal > 0"
        :total="compactTableTotal"
        :page.sync="compactTableQuery.page"
        :limit.sync="compactTableQuery.limit"
        :page-sizes="[5, 10, 20]"
        @pagination="onCompactTablePagination"
      />
    </BaseDialog>

    <BaseDialog :title="compactTableFormTitle" :visible.sync="demo.compactTableForm" :width="compactTableFormWidth" cancel-text="取消" confirm-text="保存" @submit="onCompactTableFormSubmit">
      <el-form ref="compactTableFormRef" :model="compactTableForm" :rules="compactTableFormRules" label-width="90px" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单据标题" prop="title">
              <el-input v-model="compactTableForm.title" placeholder="请输入标题" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务日期" prop="bizDate">
              <el-date-picker v-model="compactTableForm.bizDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="demo-detail-block">
          <div class="demo-detail-toolbar">
            <span class="demo-detail-title">明细</span>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addCompactTableRow">新增行</el-button>
          </div>
          <el-table :data="compactTableForm.rows" border size="small" class="demo-detail-table">
            <el-table-column label="姓名" min-width="160">
              <template slot-scope="scope">
                <el-form-item :prop="'rows.' + scope.$index + '.name'" :rules="compactTableFormRules.rowName" label-width="0" class="demo-table-form-item">
                  <el-input v-model="scope.row.name" size="mini" placeholder="姓名" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="数量" min-width="140">
              <template slot-scope="scope">
                <el-form-item :prop="'rows.' + scope.$index + '.qty'" :rules="compactTableFormRules.rowQty" label-width="0" class="demo-table-form-item">
                  <el-input-number v-model="scope.row.qty" size="mini" :min="1" :max="999" controls-position="right" style="width: 100%;" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="日期" min-width="180">
              <template slot-scope="scope">
                <el-form-item :prop="'rows.' + scope.$index + '.date'" :rules="compactTableFormRules.rowDate" label-width="0" class="demo-table-form-item">
                  <el-date-picker v-model="scope.row.date" type="date" size="mini" placeholder="日期" value-format="yyyy-MM-dd" style="width: 100%;" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="备注（无 form-item）" min-width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" size="mini" placeholder="裸 input，不强制 100%" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="mini" style="color: #F56C6C;" @click="removeCompactTableRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <p class="bs-demo-note">
        宽/窄均走 <code>bs-form-table-item</code>：单元格内 form-item 贴齐、空行保存后错误 static 撑高行。
        有 form-item 的控件在 compact 下拉满；备注列为裸控件，不强制 100%。
      </p>
    </BaseDialog>

    <BaseDialog title="长内容限高滚动" :visible.sync="demo.compactLong" cancel-text="取消" confirm-text="确定" @submit="demo.compactLong = false">
      <el-form :model="compactLongForm" label-width="100px" size="small">
        <el-row :gutter="20">
          <el-col v-for="n in 16" :key="n" :span="n % 4 === 0 ? 24 : 12">
            <el-form-item :label="'字段 ' + n">
              <el-input v-if="n % 4 === 1" v-model="compactLongForm['f' + n]" placeholder="请输入" clearable />
              <el-select v-else-if="n % 4 === 2" v-model="compactLongForm['f' + n]" placeholder="请选择" clearable>
                <el-option label="选项1" value="1" />
                <el-option label="选项2" value="2" />
              </el-select>
              <el-date-picker v-else-if="n % 4 === 3" v-model="compactLongForm['f' + n]" type="datetime" placeholder="选择时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" />
              <el-input v-else v-model="compactLongForm['f' + n]" type="textarea" :rows="2" placeholder="备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </BaseDialog>
  </div>
</template>

<script>
import { getDictLevel } from '@/api/tables/tables'
import * as checkUtils from '@/utils/checkUtils'
import { REGEX_phone } from '@/utils/checkUtils'
import Pagination from '@/components/Pagination'
import NewDemoDialog from './NewDemoDialog'

function createLongForm() {
  const form = {}
  for (let i = 1; i <= 16; i++) {
    form['f' + i] = ''
  }
  return form
}

function createDemoFlags() {
  return {
    size: false,
    mask: false,
    noFull: false,
    destroy: false,
    customClass: false,
    noAppend: false,
    onlyOk: false,
    onlyCancel: false,
    noFooter: false,
    footerSlot: false,
    bodyLoading: false,
    submitSync: false,
    fullLoading: false,
    titleSlot: false,
    headerActions: false,
    headerSlot: false,
    lifecycle: false,
    cancel: false,
    limitH: false,
    noLimitH: false,
    compactNarrow: false,
    compactForm: false,
    compactEntry: false,
    compactDate: false,
    compactPlain: false,
    compactPlainNarrow: false,
    compactPlainValid: false,
    compactInline: false,
    compactInlineNarrow: false,
    compactMultiCol: false,
    compactTable: false,
    compactTableForm: false,
    compactLong: false
  }
}

export default {
  components: { Pagination, NewDemoDialog },
  data() {
    return {
      // —— 示例 1：带表单 + setSubmitBtnLoading（保持原逻辑）——
      isShowDialog: false,
      isShowDialog2: false,
      isShowNewDemoDialog: false,
      dialogFormData: {
        name1: '',
        content: '',
        level: '',
        createDate: '',
        updateDate: '',
        isUse: '',
        status: '',
        phone: '',
        money: '',
        age: ''
      },
      dialogFormRules: {
        name1: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 10, message: '10字符以内', trigger: 'blur' }
        ],
        content: [
          { required: false, message: '请输入', trigger: 'blur' },
          { min: 1, max: 100, message: '100字符以内', trigger: 'blur' }
        ],
        level: [{ required: true, message: '请选择', trigger: 'blur' }],
        createDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        updateDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        status: [{ required: true, message: '请选择', trigger: 'blur' }],
        isUse: [{ required: true, message: '请选择', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: REGEX_phone, message: '请输入正确手机号' }
        ],
        money: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: checkUtils.REGEX_money, message: '请输入最多两位小数金额' }
        ],
        age: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '仅支持录入正整数' }
        ]
      },
      levelOptions: [],
      dialogIsLook: false,

      // —— 其余示例显隐 ——
      demo: createDemoFlags(),
      bodyLoading: false,
      dialogLoading: false,
      submitLoading: false,
      detailInfo: null,
      destroyDemoTime: '',
      destroyDemoInput: '',
      eventLogs: [],
      mountDemoAlive: false,
      mountDemoVisible: false,

      compactForm: {
        name: '',
        phone: '',
        dept: '',
        level: '',
        joinDate: '',
        expireDate: '',
        age: 25,
        salary: '',
        gender: '1',
        skills: [],
        onJob: true,
        remark: ''
      },
      compactFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: REGEX_phone, message: '请输入正确手机号' }
        ],
        dept: [{ required: true, message: '请选择部门', trigger: 'change' }],
        joinDate: [{ required: true, message: '请选择入职日期', trigger: 'change' }]
      },
      compactEntry: {
        text: '',
        password: '',
        search: '',
        textarea: '',
        number: 1,
        prependAmount: '',
        appendWeight: '',
        select: '',
        multiSelect: [],
        cascader: [],
        autocomplete: '',
        inputWidth: '',
        rate: 3,
        slider: 40
      },
      autocompleteOptions: [
        { value: 'Vue' },
        { value: 'Vue Router' },
        { value: 'Vuex' },
        { value: 'Element UI' },
        { value: 'Axios' }
      ],
      compactTableFormWidth: '90%',
      compactTableFormTitle: '表格内录入（宽）',
      cascaderOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            { value: 'sheji', label: '设计原则' },
            { value: 'daohang', label: '导航' }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            { value: 'basic', label: 'Basic' },
            { value: 'form', label: 'Form' }
          ]
        }
      ],
      compactDate: {
        date: '',
        datetime: '',
        daterange: [],
        month: '',
        year: '',
        week: '',
        time: '',
        timerange: '',
        datetimerange: []
      },
      compactTableQuery: {
        name: '',
        dept: '',
        status: '',
        page: 1,
        limit: 5
      },
      compactTableDeptOptions: ['研发部', '产品部', '运营部', '市场部', '人事部'],
      compactTableAllData: [
        { id: 1, name: '张三', dept: '研发部', phone: '13800000001', joinDate: '2022-01-12', status: '在职' },
        { id: 2, name: '李四', dept: '产品部', phone: '13800000002', joinDate: '2021-06-08', status: '在职' },
        { id: 3, name: '王五', dept: '运营部', phone: '13800000003', joinDate: '2020-03-20', status: '离职' },
        { id: 4, name: '赵六', dept: '研发部', phone: '13800000004', joinDate: '2023-09-01', status: '在职' },
        { id: 5, name: '钱七', dept: '市场部', phone: '13800000005', joinDate: '2019-11-15', status: '在职' },
        { id: 6, name: '孙八', dept: '人事部', phone: '13800000006', joinDate: '2021-02-18', status: '在职' },
        { id: 7, name: '周九', dept: '研发部', phone: '13800000007', joinDate: '2020-08-05', status: '离职' },
        { id: 8, name: '吴十', dept: '产品部', phone: '13800000008', joinDate: '2022-11-22', status: '在职' },
        { id: 9, name: '郑十一', dept: '运营部', phone: '13800000009', joinDate: '2018-04-30', status: '在职' },
        { id: 10, name: '冯十二', dept: '市场部', phone: '13800000010', joinDate: '2023-01-09', status: '在职' },
        { id: 11, name: '陈十三', dept: '人事部', phone: '13800000011', joinDate: '2019-07-14', status: '离职' },
        { id: 12, name: '褚十四', dept: '研发部', phone: '13800000012', joinDate: '2024-03-01', status: '在职' }
      ],
      compactTablePageData: [],
      compactTableTotal: 0,
      compactTableForm: {
        title: '',
        bizDate: '',
        rows: [
          { name: '', qty: 1, date: '', remark: '' },
          { name: '', qty: 1, date: '', remark: '' }
        ]
      },
      compactTableFormRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        bizDate: [{ required: true, message: '请选择业务日期', trigger: 'change' }],
        rowName: [{ required: true, message: '必填', trigger: 'blur' }],
        rowQty: [{ required: true, message: '必填', trigger: 'change' }],
        rowDate: [{ required: true, message: '必填', trigger: 'change' }]
      },
      compactLongForm: createLongForm()
    }
  },
  created() {
    this.requestDict()
  },
  methods: {
    requestDict() {
      getDictLevel()
        .then((res) => {
          if (res.code === 20000) {
            this.levelOptions = res.data
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error))
        })
    },

    // —— 示例 1（保持原实现）——
    onOpenedDialog() {
      if (this.levelOptions.length === 0) {
        this.requestDict()
      }
    },
    onClosedDialog() {
      console.log('onClosedDialog')
    },
    onNewDemoDialogSuccess(data) {
      console.log('NewDemoDialog success', data)
    },
    onDialogSubmit() {
      this.$refs.dialogFormRef.validate((valid) => {
        if (valid) {
          this.$refs.dialogRef.setSubmitBtnLoading(true)
          setTimeout(() => {
            this.$refs.dialogRef.setSubmitBtnLoading(false)
            this.isShowDialog = false
          }, 2000)
        }
      })
    },

    onDestroyOpened() {
      this.destroyDemoTime = this.$moment ? this.$moment().format('HH:mm:ss') : String(Date.now())
      this.destroyDemoInput = ''
    },
    onFooterSave() {
      this.$message.success('草稿已保存')
      this.demo.footerSlot = false
    },
    onBodyLoadingOpened() {
      this.detailInfo = null
      this.bodyLoading = true
      setTimeout(() => {
        this.detailInfo = { name: '张三', phone: '13800138000' }
        this.bodyLoading = false
      }, 1500)
    },
    onSubmitSync() {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.demo.submitSync = false
      }, 1500)
    },
    onFullLoadingOpened() {
      this.dialogLoading = true
      setTimeout(() => {
        this.dialogLoading = false
      }, 1500)
    },
    onFullLoadingSubmit() {
      this.dialogLoading = true
      setTimeout(() => {
        this.dialogLoading = false
        this.demo.fullLoading = false
      }, 1500)
    },
    onCancelIntercept() {
      this.$confirm('确认关闭弹框？', '提示', { type: 'warning' })
        .then(() => {
          this.demo.cancel = false
        })
        .catch(() => {})
    },
    pushEventLog(name) {
      const time = this.$moment ? this.$moment().format('HH:mm:ss') : ''
      this.eventLogs.unshift(`${time} ${name}`)
      if (this.eventLogs.length > 8) {
        this.eventLogs.pop()
      }
    },
    onEventOpen() {
      this.eventLogs = []
      this.pushEventLog('open')
    },
    onEventOpened() {
      this.pushEventLog('opened')
    },
    onEventClose() {
      this.pushEventLog('close')
    },
    onEventClosed() {
      this.pushEventLog('closed')
    },
    onCompactFormSubmit() {
      this.$refs.compactFormRef.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功')
          this.demo.compactForm = false
        }
      })
    },
    onCompactPlainValidSubmit() {
      this.$refs.compactPlainValidRef.validate((valid) => {
        if (valid) {
          this.$message.success('校验通过')
          this.demo.compactPlainValid = false
        }
      })
    },
    queryAutocomplete(queryString, cb) {
      const list = this.autocompleteOptions
      const results = queryString
        ? list.filter((item) => item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        : list
      cb(results)
    },
    openCompactTableForm(width) {
      this.compactTableFormWidth = width || '90%'
      this.compactTableFormTitle = width === '700px' ? '表格内录入（窄）' : '表格内录入（宽）'
      this.demo.compactTableForm = true
    },
    openMountVisibleDemo() {
      this.mountDemoVisible = true
      this.mountDemoAlive = true
    },
    onMountDemoClosed() {
      this.mountDemoAlive = false
      this.mountDemoVisible = false
    },
    onCompactTableOpened() {
      this.onCompactTableSearch()
    },
    getCompactTableFilteredList() {
      const name = (this.compactTableQuery.name || '').trim()
      const { dept, status } = this.compactTableQuery
      return this.compactTableAllData.filter((row) => {
        if (name && row.name.indexOf(name) === -1) return false
        if (dept && row.dept !== dept) return false
        if (status && row.status !== status) return false
        return true
      })
    },
    loadCompactTablePage() {
      const list = this.getCompactTableFilteredList()
      this.compactTableTotal = list.length
      const { page, limit } = this.compactTableQuery
      const maxPage = Math.max(1, Math.ceil(list.length / limit) || 1)
      if (page > maxPage) {
        this.compactTableQuery.page = maxPage
      }
      const start = (this.compactTableQuery.page - 1) * limit
      this.compactTablePageData = list.slice(start, start + limit)
    },
    onCompactTableSearch() {
      this.compactTableQuery.page = 1
      this.loadCompactTablePage()
    },
    onCompactTableReset() {
      this.compactTableQuery.name = ''
      this.compactTableQuery.dept = ''
      this.compactTableQuery.status = ''
      this.compactTableQuery.page = 1
      this.loadCompactTablePage()
    },
    onCompactTablePagination() {
      this.loadCompactTablePage()
    },
    addCompactTableRow() {
      this.compactTableForm.rows.push({ name: '', qty: 1, date: '', remark: '' })
    },
    removeCompactTableRow(index) {
      if (this.compactTableForm.rows.length <= 1) {
        this.$message.warning('至少保留一行')
        return
      }
      this.compactTableForm.rows.splice(index, 1)
    },
    onCompactTableFormSubmit() {
      this.$refs.compactTableFormRef.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功')
          this.demo.compactTableForm = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-demo-page {
  padding: 16px 20px 40px;
  max-width: 1100px;
}

.bs-demo-hero {
  margin-bottom: 20px;
  padding: 20px 24px;
  background: #f7f8fa;
  border-radius: 4px;

  &__title {
    margin: 0 0 8px;
    font-size: 22px;
    font-weight: 600;
    color: #303133;
    line-height: 1.3;
  }

  &__desc {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: #606266;

    code {
      padding: 1px 5px;
      margin: 0 2px;
      font-size: 12px;
      background: #eef0f3;
      border-radius: 3px;
      color: #c7254e;
    }
  }
}

.bs-demo-block {
  margin-bottom: 16px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;

  &__head {
    padding: 14px 20px 10px;
    border-bottom: 1px solid #f0f2f5;

    h3 {
      margin: 0 0 6px;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      line-height: 1.4;
    }

    p {
      margin: 0;
      font-size: 13px;
      line-height: 1.6;
      color: #909399;

      code {
        padding: 1px 5px;
        margin: 0 2px;
        font-size: 12px;
        background: #f5f7fa;
        border-radius: 3px;
        color: #c7254e;
      }

      strong {
        color: #606266;
        font-weight: 600;
      }
    }
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
  }
}

.bs-demo-note {
  margin: 12px 0 0;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.demo-table-form-item {
  margin-bottom: 0;
}

.demo-detail-block {
  width: 100%;
  margin-top: 4px;
}

.demo-detail-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.demo-detail-title {
  font-size: 14px;
  color: #606266;
  line-height: 28px;
}

.demo-detail-table {
  width: 100%;
}

.demo-table-search {
  margin-bottom: 12px;
}
</style>

<style lang="scss">
.demo-dialog-highlight {
  border: 2px solid #409EFF;

  .el-dialog__header {
    background: #ecf5ff;
  }
}
</style>
