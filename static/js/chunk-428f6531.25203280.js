(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-428f6531"],{"223a":function(e,t,i){},"333d":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[i("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},o=[];i("a9e3");Math.easeInOutQuad=function(e,t,i,a){return e/=a/2,e<1?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function s(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function l(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(e,t,i){var a=l(),o=e-a,r=20,c=0;t="undefined"===typeof t?500:t;var d=function e(){c+=r;var l=Math.easeInOutQuad(c,a,o,t);s(l),c<t?n(e):i&&"function"===typeof i&&i()};d()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.currentPage=1,this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&r(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&r(0,800)}}},d=c,u=(i("b5f9"),i("2877")),g=Object(u["a"])(d,a,o,!1,null,"430a81d8",null);t["a"]=g.exports},"33dc":function(e,t,i){},3528:function(e,t,i){"use strict";i.d(t,"d",(function(){return o})),i.d(t,"g",(function(){return n})),i.d(t,"a",(function(){return s})),i.d(t,"b",(function(){return l})),i.d(t,"c",(function(){return r})),i.d(t,"e",(function(){return c})),i.d(t,"f",(function(){return d}));var a=i("b775");function o(e){return Object(a["a"])({url:"/v1/api/role/list",method:"get",params:e})}function n(e){return Object(a["a"])({url:"/v1/api/role/save",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/v1/api/role/save",method:"post",data:e})}function l(e){return Object(a["a"])({url:"/v1/api/role/delete",method:"post",data:e})}function r(e){return Object(a["a"])({url:"/v1/api/role/save",method:"post",data:e})}function c(e){return Object(a["a"])({url:"/v1/api/roles/byUserId",method:"get",params:e})}function d(e){return Object(a["a"])({url:"/v1/api/role/setPermissions",method:"post",data:e})}},"70eb":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bs-page-body"},[i("Hamburger"),i("el-form",{staticClass:"bs-form-search mt10",attrs:{inline:!0,size:"small",model:e.queryParams}},[i("el-form-item",[i("span",{staticClass:"bs-form-label",staticStyle:{width:"120px"}},[i("i",{staticClass:"icon"},[e._v("角色名称:")])]),i("el-input",{attrs:{maxlength:"20",placeholder:"请输入角色名称",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSearch(t)}},model:{value:e.queryParams.name,callback:function(t){e.$set(e.queryParams,"name",t)},expression:"queryParams.name"}})],1),i("el-form-item",[i("span",{staticClass:"bs-form-label",staticStyle:{width:"120px"}},[i("i",{staticClass:"icon"},[e._v("角色编码:")])]),i("el-input",{attrs:{maxlength:"20",placeholder:"请输入角色编码",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSearch(t)}},model:{value:e.queryParams.code,callback:function(t){e.$set(e.queryParams,"code",t)},expression:"queryParams.code"}})],1),i("el-form-item",[i("el-button",{staticClass:"bs-form-btn",attrs:{size:"small",type:"primary"},on:{click:e.onSearch}},[e._v("查询")])],1)],1),i("div",{staticClass:"bs-page-table"},[i("div",{staticClass:"bs-table-btns"},[i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-add"},expression:"{action:'role-add'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.onClickAdd}},[e._v(" 新增 ")]),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-edit"},expression:"{action:'role-edit'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-edit",disabled:1!==e.selectedRows.length},on:{click:e.onClickEdit}},[e._v(" 编辑 ")]),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-look"},expression:"{action:'role-look'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-search",disabled:1!==e.selectedRows.length},on:{click:e.onClickLook}},[e._v(" 查看 ")]),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-delete"},expression:"{action:'role-delete'}"}],attrs:{size:"small",type:"danger",icon:"el-icon-delete",disabled:0==e.selectedRows.length},on:{click:e.onClickDelete}},[e._v(" 删除 ")]),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-setting"},expression:"{action:'role-setting'}"}],attrs:{size:"small",type:"warning",icon:"el-icon-setting",disabled:1!==e.selectedRows.length},on:{click:e.onClickAuthRole}},[e._v(" 权限配置 ")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"tableRef",staticClass:"bs-table",attrs:{data:e.tableData,stripe:!0,"header-cell-style":{textAlign:"center"},"cell-style":{textAlign:"center"}},on:{"selection-change":e.onSelectionChange}},[i("el-table-column",{attrs:{prop:"number",type:"index",label:"序号"}}),i("el-table-column",{attrs:{type:"selection",width:"55",selectable:e.isEditable}}),i("el-table-column",{attrs:{label:"角色名称",width:""},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",{on:{click:function(i){return e.onClickRow(t.row)}}},[i("a",{staticStyle:{color:"#00a0e9","text-decoration":"underline"}},[e._v(e._s(t.row.name))])])]}}])}),i("el-table-column",{attrs:{prop:"code",label:"角色编码",width:""}}),i("el-table-column",{attrs:{label:"是否内置"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("0"===t.row.builtin?"否":"是")+" ")]}}])}),i("el-table-column",{attrs:{label:"备注","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tooltip",{attrs:{"visible-arrow":!1,effect:"light",content:t.row.notes,placement:"bottom"}},[i("span",{staticClass:"bs-tooltip-text"},[e._v(" "+e._s(t.row.notes)+" ")])])]}}])}),i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-edit"},expression:"{action:'role-edit'}"}],attrs:{size:"mini",icon:"el-icon-edit-outline",disabled:!e.isEditable(t.row)},on:{click:function(i){return e.onClickEdit(t.row)}}}),i("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-delete"},expression:"{action:'role-delete'}"}],attrs:{size:"mini",icon:"el-icon-delete",type:"danger",disabled:!e.isEditable(t.row)},on:{click:function(i){return e.onClickDelete(t.row)}}}),i("span",{staticStyle:{"padding-left":"10px"}}),i("el-dropdown",[i("el-button",{attrs:{size:"mini",disabled:!e.isEditable(t.row)}},[e._v(" 更多"),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{directives:[{name:"permission",rawName:"v-permission",value:{action:"role-setting"},expression:"{action:'role-setting'}"}],attrs:{slot:"dropdown",disabled:!e.isEditable(t.row)},slot:"dropdown"},[i("el-dropdown-item",{nativeOn:{click:function(i){return e.onClickAuthRole(t.row)}}},[i("i",{staticClass:"el-icon-setting"}),e._v("权限配置")])],1)],1)]}}])})],1),i("Pagination",{directives:[{name:"show",rawName:"v-show",value:e.tableTotal>0,expression:"tableTotal>0"}],attrs:{total:e.tableTotal,page:e.queryParams.page,limit:e.queryParams.limit},on:{"update:page":function(t){return e.$set(e.queryParams,"page",t)},"update:limit":function(t){return e.$set(e.queryParams,"limit",t)},pagination:e.requestList}})],1),i("AddDialog",{attrs:{"dialog-type":e.dialogType,"is-show":e.isShowDialog,"dialog-data":e.dialogFormData},on:{"update:isShow":function(t){e.isShowDialog=t},"update:is-show":function(t){e.isShowDialog=t},success:e.requestList,closed:e.onClosedDialog}}),i("AuthDialog",{attrs:{"is-show":e.isShowDialogAuthRole,"dialog-data":e.authRoleData},on:{"update:isShow":function(t){e.isShowDialogAuthRole=t},"update:is-show":function(t){e.isShowDialogAuthRole=t},success:e.requestList,closed:e.onClosedDialog}})],1)},o=[],n=(i("b64b"),i("e9c4"),i("caad"),i("2532"),i("b0c0"),i("a15b"),i("d81d"),i("3528")),s=i("333d"),l=i("d13e"),r=i("c253"),c=i("d729"),d={components:{Pagination:s["a"],Hamburger:l["a"],AddDialog:r["default"],AuthDialog:c["default"]},data:function(){return{tableTotal:0,tableLoading:!1,tableData:[],queryParams:{page:1,limit:this.pageGroup.size,name:"",code:""},selectedRows:[],isShowDialog:!1,dialogType:"",dialogFormData:{},isShowDialogAuthRole:!1,authRoleData:{}}},created:function(){this.requestList()},methods:{requestList:function(){var e=this,t=JSON.parse(JSON.stringify(this.queryParams));this.tableLoading=!0,Object(n["d"])(t).then((function(t){e.tableLoading=!1,2e4===t.code?(e.tableData=t.data,e.tableTotal=t.total):e.$message.error(t.msg)})).catch((function(t){e.tableLoading=!1}))},onSearch:function(){this.queryParams.page=1,this.requestList()},isEditable:function(e){return!e.code.toLowerCase().includes("admin")},onSelectionChange:function(e){this.selectedRows=e},onClickAdd:function(){this.dialogType="add",this.dialogFormData={},this.isShowDialog=!0},onClickEdit:function(e){var t=JSON.parse(JSON.stringify(e&&e.id?e:this.selectedRows[0]));this.dialogType="edit",this.dialogFormData=t,this.isShowDialog=!0},onClickLook:function(e){var t=JSON.parse(JSON.stringify(e&&e.id?e:this.selectedRows[0]));this.dialogType="look",this.dialogFormData=t,this.isShowDialog=!0},onClickDelete:function(e){var t=this,i="";i=e&&e.id?e.name:this.selectedRows.map((function(e){return e.name})).join(","),this.$confirm("确定要删除角色 ".concat(i," ，此操作将永久删除, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var i={ids:[]};if(e&&e.id)i.ids=[e.id];else{var a=t.selectedRows.map((function(e){return e.id}));i.ids=a.join(",")}t.deleteRequest(i)}))},deleteRequest:function(e){var t=this;Object(n["b"])(e).then((function(e){2e4===e.code?(t.$message.success("删除成功!"),t.requestList()):t.$message.error(e.msg)}))},onClickAuthRole:function(e){var t=JSON.parse(JSON.stringify(e&&e.id?e:this.selectedRows[0]));this.authRoleData=t,this.isShowDialogAuthRole=!0},onClickRow:function(e){this.dialogType="look",this.dialogFormData=JSON.parse(JSON.stringify(e)),this.isShowDialog=!0},onClosedDialog:function(){this.$refs.tableRef.clearSelection()}}},u=d,g=i("2877"),m=Object(g["a"])(u,a,o,!1,null,"8de4a1f4",null);t["default"]=m.exports},b35e:function(e,t,i){},b408:function(e,t,i){"use strict";i("223a")},b5f9:function(e,t,i){"use strict";i("b35e")},ba3d:function(e,t,i){"use strict";i("33dc")},c253:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,top:"8vh",width:"55%","close-on-click-modal":!1},on:{"update:visible":function(t){e.isShowDialog=t},opened:e.onOpenedDialog,closed:e.onClosedDialog}},[i("div",{staticClass:"bs-dialog"},[i("el-form",{ref:"dialogFormRef",attrs:{model:e.dialogFormData,inline:!0,rules:e.dialogFormRules,"label-width":"120px",size:"small",disabled:e.dialogIsLook}},[i("el-form-item",{attrs:{label:"角色名称:",prop:"name"}},[i("el-input",{attrs:{placeholder:"请输入角色名称",clearable:""},model:{value:e.dialogFormData.name,callback:function(t){e.$set(e.dialogFormData,"name",t)},expression:"dialogFormData.name"}})],1),i("el-form-item",{attrs:{label:"角色编码:",prop:"code"}},[i("el-input",{attrs:{placeholder:"请输入角色编码",clearable:""},model:{value:e.dialogFormData.code,callback:function(t){e.$set(e.dialogFormData,"code",t)},expression:"dialogFormData.code"}})],1),i("el-form-item",{attrs:{label:"备注:",prop:"notes"}},[i("el-input",{attrs:{placeholder:"请输入备注",type:"textarea",maxlength:"100","show-word-limit":"",clearable:""},model:{value:e.dialogFormData.notes,callback:function(t){e.$set(e.dialogFormData,"notes",t)},expression:"dialogFormData.notes"}})],1),"add"!==e.dialogType?i("el-form-item",{attrs:{label:"是否内置:",prop:"builtin"}},[i("el-radio-group",{model:{value:e.dialogFormData.builtin,callback:function(t){e.$set(e.dialogFormData,"builtin",t)},expression:"dialogFormData.builtin"}},[i("el-radio",{attrs:{label:"1",disabled:""}},[e._v("是")]),i("el-radio",{attrs:{label:"0",disabled:""}},[e._v("否")])],1)],1):e._e()],1),e.dialogIsLook?e._e():i("div",{staticClass:"bs-dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.isShowDialog=!1}}},[e._v(" 取消 ")]),i("el-button",{attrs:{loading:e.dialogSubmitBtnLoading,size:"small",type:"primary"},on:{click:function(t){return e.onDialogSubmit()}}},[e._v(" 保存 ")])],1)],1)])],1)},o=[],n=(i("b64b"),i("e9c4"),i("3528")),s={components:{},props:{isShow:{type:Boolean,default:!1},dialogType:{type:String,default:"add"},dialogData:{type:Object,default:function(){return{}}},title:{type:String,default:""}},data:function(){return{dialogTitle:"提示",isShowDialog:!1,dialogSubmitBtnLoading:!1,dialogIsLook:!1,dialogFormData:{id:"",name:"",code:"",notes:"",builtin:"0"},initFormData:{},dialogFormRules:{name:[{required:!0,message:"请输入",trigger:["blur"]},{min:1,max:32,message:"32字符以内",trigger:["blur"]}],code:[{required:!0,message:"请输入",trigger:["blur"]},{min:1,max:32,message:"32字符以内",trigger:["blur"]}]}}},watch:{isShow:function(e){this.isShowDialog=e},isShowDialog:function(e){this.$emit("update:isShow",e)},title:function(e){this.dialogTitle=e.length?e:this.dialogTitle},dialogData:function(e){"add"===this.dialogType?this.dialogFormData=JSON.parse(JSON.stringify(this.initFormData)):this.dialogFormData=JSON.parse(JSON.stringify(e))},dialogType:function(e){this.dialogTitle=this.title||("add"===e?"新增":"edit"===e?"编辑":"look"===e?"查看":this.dialogTitle),this.dialogIsLook="look"===e}},created:function(){this.initFormData=JSON.parse(JSON.stringify(this.dialogFormData))},methods:{onOpenedDialog:function(){},onClosedDialog:function(){this.dialogIsLook||this.$refs["dialogFormRef"].resetFields(),this.$emit("closed",{})},onDialogSubmit:function(){var e=this;this.$refs["dialogFormRef"].validate((function(t){t&&e.submitRequest()}))},submitRequest:function(){var e=this,t=JSON.parse(JSON.stringify(this.dialogFormData)),i="add"===this.dialogType?"新增成功!":"编辑成功!";this.dialogSubmitBtnLoading=!0,Object(n["g"])(t).then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success(i),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))},submitRequest2:function(){var e=this,t=JSON.parse(JSON.stringify(this.dialogFormData));this.dialogSubmitBtnLoading=!0;var i="add"===this.dialogType?"新增成功!":"编辑成功!",a="add"===this.dialogType?Object(n["a"])(t):Object(n["c"])(t);a.then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success(i),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))}}},l=s,r=i("2877"),c=Object(r["a"])(l,a,o,!1,null,"5adec6a0",null);t["default"]=c.exports},d13e:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"hamburger-container"},[i("svg",{staticClass:"hamburger",class:{"is-active":e.sidebar.opened},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64"},on:{click:e.toggleClick}},[i("path",{attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"}})]),i("div",{staticClass:"back-home",on:{click:e.backClick}},[i("span",[e._v("返回首页")])])])},o=[],n=i("5530"),s=i("2f62"),l={name:"Hamburger",props:{isActive:{type:Boolean,default:!1}},computed:Object(n["a"])({},Object(s["b"])(["sidebar"])),methods:{toggleClick:function(){this.$store.dispatch("app/toggleSideBar")},backClick:function(){this.$router.push({path:"/"})}}},r=l,c=(i("b408"),i("2877")),d=Object(c["a"])(r,a,o,!1,null,"09d35cbc",null);t["a"]=d.exports},d729:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,top:"8vh",width:"55%","close-on-click-modal":!1},on:{"update:visible":function(t){e.isShowDialog=t},opened:e.onOpenedDialog,closed:e.onClosedDialog}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogLoading,expression:"dialogLoading"}],staticClass:"bs-dialog"},[i("div",{staticStyle:{margin:"-10px 0px 20px"}},[e._v(" 选中角色："+e._s(e.roleData.name)+" ")]),i("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"菜单权限",name:"first"}},[i("div",{staticStyle:{padding:"0 5px 15px"}},[i("el-button",{attrs:{size:"mini",type:"primary",icon:e.isExpandAll?"el-icon-arrow-down":"el-icon-arrow-right"},on:{click:e.onClickToggleExpand}},[e._v(" "+e._s(e.isExpandAll?"全部收起":"全部展开")+" ")]),i("el-button",{attrs:{size:"mini",type:"primary",icon:e.isSelectAll?"el-icon-close":"el-icon-check"},on:{click:e.onClickSelectAll}},[e._v(" "+e._s(e.isSelectAll?"全部取消":"全部选择")+" ")])],1),i("div",{staticClass:"tree-body"},[i("el-tree",{ref:"treeRef",attrs:{data:e.menuTreeData,"show-checkbox":"","check-on-click-node":!0,"node-key":"id","highlight-current":"","default-checked-keys":e.menuIdList,props:e.defaultProps},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.node,o=t.data;return i("span",{},[i("span",[o.icon.includes("el-icon")?i("i",{class:"iconFont "+o.icon}):o.icon.length?i("svg-icon",{staticClass:"iconFont",attrs:{"icon-class":o.icon}}):e._e(),e._v(" "+e._s(a.label)+" ")],1)])}}])})],1)])],1),i("div",{staticClass:"bs-dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.isShowDialog=!1}}},[e._v("取消")]),i("el-button",{attrs:{loading:e.dialogSubmitBtnLoading,size:"small",type:"primary"},on:{click:function(t){return e.onDialogSubmit()}}},[e._v("保存")])],1)],1)])],1)},o=[],n=(i("b64b"),i("e9c4"),i("99af"),i("a6dc")),s=i("3528"),l={components:{},props:{isShow:{type:Boolean,default:!1},dialogData:{type:Object,default:function(){return{}}}},data:function(){return{dialogTitle:"权限设置",isShowDialog:!1,dialogSubmitBtnLoading:!1,dialogLoading:!1,roleData:{},menuTreeData:[],menuIdList:[],defaultProps:{label:"title",children:"children"},isExpandAll:!1,isSelectAll:!1,activeName:"first"}},watch:{isShow:function(e){this.isShowDialog=e},isShowDialog:function(e){this.$emit("update:isShow",e)},dialogData:function(e){this.roleData=JSON.parse(JSON.stringify(e))}},created:function(){},methods:{onOpenedDialog:function(){this.requestList()},onClosedDialog:function(){this.$emit("closed",{})},requestList:function(){var e=this,t={roleId:this.roleData.id};this.dialogLoading=!0,Object(n["e"])(t).then((function(t){e.dialogLoading=!1,2e4===t.code?(e.menuTreeData=t.data.menuTree,e.menuIdList=t.data.menuIds):e.$message.error(t.msg)})).catch((function(t){e.dialogLoading=!1}))},onClickToggleExpand:function(){this.isExpandAll=!this.isExpandAll;for(var e=this.$refs.treeRef.store._getAllNodes(),t=0;t<e.length;t++)e[t].expanded=this.isExpandAll},onClickSelectAll:function(){this.isSelectAll=!this.isSelectAll,this.isSelectAll?this.$refs.treeRef.setCheckedNodes(this.menuTreeData):this.$refs.treeRef.setCheckedNodes([])},onDialogSubmit:function(){this.submitRequest()},submitRequest:function(){var e=this,t=this.roleData.id,i=this.$refs.treeRef.getCheckedKeys(),a=this.$refs.treeRef.getHalfCheckedKeys(),o={roleId:t,menuIds:i.concat(a)};this.dialogSubmitBtnLoading=!0,Object(s["f"])(o).then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success("角色设置权限成功!"),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))}}},r=l,c=(i("ba3d"),i("2877")),d=Object(c["a"])(r,a,o,!1,null,"47398b22",null);t["default"]=d.exports}}]);