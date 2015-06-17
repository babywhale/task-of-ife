// 判断arr是否为一个数组，返回一个bool值
function isArray(arr){
	return Object.prototype.toString.call(arr) == "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn){
	return Object.prototype.toString.call(fn) == "[object Function]";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr){
	var h = {}, a = [];
	for(var i=0; i<arr.length; i++){
		if(!h[arr[i]]){
			h[arr[i]] = true;
			a.push(arr[i]);
		}
	}
	return a;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str){
	return str.replace(/(^/s*)|(/s*$)/g, str);
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn){
	for(var i=0; i<arr.length; i++){
		fn(arr[i], i);
		if(i != arr.length-1){
			console.log(", ");
		}
	}
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
	var n = 0;
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			n++;
		}
	}
	return n;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var email = /^[\w-]+@\w+\.\w+[\.\w]*$/i;
    return email.test(eailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var phoneNum = /^1[3,5,8]{1}[0-9]{1}-?[0-9]{4}-?[0-9]{4}$/i;
    return phoneNum.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.setAttribute("class", newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var ele_class = element.getAttribute("class");
    ele_class = ele_class.replace(oldClassName, "");
    element.setAttribute("class", ele_class);
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var left = element.offsetLeft;
    var top = element.offsetTop;
    return {
    	x:left,
    	y:top
    }
}

// 实现一个简单的Query
function $(selector) {
	
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 实现一个简单的Query
function $(selector) {
	var reg=/#((?:[\w\u00c0-\uFFFF-]|\\.)+)\s+\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/;//子元素选择器
	if(reg.test(selector)){
		var strs=selector.replace(" ","");
		strs=strs.split("\.");
		var idname=strs[0],classname=strs[1],ele=$(idname);
		var lis=$("."+classname),list=[];
		for(var i=0;i<lis.length;i++){
			if(lis[i].parentNode==ele){
				list.push(lis[i]);
			}
		}
		return list;		
	}
	reg=/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/;//id选择器
	if(reg.test(selector)){
		var idname=selector.replace("#","");
		return document.getElementById(idname);
	}
	reg=/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/;//类选择器
	if(reg.test(selector)){
		var classname=selector.replace(".","");
		if(document.getElementsByClassName){
			return document.getElementsByClassName(classname);
		}else{
			var list=[];
			var eles=document.all;
			for(var i=0;i<eles.length;i++){
				if(eles[i].getAttribute("class")!=null){
					eles[i].getAttribute("class").split(" ").join("-");
					if(eles[i].getAttribute("class").indexOf(classname)>=0){
					list.push(eles[i]);	
				    }
				}
			}
			return list;
		}
	}
	reg=/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/;//标签选择器
	if(reg.test(selector)){
		return document.getElementsByTagName(selector);
	}
	reg=/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/;//属性选择器
	var list=[];
	if(reg.test(selector)){
		var reg1=/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*\]/;
		if(reg1.test(selector)){
			var attr=selector.replace("\"","");
			attr=attr.replace("\[","");
			attr=attr.replace("\]","");
			var eles=document.all;
			for(var i=0;i<eles.length;i++){
				if(eles[i].getAttribute(attr)){
					//console.log(attr);
					list.push(eles[i]);
				}
			}
		}else{
			var attr=selector.replace("\"","");
			attr=attr.replace("\[","");
			attr=attr.replace("\]","");
			var strs=attr.split("=");
			attr=strs[0];
			//console.log(attr);
			var value=strs[strs.length-1];
			var eles=document.all;
			for(var i=0;i<eles.length;i++){
				if(eles[i].getAttribute(attr)==value){					//console.log(attr);
					list.push(eles[i]);	
				}
			}
		}
		return list;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener){
    	element.addEventListener(event, listener, false)
    }
    else if(element.attachEvent){
    	element.attachEvent('on'+event, listener)
    }
    else{
    	element['on'+event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener){
    	element.removeEventListener(event, listener, false)
    }
    else if(element.detachEvent){
    	element.detachEvent('on'+event, listener)
    }
    else{
    	element['on'+event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keyup', prepare);
    var eve = window.event || event;
    prepare = function(eve){
    	if(eve.keyCode==13){
    		listener();
    	}
    	else{}
    }
}
//封装
//js中each遍历的用法
$.on = function(selector, event, listener) {
    each($(selector), function(item){
    	addEvent(item, event, listener);
    });
};

$.click = function(selector, listener) {
    each($(selector), function(item){
    	addClickEvent(item, listener);
    });
};

$.un = function(selector, event, listener) {
    each($(selector), function(item){
    	removeEvent(item, event, listener);
    });
};

$.delegate = function(selector, tag, event, listener) {
    each($(selector).getElementsByTagName(tag), function(item){
    	addEvent(item, event, listener);
    });
};

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var user_agent = navigator.userAgent.toLowerCase();
    var matchs = /trident\/([\d+\.]+)/.exec(user_agent);
    if(matchs&&matchs.length>0){
    	return matchs[1];
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var cookieText = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
	if(expiredays instanceof Date){
		cookieText += "; expires=" + expirdays.toGMTString();
	}
	document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var Name = encodeURIComponent(cookieName) + "=";
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    if(cookieStart>-1){
    	var cookieEnd = document.cookie.indexOf(";", cookieStart);
    	if(cookieEnd == -1){
    		cookieEnd = document.cookie.length;
    	}
    	cookieValue = encodeURIComponent(document.cookie.substring(cookieStart+Name.length, cookieEnd));
    }
    return cookieValue;
    
}
