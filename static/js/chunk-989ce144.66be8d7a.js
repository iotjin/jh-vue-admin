(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-989ce144","chunk-2d226c9b"],{"21c5":function(t,e,a){},4924:function(t,e,a){"use strict";a("21c5")},e9c4:function(t,e,a){var i=a("23e7"),n=a("d066"),o=a("d039"),r=n("JSON","stringify"),d=/[\uD800-\uDFFF]/g,s=/^[\uD800-\uDBFF]$/,c=/^[\uDC00-\uDFFF]$/,m=function(t,e,a){var i=a.charAt(e-1),n=a.charAt(e+1);return s.test(t)&&!c.test(n)||c.test(t)&&!s.test(i)?"\\u"+t.charCodeAt(0).toString(16):t},l=o((function(){return'"\\udf06\\ud834"'!==r("\udf06\ud834")||'"\\udead"'!==r("\udead")}));r&&i({target:"JSON",stat:!0,forced:l},{stringify:function(t,e,a){var i=r.apply(null,arguments);return"string"==typeof i?i.replace(d,m):i}})},fe15:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticStyle:{margin:"10px"}}),t._m(0),a("el-dialog",{attrs:{visible:t.dialogVisible,title:"提示",width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v("点击了："+t._s(t.dialogText))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart-bg"},[a("div",{staticClass:"charts",attrs:{id:"myChart1"}})])}],o=(a("e9c4"),a("b0c0"),a("d81d"),a("99af"),a("d3b7"),a("25f0"),a("313e")),r={components:{},data:function(){return{myChart1:null,dialogVisible:!1,dialogText:""}},created:function(){},mounted:function(){this.init_echarts1(),this.requestChartData1()},methods:{init_echarts1:function(){var t={xData:["2022-01-01","2022-02-01","2022-03-01","2022-04-01","2022-05-15"],listData:[]};this.myChart1=o["b"](document.getElementById("myChart1")),this.myChart1.setOption(this.getOption1(t));var e=this;window.addEventListener("resize",(function(){e.myChart1.resize()})),this.myChart1.on("click",(function(t){var a=t.data;console.log(JSON.stringify(a)),e.dialogText=a.name+"（"+a.type+"），code: "+a.code,e.dialogVisible=!0}))},getOption1:function(t){var e={grid:{left:"3%",right:"6%",bottom:"15%",containLabel:!0},tooltip:{trigger:"item",axisPointer:{type:"cross"},formatter:function(t,e,a){var i=t.data;return i.name+"（"+i.type+"）<br/>code: "+i.code}},xAxis:[{data:t.xData,axisLabel:{color:"#333"}}],yAxis:[{data:[]}],dataZoom:[{type:"slider",bottom:"2%"},{type:"inside",bottom:"2%"}],series:[{type:"custom",renderItem:function(e,a){var i=t.listData[a.value(0)],n=i.name+"（"+i.code+"）",r=i.bgColor,d=a.value(0),s=a.coord([a.value(1),d]),c=a.coord([a.value(2),d]),m=c[0]-s[0];i.startTime===i.endTime&&(m=30);var l=24;return{type:"rect",shape:o["a"].clipRectByRect({x:s[0],y:s[1]-l/2,width:m,height:l},{x:e.coordSys.x,y:e.coordSys.y,width:e.coordSys.width,height:e.coordSys.height}),style:a.style({text:n,fill:"orange",stroke:r,lineWidth:2,textFill:"black",fontWeight:"bold",fontSize:"10",opacity:1})}},encode:{x:[1,2],y:0},data:t.listData,itemStyle:{color:"transparent",borderColor:"red",borderWidth:1},label:{show:!0,position:"inside",textStyle:{color:"green",fontSize:15}}}]};return e},requestChartData1:function(){var t=this,e={xData:["2021-01-01","2021-01-15","2021-02-01","2021-02-15","2021-03-01","2021-03-15","2021-04-01","2021-04-15","2021-05-01","2021-05-15","2021-06-01","2021-06-15","2021-07-01","2021-07-15","2021-08-01","2021-08-15","2021-09-01","2021-09-15","2021-10-01","2021-10-15","2021-11-01","2021-11-15","2021-12-01","2021-12-15","2022-01-01","2022-01-15","2022-02-01","2022-02-15","2022-03-01","2022-03-15","2022-04-01","2022-04-15","2022-05-01","2022-05-15","2022-06-01","2022-06-15","2022-07-01","2022-07-15","2022-08-01","2022-08-15","2022-09-01","2022-09-15","2022-10-01","2022-10-15","2022-11-01","2022-11-15","2022-12-01","2022-12-15"],listData:[{name:"类型1",type:"type1",code:"0001",startTime:"2021-01-01",endTime:"2021-01-15"},{name:"类型2",type:"type2",code:"0002",startTime:"2021-02-01",endTime:"2021-02-15"},{name:"类型3",type:"type3",code:"0003",startTime:"2021-03-01",endTime:"2021-03-15"},{name:"类型4",type:"type4",code:"0004",startTime:"2021-04-01",endTime:"2021-04-15"},{name:"类型5",type:"type5",code:"0005",startTime:"2021-05-01",endTime:"2021-05-15"},{name:"类型6",type:"type6",code:"0006",startTime:"2021-06-01",endTime:"2021-06-15"},{name:"类型7",type:"type7",code:"0007",startTime:"2021-07-01",endTime:"2021-07-15"},{name:"类型8",type:"type8",code:"0008",startTime:"2021-08-01",endTime:"2021-08-15"},{name:"类型9",type:"type9",code:"0009",startTime:"2021-09-01",endTime:"2021-09-15"},{name:"类型10",type:"type10",code:"0010",startTime:"2021-10-01",endTime:"2021-10-15"},{name:"类型11",type:"type11",code:"0011",startTime:"2021-11-01",endTime:"2021-11-15"},{name:"类型12",type:"type12",code:"0012",startTime:"2021-12-01",endTime:"2021-12-15"},{name:"类型13",type:"type13",code:"0013",startTime:"2022-01-01",endTime:"2022-01-15"},{name:"类型14",type:"type14",code:"0014",startTime:"2022-02-01",endTime:"2022-02-15"},{name:"类型15",type:"type15",code:"0015",startTime:"2022-03-01",endTime:"2022-03-15"},{name:"类型16",type:"type16",code:"0016",startTime:"2022-04-01",endTime:"2022-04-15"},{name:"类型17",type:"type17",code:"0017",startTime:"2022-05-01",endTime:"2022-05-15"},{name:"类型18",type:"type18",code:"0018",startTime:"2022-06-01",endTime:"2022-06-15"},{name:"类型19",type:"type19",code:"0019",startTime:"2022-07-01",endTime:"2022-07-15"},{name:"类型20",type:"type20",code:"0020",startTime:"2022-08-01",endTime:"2022-08-15"},{name:"类型21",type:"type21",code:"0021",startTime:"2022-01-01",endTime:"2022-01-01"}]};e=this.handleData(e),this.myChart1.showLoading(),setTimeout((function(){t.myChart1.setOption(t.getOption1(e),!0),t.myChart1.hideLoading()}),1e3)},handleData:function(t){var e=this,a=JSON.parse(JSON.stringify(t)),i=a.listData.map((function(t,a){return{name:t.name,value:[a,t.startTime,t.endTime],type:t.type,code:t.code,startTime:t.startTime,endTime:t.endTime,bgColor:e.getRandomColor()}}));return a.listData=i,a},getRandomColor:function(){var t="",e=Math.floor(256*Math.random()),a=Math.floor(256*Math.random()),i=Math.floor(256*Math.random());return t="rgb(".concat(e,",").concat(a,",").concat(i,")"),t},getRandomColor2:function(){return"#"+Math.floor(16777215*Math.random()).toString(16)}}},d=r,s=(a("4924"),a("2877")),c=Object(s["a"])(d,i,n,!1,null,"3496b2b5",null);e["default"]=c.exports}}]);