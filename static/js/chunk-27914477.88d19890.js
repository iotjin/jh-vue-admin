(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27914477"],{7298:function(t,a,e){"use strict";e.r(a);var l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"app-container"},[e("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:t.tableData,"span-method":t.arraySpanMethod,"row-key":"id",border:""}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-table",{staticClass:"table-in-table",staticStyle:{width:"100%"},attrs:{"show-header":!1,data:a.row.datas,"row-key":"id","span-method":t.arraySpanMethod,border:""}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-table",{staticClass:"table-in-table",staticStyle:{width:"100%"},attrs:{data:a.row.datas,"row-key":"id",border:""}},[e("el-table-column",{attrs:{prop:"date",label:"下单日期",width:"180"}}),e("el-table-column",{attrs:{prop:"type",label:"单据类型",width:"180"}}),e("el-table-column",{attrs:{prop:"status",label:"状态"}}),e("el-table-column",{attrs:{label:"操作",width:"120"}},[[e("el-button",{attrs:{type:"text",size:"small"}},[t._v("移除")])]],2)],1)]}}],null,!0)}),e("el-table-column",{attrs:{prop:"applyNo",label:"申请单号",width:"132.2"}}),e("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),e("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)]}}])}),e("el-table-column",{attrs:{prop:"applyNo",label:"申请单号",width:"180"}}),e("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),e("el-table-column",{attrs:{prop:"address",label:"地址"}}),e("el-table-column",{attrs:{label:"操作",width:"120"}},[[e("el-button",{attrs:{type:"text",size:"small"}},[t._v("移除")])]],2)],1)],1)},n=[],s={components:{},data:function(){return{tableHeight:170,tableLoading:!1,tableData:[]}},mounted:function(){this.initData()},methods:{initData:function(){this.tableData=[{id:1,applyNo:"202004291234",name:"张三",address:"上海市普陀区金沙江路 1518 弄"},{id:2,applyNo:"202004291235",name:"李四",address:"上海市普陀区金沙江路 1517 弄"},{id:3,applyNo:"202004291236,202004291237",name:"王五",address:"上海市普陀区金沙江路 1519 弄",datas:[{id:31,applyNo:"202004291236",name:"王小五",address:"上海市普陀区金沙江路 1519 弄",datas:[{id:31,date:"2016-05-01",type:"类型1",status:"已发货"},{id:32,date:"2016-05-01",type:"类型2",status:"未发货"}]},{id:32,applyNo:"202004291237",name:"赵小六",address:"上海市普陀区金沙江路 1519 弄"}]},{id:4,applyNo:"202004291238",name:"赵六",address:"上海市普陀区金沙江路 1516 弄"}]},arraySpanMethod:function(t){var a=t.row,e=(t.column,t.rowIndex,t.columnIndex);if(!a.datas){if(0===e)return[0,0];if(1===e)return[1,2]}}}},o=s,r=(e("bff9"),e("2877")),d=Object(r["a"])(o,l,n,!1,null,"6e548140",null);a["default"]=d.exports},bff9:function(t,a,e){"use strict";e("e1e8")},e1e8:function(t,a,e){}}]);