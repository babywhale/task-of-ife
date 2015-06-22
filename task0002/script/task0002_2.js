//show定义在全局，或者定义在countDown()如注释掉部分。
var show = document.createElement("p");
show.setAttribute("id", "show_count_down");
document.getElementById("count_down").appendChild(show);
var settime;

var countDown = function(){
	// if(document.getElementById("show_count_down")){
	// 	document.getElementById("count_down").removeChild(document.getElementById("show_count_down"));
	// }
	// var show = document.createElement("p");
	// show.setAttribute("id", "show_count_down");
	// document.getElementById("count_down").appendChild(show);
	var input = document.getElementById("input_time").value;
	var now = new Date();
	var totime = new Date(input)
	var lefttime = parseInt((totime-now)/1000);
	var days = parseInt(lefttime/(60*60*24));
	var hours = parseInt(lefttime/(60*60)%24);
	var minutes = parseInt(lefttime/60%60);
	var seconds = parseInt(lefttime%60);
	var date = input.split("-");
	if(lefttime<=0){
		show.innerHTML = "距离"+date[0]+"年"+date[1]+"月"+date[2]+"日还有0天0小时0分0秒";
		clearInterval(settime);
	}
	else{
		show.innerHTML = "距离"+date[0]+"年"+date[1]+"月"+date[2]+"日还有"+days+"天"+hours+"小时"+minutes+"分"+seconds+"秒";
	}					
}
addEvent(window, "load", function(){
	var btn = document.getElementById("time_btn");
	addEvent(btn, "click", function(){
		settime = setInterval("countDown()", 500);
	});
});

//注意作用域！防止setInterval中的函数undefined.
//函数的作用域链在于它在哪里定义，而不是在哪里被调用！