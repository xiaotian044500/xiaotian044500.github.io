define(function(){var a={initXMLhttp:function(){var b;if(window.XMLHttpRequest){b=new XMLHttpRequest()}else{b=new ActiveXObject("Microsoft.XMLHTTP")}return b},minAjax:function(d){if(!d.url){if(d.debugLog==true){console.log("No Url!")}return}if(!d.type){if(d.debugLog==true){console.log("No Default type (GET/POST) given!")}return}if(!d.method){d.method=true}if(!d.debugLog){d.debugLog=false}var b=this.initXMLhttp();b.onreadystatechange=function(){if(b.readyState==4&&b.status==200){if(d.success){d.success(b.responseText,b.readyState)}if(d.debugLog==true){console.log("SuccessResponse")}if(d.debugLog==true){console.log("Response Data:"+b.responseText)}}else{if(d.debugLog==true){console.log("FailureResponse --> State:"+b.readyState+"Status:"+b.status)}}};var c=[],m=d.data;if(typeof m==="string"){var g=String.prototype.split.call(m,"&");for(var h=0,f=g.length;h<f;h++){var l=g[h].split("=");c.push(encodeURIComponent(l[0])+"="+encodeURIComponent(l[1]))}}else{if(typeof m==="object"&&!(m instanceof String||(FormData&&m instanceof FormData))){for(var e in m){var l=m[e];if(Object.prototype.toString.call(l)=="[object Array]"){for(var h=0,f=l.length;h<f;h++){c.push(encodeURIComponent(e)+"[]="+encodeURIComponent(l[h]))}}else{c.push(encodeURIComponent(e)+"="+encodeURIComponent(l))}}}}c=c.join("&");if(d.type=="GET"){b.open("GET",d.url+"?"+c,d.method);b.send();if(d.debugLog==true){console.log("GET fired at:"+d.url+"?"+c)}}if(d.type=="POST"){b.open("POST",d.url,d.method);b.setRequestHeader("Content-type","application/x-www-form-urlencoded");b.send(c);if(d.debugLog==true){console.log("POST fired at:"+d.url+" || Data:"+c)}}}};return a});