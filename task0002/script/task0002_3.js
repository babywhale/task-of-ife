var zhengxu = document.getElementById("zhengxu");
var nixu = document.getElementById("nixu");
var show = document.getElementById("show");
var xunhuan = document.getElementById("xunhuan");
var jiange = document.getElementById("interval");
var stop = document.getElementById("stop");
var pic = show.getElementsByTagName('img');
var timer;
var start_index;
var listli = [], lista = [], i;
var stop_flag = 0;
var initial_flag = 1;
addEvent(window, "load", function(){
	//主调用
	roundShow(1, 1, 2000);
	console.log(xunhuan.getAttribute("checked"));
	addEvent(zhengxu, "click", function(){
		if(xunhuan.checked){
			clearInterval(timer);
			roundShow(1, 1, parseInt(jiange.value));
		}
		else{
			clearInterval(timer);
			roundShow(1, 0, parseInt(jiange.value));
		}
	});
	addEvent(nixu, "click", function(){
		if(xunhuan.checked){
			clearInterval(timer);
			roundShow(0, 1, parseInt(jiange.value));
		}
		else{
			clearInterval(timer);
			roundShow(0, 0, parseInt(jiange.value));
		}
	});
	addEvent(stop, "click", function(){
		clearInterval(timer);
		stop_flag = 1;
	});
	//roundShow(1, 1, 2000);
	//设置轮播参数，direction == 1 为正向，isloop == 1 为循环；
	function roundShow(direction, isloop, interval){
		//添加id与style.left并初始化；
		(function(){
			for(var k=0; k<pic.length; k++){
				pic[k].setAttribute("id", "pic"+k);
				pic[k].setAttribute("style", "left:"+800+"px; background-color:");		
				try{lista[k].style.backgroundColor = ""}catch(ex){};			
			}
		})();
	// function roundShow(direction, isloop, interval){		
		//生成对应图片的小点
		(function createPointer(){
			var list = document.createElement("ul");
			list.setAttribute("id", "round_list");
			document.getElementById("show").appendChild(list);
			for(var i=0; i<pic.length; i++){
				listli[i] = document.createElement("li");
				list.appendChild(listli[i]); 
				lista[i] = document.createElement("a");
				lista[i].setAttribute("id", "point"+i);
				lista[i].style.backgroundColor = "";
				listli[i].appendChild(lista[i]);
			}
			//添加样式
			var style = document.createElement("style");
			style.type = "text/css";
			var text = "#round_list{position: absolute;bottom: 5px;right: 10px;}#round_list li{display: inline-block;} #round_list a{width: 10px;height: 10px;display: inline-block;border: 1px solid white;border-radius: 100%;margin-left:5px;}";
			try{
				style.appendChild(document.createTextNode(text));
			}
			catch(ex){
				style.styleSheet.cssText = text;
			}
			var head = document.getElementsByTagName("head");
			head[0].appendChild(style);
	
			//添加鼠标滑过小点时的动作
			for(i=0; i<pic.length; i++){
				lista[i].onmouseover = function(){
					clearInterval(timer);
					//把清除movement时截停的图片挪一边去
					for(var j=0; j<pic.length; j++){
						pic[j].style.left = 800+"px";
					}
					//再把当前的挪过来					
					pic[start_index].style.left = 0;	
					//确定图片滑动方向
					var toindex = lista.indexOf(this);
					if(toindex > start_index){
						pic[toindex].style.left = 800+"px";
						movePic("pic"+start_index, "pic"+toindex, 1);
					}
					if(toindex < start_index){
						pic[toindex].style.left = -800+"px";
						movePic("pic"+start_index, "pic"+lista.indexOf(this), 0);
					}									
					start_index = lista.indexOf(this);
				}
				lista[i].onmouseout = function(){
					clearInterval(timer);
					if(!stop_flag){
						timer = setInterval("roundPic("+direction+", "+isloop+")", interval);					
					}
				}
			}		
		})();

		//按配置参数进行初始化
		if(direction){
			if(initial_flag){
				start_index = 0;
				initial_flag = 0;
			}
		}
		else{
			if(initial_flag){
				start_index = pic.length-1;
				initial_flag = 0;
			}	
		}
		pic[start_index].style.left = 0;
		lista[start_index].setAttribute("style", "background-color:white;");//首图片小点点亮
		timer = setInterval("roundPic("+direction+", "+isloop+")", interval);
	}
});

//图片滑动动画
function movePic(nowid, nextid, direction){
	//开始移动，将当前的小圆点灭掉
	//lista[parseInt(nowid.replace(/[^0-9]+/g, ""))].setAttribute("style","");
	lista[parseInt(nowid.replace(/[^0-9]+/g, ""))].style.backgroundColor = "";
	now = document.getElementById(nowid+"");			
	next = document.getElementById(nextid+"");
	//为防止频繁快速调用（如鼠标很快的移动）造成的拉扯，所以每次都将积累在setTimeout队列中的事件清除；
	if(pic.movement){
		clearTimeout(pic.movement);
	}				
	var nowleft = parseInt(now.style.left);
	var nextleft = parseInt(next.style.left);
	var dist = 0;
	if(direction){
		var nowtoleft = -800;
	}
	else{
		var nowtoleft = 800;
	}
	if(nowleft == nowtoleft){
		//移动完成，将新的小圆点点亮
		//lista[parseInt(nextid.replace(/[^0-9]+/g, ""))].setAttribute("style", "background-color:white");
		lista[parseInt(nextid.replace(/[^0-9]+/g, ""))].style.backgroundColor = "white";	
		return true;
	}
	else if(nowleft > nowtoleft){
		dist = Math.ceil((nowleft - nowtoleft)/20);//变速运动
		nowleft -= dist;
		nextleft -= dist;
	}
	else{
		dist = Math.ceil((nowtoleft - nowleft)/20);//变速运动
		nowleft += dist;
		nextleft += dist;
	}
	now.style.left = nowleft+'px';
	next.style.left = nextleft+'px';
	var repeat = "movePic('"+nowid+"','"+nextid+"',"+direction+")";	
	//movement设置成全局变量会造成上面开始那里“没有设置就清除”的错误；若设置成局部变量，
	//则局部变量在clearTimeout函数的上下文里不存在，使其不能正常工作；
	//所以设置成一个变量的属性；		
	pic.movement = this.setTimeout(repeat, 1);
}

//按设置顺序轮播图片
function roundPic(direction, isloop){
	//debug:如果在不循环且当前为最末index的情况下调用roundPic();
	if(!isloop && ((direction && start_index == pic.length-1) || (!direction && start_index == 0))){
		pic[start_index].style.left = 0;
		clearInterval(timer);
		return;
	}
	if(direction){
		if(isloop){
			if(start_index == pic.length){
				start_index = 0;	
			}
			nextid = "pic"+(start_index+1);
			if(start_index == pic.length-1){
				nextid = "pic"+0;
			}
		}
		if(!isloop){
			if(start_index < pic.length-1){
				nextid = "pic"+(start_index+1);
			}
			if(start_index == pic.length-2){
				clearInterval(timer);
			}
		}
		startid = "pic"+start_index;
		document.getElementById(startid).style.left = 0;
		document.getElementById(nextid).style.left = 800+"px";		
		movePic(startid, nextid, direction);
		start_index++;
	}
	else{

		if(isloop){
			if(start_index == -1){
				start_index = pic.length-1;	
			}
			nextid = "pic"+(start_index-1);
			if(start_index == 0){
				nextid = "pic"+(pic.length-1);
			}
		}
		if(!isloop){
			if(start_index > 0){
				nextid = "pic"+(start_index-1);
			}
			if(start_index == 1){
				clearInterval(timer);
			}
		}
		startid = "pic"+start_index;
		document.getElementById(startid).style.left = 0;
		document.getElementById(nextid).style.left = -800+"px";		
		movePic(startid, nextid, direction);
		start_index--;
	}
}