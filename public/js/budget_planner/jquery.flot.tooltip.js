/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.8.4
 * authors: Krzysztof Urbas @krzysu [myviews.pl],Evan Steinkerchner @Roundaround
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2014-08-06
 * released under MIT License, 2012
*/ 
!function(a){var b={tooltip:!1,tooltipOpts:{id:"flotTip",content:"%s | X: %x | Y: %y",xDateFormat:null,yDateFormat:null,monthNames:null,dayNames:null,shifts:{x:10,y:20},defaultTheme:!0,lines:!1,onHover:function(){},$compat:!1}},c=function(a){this.tipPosition={x:0,y:0},this.init(a)};c.prototype.init=function(b){function c(a){var c={};c.x=a.pageX,c.y=a.pageY,b.setTooltipPosition(c)}function d(c,d,f){var g=function(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))},h=function(a,b,c,d,e,f,h){if(!h||(h=function(a,b,c,d,e,f){if("undefined"!=typeof c)return{x:c,y:b};if("undefined"!=typeof d)return{x:a,y:d};var g,h=-1/((f-d)/(e-c));return{x:g=(e*(a*h-b+d)+c*(a*-h+b-f))/(h*(e-c)+d-f),y:h*g-h*a+b}}(a,b,c,d,e,f),h.x>=Math.min(c,e)&&h.x<=Math.max(c,e)&&h.y>=Math.min(d,f)&&h.y<=Math.max(d,f))){var i=d-f,j=e-c,k=c*f-d*e;return Math.abs(i*a+j*b+k)/Math.sqrt(i*i+j*j)}var l=g(a,b,c,d),m=g(a,b,e,f);return l>m?m:l};if(f)b.showTooltip(f,d);else if(e.plotOptions.series.lines.show&&e.tooltipOptions.lines===!0){var i=e.plotOptions.grid.mouseActiveRadius,j={distance:i+1};a.each(b.getData(),function(a,c){for(var e=0,f=-1,i=1;i<c.data.length;i++)c.data[i-1][0]<=d.x&&c.data[i][0]>=d.x&&(e=i-1,f=i);if(-1===f)return void b.hideTooltip();var k={x:c.data[e][0],y:c.data[e][1]},l={x:c.data[f][0],y:c.data[f][1]},m=h(c.xaxis.p2c(d.x),c.yaxis.p2c(d.y),c.xaxis.p2c(k.x),c.yaxis.p2c(k.y),c.xaxis.p2c(l.x),c.yaxis.p2c(l.y),!1);if(m<j.distance){var n=g(k.x,k.y,d.x,d.y)<g(d.x,d.y,l.x,l.y)?e:f,o=(c.datapoints.pointsize,[d.x,k.y+(l.y-k.y)*((d.x-k.x)/(l.x-k.x))]),p={datapoint:o,dataIndex:n,series:c,seriesIndex:a};j={distance:m,item:p}}}),j.distance<i+1?b.showTooltip(j.item,d):b.hideTooltip()}else b.hideTooltip()}var e=this,f=a.plot.plugins.length;if(this.plotPlugins=[],f)for(var g=0;f>g;g++)this.plotPlugins.push(a.plot.plugins[g].name);b.hooks.bindEvents.push(function(b,f){if(e.plotOptions=b.getOptions(),e.plotOptions.tooltip!==!1&&"undefined"!=typeof e.plotOptions.tooltip){e.tooltipOptions=e.plotOptions.tooltipOpts,e.tooltipOptions.$compat?(e.wfunc="width",e.hfunc="height"):(e.wfunc="innerWidth",e.hfunc="innerHeight");{e.getDomElement()}a(b.getPlaceholder()).bind("plothover",d),a(f).bind("mousemove",c)}}),b.hooks.shutdown.push(function(b,e){a(b.getPlaceholder()).unbind("plothover",d),a(e).unbind("mousemove",c)}),b.setTooltipPosition=function(b){var c=e.getDomElement(),d=c.outerWidth()+e.tooltipOptions.shifts.x,f=c.outerHeight()+e.tooltipOptions.shifts.y;b.x-a(window).scrollLeft()>a(window)[e.wfunc]()-d&&(b.x-=d),b.y-a(window).scrollTop()>a(window)[e.hfunc]()-f&&(b.y-=f),e.tipPosition.x=b.x,e.tipPosition.y=b.y},b.showTooltip=function(a,c){var d=e.getDomElement(),f=e.stringFormat(e.tooltipOptions.content,a);d.html(f),b.setTooltipPosition({x:c.pageX,y:c.pageY}),d.css({left:e.tipPosition.x+e.tooltipOptions.shifts.x,top:e.tipPosition.y+e.tooltipOptions.shifts.y}).show(),"function"==typeof e.tooltipOptions.onHover&&e.tooltipOptions.onHover(a,d)},b.hideTooltip=function(){e.getDomElement().hide().html("")}},c.prototype.getDomElement=function(){var b=a("#"+this.tooltipOptions.id);return 0===b.length&&(b=a("<div />").attr("id",this.tooltipOptions.id),b.appendTo("body").hide().css({position:"absolute"}),this.tooltipOptions.defaultTheme&&b.css({background:"#fff","z-index":"1040",padding:"0.4em 0.6em","border-radius":"0.5em","font-size":"0.8em",border:"1px solid #111",display:"none","white-space":"nowrap"})),b},c.prototype.stringFormat=function(a,b){var c,d,e,f,g=/%p\.{0,1}(\d{0,})/,h=/%s/,i=/%lx/,j=/%ly/,k=/%x\.{0,1}(\d{0,})/,l=/%y\.{0,1}(\d{0,})/,m="%x",n="%y",o="%ct";if("undefined"!=typeof b.series.threshold?(c=b.datapoint[0],d=b.datapoint[1],e=b.datapoint[2]):"undefined"!=typeof b.series.lines&&b.series.lines.steps?(c=b.series.datapoints.points[2*b.dataIndex],d=b.series.datapoints.points[2*b.dataIndex+1],e=""):(c=b.series.data[b.dataIndex][0],d=b.series.data[b.dataIndex][1],e=b.series.data[b.dataIndex][2]),null===b.series.label&&b.series.originSeries&&(b.series.label=b.series.originSeries.label),"function"==typeof a&&(a=a(b.series.label,c,d,b)),"undefined"!=typeof b.series.percent?f=b.series.percent:"undefined"!=typeof b.series.percents&&(f=b.series.percents[b.dataIndex]),"number"==typeof f&&(a=this.adjustValPrecision(g,a,f)),a="undefined"!=typeof b.series.label?a.replace(h,b.series.label):a.replace(h,""),a=this.hasAxisLabel("xaxis",b)?a.replace(i,b.series.xaxis.options.axisLabel):a.replace(i,""),a=this.hasAxisLabel("yaxis",b)?a.replace(j,b.series.yaxis.options.axisLabel):a.replace(j,""),this.isTimeMode("xaxis",b)&&this.isXDateFormat(b)&&(a=a.replace(k,this.timestampToDate(c,this.tooltipOptions.xDateFormat,b.series.xaxis.options))),this.isTimeMode("yaxis",b)&&this.isYDateFormat(b)&&(a=a.replace(l,this.timestampToDate(d,this.tooltipOptions.yDateFormat,b.series.yaxis.options))),"number"==typeof c&&(a=this.adjustValPrecision(k,a,c)),"number"==typeof d&&(a=this.adjustValPrecision(l,a,d)),"undefined"!=typeof b.series.xaxis.ticks){var p;p=this.hasRotatedXAxisTicks(b)?"rotatedTicks":"ticks";var q=b.dataIndex+b.seriesIndex;if(b.series.xaxis[p].length>q&&!this.isTimeMode("xaxis",b)){var r=this.isCategoriesMode("xaxis",b)?b.series.xaxis[p][q].label:b.series.xaxis[p][q].v;r===c&&(a=a.replace(k,b.series.xaxis[p][q].label))}}if("undefined"!=typeof b.series.yaxis.ticks)for(var s in b.series.yaxis.ticks)if(b.series.yaxis.ticks.hasOwnProperty(s)){var t=this.isCategoriesMode("yaxis",b)?b.series.yaxis.ticks[s].label:b.series.yaxis.ticks[s].v;t===d&&(a=a.replace(l,b.series.yaxis.ticks[s].label))}return"undefined"!=typeof b.series.xaxis.tickFormatter&&(a=a.replace(m,b.series.xaxis.tickFormatter(c,b.series.xaxis).replace(/\$/g,"$$"))),"undefined"!=typeof b.series.yaxis.tickFormatter&&(a=a.replace(n,b.series.yaxis.tickFormatter(d,b.series.yaxis).replace(/\$/g,"$$"))),e&&(a=a.replace(o,e)),a},c.prototype.isTimeMode=function(a,b){return"undefined"!=typeof b.series[a].options.mode&&"time"===b.series[a].options.mode},c.prototype.isXDateFormat=function(){return"undefined"!=typeof this.tooltipOptions.xDateFormat&&null!==this.tooltipOptions.xDateFormat},c.prototype.isYDateFormat=function(){return"undefined"!=typeof this.tooltipOptions.yDateFormat&&null!==this.tooltipOptions.yDateFormat},c.prototype.isCategoriesMode=function(a,b){return"undefined"!=typeof b.series[a].options.mode&&"categories"===b.series[a].options.mode},c.prototype.timestampToDate=function(b,c,d){var e=a.plot.dateGenerator(b,d);return a.plot.formatDate(e,c,this.tooltipOptions.monthNames,this.tooltipOptions.dayNames)},c.prototype.adjustValPrecision=function(a,b,c){var d,e=b.match(a);return null!==e&&""!==RegExp.$1&&(d=RegExp.$1,c=c.toFixed(d),b=b.replace(a,c)),b},c.prototype.hasAxisLabel=function(b,c){return-1!==a.inArray(this.plotPlugins,"axisLabels")&&"undefined"!=typeof c.series[b].options.axisLabel&&c.series[b].options.axisLabel.length>0},c.prototype.hasRotatedXAxisTicks=function(b){return-1!==a.inArray(this.plotPlugins,"tickRotor")&&"undefined"!=typeof b.series.xaxis.rotatedTicks};var d=function(a){new c(a)};a.plot.plugins.push({init:d,options:b,name:"tooltip",version:"0.8.4"})}(jQuery);