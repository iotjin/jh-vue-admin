(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afb8c3e8"],{"17bb":function(e,t,a){"use strict";a("ef3c")},"6a60":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,top:"8vh",width:"90%","close-on-click-modal":!1},on:{"update:visible":function(t){e.isShowDialog=t},open:e.onOpenDialog,opened:e.onOpenedDialog,closed:e.onClosedDialog}},[a("div",{staticClass:"spp-dialog"},[a("div",{staticClass:"spp-table-group spp-theme-top spp-theme-pad"},[a("div",{staticClass:"spp-table-btns"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.onAdd}},[a("i",{staticClass:"el-icon-plus"}),e._v("新增 ")]),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:e.onDelete}},[a("i",{staticClass:"el-icon-delete"}),e._v("删除 ")])],1),a("el-form",{ref:"formRef",attrs:{model:e.dialogFormData,"label-width":"120px",inline:!0,rules:e.formRules,size:"small","label-position":"center"}},[a("el-table",{ref:"tableRef",staticClass:"my-table",attrs:{data:e.dialogFormData.tableData,stripe:!0,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle,"row-class-name":e.rowClassName,border:""},on:{"selection-change":e.onSelectionChange}},[a("el-table-column",{attrs:{label:""}},[a("el-table-column",{attrs:{prop:"xh",type:"index",label:"序号",width:"80px"}}),a("el-table-column",{attrs:{type:"selection",width:"55px"}}),a("el-table-column",{attrs:{label:"名称","render-header":e.addRedStar,"min-width":e.columnWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".name",rules:e.formRules.name}},[a("el-input",{attrs:{maxlength:"20",placeholder:"请输入",clearable:""},model:{value:t.row.name,callback:function(a){e.$set(t.row,"name",a)},expression:"scope.row.name"}})],1)]}}])}),a("el-table-column",{attrs:{label:"部门","render-header":e.addRedStar,"min-width":e.columnWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".dept",rules:e.formRules.dept}},[a("el-select",{attrs:{placeholder:"请选择","collapse-tags":"",clearable:""},model:{value:t.row.dept,callback:function(a){e.$set(t.row,"dept",a)},expression:"scope.row.dept"}},e._l(e.deptOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"操作人","render-header":e.addRedStar,"min-width":e.columnWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".operator",rules:e.formRules.operator}},[a("el-input",{attrs:{maxlength:"10",placeholder:"请输入",clearable:""},model:{value:t.row.operator,callback:function(a){e.$set(t.row,"operator",a)},expression:"scope.row.operator"}})],1)]}}])}),a("el-table-column",{attrs:{label:"内容","render-header":e.addRedStar,"min-width":e.columnWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".content",rules:e.formRules.content}},[a("el-input",{attrs:{maxlength:"100",placeholder:"请输入",type:"textarea",autosize:{minRows:2,maxRows:2},clearable:""},model:{value:t.row.content,callback:function(a){e.$set(t.row,"content",a)},expression:"scope.row.content"}})],1)]}}])}),a("el-table-column",{attrs:{label:"创建时间","render-header":e.addRedStar,width:e.columnWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".createDate",rules:e.formRules.createDate}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm",placeholder:"选择日期"},model:{value:t.row.createDate,callback:function(a){e.$set(t.row,"createDate",a)},expression:"scope.row.createDate"}})],1)]}}])}),a("el-table-column",{attrs:{label:"操作时间","render-header":e.addRedStar,width:e.columnWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".updateDate",rules:e.formRules.updateDate}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm",placeholder:"选择日期"},model:{value:t.row.updateDate,callback:function(a){e.$set(t.row,"updateDate",a)},expression:"scope.row.updateDate"}})],1)]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",icon:"el-icon-edit-outline"},on:{click:function(a){return e.rowEdit(t.row)}}}),a("el-button",{attrs:{size:"mini",icon:"el-icon-delete",type:"danger"},on:{click:function(a){return e.rowDelete(t.row)}}})]}}])})],1)],1)],1),a("div",{staticStyle:{padding:"20px"}}),e.dialogIsLook?e._e():a("div",{staticClass:"dialog-footer spp-dialog-btns",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{loading:e.dialogSubmitBtnLoading,size:"small",type:"primary"},on:{click:function(t){return e.onDialogSubmit(e.dialogFormData)}}},[e._v("确定")]),a("el-button",{attrs:{size:"small"},on:{click:function(t){e.isShowDialog=!1}}},[e._v("取消")])],1)],1)])])],1)},r=[],o=(a("e9c4"),a("4e82"),a("a434"),a("dc66")),l=a("99ab"),i=a.n(l),s={components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:""},dialogData:{type:Object,default:function(){return{}}},dialogType:{type:String,default:"add"},jumpPage:{type:String,default:""}},data:function(){var e=this,t=function(t,a,n){if(a){var r=t.field.substr(10,1),o=e.dialogFormData.tableData[r].updateDate,l=i.a.Jh_compareTimes(a,o);l&&n(new Error("创建时间不能大于操作时间!")),n()}else n(new Error("请选择创建时间"))},a=function(t,a,n){if(a){var r=t.field.substr(10,1),o=i.a.Jh_compareTimes(a,e.dialogFormData.tableData[r].createDate);o||n(new Error("操作时间不能小于创建时间!")),n()}else n(new Error("请选择操作时间"))};return{columnWidth:280,dialogLoading:!1,levelOptions:[],deptOptions:[],dialogTitle:"提示",isShowDialog:!1,dialogSubmitBtnLoading:!1,dialogIsLook:!1,dialogFormData:{tableData:[]},formRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],dept:[{required:!0,message:"请选择部门",trigger:"change"}],operator:[{required:!0,message:"请输入操作人名称",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}],createDate:[{validator:t,trigger:"change"}],updateDate:[{validator:a,trigger:"change"}]}}},watch:{isShow:function(e){this.isShowDialog=e},isShowDialog:function(e){this.showDialog(e)},title:function(e){this.dialogTitle=e.length?e:this.dialogTitle},dialogData:function(e){this.dialogFormData=e},dialogType:function(e){}},mounted:function(){},methods:{showDialog:function(e){this.$emit("update:isShow",e)},requestDict:function(){var e=this;Object(o["h"])().then((function(t){2e4===t.code&&(e.levelOptions=t.data)})).catch((function(e){console.log(JSON.stringify(e))})),Object(o["e"])().then((function(t){2e4===t.code&&(e.deptOptions=t.data)})).catch((function(e){console.log(JSON.stringify(e))}))},getName:function(e,t){for(var a=t,n=0;n<a.length;n++)if(a[n].value===e)return a[n].label},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex,a=e.columnIndex;return 0===t&&0===a?{textAlign:"center",background:"#eef1f6",display:"none"}:{textAlign:"center",background:"#f5f5f5"}},cellStyle:function(e){e.row,e.column,e.rowIndex,e.columnIndex;return{textAlign:"center"}},rowClassName:function(e){var t=e.row,a=e.rowIndex;t.xh=a+1},addStar:function(e){return"star"},addRedStar:function(e,t){var a=t.column;return[e("span",{style:"color: red"},"*"),e("span"," "+a.label)]},onSelectionChange:function(e){this.selectionList=e},onOpenDialog:function(){var e=this;this.dialogLoading=!0,setTimeout((function(){e.dialogLoading=!1}),1500)},onOpenedDialog:function(){this.requestDict()},onClosedDialog:function(){this.dialogIsLook||this.$refs["formRef"].resetFields(),this.$emit("closed",{})},onAdd:function(){var e={id:"",name:"",dept:"",operator:"",content:"",createDate:"",updateDate:""};this.dialogFormData.tableData.push(e)},onEdit:function(){0!==this.selectionList.length?this.selectionList.length>1&&this.$message.warning("只能选择一条记录！"):this.$message.warning("请选择记录")},onDelete:function(){var e=this;0!==this.selectionList.length?this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){for(var t=[],a=0;a<e.selectionList.length;a++)t.push(e.selectionList[a].xh);t.sort((function(e,t){return e-t})),console.log("新数组排序后："+t);for(var n=0;n<t.length;n++)e.dialogFormData.tableData.splice(t[n]-n-1,1);e.$message.success("删除成功!")})).catch((function(){})):this.$message.warning("请选择记录")},rowEdit:function(e){console.log(JSON.stringify(e))},rowDelete:function(e){var t=this;console.log(JSON.stringify(e)),this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.dialogFormData.tableData.splice(e.xh-1,1),t.$message.success("删除成功!")})).catch((function(){}))},onDialogSubmit:function(){var e=this;this.$refs["formRef"].validate((function(t){t?e.submitRequest():(console.log("error submit!!"),e.$message.warning("有未输入项"))}))},submitRequest:function(){var e=this;this.dialogSubmitBtnLoading=!0;var t={};t=this.dialogFormData,console.log(JSON.stringify(t)),"新增"===this.dialogTitle&&Object(o["a"])(t).then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success("保存成功!"),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1,console.log(JSON.stringify(t))})),"编辑"!==this.dialogTitle&&"提示"!==this.dialogTitle||Object(o["c"])(t).then((function(t){e.dialogSubmitBtnLoading=!1,2e4===t.code?(e.$message.success("保存成功!"),e.isShowDialog=!1,e.$emit("success",{})):e.$message.error(t.msg)})).catch((function(t){e.dialogSubmitBtnLoading=!1,console.log(JSON.stringify(t))}))}}},c=s,u=(a("9a66"),a("2877")),d=Object(u["a"])(c,n,r,!1,null,"19a24285",null);t["default"]=d.exports},7754:function(e,t,a){"use strict";a.d(t,"i",(function(){return r})),a.d(t,"l",(function(){return o})),a.d(t,"b",(function(){return l})),a.d(t,"d",(function(){return i})),a.d(t,"f",(function(){return s})),a.d(t,"g",(function(){return c})),a.d(t,"k",(function(){return u})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return p})),a.d(t,"e",(function(){return m})),a.d(t,"h",(function(){return f})),a.d(t,"j",(function(){return g}));var n=a("b775");function r(e){return Object(n["a"])({url:"/v1/api/dict/type/list",method:"get",params:e})}function o(e){return Object(n["a"])({url:"/v1/api/dict/type/save",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/v1/api/dict/type/save",method:"post",data:e})}function i(e){return Object(n["a"])({url:"/v1/api/dict/type/delete",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/v1/api/dict/type/save",method:"post",data:e})}function c(e){return Object(n["a"])({url:"/v1/api/dict/item/list",method:"get",params:e})}function u(e){return Object(n["a"])({url:"/v1/api/dict/item/save",method:"post",data:e})}function d(e){return Object(n["a"])({url:"/v1/api/dict/item/save",method:"post",data:e})}function p(e){return Object(n["a"])({url:"/v1/api/dict/item/delete",method:"post",data:e})}function m(e){return Object(n["a"])({url:"/v1/api/dict/item/save",method:"post",data:e})}function f(e){return Object(n["a"])({url:"/v1/api/dict/items/",method:"get",params:e})}function g(e){return Object(n["a"])({url:"/v1/api/dicts/multiple/",method:"get",params:e})}},"99ab":function(e,t,a){var n=a("7037").default;function r(e,t){if(0===arguments.length)return null;var a,r=t||"{y}-{m}-{d} {h}:{i}:{s}";"object"===n(e)?console.log():(10===(""+e).length&&(e=1e3*parseInt(e)),a=new Date(e));var o={y:a.getFullYear(),m:a.getMonth()+1,d:a.getDate(),h:a.getHours(),i:a.getMinutes(),s:a.getSeconds(),w:a.getDay()},l=r.replace(/{(y|m|d|h|i|s|w)+}/g,(function(e,t){var a=o[t];return"w"===t?["日","一","二","三","四","五","六"][a]:(e.length>0&&a<10&&(a="0"+a),a||0)}));return l}function o(e){var t=e.replace(/-|\./g,"/");return t=t.replace(/年/g,"/"),t=t.replace(/月/g,"/"),t=t.replace(/日/g,""),4===t.length&&(t+="/01/01 00:00:00"),7===t.length&&(t+="/01 00:00:00"),10===t.length&&(t+=" 00:00:00"),16===t.length&&(t+=":00"),Date.parse(t)}function l(e,t){var a=["Y","M","D","h","m","s"],n=[],r=new Date(parseInt(e)),o=r.getFullYear(),l=r.getMonth()+1,i=r.getDate(),s=r.getHours(),c=r.getMinutes(),u=r.getSeconds();for(var d in n.push(o),n.push(l<10?"0"+l:l),n.push(i<10?"0"+i:i),n.push(s<10?"0"+s:s),n.push(c<10?"0"+c:c),n.push(u<10?"0"+u:u),n)t=t.replace(a[d],n[d]);return t}function i(e){var t=e.replace(/-/g,"");t=t.substring(0,8);var a=(new Date).getTime();return a=r(a,"{y}{m}{d}"),t===a}function s(){var e=Date.parse(new Date);return r(e,"{y}-{m}")}function c(e){var t=e.substring(0,4);t=parseInt(t),t-=1;var a=e.substring(4,5),n="";return n="年"===a?t+"年":t+a,n}function u(e){var t=e.substring(0,4);t=parseInt(t),t+=1;var a=e.substring(4,5),n="";return n="年"===a?t+"年":t+a,n}function d(e){var t=e.substring(0,4),a=e.substring(5,7);t=parseInt(t),a=parseInt(a),a-=1,0===a&&(t-=1,a=12),a<10&&(a="0"+a);var n=e.substring(4,5),r="";return r="年"===n?t+"年"+a+"月":t+n+a,r}function p(e){var t=e.substring(0,4),a=e.substring(5,7);t=parseInt(t),a=parseInt(a),a+=1,13===a&&(t+=1,a=1),a<10&&(a="0"+a);var n=e.substring(4,5),r="";return r="年"===n?t+"年"+a+"月":t+n+a,r}function m(e){var t=new Date(e).getFullYear(),a=new Date(e).getMonth()+1,n=new Date(e).getDate(),r=new Date,o=new Date(new Date(e).toLocaleDateString()),l=o.getTime()-r.getTime(),i=parseInt(l/1e3),s=Math.floor(i/86400),c=Math.floor((i-24*s*60*60)/3600),u=Math.floor((i-24*s*60*60-3600*c)/60),d=Math.floor(i-60*s*60*24-60*c*60-60*u);return"距离".concat(t,"年").concat(a,"月").concat(n,"日还有").concat(s,"天").concat(c,"小时").concat(u,"分").concat(d,"秒")}function f(e){return e?e.substr(0,10)+" 00:00:00":""}function g(e){return e?e.substr(0,10)+" 23:59:59":""}function h(e,t,a){return e=e.replace(/-/g,"/"),t=t.replace(/-/g,"/"),a=a.replace(/-/g,"/"),e=new Date(e),t=new Date(t),a=new Date(a),t<=e&&e<=a}function b(e,t){e=e.replace(/-/g,"/"),t=t.replace(/-/g,"/"),e=new Date(e),t=new Date(t);var a=new Date;return e<=a&&a<=t}function w(e,t){var a=new Date;return e=e.replace(/-/g,"/"),t=t.replace(/-/g,"/"),e=new Date(e),t=new Date(t),a<=e&&e<=t}function v(e,t){var a=o(e),n=o(t);return a>n}a("ac1f"),a("5319"),a("99af"),e.exports={Jh_timeStampToTime:r,Jh_convertTimeStamp:o,Jh_timestampToYMD:l,Jh_isToday:i,Jh_getYearMonth:s,Jh_getPrevYear:c,Jh_getNextYear:u,Jh_getPrevYearMonth:d,Jh_getNextYearMonth:p,Jh_compareTimes:v,Jh_isBetweenTimes:h,Jh_isBetweenTimesByCurrent:b,Jh_isBetweenTimesByCurrentAndEndTime:w,getEndTime:m,startOfDay:f,endOfDay:g}},"9a66":function(e,t,a){"use strict";a("ee6f")},aab1:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"spp-user-body spp-theme-body spp-theme-pad"},[a("el-form",{staticClass:"spp-form-search spp-theme-top",attrs:{inline:!0,size:"small",model:e.tableSearchParams}},[a("el-form-item",[a("span",{staticClass:"spp-form-label",staticStyle:{width:"150px"}},[a("i",{staticClass:"icon"}),a("i",{staticClass:"label"},[e._v("名称:")])]),a("el-input",{attrs:{maxlength:"20",placeholder:"请输入",clearable:""},model:{value:e.tableSearchParams.name,callback:function(t){e.$set(e.tableSearchParams,"name",t)},expression:"tableSearchParams.name"}})],1),a("el-form-item",[a("span",{staticClass:"spp-form-label",staticStyle:{width:"150px"}},[a("i",{staticClass:"icon"}),a("i",{staticClass:"label"},[e._v("部门:")])]),a("el-select",{attrs:{placeholder:"请选择","collapse-tags":"",clearable:""},model:{value:e.tableSearchParams.dept,callback:function(t){e.$set(e.tableSearchParams,"dept",t)},expression:"tableSearchParams.dept"}},e._l(e.deptOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("span",{staticClass:"spp-form-label",staticStyle:{width:"150px"}},[a("i",{staticClass:"icon"}),a("i",{staticClass:"label"},[e._v("时间:")])]),a("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd HH:mm","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.tableSearchParams.time,callback:function(t){e.$set(e.tableSearchParams,"time",t)},expression:"tableSearchParams.time"}})],1),a("el-form-item",[a("el-button",{staticClass:"spp-form-btn",attrs:{size:"small",type:"primary"},on:{click:function(t){return e.search()}}},[e._v("查询")])],1)],1),a("div",{staticClass:"spp-table-group spp-theme-top spp-theme-pad"},[a("div",{staticClass:"spp-table-btns"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.onAdd}},[a("i",{staticClass:"el-icon-plus"}),e._v("新增 ")]),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:e.onDelete}},[a("i",{staticClass:"el-icon-delete"}),e._v("删除 ")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.onClickBtn()}}},[a("i",{staticClass:"el-icon-edit"}),e._v("弹框添加 ")])],1),a("el-form",{ref:"formRef",attrs:{model:e.tableForm,"label-width":"120px",inline:!0,rules:e.formRules,size:"small","label-position":"center"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"tableRef",staticClass:"my-table",attrs:{data:e.tableForm.tableData,stripe:!0,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle,"row-class-name":e.rowClassName,border:""},on:{"selection-change":e.onSelectionChange}},[a("el-table-column",{attrs:{label:""}},[a("el-table-column",{attrs:{prop:"xh",type:"index",label:"序号",width:"80px"}}),a("el-table-column",{attrs:{type:"selection",width:"55px"}}),a("el-table-column",{attrs:{label:"名称","render-header":e.addRedStar,"min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".name",rules:e.formRules.name}},[a("el-input",{attrs:{maxlength:"20",placeholder:"请输入",clearable:""},model:{value:t.row.name,callback:function(a){e.$set(t.row,"name",a)},expression:"scope.row.name"}})],1)]}}])}),a("el-table-column",{attrs:{label:"部门","render-header":e.addRedStar,"min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".dept",rules:e.formRules.dept}},[a("el-select",{attrs:{placeholder:"请选择","collapse-tags":"",clearable:""},model:{value:t.row.dept,callback:function(a){e.$set(t.row,"dept",a)},expression:"scope.row.dept"}},e._l(e.deptOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]}}])}),a("el-table-column",{attrs:{label:"操作人","render-header":e.addRedStar,"min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".operator",rules:e.formRules.operator}},[a("el-input",{attrs:{maxlength:"10",placeholder:"请输入",clearable:""},model:{value:t.row.operator,callback:function(a){e.$set(t.row,"operator",a)},expression:"scope.row.operator"}})],1)]}}])}),a("el-table-column",{attrs:{label:"内容","render-header":e.addRedStar,"min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".content",rules:e.formRules.content}},[a("el-input",{attrs:{maxlength:"100",placeholder:"请输入",type:"textarea",autosize:{minRows:2,maxRows:2},clearable:""},model:{value:t.row.content,callback:function(a){e.$set(t.row,"content",a)},expression:"scope.row.content"}})],1)]}}])}),a("el-table-column",{attrs:{label:"创建时间","render-header":e.addRedStar,width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".createDate",rules:e.formRules.createDate}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm",placeholder:"选择日期"},model:{value:t.row.createDate,callback:function(a){e.$set(t.row,"createDate",a)},expression:"scope.row.createDate"}})],1)]}}])}),a("el-table-column",{attrs:{label:"操作时间","render-header":e.addRedStar,width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"tableData."+t.$index+".updateDate",rules:e.formRules.updateDate}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm",placeholder:"选择日期"},model:{value:t.row.updateDate,callback:function(a){e.$set(t.row,"updateDate",a)},expression:"scope.row.updateDate"}})],1)]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",icon:"el-icon-edit-outline"},on:{click:function(a){return e.rowEdit(t.row)}}}),a("el-button",{attrs:{size:"mini",icon:"el-icon-delete",type:"danger"},on:{click:function(a){return e.rowDelete(t.row)}}})]}}])})],1)],1)],1),a("div",{staticClass:"spp-table-btns",staticStyle:{padding:"20px"},attrs:{align:"center"}},[a("el-button",{attrs:{loading:e.dialogSubmitBtnLoading,type:"primary",size:"small"},on:{click:function(t){return e.onClickSave()}}},[e._v("保存")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.onClickReset()}}},[e._v("重置")])],1)],1),a("Dialog3",{attrs:{"is-show":e.isShowDialog,"dialog-data":e.dialogFormData,"jump-page":"table2页面"},on:{"update:isShow":function(t){e.isShowDialog=t},"update:is-show":function(t){e.isShowDialog=t},success:e.requestList,closed:e.onClosedDialog}})],1)},r=[],o=a("5530"),l=(a("e9c4"),a("4e82"),a("a434"),a("6a60")),i=a("99ab"),s=a.n(i),c={components:{Dialog3:l["default"]},data:function(){var e=this,t=function(t,a,n){if(a){var r=t.field.substr(10,1),o=e.tableForm.tableData[r].updateDate,l=s.a.Jh_compareTimes(a,o);l&&n(new Error("创建时间不能大于操作时间!")),n()}else n(new Error("请选择创建时间"))},a=function(t,a,n){if(a){var r=t.field.substr(10,1),o=s.a.Jh_compareTimes(a,e.tableForm.tableData[r].createDate);o||n(new Error("操作时间不能小于创建时间!")),n()}else n(new Error("请选择操作时间"))};return{tableHeight:170,tableLoading:!1,tableSearchParams:{name:"",dept:"",time:"",page:1,limit:this.pageGroup.size},tableTotal:1e3,tableSizes:this.pageGroup.sizes,tableForm:{tableData:[]},formRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],dept:[{required:!0,message:"请选择部门",trigger:"change"}],operator:[{required:!0,message:"请输入操作人名称",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}],createDate:[{validator:t,trigger:"change"}],updateDate:[{validator:a,trigger:"change"}]},selectionList:[],deptOptions:[],dialogSubmitBtnLoading:!1,isShowDialog:!1,dialogFormData:{}}},mounted:function(){this.requestList(),this.requestDict()},methods:{search:function(){this.requestList()},requestList:function(){var e=this.tableSearchParams;console.log("参数："+JSON.stringify(e));for(var t=[],a=0;a<2;a++){var n=a+1;t.push({id:n,name:"名称"+n,dept:"dept"+n,operator:"操作人"+n,content:"内容"+n,createDate:s.a.Jh_timeStampToTime((new Date).getTime(),"{y}-{m}-{d} {h}:{i}:{s}"),updateDate:s.a.Jh_timeStampToTime((new Date).getTime()+864e5,"{y}-{m}-{d} {h}:{i}:{s}")})}this.tableForm.tableData=t},requestDict:function(){this.deptOptions=[{id:"f505a4b97b151d141d122a3d323c87ee",label:"部门一",value:"dept1",type:"这是描述1",sort:0},{id:"f505a4b97b151d141d122a3d323c87ee",label:"部门二",value:"dept2",type:"这是描述2",sort:1}]},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex,a=e.columnIndex;return 0===t&&0===a?{textAlign:"center",background:"#eef1f6",display:"none"}:{textAlign:"center",background:"#f5f5f5"}},cellStyle:function(e){e.row,e.column,e.rowIndex,e.columnIndex;return{textAlign:"center"}},rowClassName:function(e){var t=e.row,a=e.rowIndex;t.xh=a+1},addStar:function(e){return"star"},addRedStar:function(e,t){var a=t.column;return[e("span",{style:"color: red"},"*"),e("span"," "+a.label)]},onSelectionChange:function(e){this.selectionList=e},onAdd:function(){var e={id:"",name:"",dept:"",operator:"",content:"",createDate:"",updateDate:""};this.tableForm.tableData.push(e)},onEdit:function(){0!==this.selectionList.length?this.selectionList.length>1&&this.$message.warning("只能选择一条记录！"):this.$message.warning("请选择记录")},onDelete:function(){var e=this;0!==this.selectionList.length?this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){for(var t=[],a=0;a<e.selectionList.length;a++)t.push(e.selectionList[a].xh);t.sort((function(e,t){return e-t})),console.log("新数组排序后："+t);for(var n=0;n<t.length;n++)e.tableForm.tableData.splice(t[n]-n-1,1);e.$message.success("删除成功!")})).catch((function(){})):this.$message.warning("请选择记录")},rowEdit:function(e){console.log(JSON.stringify(e))},rowDelete:function(e){var t=this;console.log(JSON.stringify(e)),this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.tableForm.tableData.splice(e.xh-1,1),t.$message.success("删除成功!")})).catch((function(){}))},onClickReset:function(){this.$refs["formRef"].resetFields()},onClickSave:function(){var e=this;this.$refs["formRef"].validate((function(t){t?console.log(JSON.stringify(e.tableForm)):(console.log("error submit!!"),e.$message.warning("有未输入项"))}))},onClickBtn:function(e){this.dialogFormData=JSON.parse(JSON.stringify(this.tableForm)),this.isShowDialog=!0},handelDialogSetData:function(e){var t=this;this.$nextTick((function(){t.dialogFormData=Object(o["a"])({},e)}))},onClosedDialog:function(){this.$refs.tableRef.clearSelection()}}},u=c,d=(a("17bb"),a("2877")),p=Object(d["a"])(u,n,r,!1,null,"26a2243c",null);t["default"]=p.exports},dc66:function(e,t,a){"use strict";a.d(t,"i",(function(){return o})),a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return s})),a.d(t,"d",(function(){return c})),a.d(t,"h",(function(){return u})),a.d(t,"g",(function(){return d})),a.d(t,"e",(function(){return p})),a.d(t,"f",(function(){return m}));var n=a("b775"),r=a("7754");function o(e){return Object(n["a"])({url:"/v1/api/table/list",method:"get",params:e})}function l(e){return Object(n["a"])({url:"/v1/api/table/save",method:"post",params:e})}function i(e){return Object(n["a"])({url:"/v1/api/table/delete",method:"post",params:e})}function s(e){return Object(n["a"])({url:"/v1/api/table/save",method:"post",params:e})}function c(e){return Object(n["a"])({url:"/v1/api/table/"+e,method:"get"})}function u(e){return Object(r["h"])({type:"level"})}function d(e){return Object(r["h"])({type:"leader"})}function p(e){return Object(r["h"])({type:"dept"})}function m(e){return Object(r["h"])({type:"deptTree"})}},ee6f:function(e,t,a){},ef3c:function(e,t,a){}}]);