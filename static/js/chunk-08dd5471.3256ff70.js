(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08dd5471"],{"334a":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticStyle:{margin:"10px"}}),t._m(0),a("el-dialog",{attrs:{visible:t.dialogVisible,title:"提示",width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v("点击了："+t._s(t.dialogText))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart-bg"},[a("div",{staticClass:"charts",attrs:{id:"myChart2"}})])}],n=(a("b0c0"),a("e9c4"),a("d81d"),a("99af"),a("d3b7"),a("25f0"),a("313e")),r={components:{},data:function(){return{myChart1:null,myChart2:null,dialogVisible:!1,dialogText:""}},created:function(){},mounted:function(){this.init_echarts2(),this.requestChartData2()},methods:{init_echarts1:function(){this.myChart1=n["b"](document.getElementById("myChart1")),this.setOption1()},setOption1:function(){var t=["#5ebbbd","#c0504d","#20bb2c","#9b3f5b"];this.myChart1.setOption({color:t,tooltip:{formatter:function(t){return t.name+":"+t.value[1]+"~"+t.value[2]}},grid:{left:"3%",right:"3%",top:"1%",bottom:"10%",containLabel:!0},xAxis:{data:["2018-06-15","2018-06-25","2018-07-01","2018-08-25","2018-11-14","2018-12-13"],textStyle:{color:"#f0f0f0"}},yAxis:{data:["甲泼尼龙片","醋酸泼尼松片","缬沙坦胶囊"],textStyle:{color:"#f0f0f0"}},series:[{type:"custom",renderItem:function(t,e){var a=e.value(0),o=e.coord([e.value(1),a]),i=e.coord([e.value(2),a]),r=24;return{type:"rect",shape:n["a"].clipRectByRect({x:o[0],y:o[1]-r/2,width:i[0]-o[0],height:r},{x:t.coordSys.x,y:t.coordSys.y,width:t.coordSys.width,height:t.coordSys.height}),style:e.style()}},encode:{x:[1,2],y:0},data:[{itemStyle:{normal:{color:t[0]}},name:"甲泼尼龙片",value:[0,"2018-08-25","2018-12-13"]},{itemStyle:{normal:{color:t[1]}},name:"醋酸泼尼松片",value:[1,"2018-06-15","2018-11-14"]},{itemStyle:{normal:{color:t[2]}},name:"缬沙坦胶囊",value:[2,"2018-06-25","2018-07-01"]}]}]})},init_echarts2:function(){var t={xData:["2022-01-01","2022-02-01","2022-03-01","2022-04-01","2022-05-15"],yData:["类型一","类型二","类型三","类型四","类型五"],listData:[]};this.myChart2=n["b"](document.getElementById("myChart2")),this.myChart2.setOption(this.getOption2(t,1));var e=this;window.addEventListener("resize",(function(){e.myChart2.resize()})),this.myChart2.on("click",(function(t){var a=t.data;console.log(JSON.stringify(a)),e.dialogText=a.name+"（"+a.type+"），code: "+a.code,e.dialogVisible=!0}))},getOption2:function(t,e){var a={grid:{left:"3%",right:"6%",bottom:"15%",containLabel:!0},tooltip:{trigger:"item",axisPointer:{type:"cross"},formatter:function(t,e,a){var o=t.data;return o.name+"（"+o.type+"）<br/>code: "+o.code}},xAxis:[{data:t.xData,axisLabel:{color:"#333"}}],yAxis:[{data:t.yData,axisLabel:{color:"#333"}}],dataZoom:[{type:"slider",bottom:"2%"},{type:"inside",bottom:"2%"}],series:[{type:"custom",renderItem:function(e,a){var o=t.listData[a.value(0)],i=o.name+"（"+o.code+"）",r=o.bgColor,s=a.value(0),c=a.coord([a.value(1),s]),l=a.coord([a.value(2),s]),d=24;return{type:"rect",shape:n["a"].clipRectByRect({x:c[0],y:c[1]-d/2,width:l[0]-c[0],height:d},{x:e.coordSys.x,y:e.coordSys.y,width:e.coordSys.width,height:e.coordSys.height}),style:a.style({text:i,fill:"orange",stroke:r,lineWidth:2,textFill:"black",fontWeight:"bold",fontSize:"12",opacity:1})}},encode:{x:[1,2],y:0},data:t.listData,itemStyle:{color:"transparent",borderColor:"red",borderWidth:1},label:{show:!0,position:"inside",textStyle:{color:"green",fontSize:15}}}]};return a},requestChartData2:function(){var t=this,e={xData:["2021-12-15","2022-01-01","2022-01-15","2022-02-01","2022-02-15","2022-03-01","2022-03-15","2022-04-01","2022-04-15","2022-05-01","2022-05-15","2022-06-01","2022-06-15"],yData:["类型一","类型二","类型三","类型四","类型五"],listData:[{name:"类型一",type:"type1",code:"0001",startTime:"2021-12-15",endTime:"2022-01-15"},{name:"类型二",type:"type2",code:"0002",startTime:"2022-02-01",endTime:"2022-02-15"},{name:"类型三",type:"type3",code:"0003",startTime:"2022-03-01",endTime:"2022-03-15"},{name:"类型四",type:"type4",code:"0004",startTime:"2022-04-01",endTime:"2022-04-15"},{name:"类型五",type:"type5",code:"0005",startTime:"2022-05-15",endTime:"2022-06-15"}]};e=this.handleData(e),this.myChart2.showLoading(),setTimeout((function(){t.myChart2.setOption(t.getOption2(e,1),!0),t.myChart2.hideLoading()}),1e3)},handleData:function(t){var e=this,a=JSON.parse(JSON.stringify(t)),o=a.listData.map((function(t,a){return{name:t.name,value:[a,t.startTime,t.endTime],type:t.type,code:t.code,startTime:t.startTime,endTime:t.endTime,bgColor:e.getRandomColor()}}));return a.listData=o,a},getRandomColor:function(){var t="",e=Math.floor(256*Math.random()),a=Math.floor(256*Math.random()),o=Math.floor(256*Math.random());return t="rgb(".concat(e,",").concat(a,",").concat(o,")"),t},getRandomColor2:function(){return"#"+Math.floor(16777215*Math.random()).toString(16)}}},s=r,c=(a("fcdb"),a("2877")),l=Object(c["a"])(s,o,i,!1,null,"cc65d7c2",null);e["default"]=l.exports},"75f8":function(t,e,a){},fcdb:function(t,e,a){"use strict";a("75f8")}}]);