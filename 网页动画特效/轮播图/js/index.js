window.onload = function() {
	// 获取标签
	var slider_main = document.getElementById("slider-main");
	var allItems = slider_main.children;
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var icon = document.getElementById("icon");
	var allDots = icon.children;
	// 获取图片盒子的宽度
	var slider_main_w = parseInt(getStyle(slider_main, "width"));
	// 当前图片索引
	var iNow = 0;
	var timer = null;

	// 监听底部圆点
	for (let i = 0; i < allDots.length; i++) {
		allDots[i].onclick = function() {
			// 清除全部圆点的class
			for (let j = 0; j < allDots.length; j++) {
				allDots[j].className = "";
			}
			// 给当前点击圆点添加class
			this.className = "current";
		}
	}


	// 将其他图片移到右边
	for (let i = 1; i < allItems.length; i++) {
		allItems[i].style.left = slider_main_w + "px";
	}

	// next按钮点击
	next.onclick = function() {
		onNext();
	}

	// prev按钮点击
	prev.onclick = function() {
		onPrev();
	}
	
	// 图片左移
	function onPrev(){
		// 让当前图片右移,上一张图片移到当前位置
		startAnimation(allItems[iNow], {
			"left": slider_main_w
		});
		// 图片索引更新
		iNow--;
		if (iNow < 0) {
			iNow = allItems.length - 1;
		}
		allItems[iNow].style.left = -slider_main_w + "px";
		startAnimation(allItems[iNow], {
			"left": 0
		});
		// 更新圆点索引
		changeDot();
	}
	
	// 图片右移
	function onNext(){
		// 让当前图片左移,下一张图片移到当前位置
		startAnimation(allItems[iNow], {
			"left": -slider_main_w
		});
		// 图片索引更新
		iNow++;
		if (iNow >= allItems.length) {
			iNow = 0;
		}
		allItems[iNow].style.left = slider_main_w + "px";
		startAnimation(allItems[iNow], {
			"left": 0
		});
		// 更新圆点索引
		changeDot();
	}

	// 更改圆点索引
	function changeDot() {
		for (let i = 0; i < allDots.length; i++) {
			allDots[i].className = "";
		}
		allDots[iNow].className = "current";
	}

	// 点击圆点索引跳转对应图片
	for (let i = 0; i < allDots.length; i++) {
		allDots[i].onclick = function(){
			// 获取当前点击的索引
			allDots[i].index = i;
			var curDot = allDots[i].index;
			if(curDot > iNow){
				// 让当前索引的图片往左移,点击图片的索引在右边待命
				startAnimation(allItems[iNow],{"left":-slider_main_w});
				allItems[curDot].style.left = slider_main_w + "px";
			}else if(curDot < iNow){
				// 让当前索引的图片往右移,点击图片的索引在左边待命
				startAnimation(allItems[iNow],{"left":slider_main_w});
				allItems[curDot].style.left = -slider_main_w + "px";
			}
			// 将点击的索引置为当前索引
			iNow = curDot;
			startAnimation(allItems[iNow],{"left":0});
			changeDot();
		}
	}
	
	// 开启定时器 自动轮播
	timer = setInterval(function(){
		onNext();
	},3000);
	
	// 鼠标进入 关闭定时器
	slider_main.onmouseover = function(){
		clearInterval(timer);
	}
	
	// 鼠标离开 开启定时器
	slider_main.onmouseout = function(){
		timer = setInterval(function(){
			onNext();
		},3000);
	}

}
