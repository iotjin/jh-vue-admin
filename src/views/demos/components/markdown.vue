<template>
  <div style="margin: 20px;">

    <div class="editor-container">
      <el-tag>Markdown is based on
        <a href="https://github.com/nhnent/tui.editor" target="_blank" style="color: red;">tui.editor</a> ，simply wrapped with Vue.
        <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/feature/component/markdown-editor.html" style="color: red;">
          Documentation </a>
      </el-tag>
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        Basic:
      </el-tag>
      <markdown-editor v-model="content1" height="500px" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        Markdown Mode:
      </el-tag>
      <markdown-editor ref="markdownEditorRef" v-model="content2" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        Customize Toolbar:
      </el-tag>
      <markdown-editor v-model="content3" :options="{ toolbarItems: toolbarItems}" />
      <!-- <markdown-editor v-model="content3" :options="{ toolbarItems: [['heading','bold','italic'], ['image']]}" @uploadImageEvent="uploadImage" /> -->
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        I18n:
      </el-tag>
      <el-alert :closable="false" title="You can change the language of the admin system to see the effect" type="success" />
      <markdown-editor ref="markdownEditorRef2" v-model="content4" :language="language" height="300px" />
    </div>

    <div class="editor-container">
      <div style="display: flex; justify-content: space-around;">
        <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtmlContent">
          Get HTML
        </el-button>
        <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="testUnsafeHtml">
          Get unsafe HTML
        </el-button>
        <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getMarkdownContent">
          Get Markdown - 组件内
        </el-button>
        <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getMarkdownContent2">
          Get Markdown2 - 页面实现
        </el-button>
      </div>

    </div>

    <div v-html="htmlValue" />
    <pre>{{ markdownValue }}</pre>

    <el-dialog title="Html内容预览" :visible.sync="isShowDialog" destroy-on-close>
      <!-- <div v-html="htmlValue" /> -->
      <markdown-editor v-model="content2" is-viewer />
    </el-dialog>

    <el-dialog title="Markdown内容预览-组件内" :visible.sync="isShowDialog2" destroy-on-close>
      <!-- <pre style="white-space: pre-wrap">{{ markdownValue }}</pre> -->
      <!-- <markdown-editor v-model="markdownValue" is-viewer /> -->
      <markdown-editor v-model="content4" is-viewer />
    </el-dialog>

    <el-dialog title="Markdown内容预览-页面实现" :visible.sync="isShowDialog3" @open="onDialogOpen">
      <div id="15" />
    </el-dialog>

    <el-dialog title="Unsafe HTML内容预览" :visible.sync="isShowDialog4" destroy-on-close>
      <div v-html="handleHtmlValue" />
      <p>注意：实际应用中请确保使用 DOMPurify 等工具来清理不安全的 HTML。</p>
      <p>DOMPurify是一个开源的基于DOM的快速XSS净化工具。输入HTML元素,然后通过DOM解析递归元素节点,进行净化,输出安全的HTML</p>
      <p>const safeHtmlText = DOMPurify.sanitize(htmlValue) </p>
    </el-dialog>

  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import '@toast-ui/editor/dist/toastui-editor.css' // editor style
import Editor from '@toast-ui/editor'
import DOMPurify from 'dompurify'

const content = `

**This is test**

* vue
* element
* webpack

## Normal Table

| Name  | Age | City     |
|-------|-----|----------|
| Alice | 25  | Tokyo    |
| Bob   | 30  | New York |
| Eva   | 28  | London   |

## Color Syntax Plugin

<span style="color:#86c1b9">Click the color picker button on the toolbar!</span>


## Code Syntax Highlighting Plugin

\`\`\`javascript
console.log('foo')
\`\`\`

\`\`\`html
<div id="editor"><span>baz</span></div>
\`\`\`


`

const introduction = `
![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

# Awesome Editor!

It has been *released as opensource in 2018* and has~~continually~~evolved to **receive 10k GitHub ⭐️ Stars**.

## Create Instance

You can create an instance with the following code and use \`getHtml()\` and \`getMarkdown()\` of the [Editor](https://github.com/nhn/tui.editor).

\`\`\`js
const editor = new Editor(options);
\`\`\`

> See the table below for default options
> 
> 
> > More API information can be found in the document

| name | type | description |
| ---- | ---- | ----------- |
| el | \`HTMLElement\` | container element |

## Features

* CommonMark + GFM Specifications
    * Live Preview
    * Scroll Sync
    * Auto Indent
    * Syntax Highlight
        1. Markdown
        2. Preview

## Support Wrappers

> * Wrappers
>     1. [x] React
>     2. [x] Vue
>     3. [ ] Ember
`

export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data() {
    return {
      content1: content,
      content2: content,
      content3: content,
      content4: introduction,
      htmlValue: '',
      markdownValue: '',
      languageTypeList: {
        en: 'en-US',
        zh: 'zh-CN',
        // 繁体
        zh_tw: 'zh-TW'
      },
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike']
        // ['hr', 'quote'],
        // ['ul', 'ol', 'task', 'indent', 'outdent'],
        // ['table', 'image', 'link'],
        // ['code', 'codeblock']
      ],
      isShowDialog: false,
      isShowDialog2: false,
      markdownText: `# Hello, Vue and Marked.js!

<p><span style="color: #ce9178;">This is test</span></p>

This is a sample markdown text. `,

      isShowDialog3: false,
      isShowDialog4: false,
      unsafeHtml1: '<img src="x" onerror="alert(\'XSS 测试\')">',
      unsafeHtml2: `
        <p>普通文本</p>
        <script>alert("XSS 攻击模拟")<\/script>
        <a href="javascript:alert(\'XSS 链接\')">点击我</a>
        <img src="x" onerror="alert('又来一次 XSS！')">
      `,
      handleHtmlValue: ''
    }
  },
  computed: {
    language() {
      return this.languageTypeList['zh']
    }
  },
  methods: {
    // Custom picture upload
    uploadImage(file, callback) {
      console.log('file', JSON.stringify(file))
      console.log('callback', JSON.stringify(callback))
      const reader = new FileReader()
      reader.onload = ({ target }) => {
        callback(target.result || '')
      }
      reader.readAsDataURL(file)
    },
    getHtmlContent() {
      this.htmlValue = this.$refs.markdownEditorRef.getHtml()
      console.log('---------- htmlValue ----------')
      console.log(this.htmlValue)
      this.isShowDialog = true
    },
    testUnsafeHtml() {
      // 直接使用 unsafeHtml1 和 unsafeHtml2
      this.handleHtmlValue = this.unsafeHtml2
      this.handleHtmlValue = DOMPurify.sanitize(this.unsafeHtml2)
      console.log('---------- handleHtmlValue ----------')
      console.log(this.handleHtmlValue)
      this.isShowDialog4 = true
    },
    getMarkdownContent() {
      this.markdownValue = this.$refs.markdownEditorRef2.getValue()
      console.log('---------- markdownValue ----------')
      console.log(this.markdownValue)

      this.isShowDialog2 = true
    },
    getMarkdownContent2() {
      this.markdownValue = this.$refs.markdownEditorRef2.getValue()
      console.log('---------- markdownValue2 ----------')
      console.log(this.markdownValue)

      this.isShowDialog3 = true
    },
    onDialogOpen() {
      // 等 Dialog 内容渲染完成再初始化 Viewer
      this.$nextTick(() => {
        if (this.editor) {
          this.editor.destroy()
        }
        this.editor = Editor.factory({
          el: document.getElementById('15'),
          viewer: true,
          initialValue: this.markdownValue
          // height: '300px'
        })
      })
    }
  }
}

/*

  https://github.com/markedjs/marked

npm install marked --save

import { marked } from 'marked'

    convertToHtml(text) {
      // const rawMarkdown = `Hello\n**这是一段加粗的文字**\n\n- 项目1\n- 项目2`
      const rawMarkdown = `# Hello, Vue and Marked.js!

This is a sample markdown text.`;
      const html = marked.parse(rawMarkdown)
      console.log('html', JSON.stringify(html))
      return html
    },

    另外：

    Markdown 解析后是 HTML，为防止 XSS 攻击，可以加一层 DOMPurify

    https://github.com/cure53/DOMPurify
    DOMPurify是一个开源的基于DOM的快速XSS净化工具。输入HTML元素,然后通过DOM解析递归元素节点,进行净化,输出安全的HTML

    npm install dompurify --save

    import DOMPurify from 'dompurify'

    const safeHtmlText = DOMPurify.sanitize(marked.parse(markdownText))

     另外一种
     npm install vue-dompurify-html
     <div v-dompurify-html="userProvidedHTML">

*/

</script>

<style lang="scss" scoped>
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
