<!-- toast-ui/editor -->
<template>
  <div :id="id" />
</template>

<script>
// import 'codemirror/lib/codemirror.css' // codemirror
import '@toast-ui/editor/dist/toastui-editor.css' // editor style

import Editor from '@toast-ui/editor'
import defaultOptions from './default-options'

// i18n
import '@toast-ui/editor/dist/i18n/zh-cn'
import '@toast-ui/editor/dist/i18n/zh-tw'

// 文本颜色选择器
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
// import colorPicker from 'tui-color-picker'

// 代码高亮
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight' // 不是针对所有语言的代码高亮
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'

// const colorSyntaxOptions = {
//   preset: [
//     // 灰黑色调
//     '#181818',

//     // 基础色
//     '#000000', '#FFFFFF',

//     // 常用主色
//     '#FF0000', // 红
//     '#FFA500', // 橙
//     '#FFFF00', // 黄
//     '#008000', // 绿
//     '#0000FF', // 蓝
//     '#4B0082', // 靛
//     '#EE82EE', // 紫

//     // 网页常见颜色
//     '#808080', // 灰
//     '#A52A2A', // 棕
//     '#00FFFF', // 青
//     '#FFC0CB', // 粉
//     '#FFD700', // 金
//     '#800080' // 紫
//   ]
// }

export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    mode: {
      type: String,
      default: 'markdown' // wysiwyg | markdown
    },
    height: {
      type: String,
      required: false,
      default: '300px' // 300px | auto
    },
    language: {
      type: String,
      required: false,
      default: 'zh-CN' // 'en-US' | 'zh-CN' | 'zh-TW'
    },
    // previewStyle: tab | vertical
    isViewer: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)
      options.initialEditType = this.mode
      options.height = this.height
      options.language = this.language
      options.plugins = [
        colorSyntax,
        // [colorSyntax, colorSyntaxOptions],
        // [colorSyntax, { colorPicker }],
        codeSyntaxHighlight
      ]
      return options
    }
  },
  watch: {
    value(newValue, preValue) {
      if (this.isViewer) {
        if (newValue !== preValue) {
          this.editor.setMarkdown(newValue)
        }
      } else {
        if (newValue !== preValue && newValue !== this.editor.getMarkdown()) {
          this.editor.setMarkdown(newValue)
        }
      }
    },
    language(val) {
      this.destroyEditor()
      this.initEditor()
    },
    height(newValue) {
      this.editor.height(newValue)
    },
    mode(newValue) {
      this.editor.changeMode(newValue)
    },
    isViewer(val) {
      this.destroyEditor()
      this.initEditor()
    }
  },
  mounted() {
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      if (this.isViewer) {
        this.editor = Editor.factory({
          el: document.getElementById(this.id),
          ...this.editorOptions,
          viewer: true
        })
      } else {
        this.editor = new Editor({
          el: document.getElementById(this.id),
          ...this.editorOptions
        })
        this.editor.on('change', () => {
          this.$emit('input', this.editor.getMarkdown())
        })
      }

      if (this.value) {
        this.editor.setMarkdown(this.value)
      }

      this.editor.addHook('addImageBlobHook', (file, cb) => {
        if (typeof this.$listeners.uploadImageEvent === 'function') {
          this.$emit('uploadImageEvent', file, cb)
        } else {
          const reader = new FileReader()
          reader.onload = ({ target }) => {
            cb(target.result || '')
          }
          reader.readAsDataURL(file)
        }
      })
    },
    destroyEditor() {
      if (!this.editor) return
      this.editor.off('change')
      this.editor.destroy()
      this.editor = null
    },
    setValue(value) {
      this.editor.setMarkdown(value)
    },
    getValue() {
      return this.editor.getMarkdown()
    },
    setHtml(value) {
      this.editor.setHTML(value)
    },
    getHtml() {
      return this.editor.getHTML()
    }
  }
}
</script>

