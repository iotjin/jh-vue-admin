(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ba801af"],{"043a":function(t,e,n){"use strict";n("9bd3")},"9bd3":function(t,e,n){},cb01:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"spp-theme-body spp-theme-pad"},[n("h1",{staticStyle:{margin:"10px 0px 30px"}},[t._v("防抖与节流")]),n("div",[t._v(" 未处理前 ")]),n("el-form",{staticClass:"spp-form-search spp-theme-top",attrs:{inline:!0,size:"small",model:t.queryParams}},[n("el-form-item",[n("span",{staticClass:"spp-form-label",staticStyle:{width:"80px"}},[n("i",{staticClass:"icon"}),n("i",{staticClass:"label"},[t._v("名称:")])]),n("el-input",{attrs:{maxlength:"20",placeholder:"请输入",clearable:""},on:{input:t.onChange},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSearch(e)}},model:{value:t.queryParams.name,callback:function(e){t.$set(t.queryParams,"name",e)},expression:"queryParams.name"}})],1),n("el-form-item",[n("el-button",{staticClass:"spp-form-btn",attrs:{size:"small",type:"primary"},on:{click:function(e){return t.onSearch()}}},[t._v("查询")])],1)],1),n("div",{staticClass:"spp-theme-top"},[t._v(" lodash实现 - 搜索框防抖（0.5秒） / 点击按钮节流（3秒内） ")]),n("el-form",{staticClass:"spp-form-search spp-theme-top",attrs:{inline:!0,size:"small",model:t.queryParams2}},[n("el-form-item",[n("span",{staticClass:"spp-form-label",staticStyle:{width:"80px"}},[n("i",{staticClass:"icon"}),n("i",{staticClass:"label"},[t._v("名称:")])]),n("el-input",{attrs:{maxlength:"20",placeholder:"请输入",clearable:""},on:{input:t.onChange2},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSearch2(e)}},model:{value:t.queryParams2.name,callback:function(e){t.$set(t.queryParams2,"name",e)},expression:"queryParams2.name"}})],1),n("el-form-item",[n("el-button",{staticClass:"spp-form-btn",attrs:{size:"small",type:"primary"},on:{click:function(e){return t.onSearch2()}}},[t._v("查询")])],1),n("el-form-item",[n("el-button",{staticClass:"spp-form-btn",staticStyle:{width:"120px"},attrs:{size:"small",type:"primary"},on:{click:function(e){return t.onSearch22()}}},[t._v("查询（方式2）")])],1)],1),n("div",{staticClass:"spp-theme-top"},[t._v(" utils实现 - 搜索框防抖（0.5秒） / 点击按钮节流（3秒内） ")]),n("el-form",{staticClass:"spp-form-search spp-theme-top",attrs:{inline:!0,size:"small",model:t.queryParams2}},[n("el-form-item",[n("span",{staticClass:"spp-form-label",staticStyle:{width:"80px"}},[n("i",{staticClass:"icon"}),n("i",{staticClass:"label"},[t._v("名称:")])]),n("el-input",{attrs:{maxlength:"20",placeholder:"请输入",clearable:""},on:{input:t.onChange3},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSearch3(e)}},model:{value:t.queryParams3.name,callback:function(e){t.$set(t.queryParams3,"name",e)},expression:"queryParams3.name"}})],1),n("el-form-item",[n("el-button",{staticClass:"spp-form-btn",attrs:{size:"small",type:"primary"},on:{click:function(e){return t.onSearch3()}}},[t._v("查询")])],1)],1)],1)},i=[],r=n("2332"),s=n("26ee"),o=function(){return s["a"].Date.now()},l=o,c=/\s/;function u(t){var e=t.length;while(e--&&c.test(t.charAt(e)));return e}var p=u,m=/^\s+/;function f(t){return t?t.slice(0,p(t)+1).replace(m,""):t}var h=f,y=n("f0ce"),d=n("1147"),v="[object Symbol]";function b(t){return"symbol"==typeof t||Object(d["a"])(t)&&Object(y["a"])(t)==v}var g=b,C=NaN,k=/^[-+]0x[0-9a-f]+$/i,x=/^0b[01]+$/i,q=/^0o[0-7]+$/i,w=parseInt;function S(t){if("number"==typeof t)return t;if(g(t))return C;if(Object(r["a"])(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=Object(r["a"])(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=h(t);var n=x.test(t);return n||q.test(t)?w(t.slice(2),n?2:8):k.test(t)?C:+t}var O=S,_="Expected a function",P=Math.max,j=Math.min;function z(t,e,n){var a,i,s,o,c,u,p=0,m=!1,f=!1,h=!0;if("function"!=typeof t)throw new TypeError(_);function y(e){var n=a,r=i;return a=i=void 0,p=e,o=t.apply(r,n),o}function d(t){return p=t,c=setTimeout(g,e),m?y(t):o}function v(t){var n=t-u,a=t-p,i=e-n;return f?j(i,s-a):i}function b(t){var n=t-u,a=t-p;return void 0===u||n>=e||n<0||f&&a>=s}function g(){var t=l();if(b(t))return C(t);c=setTimeout(g,v(t))}function C(t){return c=void 0,h&&a?y(t):(a=i=void 0,o)}function k(){void 0!==c&&clearTimeout(c),p=0,a=u=i=c=void 0}function x(){return void 0===c?o:C(l())}function q(){var t=l(),n=b(t);if(a=arguments,i=this,u=t,n){if(void 0===c)return d(u);if(f)return clearTimeout(c),c=setTimeout(g,e),y(u)}return void 0===c&&(c=setTimeout(g,e)),o}return e=O(e)||0,Object(r["a"])(n)&&(m=!!n.leading,f="maxWait"in n,s=f?P(O(n.maxWait)||0,e):s,h="trailing"in n?!!n.trailing:h),q.cancel=k,q.flush=x,q}var L=z,E="Expected a function";function T(t,e,n){var a=!0,i=!0;if("function"!=typeof t)throw new TypeError(E);return Object(r["a"])(n)&&(a="leading"in n?!!n.leading:a,i="trailing"in n?!!n.trailing:i),L(t,e,{leading:a,maxWait:e,trailing:i})}var $=T,B=n("ed08"),K={components:{},data:function(){return{tableHeight:170,tableLoading:!1,tableData:[],queryParams:{name:"",page:1,limit:this.pageGroup.size},queryParams2:{name:"",page:1,limit:this.pageGroup.size},queryParams3:{name:"",page:1,limit:this.pageGroup.size}}},created:function(){this.onSearch22=$(this.onSearch22,3e3)},mounted:function(){},methods:{onChange:function(t){},onSearch:function(){},onChange2:L((function(){this.getListByKeyword()}),500),getListByKeyword:function(){},onSearch2:$((function(){this.requestList()}),3e3),requestList:function(){},onSearch22:function(){this.requestList3()},onChange3:Object(B["debounce2"])((function(t){this.getListByKeyword3()}),500),getListByKeyword3:function(){},onSearch3:Object(B["throttle"])((function(){this.requestList3()}),3e3),requestList3:function(){}}},G=K,W=(n("043a"),n("2877")),D=Object(W["a"])(G,a,i,!1,null,"0b380750",null);e["default"]=D.exports}}]);