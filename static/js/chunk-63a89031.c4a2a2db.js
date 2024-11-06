(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63a89031"],{"217f":function(e,t,i){"use strict";i("a619")},3022:function(e,t,i){"use strict";i("e47d")},"53d2":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{attrs:{title:e.dialogTitle,"destroy-on-close":"",visible:e.isShowDialog,top:"8vh",width:"55%","close-on-click-modal":!1},on:{"update:visible":function(t){e.isShowDialog=t},opened:e.onOpenedDialog,closed:e.onClosedDialog}},[i("div",{staticClass:"bs-dialog"},[i("el-form",{ref:"dialogFormRef",attrs:{model:e.dialogFormData,inline:!0,rules:e.dialogFormRules,"label-width":"120px",size:"small",disabled:e.dialogIsLook}},[i("el-form-item",{attrs:{label:"菜单类型:",prop:"menuType"}},[i("el-select",{attrs:{placeholder:"请选择菜单类型",disabled:"add"!==e.dialogType,"collapse-tags":"",clearable:""},on:{change:e.onChange},model:{value:e.dialogFormData.menuType,callback:function(t){e.$set(e.dialogFormData,"menuType",t)},expression:"dialogFormData.menuType"}},e._l(e.menuTypeOptions,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),i("el-form-item",{attrs:{label:"菜单名称:",prop:"title"}},[i("el-input",{attrs:{placeholder:"请输入菜单名称",clearable:""},model:{value:e.dialogFormData.title,callback:function(t){e.$set(e.dialogFormData,"title",t)},expression:"dialogFormData.title"}})],1),"catalog"!==e.dialogFormData.menuType?i("el-form-item",{attrs:{label:"上级菜单:",prop:"parentId"}},[i("SingleSelectTree",{attrs:{placeholder:"请选择上级菜单",props:e.treeProps,data:e.menuTreeData},on:{selected:e.getTreeValue},model:{value:e.dialogFormData.parentId,callback:function(t){e.$set(e.dialogFormData,"parentId",t)},expression:"dialogFormData.parentId"}})],1):e._e(),i("el-form-item",{attrs:{label:"排序:",prop:"sort"}},[i("el-input",{attrs:{type:"number",placeholder:"请输入排序",clearable:""},model:{value:e.dialogFormData.sort,callback:function(t){e.$set(e.dialogFormData,"sort",t)},expression:"dialogFormData.sort"}})],1),i("el-form-item",{attrs:{label:"菜单编码:",prop:"code"}},[i("template",{slot:"label"},[i("span",[e._v("菜单编码:")]),i("el-tooltip",{staticClass:"item",attrs:{content:"button"!==e.dialogFormData.menuType?"对应路由path和name":"定义的按钮权限标识",effect:"dark"}},[i("i",{staticClass:"el-icon-question"})])],1),i("el-input",{attrs:{placeholder:"请输入菜单编码",clearable:""},model:{value:e.dialogFormData.code,callback:function(t){e.$set(e.dialogFormData,"code",t)},expression:"dialogFormData.code"}})],2),"menu"===e.dialogFormData.menuType?i("el-form-item",{staticClass:"input-width",attrs:{label:"组件路径:",prop:"component"}},[i("el-input",{attrs:{placeholder:"请输入组件路径",clearable:""},model:{value:e.dialogFormData.component,callback:function(t){e.$set(e.dialogFormData,"component",t)},expression:"dialogFormData.component"}},[i("span",{attrs:{slot:"prepend"},slot:"prepend"},[e._v("src/views/")])])],1):e._e(),i("el-form-item",{attrs:{label:"图标:",prop:"icon"}},[i("el-input",{attrs:{placeholder:"请输入图标",clearable:""},model:{value:e.dialogFormData.icon,callback:function(t){e.$set(e.dialogFormData,"icon",t)},expression:"dialogFormData.icon"}})],1),"button"!==e.dialogFormData.menuType?i("el-form-item",{attrs:{label:"状态:",prop:"hidden"}},[i("el-radio-group",{model:{value:e.dialogFormData.hidden,callback:function(t){e.$set(e.dialogFormData,"hidden",t)},expression:"dialogFormData.hidden"}},[i("el-radio",{attrs:{label:!0}},[e._v("隐藏")]),i("el-radio",{attrs:{label:!1}},[e._v("显示")])],1)],1):e._e()],1),e.dialogIsLook?e._e():i("div",{staticClass:"bs-dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.isShowDialog=!1}}},[e._v("取消")]),i("el-button",{attrs:{loading:e.dialogSubmitBtnLoading,size:"small",type:"primary"},on:{click:function(t){return e.onDialogSubmit()}}},[e._v("保存")])],1)],1)])],1)},l=[],n=(i("4de4"),i("5db7"),i("73d9"),i("e9c4"),i("b64b"),i("d3b7"),i("0643"),i("2382"),i("cd1a"),i("a6dc")),o=i("6f48"),r=i("965e"),s=i("a1ea"),c={components:{SingleSelectTree:r["default"],SelectTree:s["default"]},props:{isShow:{type:Boolean,default:!1},dialogType:{type:String,default:"add"},dialogData:{type:Object,default:function(){return{}}},title:{type:String,default:""},dialogTreeData:{type:Array,default:function(){return[]}}},data:function(){return{dialogTitle:"提示",isShowDialog:!1,dialogSubmitBtnLoading:!1,dialogIsLook:!1,dialogFormData:{id:"",menuType:"menu",title:"",parentId:"",parentTitle:"",sort:"",code:"",component:"",icon:"",hidden:""},initFormData:{},dialogFormRules:{menuType:[{required:!0,message:"请选择",trigger:["blur","change"]}],title:[{required:!0,message:"请输入",trigger:["blur","change"]},{min:1,max:32,message:"32字符以内",trigger:["blur","change"]}],parentId:[{required:!1,message:"请选择",trigger:["blur","change"]}],sort:[{required:!0,message:"请输入正确的排序号",trigger:["blur"]},{pattern:/^[1-9]\d{0,2}$/,message:"请输入0-999之间的正整数",trigger:["blur"]}],code:[{required:!0,message:"请输入",trigger:"blur"},{min:1,max:32,message:"32字符以内",trigger:"blur"}],component:[{required:!0,message:"请输入",trigger:["blur","change"]},{min:1,max:32,message:"32字符以内",trigger:["blur","change"]}],hidden:[{required:!0,message:"请选择",trigger:"blur"}]},menuTypeOptions:o["dictMenuType"],menuTreeData:[],treeProps:{value:"id",label:"title",children:"children"},treeProps2:{id:"id",label:"title",children:"children"}}},watch:{isShow:function(e){this.isShowDialog=e},isShowDialog:function(e){this.$emit("update:isShow",e)},dialogType:function(e){this.dialogTitle=this.title||("add"===e?"新增":"edit"===e?"编辑":"look"===e?"查看":this.dialogTitle),this.dialogIsLook="look"===e},dialogData:function(e){"add"===this.dialogType?this.dialogFormData=JSON.parse(JSON.stringify(this.initFormData)):this.dialogFormData=JSON.parse(JSON.stringify(e))},title:function(e){this.dialogTitle=e.length?e:this.dialogTitle},dialogTreeData:function(e){var t=JSON.parse(JSON.stringify(e));this.menuTreeData=this.filterTree(t,"button")}},created:function(){this.initFormData=JSON.parse(JSON.stringify(this.dialogFormData))},methods:{onOpenedDialog:function(){"add"===this.dialogType&&this.$refs["dialogFormRef"].clearValidate()},onClosedDialog:function(){this.dialogIsLook||this.$refs["dialogFormRef"].resetFields(),this.$emit("closed",{})},filterTree:function(e,t){var i=this;return e.filter((function(e){return e.menuType!==t&&(e.children&&e.children.length>0&&(e.children=i.filterTree(e.children,t)),!0)}))},filterTree2:function(e,t){var i=this;return e.flatMap((function(e){return e.menuType===t?[]:(e.children&&e.children.length>0&&(e.children=i.filterTree(e.children,t)),e)}))},onDialogSubmit:function(){var e=this;this.$refs["dialogFormRef"].validate((function(t){t&&e.submitRequest()}))},getTreeValue:function(e,t){},onChange:function(){this.dialogFormData.parentId="",this.dialogFormData.parentTitle="",this.dialogFormData.code="",this.dialogFormData.component="",this.dialogFormData.hidden="",this.$refs["dialogFormRef"].clearValidate()},submitRequest:function(){var e=this,t=JSON.parse(JSON.stringify(this.dialogFormData));"catalog"===this.dialogFormData.menuType&&(t.component="Layout"),"edit"===this.dialogType&&delete t.children;var i="add"===this.dialogType?"新增成功!":"编辑成功!";this.dialogSubmitBtnLoading=!0,Object(n["g"])(t).then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success(i),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))},submitRequest2:function(){var e=this,t=JSON.parse(JSON.stringify(this.dialogFormData));"catalog"===this.dialogFormData.menuType&&(t.component="Layout"),"edit"===this.dialogType&&delete t.children,this.dialogSubmitBtnLoading=!0;var i="add"===this.dialogType?"新增成功!":"编辑成功!",a="add"===this.dialogType?Object(n["a"])(t):Object(n["c"])(t);a.then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success(i),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))}}},d=c,u=(i("217f"),i("2877")),h=Object(u["a"])(d,a,l,!1,null,"db157bf6",null);t["default"]=h.exports},"5db7":function(e,t,i){"use strict";var a=i("23e7"),l=i("a2bf"),n=i("7b0b"),o=i("50c4"),r=i("1c0b"),s=i("65f0");a({target:"Array",proto:!0},{flatMap:function(e){var t,i=n(this),a=o(i.length);return r(e),t=s(i,0),t.length=l(t,i,i,a,0,1,e,arguments.length>1?arguments[1]:void 0),t}})},"6f48":function(e,t,i){"use strict";i.r(t),i.d(t,"dictMenuType",(function(){return a}));var a=[{value:"catalog",label:"目录"},{value:"menu",label:"菜单"},{value:"button",label:"按钮"}]},"73d9":function(e,t,i){var a=i("44d2");a("flatMap")},7821:function(e,t,i){},"965e":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-select",{ref:"selectRef",style:"width:"+e.width,attrs:{placeholder:e.placeholder,clearable:""},on:{clear:e.onClear},model:{value:e.selectText,callback:function(t){e.selectText=t},expression:"selectText"}},[i("el-input",{staticClass:"select-input",attrs:{placeholder:e.inputPlaceholder,clearable:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),i("el-option",{staticStyle:{height:"200px",overflow:"auto",background:"#fff"},attrs:{value:e.treeProps.value,label:e.treeProps.label}},[i("el-tree",{ref:"treeRef",attrs:{"node-key":e.treeProps.value,data:e.treeData,"highlight-current":"","filter-node-method":e.onFilterNode,props:e.treeProps},on:{"node-click":e.onClickNode}})],1)],1)],1)},l=[],n=(i("4de4"),i("d3b7"),i("0643"),i("2382"),{model:{prop:"value",event:"change"},props:{value:{type:[String,Array],default:null},data:{type:Array,default:function(){return[]}},props:{type:Object,default:function(){return{value:"id",label:"name",children:"children",parentId:"parentId"}}},placeholder:{type:String,default:"请选择"},inputPlaceholder:{type:String,default:"检索关键字"},width:{type:String,default:""},disabled:{type:Boolean,default:!1}},data:function(){return{treeData:[],treeProps:{},keyword:"",selectText:"",selectValue:""}},watch:{selectText:function(e){var t=this.selectValue||null;this.$emit("change",t)},value:{handler:function(e){if(e&&e.length){var t=Array.isArray(e)?e:[e];this.$nextTick((function(){this.$refs.treeRef.setCheckedKeys(t);var e=this.$refs.treeRef.getCheckedNodes();e&&e.length>0?this.setLableValue(e[0][this.treeProps.label],e[0][this.treeProps.value]):this.setLableValue("","")}))}else this.setLableValue("","")},immediate:!0},data:{handler:function(e){this.treeData=e&&e.length?e:[]},immediate:!0},props:{handler:function(e){this.treeProps=e},immediate:!0},keyword:function(e){this.$refs.treeRef.filter(e)}},created:function(){},methods:{onFilterNode:function(e,t){return!e||-1!==t[this.treeProps.label].indexOf(e)},onClear:function(){this.setLableValue("","")},onClickNode:function(e){this.$refs.selectRef.blur(),this.setLableValue(e[this.treeProps.label],e[this.treeProps.value]),this.$emit("selected",e[this.treeProps.value],e)},setLableValue:function(e,t){this.selectText=e,this.selectValue=t}}}),o=n,r=(i("a07d"),i("2877")),s=Object(r["a"])(o,a,l,!1,null,"1ba3c989",null);t["default"]=s.exports},a07d:function(e,t,i){"use strict";i("d11f")},a1ea:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowSelect,expression:"isShowSelect"}],staticClass:"mask"}),i("el-popover",{attrs:{placement:"bottom-start",width:e.popoverWidth,trigger:"manual"},on:{hide:e.popoverHide},model:{value:e.isShowSelect,callback:function(t){e.isShowSelect=t},expression:"isShowSelect"}},[i("el-input",{staticClass:"selectInput",attrs:{placeholder:"检索关键字",clearable:""},model:{value:e.filterString,callback:function(t){e.filterString=t},expression:"filterString"}}),i("el-tree",{ref:"tree",staticClass:"common-tree",attrs:{width:e.width,data:e.treeData,props:e.obj,"show-checkbox":e.multiple,"node-key":e.obj.id,"check-strictly":e.checkStrictly,"default-expanded-keys":e.defaultKeys,"expand-on-click-node":e.multiple&&e.expandClickNode,"check-on-click-node":e.checkClickNode,"highlight-current":!0,"filter-node-method":e.filterNode},on:{"check-change":e.nodeClick,"node-click":e.nodeClick}}),i("el-select",{ref:"select",staticClass:"tree-select",attrs:{slot:"reference",size:e.size,multiple:e.multiple,clearable:e.clearable,"collapse-tags":e.collapseTags},on:{"remove-tag":e.removeTag,clear:e.clean},nativeOn:{click:function(t){return e.selectClick(t)}},slot:"reference",model:{value:e.returnDataKeys,callback:function(t){e.returnDataKeys=t},expression:"returnDataKeys"}},e._l(e.options,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),i("el-row",[e.multiple?i("el-button",{staticClass:"ok",attrs:{size:"mini",type:"text"},on:{click:function(t){e.isShowSelect=!1}}},[e._v("确定")]):e._e()],1)],1)],1)},l=[],n=(i("99af"),i("4de4"),i("d81d"),i("e9c4"),i("a9e3"),i("d3b7"),i("25f0"),i("0643"),i("2382"),i("a573"),{name:"SelectTree",props:{data:{type:Array,default:function(){return[]}},obj:{type:Object,required:!1,default:function(){return{id:"id",label:"name",children:"children",path:"path",content:"content",pid:"pid"}}},multiple:{type:Boolean,default:function(){return!1}},clearable:{type:Boolean,default:function(){return!1}},collapseTags:{type:Boolean,default:function(){return!1}},checkStrictly:{type:Boolean,default:function(){return!1}},checkClickNode:{type:Boolean,default:function(){return!1}},expandClickNode:{type:Boolean,default:function(){return!1}},defaultKey:{type:[Number,String,Array,Object],default:function(){return[]}},defaultKeys:{type:[Number,String,Array,Object],default:function(){return[]}},filterText:{type:String,default:function(){return""}},isLastNode:{type:Boolean,default:function(){return!0}},size:{type:String,default:function(){return"small"}},width:{type:String,default:function(){return"100%"}},height:{type:String,default:function(){return"300px"}}},data:function(){return{popoverWidth:"0px",isShowSelect:!1,options:[],returnDatas:[],returnDataKeys:[],filterString:""}},computed:{treeData:function(){return-1!==JSON.stringify(this.data).indexOf(this.obj.children)?this.data:this.switchTree()}},watch:{isShowSelect:function(e){this.$refs.select.blur()},treeData:function(){var e=this;this.$nextTick((function(){e.init()}))},filterString:function(e){this.$refs.tree.filter(e)}},mounted:function(){this.filterText&&(this.filterString=this.filterText)},methods:{init:function(){if(void 0!==this.defaultKey&&this.defaultKey.length>0)if(this.multiple){if(-1===Object.prototype.toString.call(this.defaultKey).indexOf("Array"))return;if(-1!==Object.prototype.toString.call(this.defaultKey[0]).indexOf("Object"))this.setDatas(this.defaultKey);else{if(-1===Object.prototype.toString.call(this.defaultKey[0]).indexOf("Number")&&-1===Object.prototype.toString.call(this.defaultKey[0]).indexOf("String"))return;this.setKeys(this.defaultKey)}}else{if(-1===Object.prototype.toString.call(this.defaultKey).indexOf("Number")&&-1===Object.prototype.toString.call(this.defaultKey).indexOf("String")&&-1===Object.prototype.toString.call(this.defaultKey).indexOf("Object"))return;this.setKey(this.defaultKey)}},selectClick:function(){return this.$nextTick((function(){this.popoverWidth=this.$refs.select.$el.clientWidth-26})),this.isShowSelect=!this.isShowSelect},nodeClick:function(e,t){var i=this;if(this.multiple){var a=this.$refs.tree.getCheckedKeys(this.isLastNode),l=[];this.options=a.map((function(e){var t=i.$refs.tree.getNode(e);return l.push(t.data),{label:t.label,value:t.key}})),this.returnDataKeys=this.options.map((function(e){return e.value})),this.returnDatas=l}else this.isShowSelect=!1,this.setKey(t.key)},clean:function(){this.$refs.tree.setCurrentKey(null),this.returnDatas=null,this.returnDataKeys="",this.popoverHide()},setKey:function(e){this.$refs.tree.setCurrentKey(e);var t=this.$refs.tree.getNode(e);this.setData(t.data)},setData:function(e){this.options=[],this.options.push({label:e[this.obj.label],value:e[this.obj.id]}),this.returnDatas=e,this.returnDataKeys=e[this.obj.id]},setKeys:function(e){var t=this;this.$refs.tree.setCheckedKeys(e),this.returnDataKeys=e;var i=[];e.map((function(e){var a=t.$refs.tree.getNode(e);return i.push(a.data),{label:a.label,value:a.key}})),this.returnDatas=i,this.popoverHide()},setDatas:function(e){var t=this;this.$refs.tree.setCheckedNodes(e),this.returnDatas=e;var i=[];e.map((function(e){i.push(e[t.obj.id])})),this.returnDataKeys=i,this.popoverHide()},removeTag:function(e){var t=this;this.$refs.tree.setChecked(e,!1);var i=this.$refs.tree.getNode(e);!this.checkStrictly&&i.childNodes.length>0&&this.treeToList(i).map((function(e){e.childNodes.length<=0&&t.$refs.tree.setChecked(e,!1)})),this.nodeClick(),this.popoverHide()},popoverHide:function(){this.$emit("getValue",this.returnDataKeys,this.returnDatas)},clearSelectedNodes:function(){for(var e=this.$refs.tree.getCheckedKeys(this.isLastNode),t=0;t<e.length;t++)this.$refs.tree.setChecked(e[t],!1)},filterNode:function(e,t){return!e||-1!==t[this.obj.label].indexOf(e)},treeToList:function(e){var t=[],i=[];t=t.concat(e);while(t.length){var a=t.shift();a.childNodes&&(t=t.concat(a.childNodes)),i.push(a)}return i},switchTree:function(){return this.buildTree(this.data,this.defaultValue)},buildTree:function(e,t){var i=this,a=function(t){for(var l=[],n=0;n<e.length;n++){var o=e[n];o[i.obj.pid]===t&&(o[i.obj.children]=a(o[i.obj.id]),l.push(o))}return l};return a(t)}}}),o=n,r=(i("e0b5"),i("2877")),s=Object(r["a"])(o,a,l,!1,null,"3460530a",null);t["default"]=s.exports},a2bf:function(e,t,i){"use strict";var a=i("e8b5"),l=i("50c4"),n=i("0366"),o=function(e,t,i,r,s,c,d,u){var h,p=s,f=0,m=!!d&&n(d,u,3);while(f<r){if(f in i){if(h=m?m(i[f],f,t):i[f],c>0&&a(h))p=o(e,t,h,l(h.length),p,c-1)-1;else{if(p>=9007199254740991)throw TypeError("Exceed the acceptable array length");e[p]=h}p++}f++}return p};e.exports=o},a619:function(e,t,i){},b462:function(e,t,i){"use strict";i("ca24")},ca24:function(e,t,i){},cd1a:function(e,t,i){"use strict";var a=i("23e7"),l=i("1c0b"),n=i("825a"),o=i("35a1"),r=i("c5cc"),s=i("9bdd"),c=r((function(e){var t,i,a,r,c=this.iterator;while(1){if(r=this.innerIterator){if(t=n(this.innerNext.call(r)),!t.done)return t.value;this.innerIterator=this.innerNext=null}if(t=n(this.next.call(c,e)),this.done=!!t.done)return;if(i=s(c,this.mapper,t.value),a=o(i),void 0===a)throw TypeError(".flatMap callback should return an iterable object");this.innerIterator=r=n(a.call(i)),this.innerNext=l(r.next)}}));a({target:"Iterator",proto:!0,real:!0},{flatMap:function(e){return new c({iterator:n(this),mapper:l(e),innerIterator:null,innerNext:null})}})},d11f:function(e,t,i){},d13e:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"hamburger-container"},[i("svg",{staticClass:"hamburger",class:{"is-active":e.sidebar.opened},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64"},on:{click:e.toggleClick}},[i("path",{attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"}})]),i("div",{staticClass:"back-home",on:{click:e.backClick}},[i("span",[e._v("返回首页")])])])},l=[],n=i("5530"),o=i("2f62"),r={name:"Hamburger",props:{isActive:{type:Boolean,default:!1}},computed:Object(n["a"])({},Object(o["b"])(["sidebar"])),methods:{toggleClick:function(){this.$store.dispatch("app/toggleSideBar")},backClick:function(){this.$router.push({path:"/"})}}},s=r,c=(i("b462"),i("2877")),d=Object(c["a"])(s,a,l,!1,null,"09d35cbc",null);t["a"]=d.exports},e0b5:function(e,t,i){"use strict";i("7821")},e47d:function(e,t,i){},f794:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bs-page-body"},[i("Hamburger"),i("el-form",{staticClass:"bs-form-search mt10",attrs:{inline:!0,size:"small",model:e.queryParams}},[i("el-form-item",[i("span",{staticClass:"bs-form-label",staticStyle:{width:"120px"}},[i("i",{staticClass:"icon"},[e._v("菜单名称:")])]),i("el-input",{attrs:{maxlength:"20",placeholder:"请输入菜单名称",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.requestList(t)}},model:{value:e.queryParams.title,callback:function(t){e.$set(e.queryParams,"title",t)},expression:"queryParams.title"}})],1),i("el-form-item",[i("span",{staticClass:"bs-form-label",staticStyle:{width:"120px"}},[i("i",{staticClass:"icon"},[e._v("菜单编码:")])]),i("el-input",{attrs:{maxlength:"20",placeholder:"请输入菜单编码",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.requestList(t)}},model:{value:e.queryParams.code,callback:function(t){e.$set(e.queryParams,"code",t)},expression:"queryParams.code"}})],1),i("el-form-item",[i("el-button",{staticClass:"bs-form-btn",attrs:{size:"small",type:"primary"},on:{click:e.requestList}},[e._v("查询")])],1)],1),i("div",{staticClass:"bs-page-table"},[i("div",{staticClass:"bs-table-btns"},[i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"menu-add"},expression:"{action:'menu-add'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.onClickAdd}},[e._v(" 新增 ")]),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"menu-edit"},expression:"{action:'menu-edit'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-edit",disabled:1!==e.selectedRows.length},on:{click:e.onClickEdit}},[e._v(" 编辑 ")]),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"menu-look"},expression:"{action:'menu-look'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-search",disabled:1!==e.selectedRows.length},on:{click:e.onClickLook}},[e._v(" 查看 ")]),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"menu-delete"},expression:"{action:'menu-delete'}"}],attrs:{size:"small",type:"danger",icon:"el-icon-delete",disabled:1!==e.selectedRows.length},on:{click:e.onClickDelete}},[e._v(" 删除 ")]),i("el-button",{attrs:{plain:"",size:"small",icon:e.isExpandAll?"el-icon-arrow-down":"el-icon-arrow-right"},on:{click:e.onClickToggleExpand}},[e._v(" "+e._s(e.isExpandAll?"全部收起":"全部展开")+" ")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"tableRef",staticClass:"bs-table",attrs:{data:e.tableData,"tree-props":e.treeProps,"row-key":"id","default-expand-all":!1,stripe:!0,"header-cell-style":e.headerStyle,"cell-style":e.cellStyle},on:{"selection-change":e.onSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55px"}}),i("el-table-column",{attrs:{label:"菜单名称","min-width":"180px"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",{on:{click:function(i){return e.onClickLook(t.row)}}},[i("a",{staticStyle:{color:"#00a0e9","text-decoration":"underline"}},[t.row.icon.includes("el-icon")?i("i",{class:"iconFont "+t.row.icon}):t.row.icon.length?i("svg-icon",{staticClass:"iconFont",attrs:{"icon-class":t.row.icon}}):e._e(),e._v(" "+e._s(t.row.title)+" ")],1)])]}}])}),i("el-table-column",{attrs:{label:"菜单类型","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{class:e.customStyle(t.row)},[e._v(e._s(e.getDictLabel(t.row.menuType,e.menuTypeOptions)))])]}}])}),i("el-table-column",{attrs:{prop:"code",label:"菜单编码","min-width":"170px"}}),i("el-table-column",{attrs:{prop:"sort",label:"排序"}}),i("el-table-column",{attrs:{label:"可见"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("button"===t.row.menuType?"":t.row.hidden?"隐藏":"显示")+" ")]}}])}),i("el-table-column",{attrs:{prop:"component",label:"组件路径","min-width":"220px"}}),i("el-table-column",{attrs:{prop:"parentTitle",label:"上级菜单"}}),i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"menu-edit"},expression:"{action:'menu-edit'}"}],attrs:{size:"mini",icon:"el-icon-edit-outline"},on:{click:function(i){return e.onClickEdit(t.row)}}}),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"menu-delete"},expression:"{action:'menu-delete'}"}],attrs:{size:"mini",icon:"el-icon-delete",type:"danger"},on:{click:function(i){return e.onClickDelete(t.row)}}})]}}])})],1)],1),i("AddDialog",{attrs:{"dialog-type":e.dialogType,"is-show":e.isShowDialog,"dialog-data":e.dialogFormData,"dialog-tree-data":e.dialogTreeData},on:{"update:isShow":function(t){e.isShowDialog=t},"update:is-show":function(t){e.isShowDialog=t},success:e.requestList,closed:e.onClosedDialog}})],1)},l=[],n=(i("c740"),i("a15b"),i("d81d"),i("e9c4"),i("b64b"),i("d3b7"),i("0643"),i("4e3e"),i("a573"),i("159b"),i("a6dc")),o=i("6f48"),r=i("d13e"),s=i("53d2"),c={components:{Hamburger:r["a"],AddDialog:s["default"]},data:function(){return{tableLoading:!1,tableData:[],queryParams:{title:"",code:""},treeProps:{children:"children",hasChildren:"hasChildren"},selectedRows:[],menuTypeOptions:o["dictMenuType"],isExpandAll:!1,isShowDialog:!1,dialogType:"",dialogFormData:{},dialogTreeData:[]}},mounted:function(){this.requestList()},methods:{requestList:function(){var e=this,t=JSON.parse(JSON.stringify(this.queryParams));this.tableLoading=!0,Object(n["d"])(t).then((function(t){e.tableLoading=!1,2e4===t.code?e.tableData=t.data:e.$message.error(t.msg)})).catch((function(t){e.tableLoading=!1}))},headerStyle:function(e){e.row;var t=e.column;e.rowIndex,e.columnIndex;return"菜单名称"===t["label"]?{textAlign:"left",paddingLeft:"10px"}:{textAlign:"center"}},cellStyle:function(e){e.row;var t=e.column;e.rowIndex,e.columnIndex;return{textAlign:"菜单名称"===t["label"]?"left":"center"}},customStyle:function(e){return"b-tag b-tag-"+e.menuType},onSelectionChange:function(e){this.selectedRows=e},getDictLabel:function(e,t){var i=t.findIndex((function(t){return t.value===e}));if(-1!==i)return t[i].label},onClickAdd:function(){this.dialogType="add",this.dialogFormData={},this.dialogTreeData=this.tableData,this.isShowDialog=!0},onClickEdit:function(e){var t=JSON.parse(JSON.stringify(e&&e.id?e:this.selectedRows[0]));this.dialogType="edit",this.dialogFormData=t,this.dialogTreeData=this.tableData,this.isShowDialog=!0},onClickLook:function(e){var t=JSON.parse(JSON.stringify(e&&e.id?e:this.selectedRows[0]));this.dialogType="look",this.dialogFormData=t,this.dialogTreeData=this.tableData,this.isShowDialog=!0},onClickDelete:function(e){var t=this,i="";i=e&&e.id?e.title:this.selectedRows.map((function(e){return e.title})).join(","),this.$confirm("确定要删除菜单 ".concat(i," （如果包含子菜单，将一并删除），此操作将永久删除, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var i={ids:[]};if(e&&e.id)i.ids=[e.id];else{var a=t.selectedRows.map((function(e){return e.id}));i.ids=a.join(",")}t.deleteRequest(i)}))},deleteRequest:function(e){var t=this;Object(n["b"])(e).then((function(e){2e4===e.code?(t.$message.success("删除成功!"),t.requestList()):t.$message.error(e.msg)}))},onClickToggleExpand:function(){this.isExpandAll=!this.isExpandAll,this.toggleRowExpansionAll(this.tableData,this.isExpandAll)},toggleRowExpansionAll:function(e,t){var i=this;e.forEach((function(e){i.$refs.tableRef.toggleRowExpansion(e,t),void 0!==e.children&&null!==e.children&&i.toggleRowExpansionAll(e.children,t)}))},onClosedDialog:function(){this.$refs.tableRef.clearSelection()}}},d=c,u=(i("3022"),i("2877")),h=Object(u["a"])(d,a,l,!1,null,"1fd9904f",null);t["default"]=h.exports}}]);