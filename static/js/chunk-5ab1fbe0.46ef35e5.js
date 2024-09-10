(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ab1fbe0"],{a8dc:function(e,t,i){"use strict";i("bc42")},bc42:function(e,t,i){},e502:function(e,t,i){"use strict";i.r(t);var l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("H2",[e._v("上传文件")]),i("div",{staticClass:"bg"},[i("UploadFile",{ref:"uploadRef1",attrs:{"file-list":e.fileList1}})],1),i("H2",[e._v("上传图片")]),i("div",{staticClass:"bg"},[i("UploadFile",{ref:"uploadRef2",attrs:{"file-list":e.fileList2,"upload-type":"image","describe-text":"只能上传图片，且不超过20M"}})],1),i("H2",[e._v("上传图片，图片展示")]),i("div",{staticClass:"bg"},[i("UploadFile",{ref:"uploadRef3",attrs:{"file-list":e.fileList3,"before-upload":e.onBeforeUpload,"upload-type":"image","list-type":"picture-card"}})],1),i("H2",[e._v("上传图片，图片展示")]),i("div",{staticClass:"bg"},[i("UploadFile",{ref:"uploadRef4",attrs:{"file-list":e.fileList4,"upload-type":"image","list-type":"picture"}})],1),i("H2",[e._v("拖拽上传文件")]),i("div",{staticClass:"bg"},[i("UploadFile",{ref:"uploadRef5",attrs:{"file-list":e.fileList5,drag:""}})],1),i("div",{staticStyle:{"margin-bottom":"30px"}},[i("el-button",{on:{click:e.onSubmit}},[e._v("提交")])],1)],1)},a=[],s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.showUploadBtn?i("el-upload",e._b({ref:"upload",attrs:{action:e.fileUploadUrl,"file-list":e.documentList,limit:e.limit,"show-file-list":!0,multiple:e.multiple,drag:e.drag,"list-type":e.listType,"http-request":e.uploadRequest,"on-remove":e.onRemove,"before-upload":e.onBeforeUpload,"on-exceed":e.onExceed,"on-preview":e.onPreview}},"el-upload",e.$attrs,!1),["text"===e.listType||"picture"===e.listType?[e.drag?i("i",{staticClass:"el-icon-upload"}):e._e(),e.drag?i("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),i("em",[e._v("点击上传")])]):i("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v(e._s(e.uploadBtnText))]),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v(e._s(e.describeText))])]:"picture-card"===e.listType?[i("i",{staticClass:"el-icon-plus"})]:e._e()],2):e._e(),i("el-dialog",{attrs:{visible:e.isShowDialogImg},on:{"update:visible":function(t){e.isShowDialogImg=t}}},[i("img",{attrs:{width:"100%",src:e.previewImage,alt:""}})])],1)},o=[],n=(i("c740"),i("a434"),i("b0c0"),i("a9e3"),i("b775"));function r(e){var t=new FormData;return t.append("file",e),Object(n["a"])({url:"/api/v1/files",method:"post",data:t,headers:{"Content-Type":"multipart/form-data"}})}i("caad"),i("d3b7"),i("2532"),i("3ca3"),i("ddb0"),i("2b3d"),i("bf19"),i("9861");var d=i("2b0e");function u(e){var t=e.split(".");if(1===t.length)return!1;var i=t[t.length-1];return!!i&&(i=i.toLowerCase(),!!(i.includes("jpg")||i.includes("jpeg")||i.includes("jpe")||i.includes("png")||i.includes("gif")||i.includes("webp")||i.includes("svg")||i.includes("jfif")))}function p(e){var t=e.split(".");if(1===t.length)return!1;var i=t[t.length-1];return!!i&&(i=i.toLowerCase(),!!(i.includes("xls")||i.includes("xlsx")||i.includes("xltx")||i.includes("xltm")||i.includes("csv")))}function c(e){e.includes(".")?window.open(e):d["default"].prototype.$message.warning("The file format is not supported")}var f={props:{fileList:{type:Array,default:function(){return[]},required:!0},actions:{type:String,default:""},showUploadBtn:{type:Boolean,default:!0},uploadBtnText:{type:String,default:"Upload"},describeText:{type:String,default:"No larger than 20M"},limit:{type:Number,default:9},multiple:{type:Boolean,default:!0},drag:{type:Boolean,default:!1},listType:{type:String,default:"text"},uploadType:{type:String,default:"all"},beforeUpload:{type:Function,default:null}},data:function(){return{documentList:[],fileUploadUrl:"".concat("/prod-api","/api/v1/files"),isShowDialogImg:!1,previewImage:""}},watch:{actions:{handler:function(e){this.fileUploadUrl=e},immediate:!0},fileList:{handler:function(e){this.documentList=e},immediate:!0}},created:function(){},methods:{clearFiles:function(){this.$refs.upload.clearFiles()},onBeforeUpload:function(e){return this.beforeUpload?this.beforeUpload(e):this.defaultBeforeUpload(e)},defaultBeforeUpload:function(e){var t=e.size/1024/1024<20,i="application/x-msdownload"===e.type,l="text/javascript"===e.type;return i||l?(this.$message.error("This type of file is not allowed!"),!1):t?"image"!==this.uploadType||u(e.name)?!("excel"===this.uploadType&&!p(e.name))||(this.$message.error("Please upload excel file!"),!1):(this.$message.error("Please upload image file!"),!1):(this.$message.error("File size should be less than 20MB!"),!1)},uploadRequest:function(e){var t=this;r(e.file).then((function(i){if(2e4===i.code){var l={id:i.data.id,url:i.data.path,uid:e.file.uid,name:e.file.name};t.uploadSuccess(l)}else t.$message.warning("Failed to upload file. Error details: "+i.msg)})).catch((function(e){t.$message.error("Failed to upload file. Error details: ",e)}))},onExceed:function(e,t){this.$message.warning("最多选择 ".concat(this.limit," 个文件"))},uploadSuccess:function(e){this.documentList.push(e),this.$emit("success",e)},onRemove:function(e,t){var i=this.documentList.findIndex((function(t){return t.uid===e.uid||t.id===e.id}));-1!==i&&this.documentList.splice(i,1),this.$emit("remove",e,t)},onPreview:function(e){u(e.name)?(this.previewImage=e.url,this.isShowDialogImg=!0):c(e.url),this.$emit("preview",e)}}},m=f,g=i("2877"),h=Object(g["a"])(m,s,o,!1,null,"a1f4f1a8",null),v=h.exports,b={components:{UploadFile:v},data:function(){return{fileList1:[],fileList2:[],fileList3:[],fileList4:[],fileList5:[]}},mounted:function(){},methods:{onBeforeUpload:function(e){return!0},onSubmit:function(){}}},y=b,w=(i("a8dc"),Object(g["a"])(y,l,a,!1,null,"416f6114",null));t["default"]=w.exports}}]);