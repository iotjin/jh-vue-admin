(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b7f418e"],{"1f34":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bs-page-body"},[a("Hamburger"),a("el-form",{staticClass:"bs-form-search mt10",attrs:{inline:!0,size:"small",model:e.queryParams}},[a("el-form-item",[a("span",{staticClass:"bs-form-label",staticStyle:{width:"80px"}},[a("i",{staticClass:"icon"},[e._v("姓名:")])]),a("el-input",{attrs:{maxlength:"20",placeholder:"请输入姓名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSearch(t)}},model:{value:e.queryParams.name,callback:function(t){e.$set(e.queryParams,"name",t)},expression:"queryParams.name"}})],1),a("el-form-item",[a("span",{staticClass:"bs-form-label"},[a("i",{staticClass:"icon"},[e._v("员工编号:")])]),a("el-input",{attrs:{maxlength:"20",placeholder:"请输入员工编号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSearch(t)}},model:{value:e.queryParams.userNumber,callback:function(t){e.$set(e.queryParams,"userNumber",t)},expression:"queryParams.userNumber"}})],1),a("el-form-item",[a("span",{staticClass:"bs-form-label",staticStyle:{width:"80px"}},[a("i",{staticClass:"icon"},[e._v("部门:")])]),a("el-select",{attrs:{placeholder:"请选择","collapse-tags":"",clearable:""},model:{value:e.queryParams.deptId,callback:function(t){e.$set(e.queryParams,"deptId",t)},expression:"queryParams.deptId"}},e._l(e.deptOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("span",{staticClass:"bs-form-label",staticStyle:{width:"100px"}},[a("i",{staticClass:"icon"},[e._v("创建时间:")])]),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",format:"yyyy年MM月dd日"},model:{value:e.dateRange,callback:function(t){e.dateRange=t},expression:"dateRange"}})],1),a("el-form-item",[a("el-button",{staticClass:"bs-form-btn",attrs:{size:"small",type:"primary"},on:{click:e.onSearch}},[e._v("查询")])],1)],1),a("div",{staticClass:"bs-page-table"},[a("div",{staticClass:"bs-table-btns"},[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-add"},expression:"{action:'user-add'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.onClickAdd}},[e._v(" 新增 ")]),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-edit"},expression:"{action:'user-edit'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-edit",disabled:1!==e.selectedRows.length},on:{click:e.onClickEdit}},[e._v(" 编辑 ")]),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-look"},expression:"{action:'user-look'}"}],attrs:{size:"small",type:"primary",icon:"el-icon-search",disabled:1!==e.selectedRows.length},on:{click:e.onClickLook}},[e._v(" 查看 ")]),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-export"},expression:"{action:'user-export'}"}],attrs:{size:"small",type:"warning ",icon:"el-icon-download"},on:{click:e.onClickExport}},[e._v(" 导出 ")]),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-delete"},expression:"{action:'user-delete'}"}],attrs:{size:"small",type:"danger",icon:"el-icon-delete",disabled:0==e.selectedRows.length},on:{click:e.onClickDelete}},[e._v(" 删除 ")]),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-assign"},expression:"{action:'user-assign'}"}],attrs:{size:"small",type:"warning",icon:"el-icon-setting",disabled:1!==e.selectedRows.length},on:{click:e.onClickAssignRole}},[e._v(" 角色分配 ")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"tableRef",staticClass:"bs-table",attrs:{data:e.tableData,stripe:!0,"header-cell-style":{textAlign:"center"},"cell-style":{textAlign:"center"}},on:{"selection-change":e.onSelectionChange}},[a("el-table-column",{attrs:{prop:"number",type:"index",label:"序号"}}),a("el-table-column",{attrs:{type:"selection",width:"55",selectable:e.isEditable}}),a("el-table-column",{attrs:{label:"姓名",width:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{on:{click:function(a){return e.onClickRow(t.row)}}},[a("a",{staticStyle:{color:"#00a0e9","text-decoration":"underline"}},[e._v(e._s(t.row.name))])])]}}])}),a("el-table-column",{attrs:{prop:"loginName",label:"用户名","min-width":"120"}}),a("el-table-column",{attrs:{prop:"userNumber",label:"员工编号","min-width":"100",sortable:""}}),a("el-table-column",{attrs:{label:"部门","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(e.getDictLabel(t.row.deptId,e.deptOptions)))])]}}])}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"tagClass",style:{background:e.getBgColor(t.row)}},[e._v(" "+e._s("0"===t.row.status?"停用":"启用")+" ")])]}}])}),a("el-table-column",{attrs:{prop:"userExpiryDate",label:"用户有效期至",sortable:"","min-width":"130"}}),a("el-table-column",{attrs:{label:"级别",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{class:"1"==t.row.level?"b-tag-success":"2"==t.row.level?"b-tag-warning":"b-tag-error"},[e._v(e._s(e.getDictLabel(t.row.level,e.levelOptions)))])]}}])}),a("el-table-column",{attrs:{prop:"phone",label:"手机号","min-width":"100"}}),a("el-table-column",{attrs:{label:"备注","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{"visible-arrow":!1,effect:"light",content:t.row.notes,placement:"bottom"}},[a("span",{staticClass:"bs-tooltip-text"},[e._v(" "+e._s(t.row.notes)+" ")])])]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-edit"},expression:"{action:'user-edit'}"}],attrs:{size:"mini",icon:"el-icon-edit-outline",disabled:!e.isEditable(t.row)},on:{click:function(a){return e.onClickEdit(t.row)}}}),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-delete"},expression:"{action:'user-delete'}"}],attrs:{size:"mini",icon:"el-icon-delete",type:"danger",disabled:!e.isEditable(t.row)},on:{click:function(a){return e.onClickDelete(t.row)}}}),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{action:"user-resetPwd"},expression:"{action:'user-resetPwd'}"}],attrs:{size:"mini",icon:"el-icon-refresh-left",type:"danger",disabled:!e.isEditable(t.row)},on:{click:function(a){return e.onClickReset(t.row)}}})]}}])})],1),a("Pagination",{directives:[{name:"show",rawName:"v-show",value:e.tableTotal>0,expression:"tableTotal>0"}],attrs:{total:e.tableTotal,page:e.queryParams.page,limit:e.queryParams.limit},on:{"update:page":function(t){return e.$set(e.queryParams,"page",t)},"update:limit":function(t){return e.$set(e.queryParams,"limit",t)},pagination:e.requestList}})],1),a("AddDialog",{attrs:{"dialog-type":e.dialogType,"is-show":e.isShowDialog,"dialog-data":e.dialogFormData},on:{"update:isShow":function(t){e.isShowDialog=t},"update:is-show":function(t){e.isShowDialog=t},success:e.requestList,closed:e.onClosedDialog}}),a("AssignRoleDialog",{attrs:{"is-show":e.isShowDialogAssignRole,"dialog-data":e.assignRoleUserData},on:{"update:isShow":function(t){e.isShowDialogAssignRole=t},"update:is-show":function(t){e.isShowDialogAssignRole=t}}})],1)},n=[],o=(a("c740"),a("caad"),a("a15b"),a("d81d"),a("b0c0"),a("e9c4"),a("b64b"),a("d3b7"),a("2532"),a("0643"),a("4e3e"),a("a573"),a("159b"),a("ca11")),s=a("c0c7"),r=a("333d"),l=a("d13e"),c=a("99ab"),u=a.n(c),d=a("cff7"),m=a("559e"),g={components:{Pagination:r["a"],Hamburger:l["a"],AddDialog:d["default"],AssignRoleDialog:m["default"]},data:function(){return{tableTotal:0,tableLoading:!1,tableData:[],queryParams:{page:1,limit:this.pageGroup.size,startDate:"",endDate:"",name:"",userNumber:"",deptId:""},dateRange:[],selectedRows:[],deptOptions:[],levelOptions:[],isShowDialog:!1,dialogType:"",dialogFormData:{},isShowDialogAssignRole:!1,assignRoleUserData:{}}},created:function(){this.requestDict(),this.requestList()},methods:{requestDict:function(){var e=this;Object(o["b"])().then((function(t){2e4===t.code?(e.deptOptions=t.data.dept,e.levelOptions=t.data.level):e.$message.error(t.msg)}))},requestDict2:function(){var e=this;Object(o["a"])().then((function(t){2e4===t.code?e.deptOptions=t.data:e.$message.error(t.msg)})),Object(o["c"])().then((function(t){2e4===t.code?e.levelOptions=t.data:e.$message.error(t.msg)}))},requestList:function(){var e=this,t=JSON.parse(JSON.stringify(this.queryParams));t.startDate=this.dateRange?u.a.startOfDay(this.dateRange[0]):"",t.endDate=this.dateRange?u.a.endOfDay(this.dateRange[1]):"",this.tableLoading=!0,Object(s["e"])(t).then((function(t){e.tableLoading=!1,2e4===t.code?(e.tableData=t.data,e.tableTotal=t.total):e.$message.error(t.msg)})).catch((function(t){e.tableLoading=!1}))},onSearch:function(){this.queryParams.page=1,this.requestList()},isEditable:function(e){return!e.loginName.toLowerCase().includes("admin")},onSelectionChange:function(e){this.selectedRows=e},getDictLabel:function(e,t){var a=t.findIndex((function(t){return t.value===e}));if(-1!==a)return t[a].label},getBgColor:function(e){return"0"===e.status?"#E6A23C":"#67C23A"},onClickAdd:function(){this.dialogType="add",this.dialogFormData={},this.isShowDialog=!0},onClickEdit:function(e){var t=JSON.parse(JSON.stringify(e&&e.id?e:this.selectedRows[0]));this.dialogType="edit",this.dialogFormData=t,this.isShowDialog=!0},onClickLook:function(e){var t=JSON.parse(JSON.stringify(e&&e.id?e:this.selectedRows[0]));this.dialogType="look",this.dialogFormData=t,this.isShowDialog=!0},onClickExport:function(){var e=this;if(0===this.selectedRows.length){var t=JSON.parse(JSON.stringify(this.queryParams));t.startDate=this.dateRange?u.a.startOfDay(this.dateRange[0]):"",t.endDate=this.dateRange?u.a.endOfDay(this.dateRange[1]):"",t.page=0,t.limit=1e3,Object(s["e"])(t).then((function(t){var a=t.data;e.handelExcel(a)}))}else this.handelExcel(this.selectedRows)},handelExcel:function(e){var t=this,i={};i=e,i.forEach((function(e){e.deptName=t.getDictLabel(e.deptId,t.deptOptions),e.statusText="0"===e.status?"停用":"启用",e.levelName=t.getDictLabel(e.level,t.levelOptions)})),Promise.all([a.e("chunk-xlsx"),a.e("chunk-3f3c3db6"),a.e("chunk-0e5d72d6")]).then(function(){var e=a("4bf8"),n=e.export_json_to_excel,o=["姓名","用户名","员工编号","部门","状态","用户有效期至","级别","备注","手机号"],s=["name","loginName","userNumber","deptName","statusText","userExpiryDate","levelName","notes","phone"],r=t.formatJson(s,i);n(o,r,"Excel")}.bind(null,a)).catch(a.oe)},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},onClickDelete:function(e){var t=this,a="";a=e&&e.id?e.name:this.selectedRows.map((function(e){return e.name})).join(","),this.$confirm("确定要删除用户 ".concat(a," ，此操作将永久删除, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a={ids:[]};if(e&&e.id)a.ids=[e.id];else{var i=t.selectedRows.map((function(e){return e.id}));a.ids=i.join(",")}t.deleteRequest(a)}))},deleteRequest:function(e){var t=this;Object(s["c"])(e).then((function(e){2e4===e.code?(t.$message.success("删除成功!"),t.requestList()):t.$message.error(e.msg)}))},onClickAssignRole:function(){this.assignRoleUserData=JSON.parse(JSON.stringify(this.selectedRows[0])),this.isShowDialogAssignRole=!0},onClickRow:function(e){this.dialogType="look",this.dialogFormData=JSON.parse(JSON.stringify(e)),this.isShowDialog=!0},onClickReset:function(e){var t=this;this.$confirm("确定要重置 ".concat(e.name," 的密码, 是否继续 ?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a={id:e.id};t.resetRequest(a)}))},resetRequest:function(e){var t=this;Object(s["f"])(e).then((function(e){2e4===e.code?(t.$message.success("重置密码成功!"),t.requestList()):t.$message.error(e.msg)}))},onClosedDialog:function(){this.$refs.tableRef.clearSelection()}}},p=g,f=(a("8ecb"),a("2877")),h=Object(f["a"])(p,i,n,!1,null,"89014abc",null);t["default"]=h.exports},"333d":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},n=[];a("a9e3");Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function s(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,a){var i=r(),n=e-i,l=20,c=0;t="undefined"===typeof t?500:t;var u=function(){c+=l;var e=Math.easeInOutQuad(c,i,n,t);s(e),c<t?o(u):a&&"function"===typeof a&&a()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.currentPage=1,this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(a("bf15"),a("2877")),m=Object(d["a"])(u,i,n,!1,null,"430a81d8",null);t["a"]=m.exports},3528:function(e,t,a){"use strict";a.d(t,"d",(function(){return n})),a.d(t,"g",(function(){return o})),a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return l})),a.d(t,"e",(function(){return c})),a.d(t,"f",(function(){return u}));var i=a("b775");function n(e){return Object(i["a"])({url:"/v1/api/role/list",method:"get",params:e})}function o(e){return Object(i["a"])({url:"/v1/api/role/save",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/v1/api/role/save",method:"post",data:e})}function r(e){return Object(i["a"])({url:"/v1/api/role/delete",method:"post",data:e})}function l(e){return Object(i["a"])({url:"/v1/api/role/save",method:"post",data:e})}function c(e){return Object(i["a"])({url:"/v1/api/roles/byUserId",method:"get",params:e})}function u(e){return Object(i["a"])({url:"/v1/api/role/setPermissions",method:"post",data:e})}},"559e":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,top:"8vh",width:"60%","close-on-click-modal":!1},on:{"update:visible":function(t){e.isShowDialog=t},opened:e.onOpenedDialog,closed:e.onClosedDialog}},[a("div",{staticClass:"bs-dialog input-width"},[a("div",{staticStyle:{margin:"-10px 0px 20px"}},[e._v(" 选中用户："+e._s(e.userData.name)+" ")]),a("el-row",{staticClass:"dialog-body",attrs:{gutter:10}},[a("el-col",{attrs:{span:11}},[a("div",{staticClass:"role-title"},[e._v(" 可分配角色 ")]),a("el-form",{staticClass:"role-left",attrs:{inline:!0,size:"small"}},[a("div",{staticClass:"role-search"},[a("el-form-item",[a("el-input",{attrs:{maxlength:"20",placeholder:"请输入角色名称",clearable:""},model:{value:e.nameK,callback:function(t){e.nameK=t},expression:"nameK"}})],1),a("el-form-item",[a("el-button",{staticClass:"bs-form-btn",attrs:{size:"small",type:"primary"},on:{click:function(t){return e.requestList("K")}}},[e._v("查询")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoadingK,expression:"isLoadingK"}],attrs:{data:e.tableDataK,"max-height":e.tableHeight,border:""},on:{"selection-change":e.onSelectionChangeK}},[a("el-table-column",{attrs:{type:"selection"}}),a("el-table-column",{attrs:{prop:"name",label:"角色名称"}}),a("el-table-column",{attrs:{prop:"code",label:"角色编号"}})],1)],1)],1),a("el-col",{attrs:{span:2}},[a("div",{staticClass:"role-center"},[a("i",{staticClass:"el-icon-arrow-left",on:{click:function(t){return e.onClickArrowLeft()}}}),a("br"),a("i",{staticClass:"el-icon-arrow-right",on:{click:function(t){return e.onClickArrowRight()}}})])]),a("el-col",{attrs:{span:11}},[a("div",{staticClass:"role-title"},[e._v(" 已分配角色 ")]),a("el-form",{staticClass:"role-right",attrs:{inline:!0,size:"small"}},[a("div",{staticClass:"role-search"},[a("el-form-item",[a("el-input",{attrs:{maxlength:"20",placeholder:"请输入角色名称",clearable:""},model:{value:e.nameY,callback:function(t){e.nameY=t},expression:"nameY"}})],1),a("el-form-item",[a("el-button",{staticClass:"bs-form-btn",attrs:{size:"small",type:"primary"},on:{click:function(t){return e.requestList("Y")}}},[e._v("查询")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoadingY,expression:"isLoadingY"}],attrs:{data:e.tableDataY,"max-height":e.tableHeight,border:""},on:{"selection-change":e.onSelectionChangeY}},[a("el-table-column",{attrs:{type:"selection"}}),a("el-table-column",{attrs:{prop:"name",label:"角色名称"}}),a("el-table-column",{attrs:{prop:"code",label:"角色编号"}})],1)],1)],1)],1),a("div",{staticClass:"bs-dialog-footer",staticStyle:{"padding-top":"30px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.isShowDialog=!1}}},[e._v("取消")]),a("el-button",{attrs:{loading:e.dialogSubmitBtnLoading,size:"small",type:"primary"},on:{click:function(t){return e.onDialogSubmit()}}},[e._v("保存")])],1)],1)])],1)},n=[],o=(a("99af"),a("4de4"),a("d81d"),a("b0c0"),a("e9c4"),a("b64b"),a("d3b7"),a("0643"),a("2382"),a("a573"),a("9a9a"),a("3528")),s=a("c0c7"),r={components:{},props:{isShow:{type:Boolean,default:!1},dialogData:{type:Object,default:function(){return{}}}},data:function(){return{dialogTitle:"分配角色",isShowDialog:!1,dialogSubmitBtnLoading:!1,userData:{},tableHeight:400,isLoadingK:!1,nameK:"",tableDataK:[],selectedRowsK:[],isLoadingY:!1,nameY:"",tableDataY:[],selectedRowsY:[]}},watch:{isShow:function(e){this.isShowDialog=e},isShowDialog:function(e){this.$emit("update:isShow",e)},dialogData:function(e){this.userData=JSON.parse(JSON.stringify(e))}},created:function(){},methods:{onOpenedDialog:function(){this.requestList("K"),this.requestList("Y")},onClosedDialog:function(){this.$emit("closed",{})},requestList:function(e){var t=this,a={userId:this.userData.id};a.name="K"===e?this.nameK:this.nameY,a.status="K"===e?"0":"1",this.handleLoading(!0,e),Object(o["e"])(a).then((function(a){t.handleLoading(!1,e),2e4===a.code?"K"===e?t.tableDataK=a.data:t.tableDataY=a.data:t.$message.error(a.msg)})).catch((function(a){t.handleLoading(!1,e)}))},handleLoading:function(e,t){"K"===t?this.isLoadingK=e:this.isLoadingY=e},onSelectionChangeK:function(e){this.selectedRowsK=e},onSelectionChangeY:function(e){this.selectedRowsY=e},onClickArrowLeft:function(){var e=this;0!==this.selectedRowsY.length?(this.tableDataK=this.selectedRowsY.concat(this.tableDataK),this.tableDataY=this.tableDataY.filter((function(t){return!e.selectedRowsY.some((function(e){return t.id===e.id}))}))):this.$message.warning("请选择需要移除的已分配角色！")},onClickArrowRight:function(){var e=this;0!==this.selectedRowsK.length?(this.tableDataY=this.selectedRowsK.concat(this.tableDataY),this.tableDataK=this.tableDataK.filter((function(t){return!e.selectedRowsK.some((function(e){return t.id===e.id}))}))):this.$message.warning("请选择需要添加的可分配角色！")},onDialogSubmit:function(){this.submitRequest()},submitRequest:function(){var e=this,t=this.tableDataY.map((function(e){return e.id})),a={id:this.userData.id,roleIds:t};this.dialogSubmitBtnLoading=!0,Object(s["b"])(a).then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success("分配角色成功!"),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))}}},l=r,c=(a("d29b"),a("2877")),u=Object(c["a"])(l,i,n,!1,null,"55411a00",null);t["default"]=u.exports},"6de7":function(e,t,a){"use strict";a("f436")},"76f1":function(e,t,a){},7754:function(e,t,a){"use strict";a.d(t,"i",(function(){return n})),a.d(t,"l",(function(){return o})),a.d(t,"b",(function(){return s})),a.d(t,"d",(function(){return r})),a.d(t,"f",(function(){return l})),a.d(t,"g",(function(){return c})),a.d(t,"k",(function(){return u})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return m})),a.d(t,"e",(function(){return g})),a.d(t,"h",(function(){return p})),a.d(t,"j",(function(){return f}));var i=a("b775");function n(e){return Object(i["a"])({url:"/v1/api/dict/type/list",method:"get",params:e})}function o(e){return Object(i["a"])({url:"/v1/api/dict/type/save",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/v1/api/dict/type/save",method:"post",data:e})}function r(e){return Object(i["a"])({url:"/v1/api/dict/type/delete",method:"post",data:e})}function l(e){return Object(i["a"])({url:"/v1/api/dict/type/save",method:"post",data:e})}function c(e){return Object(i["a"])({url:"/v1/api/dict/item/list",method:"get",params:e})}function u(e){return Object(i["a"])({url:"/v1/api/dict/item/save",method:"post",data:e})}function d(e){return Object(i["a"])({url:"/v1/api/dict/item/save",method:"post",data:e})}function m(e){return Object(i["a"])({url:"/v1/api/dict/item/delete",method:"post",data:e})}function g(e){return Object(i["a"])({url:"/v1/api/dict/item/save",method:"post",data:e})}function p(e){return Object(i["a"])({url:"/v1/api/dict/items/",method:"get",params:e})}function f(e){return Object(i["a"])({url:"/v1/api/dicts/multiple/",method:"get",params:e})}},"7b5e":function(e,t,a){},"7d6f":function(e,t,a){},"8ecb":function(e,t,a){"use strict";a("7b5e")},"99ab":function(e,t,a){a("99af"),a("ac1f"),a("5319");var i=a("7037").default;function n(e,t){if(0===arguments.length)return null;var a,n=t||"{y}-{m}-{d} {h}:{i}:{s}";"object"===i(e)||(10===(""+e).length&&(e=1e3*parseInt(e)),a=new Date(e));var o={y:a.getFullYear(),m:a.getMonth()+1,d:a.getDate(),h:a.getHours(),i:a.getMinutes(),s:a.getSeconds(),w:a.getDay()},s=n.replace(/{(y|m|d|h|i|s|w)+}/g,(function(e,t){var a=o[t];return"w"===t?["日","一","二","三","四","五","六"][a]:(e.length>0&&a<10&&(a="0"+a),a||0)}));return s}function o(e){var t=e.replace(/-|\./g,"/");return t=t.replace(/年/g,"/"),t=t.replace(/月/g,"/"),t=t.replace(/日/g,""),4===t.length&&(t+="/01/01 00:00:00"),7===t.length&&(t+="/01 00:00:00"),10===t.length&&(t+=" 00:00:00"),16===t.length&&(t+=":00"),Date.parse(t)}function s(e,t){var a=["Y","M","D","h","m","s"],i=[],n=new Date(parseInt(e)),o=n.getFullYear(),s=n.getMonth()+1,r=n.getDate(),l=n.getHours(),c=n.getMinutes(),u=n.getSeconds();for(var d in i.push(o),i.push(s<10?"0"+s:s),i.push(r<10?"0"+r:r),i.push(l<10?"0"+l:l),i.push(c<10?"0"+c:c),i.push(u<10?"0"+u:u),i)t=t.replace(a[d],i[d]);return t}function r(e){var t=e.replace(/-/g,"");t=t.substring(0,8);var a=(new Date).getTime();return a=n(a,"{y}{m}{d}"),t===a}function l(){var e=Date.parse(new Date);return n(e,"{y}-{m}")}function c(e){var t=e.substring(0,4);t=parseInt(t),t-=1;var a=e.substring(4,5),i="";return i="年"===a?t+"年":t+a,i}function u(e){var t=e.substring(0,4);t=parseInt(t),t+=1;var a=e.substring(4,5),i="";return i="年"===a?t+"年":t+a,i}function d(e){var t=e.substring(0,4),a=e.substring(5,7);t=parseInt(t),a=parseInt(a),a-=1,0===a&&(t-=1,a=12),a<10&&(a="0"+a);var i=e.substring(4,5),n="";return n="年"===i?t+"年"+a+"月":t+i+a,n}function m(e){var t=e.substring(0,4),a=e.substring(5,7);t=parseInt(t),a=parseInt(a),a+=1,13===a&&(t+=1,a=1),a<10&&(a="0"+a);var i=e.substring(4,5),n="";return n="年"===i?t+"年"+a+"月":t+i+a,n}function g(e){var t=new Date(e).getFullYear(),a=new Date(e).getMonth()+1,i=new Date(e).getDate(),n=new Date,o=new Date(new Date(e).toLocaleDateString()),s=o.getTime()-n.getTime(),r=parseInt(s/1e3),l=Math.floor(r/86400),c=Math.floor((r-24*l*60*60)/3600),u=Math.floor((r-24*l*60*60-3600*c)/60),d=Math.floor(r-60*l*60*24-60*c*60-60*u);return"距离".concat(t,"年").concat(a,"月").concat(i,"日还有").concat(l,"天").concat(c,"小时").concat(u,"分").concat(d,"秒")}function p(e){return e?e.substr(0,10)+" 00:00:00":""}function f(e){return e?e.substr(0,10)+" 23:59:59":""}function h(e,t,a){return e=e.replace(/-/g,"/"),t=t.replace(/-/g,"/"),a=a.replace(/-/g,"/"),e=new Date(e),t=new Date(t),a=new Date(a),t<=e&&e<=a}function b(e,t){e=e.replace(/-/g,"/"),t=t.replace(/-/g,"/"),e=new Date(e),t=new Date(t);var a=new Date;return e<=a&&a<=t}function v(e,t){var a=new Date;return e=e.replace(/-/g,"/"),t=t.replace(/-/g,"/"),e=new Date(e),t=new Date(t),a<=e&&e<=t}function y(e,t){var a=o(e),i=o(t);return a>i}a("99af"),a("ac1f"),a("5319"),e.exports={Jh_timeStampToTime:n,Jh_convertTimeStamp:o,Jh_timestampToYMD:s,Jh_isToday:r,Jh_getYearMonth:l,Jh_getPrevYear:c,Jh_getNextYear:u,Jh_getPrevYearMonth:d,Jh_getNextYearMonth:m,Jh_compareTimes:y,Jh_isBetweenTimes:h,Jh_isBetweenTimesByCurrent:b,Jh_isBetweenTimesByCurrentAndEndTime:v,getEndTime:g,startOfDay:p,endOfDay:f}},b462:function(e,t,a){"use strict";a("ca24")},bf15:function(e,t,a){"use strict";a("7d6f")},c0c7:function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"g",(function(){return o})),a.d(t,"a",(function(){return s})),a.d(t,"c",(function(){return r})),a.d(t,"d",(function(){return l})),a.d(t,"f",(function(){return c})),a.d(t,"b",(function(){return u}));var i=a("b775");function n(e){return Object(i["a"])({url:"/v1/api/user/list",method:"get",params:e})}function o(e){return Object(i["a"])({url:"/v1/api/user/save",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/v1/api/user/save",method:"post",data:e})}function r(e){return Object(i["a"])({url:"/v1/api/user/delete",method:"post",data:e})}function l(e){return Object(i["a"])({url:"/v1/api/user/save",method:"post",data:e})}function c(e){return Object(i["a"])({url:"/v1/api/user/resetPwd",method:"post",data:e})}function u(e){return Object(i["a"])({url:"/v1/api/user/assignRole",method:"post",data:e})}},c30c:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return n}));a("ac1f"),a("00b4");var i=/^1[3-9][0-9]{9}$/,n=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/},ca11:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return r}));var i=a("7754");function n(){return Object(i["h"])({type:"dept"})}function o(){return Object(i["h"])({type:"status"})}function s(){return Object(i["h"])({type:"level"})}function r(){return Object(i["j"])({types:"dept,level"})}},ca24:function(e,t,a){},cff7:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,top:"8vh",width:"55%","close-on-click-modal":!1},on:{"update:visible":function(t){e.isShowDialog=t},opened:e.onOpenedDialog,closed:e.onClosedDialog}},[a("div",{staticClass:"bs-dialog input-width"},[a("el-form",{ref:"dialogFormRef",attrs:{model:e.dialogFormData,inline:!0,rules:e.dialogFormRules,"label-width":"120px",size:"small",disabled:e.dialogIsLook}},[a("el-form-item",{attrs:{label:"姓名:",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入姓名",clearable:""},model:{value:e.dialogFormData.name,callback:function(t){e.$set(e.dialogFormData,"name",t)},expression:"dialogFormData.name"}})],1),a("el-form-item",{attrs:{label:"用户名:",prop:"loginName"}},[a("el-input",{attrs:{disabled:"add"!==e.dialogType,placeholder:"请输入用户名",clearable:""},model:{value:e.dialogFormData.loginName,callback:function(t){e.$set(e.dialogFormData,"loginName",t)},expression:"dialogFormData.loginName"}})],1),a("el-form-item",{attrs:{label:"员工编号:",prop:"userNumber"}},[a("el-input",{attrs:{disabled:"add"!==e.dialogType,placeholder:"请输入员工编号",clearable:""},model:{value:e.dialogFormData.userNumber,callback:function(t){e.$set(e.dialogFormData,"userNumber",e._n(t))},expression:"dialogFormData.userNumber"}})],1),a("el-form-item",{attrs:{label:"部门:",prop:"deptId"}},[a("el-select",{attrs:{placeholder:"请选择部门","collapse-tags":"",clearable:""},model:{value:e.dialogFormData.deptId,callback:function(t){e.$set(e.dialogFormData,"deptId",t)},expression:"dialogFormData.deptId"}},e._l(e.deptOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"用户有效期至:",prop:"userExpiryDate"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd",format:"yyyy-MM-dd"},model:{value:e.dialogFormData.userExpiryDate,callback:function(t){e.$set(e.dialogFormData,"userExpiryDate",t)},expression:"dialogFormData.userExpiryDate"}})],1),a("el-form-item",{attrs:{label:"手机号:",prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入手机号",clearable:""},model:{value:e.dialogFormData.phone,callback:function(t){e.$set(e.dialogFormData,"phone",t)},expression:"dialogFormData.phone"}})],1),a("el-form-item",{attrs:{label:"级别:",prop:"level"}},[a("el-select",{attrs:{placeholder:"请选择级别","collapse-tags":"",clearable:""},model:{value:e.dialogFormData.level,callback:function(t){e.$set(e.dialogFormData,"level",t)},expression:"dialogFormData.level"}},e._l(e.levelOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"补助:",prop:"money"}},[a("el-input",{attrs:{placeholder:"请输入金额",clearable:""},model:{value:e.dialogFormData.money,callback:function(t){e.$set(e.dialogFormData,"money",t)},expression:"dialogFormData.money"}})],1),a("el-form-item",{attrs:{label:"年龄:",prop:"age"}},[a("el-input",{attrs:{placeholder:"请输入年龄",clearable:""},model:{value:e.dialogFormData.age,callback:function(t){e.$set(e.dialogFormData,"age",t)},expression:"dialogFormData.age"}})],1),"add"!==e.dialogType?a("el-form-item",{attrs:{label:"登录时间:",prop:"loginDate"}},[a("el-date-picker",{attrs:{disabled:"",type:"datetime",placeholder:"选择日期","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.dialogFormData.loginDate,callback:function(t){e.$set(e.dialogFormData,"loginDate",t)},expression:"dialogFormData.loginDate"}})],1):e._e(),"add"!==e.dialogType?a("el-form-item",{attrs:{label:"登录IP:",prop:"loginIp"}},[a("el-input",{attrs:{disabled:""},model:{value:e.dialogFormData.loginIp,callback:function(t){e.$set(e.dialogFormData,"loginIp",t)},expression:"dialogFormData.loginIp"}})],1):e._e(),"add"!==e.dialogType?a("el-form-item",{attrs:{label:"创建时间:",prop:"createDate"}},[a("el-date-picker",{attrs:{disabled:"",type:"datetime",placeholder:"选择日期","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.dialogFormData.createDate,callback:function(t){e.$set(e.dialogFormData,"createDate",t)},expression:"dialogFormData.createDate"}})],1):e._e(),"add"!==e.dialogType?a("el-form-item",{attrs:{label:"更新时间:",prop:"updateDate"}},[a("el-date-picker",{attrs:{disabled:"",type:"datetime",placeholder:"选择日期","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.dialogFormData.updateDate,callback:function(t){e.$set(e.dialogFormData,"updateDate",t)},expression:"dialogFormData.updateDate"}})],1):e._e(),"add"!==e.dialogType?a("el-form-item",{attrs:{label:"操作人:",prop:"updateBy"}},[a("el-input",{attrs:{disabled:""},model:{value:e.dialogFormData.updateBy,callback:function(t){e.$set(e.dialogFormData,"updateBy",t)},expression:"dialogFormData.updateBy"}})],1):e._e(),a("el-form-item",{attrs:{label:"备注:",prop:"notes"}},[a("el-input",{attrs:{placeholder:"请输入备注",type:"textarea",maxlength:"100","show-word-limit":"",clearable:""},model:{value:e.dialogFormData.notes,callback:function(t){e.$set(e.dialogFormData,"notes",t)},expression:"dialogFormData.notes"}})],1),a("el-form-item",{attrs:{label:"状态:",prop:"status"}},[a("el-radio-group",{model:{value:e.dialogFormData.status,callback:function(t){e.$set(e.dialogFormData,"status",t)},expression:"dialogFormData.status"}},[a("el-radio",{attrs:{label:"1"}},[e._v("启用")]),a("el-radio",{attrs:{label:"0"}},[e._v("停用")])],1)],1)],1),e.dialogIsLook?e._e():a("div",{staticClass:"bs-dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.isShowDialog=!1}}},[e._v(" 取消 ")]),a("el-button",{attrs:{loading:e.dialogSubmitBtnLoading,size:"small",type:"primary"},on:{click:function(t){return e.onDialogSubmit()}}},[e._v(" 保存 ")])],1)],1)])],1)},n=[],o=(a("e9c4"),a("b64b"),a("d3b7"),a("25f0"),a("ca11")),s=a("c0c7"),r=a("c30c"),l={components:{},props:{isShow:{type:Boolean,default:!1},dialogType:{type:String,default:"add"},dialogData:{type:Object,default:function(){return{}}},title:{type:String,default:""}},data:function(){var e=function(e,t,a){t?(8!==t.toString().length&&a(new Error("请输入8位数字")),a()):a(new Error("请输入"))};return{dialogTitle:"提示",isShowDialog:!1,dialogSubmitBtnLoading:!1,dialogIsLook:!1,dialogFormData:{id:"",name:"",loginName:"",userNumber:"",userExpiryDate:"",deptId:"",status:"",notes:"",phone:"",age:"",money:"",level:"",loginDate:"",loginIp:"",createDate:"",updateDate:"",updateBy:""},initFormData:{},dialogFormRules:{name:[{required:!0,message:"请输入",trigger:["blur","change"]},{min:1,max:10,message:"10字符以内",trigger:["blur","change"]}],loginName:[{required:!0,message:"请输入",trigger:["blur","change"]},{min:1,max:10,message:"10字符以内",trigger:["blur","change"]}],userNumber:[{required:!0,message:"请输入",trigger:["blur","change"]},{type:"number",message:"请输入8位数字1",trigger:["blur","change"]},{validator:e,trigger:["blur","change"]}],userExpiryDate:[{required:!0,message:"请选择",trigger:["blur","change"]}],deptId:[{required:!0,message:"请选择",trigger:["blur","change"]}],status:[{required:!0,message:"请选择",trigger:["blur","change"]}],phone:[{required:!0,message:"请输入",trigger:"blur"},{pattern:r["b"],message:"请输入正确手机号"}],level:[{required:!0,message:"请选择",trigger:["blur","change"]}],notes:[{required:!1,message:"请输入",trigger:["blur","change"]},{min:1,max:100,message:"100字符以内",trigger:["blur","change"]}],age:[{required:!1,message:"请输入",trigger:"blur"},{pattern:/^[1-9]\d*$/,message:"仅支持录入正整数"}],money:[{required:!1,message:"请输入",trigger:"blur"},{pattern:r["a"],message:"请输入最多两位小数金额"}]},deptOptions:[],levelOptions:[]}},watch:{isShow:function(e){this.isShowDialog=e},isShowDialog:function(e){this.$emit("update:isShow",e)},title:function(e){this.dialogTitle=e.length?e:this.dialogTitle},dialogData:function(e){"add"===this.dialogType?this.dialogFormData=JSON.parse(JSON.stringify(this.initFormData)):this.dialogFormData=JSON.parse(JSON.stringify(e))},dialogType:function(e){this.dialogTitle=this.title||("add"===e?"新增":"edit"===e?"编辑":"look"===e?"查看":this.dialogTitle),this.dialogIsLook="look"===e}},created:function(){this.initFormData=JSON.parse(JSON.stringify(this.dialogFormData)),this.requestDictDept(),this.requestDictLevel()},methods:{requestDictDept:function(){var e=this;Object(o["a"])().then((function(t){2e4===t.code?e.deptOptions=t.data:e.$message.error(t.msg)}))},requestDictLevel:function(){var e=this;Object(o["c"])().then((function(t){2e4===t.code?e.levelOptions=t.data:e.$message.error(t.msg)}))},onOpenedDialog:function(){"add"===this.dialogType&&this.$refs["dialogFormRef"].clearValidate(),this.deptOptions.length||this.requestDictDept(),this.levelOptions.length||this.requestDictLevel()},onClosedDialog:function(){this.dialogIsLook||this.$refs["dialogFormRef"].resetFields(),this.$emit("closed",{})},onDialogSubmit:function(){var e=this;this.$refs["dialogFormRef"].validate((function(t){t&&e.submitRequest()}))},submitRequest:function(){var e=this,t=JSON.parse(JSON.stringify(this.dialogFormData)),a="add"===this.dialogType?"新增成功!":"编辑成功!";this.dialogSubmitBtnLoading=!0,Object(s["g"])(t).then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success(a),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))},submitRequest2:function(){var e=this,t=JSON.parse(JSON.stringify(this.dialogFormData));this.dialogSubmitBtnLoading=!0;var a="add"===this.dialogType?"新增成功!":"编辑成功!",i="add"===this.dialogType?Object(s["a"])(t):Object(s["d"])(t);i.then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success(a),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1}))}}},c=l,u=(a("6de7"),a("2877")),d=Object(u["a"])(c,i,n,!1,null,"96dac984",null);t["default"]=d.exports},d13e:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hamburger-container"},[a("svg",{staticClass:"hamburger",class:{"is-active":e.sidebar.opened},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64"},on:{click:e.toggleClick}},[a("path",{attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"}})]),a("div",{staticClass:"back-home",on:{click:e.backClick}},[a("span",[e._v("返回首页")])])])},n=[],o=a("5530"),s=a("2f62"),r={name:"Hamburger",props:{isActive:{type:Boolean,default:!1}},computed:Object(o["a"])({},Object(s["b"])(["sidebar"])),methods:{toggleClick:function(){this.$store.dispatch("app/toggleSideBar")},backClick:function(){this.$router.push({path:"/"})}}},l=r,c=(a("b462"),a("2877")),u=Object(c["a"])(l,i,n,!1,null,"09d35cbc",null);t["a"]=u.exports},d29b:function(e,t,a){"use strict";a("76f1")},f436:function(e,t,a){}}]);