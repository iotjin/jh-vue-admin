<!-- wangEditor 富文本编辑器示例 -->
<template>
  <div class="app-container">
    <!-- 编辑器区域 -->
    <WangEditor v-model="htmlValue" style="height: calc(100vh - 180px)" />

    <!-- 原始 HTML 展示区域 -->
    <div style="margin-top: 20px">
      <textarea v-model="htmlValue" readonly style="width: 100%; height: 200px; outline: none" />
    </div>
  </div>
</template>

<script>
import WangEditor from '@/components/WangEditor/index.vue'

export default {
  components: {
    WangEditor
  },
  data() {
    return {
      htmlValue: '<p>初始内容</p><p><br></p><pre><code class="language-javascript">console.log()</code></pre><p><br></p>'
    }
  }
}
</script>
