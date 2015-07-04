var wrap = document.getElementsByClassName("wrap");
var box = document.getElementsByClassName("box");
var EventUtil = {
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }
        else{
            event.returnValue = false;
        }
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    }
};

//获取元素相对位置（相对于窗口）
function getElementViewLeft(element){
　　var actualLeft = element.offsetLeft;
　　var current = element.offsetParent;
　　while (current !== null){
　　　　actualLeft += current.offsetLeft;
　　　　current = current.offsetParent;
　　}
　　if (document.compatMode == "BackCompat"){
　　　　var elementScrollLeft=document.body.scrollLeft;
　　} 
    else {
　　　　var elementScrollLeft=document.documentElement.scrollLeft; 
　　}
　　return actualLeft-elementScrollLeft;
}
function getElementViewTop(element){
　　var actualTop = element.offsetTop;
　　var current = element.offsetParent;
　　while (current !== null){
　　　　actualTop += current. offsetTop;
　　　　current = current.offsetParent;
　　}
　　if (document.compatMode == "BackCompat"){
　　　　var elementScrollTop=document.body.scrollTop;
　　} 
    else {
　　　　var elementScrollTop=document.documentElement.scrollTop; 
　　}
　　return actualTop-elementScrollTop;
}

addEvent(window, "load", function(){
    for(var i=0; i<wrap.length; i++){
        //使容器可放置
        addEvent(wrap[i], "dragenter", function(){
            EventUtil.preventDefault(event);
            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
        });
        addEvent(wrap[i], "dragover", function(){
            EventUtil.preventDefault(event);
        });
        wrap[i].xpos = getElementViewLeft(wrap[i]);
        wrap[i].ypos = getElementViewTop(wrap[i]);
    }
    for(var j=0; j<box.length; j++){
        //使 box可拖动
        box[j].setAttribute("draggable", "true");

        var box_width = box[j].offsetWidth;
        var box_height = box[j].offsetHeight;
        addEvent(box[j], "drag", function(){
            var target = EventUtil.getTarget(event);
            target.style.position = "fixed";
            var xpos = event.clientX;
            var ypos = event.clientY;
            target.style.left = xpos+"px";
            target.style.top = ypos+"px";
        });
        addEvent(box[j], "dragend", function(){
            var target = EventUtil.getTarget(event);
            var center_x = event.clientX + box_width/2;
            var center_y = event.clientY + box_height/2;
            console.log(wrap[0].ypos + wrap[0].offsetHeight);
            if((center_x > wrap[0].xpos + 50) && (center_x < wrap[0].xpos + wrap[0].offsetWidth + 50) && (center_y > wrap[0].ypos) && (center_y < wrap[0].ypos + wrap[0].offsetHeight)){
                target.parentNode.removeChild(target);
                wrap[0].appendChild(target);
            }
            if(center_x > wrap[1].xpos + 50 && center_x < wrap[1].xpos + wrap[1].offsetWidth + 50 && center_y > wrap[1].ypos && center_y < wrap[1].ypos + wrap[1].offsetHeight){
                target.parentNode.removeChild(target);
                wrap[1].appendChild(target);
            }
            target.style.position = "static";
        });
    }
});





































































