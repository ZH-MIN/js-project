window.onload = function() {

	var div = document.getElementById('flash');
	var img = div.getElementsByTagName('img'); /*选中div下所有的图片*/
	var ul = document.querySelector("ul");
	var li = ul.getElementsByTagName('li');
	var div_r = document.querySelector(".span-r");
	var div_l = document.querySelector(".span-l");
	var img_len = img.length;
	var count = 0; /*设置count来显示当前图片的序号*/

	/*向后轮播函数*/
	function run() { /*将定时器里的函数提取到外部*/
		count++;
		count = count == 4 ? 0 : count; /*当图片加载到最后一张时，使其归零*/
		for (var i = 0; i < img_len; i++) { /*for循环图片隐藏*/
			img[i].style.display = 'none';
		}
		img[count].style.display = 'block'; /*显示当前count的值所代表的图片*/
		for (var i = 0; i < li.length; i++) {
			li[i].style.backgroundColor = "#e3e3e3"; /*原理同上*/
		}
		li[count].style.backgroundColor = "#f40";
	}

	/*向前轮播函数*/
	function reverse() {
		count--;
		count = count == -1 ? 3 : count;
		for (var i = 0; i < img_len; i++) {
			img[i].style.display = 'none';
			/*利用for循环使除当前count位其他图片隐藏*/
		}
		img[count].style.display = 'block'; /*显示当前count的值所代表的图片*/
		for (var i = 0; i < li.length; i++) {
			li[i].style.backgroundColor = "#e3e3e3"; /*原理同上*/
		}
		li[count].style.backgroundColor = "#f40";
	}

	var timer = setInterval(run, 2000); /*定义定时器，使图片每隔1s更换一次*/

	div.onmouseover = function() {
		/*定义鼠标移入事件，当鼠标移入div区域，清除轮播*/
		clearInterval(timer);
	}

	div.onmouseleave = function() {
		/*定义鼠标移出事件，当鼠标移出div区域，轮播继续*/
		timer = setInterval(run, 2000);
	}

	div_r.onclick = function() { /*因为span没有设置宽高，直接把事件添加到他的父级*/
		run(); /*向后轮播函数*/
	}

	div_l.onclick = function() {
		reverse(); /*向前轮播函数*/
	}

	for (var i = 0; i < img_len; i++) {
		li[i].index = i; /*定义index记录当前鼠标在li的位置*/
		li[i].onclick = function() { /*定义鼠标经过事件*/
			for (var i = 0; i < img_len; i++) {
				/*通过for循环将所有图片隐藏，圆点背景设为白色*/
				li[i].style.background = '#e3e3e3';
				img[i].style.display = 'none';
			}
			this.style.background = '#f40'; /*设置当前所指圆点的背景色*/
			img[this.index].style.display = 'block'; /*使圆点对应的图片显示*/
		}
	}



}
