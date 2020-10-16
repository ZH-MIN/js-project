// 封装动画函数
function startAnimation(obj, json, fn) {
	var cur = 0;
	var speed = 0;
	// 在开启新计时器时清除旧计时器,防止出现多重计时器
	clearInterval(obj.timer);
	// 这里开启的定时器为每个div对象各自的定时器
	obj.timer = setInterval(function() {
		// 所有属性到达临界值时为true
		var flag = true;
		for (var attr in json) {
			// 分类
			switch (attr) {
				case "opacity":
					cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
					break;
				case "scrollTop":
					cur = obj[attr];
					break;
				default:
					cur = parseInt(getStyle(obj, attr));
					break;
			}
			// 缓动动画公式: 加速度 = ( 结束值 - 起始值 ) / 缓动系数
			// 使用Math.ceil和Math.floor将speed取整
			speed = json[attr] > cur ? Math.ceil((json[attr] - cur) / 20) : Math.floor((json[attr] - cur) / 20);
			// 临界处理
			if (cur !== json[attr]) {
				// 所有属性未到达临界值继续执行以下代码
				flag = false;
			}
			// 分类
			switch (attr) {
				case "opacity":
					obj.style[attr] = (cur + speed) / 100;
					obj.style.filter = "alpha(opacity: " + (cur + speed) + "})";
					break;
				case "scrollTop":
					obj[attr] = cur + speed;
					break;
				default:
					obj.style[attr] = cur + speed + "px";
					break;
			}
		}
		// 到达临界值
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, 20);
}
// 获取属性样式函数
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		// 兼容IE
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
