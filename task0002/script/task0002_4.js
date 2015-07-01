addEvent(window, "load", function(){
	var suggetData = ['apple','banana','coffee','duck'];
	function createList(datarr){
		var doc = document;//减少对全局变量的访问次数
		var text_input = doc.getElementById("text_input");
		//创建添加提示框ul，并设置样式
		var tishi = doc.createElement("ul");
		doc.getElementById("tishi_wrap").appendChild(tishi);
		tishi.setAttribute("id", "tishi");
		tishi.style.border = "1px solid #eee";
		tishi.style.width = "200px";
		//处理每行提示内容li
		var tishili;
		for(var i in datarr){
			tishili = doc.createElement("li");
			tishili.innerHTML = datarr[i];
			tishi.appendChild(tishili);
			tishili.style.backgroundColor = "white";
		}
		var lis = tishi.getElementsByTagName("li");
		//鼠标事件
		for(i in lis){
			//划过li背景变灰	
			addEvent(lis[i], "mouseover", function(){
				for(var k=0; k<lis.length; k++){//for-in是个奇妙的东西
					lis[k].style.backgroundColor = "white";
				}
				var target = event.target || event.srcElement;
				target.style.backgroundColor = "#eee";
			});
			addEvent(lis[i], "mouseout", function(){
				var target = event.target || event.srcElement;
				target.style.backgroundColor = "white";
			});
			//选中将内容赋给text_input
			//不能用onclick,要用onmousedown，因为这样才能先执行这里再执行下面“当文本框失去焦点时提示框隐藏”，
			//否则隐藏了这里就不能执行了。
			addEvent(lis[i], "mousedown", function(){
				var target = event.target || event.srcElement;
				text_input.value = target.innerHTML;
			});
		}
		//键盘事件
		addEvent(text_input, "keydown", function(e){
			//找出当前的li
			var kindex = -1, k;
			for(k=0; k<lis.length; k++){//这里不能用for-in，否则for-in完才会进入if
				if(lis[k].style.backgroundColor != "white"){
					kindex = k;
				}  
			}
			if(e.keyCode == 38){//up
				if(kindex>-1){
					lis[kindex].style.backgroundColor = "white";
					if(kindex>0){
						lis[kindex-1].style.backgroundColor = "#eee";	
					}	
				}
			}
			if(e.keyCode == 40){//down
				if(kindex<lis.length-1){
					if(kindex>-1){
						lis[kindex].style.backgroundColor = "white";				
					}
					lis[kindex+1].style.backgroundColor = "#eee";
				}
			}
			if(e.keyCode == 13){//enter
				if(kindex != -1){
					text_input.value = lis[kindex].innerHTML;	
				}
				tishi.style.display = "none";	
			}
		});
		tishi.style.display = "none";
		//文本框获得焦点时显示提示框
		text_input.onfocus = function(){
			tishi.style.display = "block";
		}
		//文本框失去焦点提示框隐藏
		text_input.onblur = function(){
			tishi.style.display = "none";
		}
	}
	createList(suggetData);
});