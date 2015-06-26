addEvent(window, "load", showHabit3);

//第一阶段
function showHabit(){
	var btn = document.getElementById("habit_btn");
	addEvent(btn, "click", function(){
		var text = document.getElementById("habit_text").value;
		var habits = text.split(",");
		//去重、去空
		var map = {};
		var newhabits = [];
		for(var i=0; i<habits.length; i++){
			habits[i] = trim(habits[i]);
			if(!map[habits[i]] && habits[i] != ""){
				map[habits[i]] = true;
				newhabits.push(habits[i]);
			}
		}
		var habit_div = document.getElementById("habit");
		var habit_show = document.createElement("p");
		habit_show.innerHTML = newhabits.join(" ");
		habit_div.appendChild(habit_show);
	});
}

//第二阶段
function showHabit2(){
	var btn = document.getElementById("habit_btn");
	addEvent(btn, "click", function(){
		var text = document.getElementById("habit_text").value;

		//第二阶段添加的部分
		text = text.replace(/\s|,|，|、|；|;|\n|\r+/g, ",");
		//注意：js中string的值不能改变，所以要再赋值一下才可以，不能去掉前面的"text=";
		//String 类定义的方法都不能改变字符串的内容。
		//像 String.toUpperCase() 这样的方法，返回的是全新的字符串，而不是修改原始字符串。
		//在我理解，因为string是基本数据类型，而js中函数的参数都是按值传递的，
		//对于基本数据类型，就是复制了一份传进去，因此原先的值不会改变。

		var habits = text.split(",");
		//用util.js中的函数去重
		habits = uniqArray(habits);
		var newhabits = [];
		for(var i=0; i<habits.length; i++){
			habits[i] = trim(habits[i]);
			//去空
			if(habits[i] != ""){
				newhabits.push(habits[i]);
			}
		}
		var habit_div = document.getElementById("habit");
		var habit_show = document.createElement("p");
		habit_show.innerHTML = newhabits.join(" ");
		habit_div.appendChild(habit_show);
	});
}

//第三阶段
function showHabit3(){
	var btn = document.getElementById("habit_btn");
	addEvent(btn, "click", function(){
		var hab = document.getElementById("habit_text");
		text = hab.value.replace(/\s|,|，|、|；|;|\n|\r+/g, ",");
		var habits = text.split(",");

		//去掉已有的 warning
		if(warn = document.getElementById("warning")){
			btn.parentNode.removeChild(warn);
		}

		if((text == "") || (habits.length > 10)){
			var warning = document.createElement("p");
			warning.innerHTML = "请输入爱好1到10个！";
			warning.setAttribute("id","warning");
			btn.parentNode.insertBefore(warning, btn);
console.log(warning);
		}
		else{
			//去重、去空
			var map = {};
			var newhabits = [];
			for(var i=0; i<habits.length; i++){
				habits[i] = trim(habits[i]);
				if(!map[habits[i]] && habits[i] != ""){
					map[habits[i]] = true;
					newhabits.push(habits[i]);
				}
			}
			var check = [], lable = [];
			for(var j=0; j<newhabits.length; j++){
				btn.parentNode.appendChild(document.createElement("br"));
				//lable的for属性对应checkbox的id
				check[j] = document.createElement("input");
				check[j].setAttribute("type", "checkbox");
				check[j].setAttribute("checked", "checked");
				check[j].setAttribute("id", "habit"+j);
				btn.parentNode.appendChild(check[j]);
				lable[j] = document.createElement("lable");
				lable[j].innerHTML = newhabits[j];
				lable[j].setAttribute("for", "habit"+j);
				btn.parentNode.appendChild(lable[j]);
			}
		}
	});
}
