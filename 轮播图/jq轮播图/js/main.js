$(document).ready(function() {

	$offset = $('.trent-slider').width();
	//当前轮播位置样式
	$tSlideInStyles = {
		left: '0',
		right: '0'
	}
	//加载条停止样式
	$t_loadBarStopStyles = {
		animation: "none",
		width: "0%"
	}
	//隐藏右边轮播图位置样式
	$hiddenSlideStylesRight = {
		left: $offset,
		right: 0 - $offset
	}
	//隐藏左边轮播图位置样式
	$hiddenSlideStylesLeft = {
		right: $offset,
		left: 0 - $offset
	}
	
	//加载条动画
	function tStartLoadBar() {
		$('.inner-load-bar').css('animation', 'load 4.5s linear infinite');
	}

	//开始加载条
	tStartLoadBar();
	
	//当鼠标进入轮播图后停止加载条动画，离开轮播图后开始加载条动画
	$('.trent-slider').hover(function() {
		$('.inner-load-bar').css($t_loadBarStopStyles);
	}, function() {
		tStartLoadBar();
	});
	
	//判断轮播位置是否为当前
	function tSliderHasStopped() {
		if ($('.current-t-slide').css('left') === "0px" && $('.current-t-slide').css('right') === "0px") {
			return true;
		} else {
			return false;
		}
	}
	
	//遍历t-slide，隐藏第二张以后的轮播图
	function tSetCssRight() {
		$('.t-slide').each(function(index, value) {
			if (index > 0) {
				$(this).css($hiddenSlideStylesRight);
			}
		});
	}
	
	//遍历t-slide，隐藏最后一张之前的轮播图
	function tSetCssLeft() {
		$t_total = $('.t-slide').length - 1;
		$('.t-slide').each(function(index, value) {
			if (index < $t_total) {
				$(this).css($hiddenSlideStylesLeft);
			}
		});
	}
	
	//向左轮播图片
	function tSlideChangerLeft() {
		if ($('.current-t-slide').prev().hasClass('t-slide') && tSliderHasStopped()) {
			$('.current-t-slide').removeClass('current-t-slide').css($hiddenSlideStylesRight).prev().css($tSlideInStyles).addClass('current-t-slide');
			$('.current-dot').removeClass('current-dot').prev().addClass('current-dot');
		} else if (tSliderHasStopped()) {//轮播到第一张图时
			$('.current-t-slide').removeClass('current-t-slide');
			$('.t-slide').last().addClass('current-t-slide').css($tSlideInStyles);
			tSetCssLeft();
			$('.current-dot').removeClass('current-dot');
			$('.t-dot').last().addClass('current-dot');
		}
	}
	
	//向右轮播图片
	function tSlideChangerRight() {
		if ($('.current-t-slide').next().hasClass('t-slide') && tSliderHasStopped()) {
			$('.current-t-slide').removeClass('current-t-slide').css($hiddenSlideStylesLeft).next().css($tSlideInStyles).addClass('current-t-slide');
			$('.current-dot').removeClass('current-dot').next().addClass('current-dot');
		} else if (tSliderHasStopped()) {//轮播到最后一张图时
			$('.current-t-slide').removeClass('current-t-slide');
			$('.t-slide').first().addClass('current-t-slide').css($tSlideInStyles);
			tSetCssRight();
			$('.current-dot').removeClass('current-dot');
			$('.t-dot').first().addClass('current-dot');
		}
	}
	
	//隐藏右边图片
	tSetCssRight();
	
	//每4.5s向右轮播一次图片
	var tSlideChange = window.setInterval(function() {
		tSlideChangerRight();
	}, 4500);
	
	//当鼠标进入轮播图后停止轮播，离开轮播图后开始轮播
	$('.trent-slider').mouseover(function() {
		clearInterval(tSlideChange);
	}).mouseout(function() {
		tSlideChange = window.setInterval(function() {
			tSlideChangerRight();
		}, 4500);
	});
	
	//左右按钮点击轮播图片
	$('.arrow').click(function() {
		if ($(this).hasClass('right-arrow')) {
			tSlideChangerRight();
		} else if ($(this).hasClass('left-arrow')) {
			tSlideChangerLeft();
		}
	});
	
	//小圆点点击切换轮播图
	$('.t-dot').click(function() {
		$newDotIndex = $(this).index();
		if (tSliderHasStopped()) {
			$('.t-slide').each(function(index, value) {
				$('.current-dot').removeClass('current-dot');
				$('.current-t-slide').removeClass('current-t-slide');
				$('.t-dot').eq($newDotIndex).addClass('current-dot');
				$('.t-slide').eq($newDotIndex).css($tSlideInStyles).addClass('current-t-slide');
				if (index > $newDotIndex) {
					$(this).css($hiddenSlideStylesRight);
				} else if (index < $newDotIndex) {
					$(this).css($hiddenSlideStylesLeft);
				}
			});
		}
	});

});
