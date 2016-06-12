/**
 * 功能：顶部导航，页面跳转
 * 用法：
 * HTML调用：
 *   <nav class="m_nav">
 *    <div class="m_iscoll" id="navscroll">
 *      <ul>
 *        <li><a href="加入跳转链接"><span>导航名</span></a></li>
 *      </ul>
 *      <a href="javascript:;" class="openbtn"></a>
 *    </div>
 *  </nav>
 * js调用：
 *   $('.m_nav').fixer();
 */

/**
 * define requestAnimationFrame
 */
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

;(function($, window, undefined) {

	//window.myScroll.scrollToElement("li:nth-child(" + (th.getTrueIndex(toindex)+1) + ")", ms >= 0 ? ms : 200, true);

	var defaults = {
		className: 'anchor',
		iScrollJson: {
			fixedScrollBar: true,
			bindToWrapper: true,
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			preventDefault: false
		}
	};

	function Naver(ele, opt){
		this.ele = ele;
		this.eleChild = this.ele.find('#navscroll');
		this.opt = $.extend({}, defaults, opt);
		this.isFixed = 0;
		this.iHeight = this.ele.height();
		this.$anchor = $('.' + this.opt.className);
		this.arr_anchor_id = [];
		this.arr_anchor_pos = [];
		this.trueAnchor = null;

		this.init();
	}

	Naver.prototype = {
		constructor: Naver,
		init: function(){
			var _this = this;

			//创建真实锚点数组
			this.$anchor.each(function() {
				_this.arr_anchor_id.push($(this).attr('id'));
			});

			window.myScroll = new IScroll('#' + this.eleChild.attr('id'), this.opt.iScrollJson);

			this.defineData();
			this.bindEvent();
		},
		defineData: function(){
			var _this = this;

			//定义导航的高度
			this._H = this.ele.height();
			//定义导航距顶部的top值
			this.offTop = this.ele.offset().top;
			//获取各锚点距顶部的top值
			this.getPos();

			//抽取关联anchor的导航并设置其data属性
			var arr_trueAnchor = [];
			this.eleChild.find('li').each(function(index, el) {
				var hash = $(this).find('a').attr('href');
				if (hash.indexOf('#') > -1 && _this.matchAnchor(hash)) {
					//是锚点链接 && 在当前页面内匹配到锚点id
					$(this).addClass('nav-anchor');
				}
				$(this).data('index', index);
			});

			this.trueAnchor = $('.nav-anchor');

			this.trueAnchor.each(function(index, el) {
				$(this).data('anchor', _this.arr_anchor_pos[index]);
			});
		},
		bindEvent: function(){
			var _this = this;

			$.fn.setActive = function(){
				$(this).addClass('active').siblings().removeClass('active');
			};

			var realfunc = _this.debounce(function() {
				console.log('debounce');
				_this.swipeNav(arguments[0]);
			}, 30);

			//绑定滚动
			$(window).scroll(function(){
				console.log('scrolling')
				var scrollTop = $(this).scrollTop();
				if (scrollTop > _this.offTop) {
					_this.fixed();
				} else {
					_this.static();
				}
				realfunc(scrollTop);
			});

			//锚点点击事件
			this.eleChild.on('click', 'li', function(index, el) {
				//先点击选中
				var $li = $(this),
					dataAnchor = $li.data('anchor');
				//判断是否是真实的anchor
				if (typeof dataAnchor !== 'undefined') {
					// console.log('true')
					//能匹配到的锚点
					var st = $(this).data('anchor');
					setTimeout(function() {
						_this.scrollYTo(0, st - _this.iHeight);
						$li.setActive();
					}, 50)
				}else{
					// console.log('false')
					window.location.hash = '#';
					$li.setActive();
				}

				// console.log($(this).find('a').attr('href'))
			});

		},
		showPlace: function(){
			//设置ele的占位
			if (!this.$placeHolder) {
				this.$placeHolder = $('<div style="height:'+ this._H +'px;">');
				this.ele.after(this.$placeHolder);
			}else{
				this.$placeHolder.show();
			}
		},
		hidePlace: function(){
			this.$placeHolder && this.$placeHolder.hide();
		},
		fixed: function(){
			if (this.isFixed !== 0) {
				return false;
			};
			this.showPlace();
			this.ele.css({
				position: 'fixed',
				top: 0
			});
			this.ele.data('fixed', 1);
			this.isFixed = 1;
			// console.log('fixed', this.isFixed);
		},
		static: function(){
			if (this.isFixed == 0) {
				return false;
			};
			this.hidePlace();
			this.ele.css({
				position: 'relative'
			});
			this.ele.data('fixed', 0);
			this.isFixed = 0;
			// console.log('static', this.isFixed);
		},
		scrollYTo: function(x, y){
			var rafID = null,
				dis,
				target = y;

			function move() {
				rafID = requestAnimationFrame(move);
				var st = $(window).scrollTop();
				if (dis <= 0 || st == 0) {
					cancelAnimationFrame(rafID);
				} else {
					dis = (st - target) / 5.1;
				}
				window.scrollTo(x, st - dis);
			}
			move();
		},
		swipeNav: function(scrollTop){
			var _this = this,
				curTop = scrollTop + _this.iHeight,
				curIndex = _this.getIndex(curTop, _this.arr_anchor_pos);

			_this.trueAnchor.eq(curIndex).addClass('active').siblings().removeClass('active');
			//这里必须用所有li去寻找位数，不然会出现选中状态不在正中间的问题 先获取真实li的实际位置
			var trueIndex = _this.trueAnchor.eq(curIndex).data('index');
			// console.log(curIndex)
			window.myScroll.scrollToElement("li:nth-child(" + (trueIndex+1) + ")", 200, true);
		},
		matchAnchor: function(hash){
			var _this = this;
			if (this.$anchor.length < 0 || !hash) return false;
			for (var i = 0, len = _this.arr_anchor_id.length; i < len; i++) {
				if (hash === '#'+_this.arr_anchor_id[i]) {
					return true;
				}
			};
			return false;
		},
		matchHeight: function(hash){
			var baseHeight = $(window).height();
			if ($(hash).height() >= baseHeight) {
				return true;
			}else{
				return false;
			}
		},
		getPos: function(){
			//获取每个anchor距顶部的距离
			var _this = this;
			this.$anchor.each(function() {
				_this.arr_anchor_id.push($(this).attr('id'));
				_this.arr_anchor_pos.push($(this).offset().top);
			});
		},
		getIndex: function(cur, arr){
			//获取当前导航的curIndex状态
			var index = 0;
			for (var i = 0, len = arr.length; i < len; i++) {
				if (cur >= arr[i] && cur < arr[i+1]) {
					index = i;
				};
			};
			return index;
		},
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this,
					args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}

	};

	$.fn.naver = function(options) {
		return new Naver(this, options);
	};

})(Zepto, window);