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
		this.openbtn = this.ele.find('.openbtn');
		this.$li = this.eleChild.find('li');
		this.opt = $.extend({}, defaults, opt);
		this.isFixed = 0;
		this.arr_anchorID = [];
		this.activeLI = null;
		this.iCurTop = 0;
		this.$body = $('body');
		this.curHash = window.location.hash;

		this.init();
	}

	Naver.prototype = {
		constructor: Naver,
		init: function(){
			var _this = this;

			window.myScroll = new IScroll('#' + this.eleChild.attr('id'), this.opt.iScrollJson);


			//如果导航li过多，显示更多按钮
			if (this.isWrap()) {
				this.openbtn.show();
			};

			//给锚点模块添加anchor
			this.$li.each(function(index, el) {
				var $li = $(this),
					hash = $li.find('a').attr('href');

				if (hash.indexOf('#') > -1 && $(hash).length > 0) {
					$(hash).addClass(_this.opt.className)
				};
			});

			//创建真实锚点元素的id数组
			this.$anchor = $('.' + this.opt.className);
			this.$anchor.each(function() {
				_this.arr_anchorID.push($(this).attr('id'));
			});

			//获取导航距顶部的top值
			this.offTop = this.ele.offset().top;  
			//获取导航的高度
			this.iHeight = this.ele.height();
			//更新导航li的data-anchors值
			this.setCustomData();

			this.bindEvent();

		},
		setCustomData: function(){
			var _this = this,
				anchorIndex = -1,
				curTop = _this.iCurTop + _this.iHeight;

			this.arr_anchorPos = [];
			this.$li.each(function(index, el) {
				var $li = $(this),
					hash = $li.find('a').attr('href'),
					id = hash.split('#')[1];

				if (hash.indexOf('#') > -1 && _this.isAnchor(hash)) {  //是锚点链接 && 在当前页面内匹配到锚点id
					anchorIndex++; //为trueIndex 真实锚点位置
					var thisAnchor = $(hash),
						top = thisAnchor.offset().top,
						height = thisAnchor.height();

					$li.data('anchors', _this.arr2str([id, index, anchorIndex, top, height]));
					_this.arr_anchorPos.push(top);
				}
			});
		},
		getCustomData: function(str){  //传入字符串，输出对象
			if (typeof str !== 'string') return false;
			//这个对象存放锚点和锚点元素相关的数据
			var anchorData = {
				hash: null,			//锚点元素hash值
				index: null,		//所有li的index
				trueIndex: null,	//正确锚点li的index
				top: null,			//每个锚点元素距顶部的绝对值
				height: null 		//每个锚点元素的高度
			};
			var arr = str.split('|'),
				i = -1;

			for(var key in anchorData){
				i++;
				anchorData[key] = +arr[i]; //+ string to number
			}

			return anchorData;
		},
		bindEvent: function(){
			var _this = this;

			//绑定滚动
			var stop = _this.debounce(function() {
				// console.log('debounce');
				_this.scrollStop();
				_this.setCustomData();
				_this.$body.removeClass('disable-event');
			}, 80);

			function fnScroll(){
				if (_this.ele.data('fixed') !== 1) {
					_this.offTop = _this.ele.offset().top; 
				};
				// console.log('scrolling')
				_this.$body.addClass('disable-event');
				_this.iCurTop = $(this).scrollTop();
				if (_this.iCurTop > _this.offTop) {
					_this.fixed();
				} else {
					_this.collapse();
					_this.static();
				}				
				stop();
			}

			//初始化时触发一次导航切换 使导航能跳到正确位置，
			//因为第一次打开页面时也没的scrollTop不一定为0, 不一定没有锚点
			fnScroll();

			$(window).scroll(function(){
				// requestAnimationFrame(fnScroll);
				fnScroll()
			});

			//锚点点击事件
			this.eleChild.on('click', 'li', function(index, el) {
				//点击触发前先更新所有按钮的数据
				_this.setCustomData();

				var $li = $(this),
					index = $li.index(),
					sData = $li.data('anchors'),
					top = _this.getCustomData(sData).top;

				_this.activeLI = $li;

				$li.addClass('active').siblings().removeClass('active');

				if (typeof top !== 'undefined') {
					setTimeout(function() {
						if (_this.ele.data('open') == 1) {
							//如果展开，点击后就收起
							_this.collapse();
						}
						_this.scrollYTo(0, top);
					}, 30);
				}
			});

			window.addEventListener('hashchange', function(){
				_this.curHash = window.location.hash;
			},false)

			//点击更多
			this.openbtn.on('click', function() {
				if (_this.ele.data('fixed') !== 1) {
					$(window).scrollTop(_this.arr_anchorPos[0] - _this.iHeight + 2);
				}
				if (_this.ele.data('open') == 1) {
					_this.collapse();
				}else{
					_this.expand();
				}
			});

		},
		scrollStop: function() {
			var _this = this,
				aIndex = -1,	//真实锚点位置,++后第一个为0
				curTop = _this.iCurTop + _this.iHeight,
				floor = _this.getIndex(curTop, _this.arr_anchorPos),	//滚动到的楼层
				curIndex = -1;	//滚动到的锚点元素（范围为所有li的index位置）

			function parseURL(url){
				var a = document.createElement('a');
				a.href = url;
				return {
					path: a.pathname.replace(/^([^\/])/, '/$1')
				}
			}

			var href = parseURL(window.location.href).path;

			this.$li.each(function(index, el) {
				var $li = $(this),
					hash = $li.find('a').attr('href'),
					data = $li.data('anchors'),
					top = _this.getCustomData(data).top,
					trueIndex = _this.getCustomData(data).trueIndex;

				var reg = /module\/index\/\d+/g;
				if (floor == trueIndex || (floor === -1 && hash === '#') || window.location.href.indexOf(reg.exec(hash)) > -1 ) {
					//满足 楼层相同 or 楼层为-1且hash值仅为# or 当前li的href链接与本页面链接相同 时 切换导航到当前位置
					curIndex = index
				};
			});
			_this.swipeTo(curIndex);
		},
		showPlace: function(){
			//设置ele的占位
			if (!this.$placeHolder) {
				this.$placeHolder = $('<div style="height:'+ this.iHeight +'px;">');
				this.ele.after(this.$placeHolder);
			}else{
				this.$placeHolder.css('display','block');
			}
		},
		hidePlace: function(){
			this.$placeHolder && this.$placeHolder.css('display','none');
		},
		fixed: function(){
			if (this.isFixed !== 0) return false;
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
			if (this.isFixed == 0) return false;
			this.hidePlace();
			this.ele.css({
				position: 'relative'
			});
			this.ele.data('fixed', 0);
			this.isFixed = 0;
			// console.log('static', this.isFixed);
		},
		scrollYTo: function(x, y){
			if (typeof x === 'undefined' || typeof y === 'undefined') return false;
			var rafID = null,
				_this = this,
				target = y - this.iHeight + 2,	//需要移动到的目标位置
				dis;

			function move() {
				rafID = requestAnimationFrame(move);
				var st = $(window).scrollTop();
				if (dis <= 0 || st == 0) {
					cancelAnimationFrame(rafID);
				} else {
					dis = (st - target) / 9;
				}
				window.scrollTo(x, st - dis);
			}
			move();
		},
		swipeTo: function(index){
			var _this = this;
			var $li = this.$li.eq(index);
			if (_this.activeLI && _this.iCurTop + _this.iHeight < _this.getCustomData(_this.activeLI.data('anchors')).top) {
				//解决锚点元素高度不够高时选项卡切换问题
				$li = _this.activeLI;
				index = _this.getCustomData(_this.activeLI.data('anchors')).index;
			}
			$li.addClass('active').siblings().removeClass('active');
			window.myScroll.scrollToElement("li:nth-child(" + (index+1) + ")", 200, true);
			//滚动结束后要重置当前选中的li
			_this.activeLI = null;
		},
		isAnchor: function(hash){  //匹配传入的hash值能否在页面中找到对应的元素id
			var _this = this;
			if (this.$anchor.length < 0 || !hash) return false;
			for (var i = 0, len = _this.arr_anchorID.length; i < len; i++) {
				if (hash === '#'+_this.arr_anchorID[i]) {
					return true;
				}
			};
			return false;
		},
		isOut: function(hash){
			var baseHeight = $(window).height();
			if ($(hash).height() >= baseHeight) {
				return true;
			}else{
				return false;
			}
		},
		getIndex: function(cur, arr){  //获取当前导航的curIndex状态
			if (cur < this.arr_anchorPos[0]) {
				return -1;
			};
			var temp,
				newArr = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				temp = cur - arr[i];
				if (temp < 0) {
					temp = arr[i];
				}
				newArr.push(temp);
			};
			return this.findMin(newArr);
		},
		findMin: function(arr) {
			var iMin = arr[0];
			var index = 0;
			for (var i = 1, len = arr.length; i < len; i++) {
				if (arr[i] < iMin) {
					iMin = arr[i];
					index = i;
				}
			}
			return index;
		},
		debounce: function(func, wait, immediate) { //防抖函数
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
		},
		arr2str: function(arr) {
			var str = '';
			for (var i = 0, len = arr.length; i < len; i++) {
				str += (i !== len - 1) ? arr[i] + '|' : arr[i];
			};
			return str;
		},
		isWrap: function(){  //选项卡个数是否超过一行
			var ww = this.eleChild.find('ul').width(),
				iW = this.openbtn.width();
			if (ww - iW > $(window).width() || ww - iW > 640) {
				return true;
			}
			return false;
		},
		expand: function(){
			//展开
			this.eleChild.addClass('m_open');
			this.eleChild.find('ul').addClass('mnavtransno');
			this.ele.data('open', 1);
		},
		collapse: function(){
			//收起
			this.eleChild.removeClass('m_open');
			this.eleChild.find('ul').removeClass('mnavtransno');
			this.ele.data('open', 0);
		}

	};

	$.fn.mnav = function(options) {
		return new Naver(this, options);
	};

})(Zepto, window);