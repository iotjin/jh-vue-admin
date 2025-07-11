<template>
  <div class="editor-wrapper">
    <!-- 工具栏 -->
    <Toolbar id="toolbar-container" :editor="editor" :default-config="toolbarConfig" :mode="mode" />
    <!-- 编辑器 -->
    <Editor id="editor-container" v-model="innerHtml" :default-config="editorConfig" :mode="mode" @on-change="handleChange" @onCreated="handleCreated" />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// API 引用
import { uploadFile } from '@/api/file'

export default {
  name: 'WangEditorWrapper',
  components: { Editor, Toolbar },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      innerHtml: this.value, // 本地值用于 v-model 双向绑定
      editor: null, // 编辑器实例
      mode: 'default', // 编辑器模式
      toolbarConfig: {}, // 工具条配置
      // 编辑器配置
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            // 自定义图片上传
            async customUpload(file, insertFn) {
              try {
                const response = await uploadFile(file)
                const url = response.data.url
                insertFn(url) // 插入图片 URL
              } catch (error) {
                console.error('Image upload failed:', error)
              }
            }
          }
        }
      }
    }
  },
  watch: {
    // 父组件 -> 子组件
    value(newVal) {
      if (newVal !== this.innerHtml && newVal !== this.editor.getHtml()) {
        this.innerHtml = newVal
      }
    },
    // 子组件 -> 父组件
    innerHtml(newVal) {
      if (newVal !== this.value) {
        this.$emit('input', newVal)
      }
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    handleCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    handleChange(editor) {
      this.innerHtml = editor.getHtml() // 更新 innerHtml
      console.log('Editor content changed:', this.innerHtml)
    }
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style lang="scss" scoped>
.editor-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;

  #toolbar-container {
    border-bottom: 1px solid #ccc;
  }

  #editor-container {
    flex-grow: 1;
  }
}
</style>

