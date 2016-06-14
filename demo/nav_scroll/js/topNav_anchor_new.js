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
		this.openbtn = this.ele.find('.openbtn');
		this.opt = $.extend({}, defaults, opt);
		this.isFixed = 0;
		this.$anchor = $('.' + this.opt.className);
		this.arr_anchorID = [];
		this.arr_anchorPos = [];
		this.trueAnchor = null;
		this.activeLI = null;
		this.curHash = window.location.hash;

		this.arrPos = [];

		this.init();
	}

	Naver.prototype = {
		constructor: Naver,
		init: function(){
			var _this = this;

			window.myScroll = new IScroll('#' + this.eleChild.attr('id'), this.opt.iScrollJson);

			//创建真实锚点元素的id数组
			this.$anchor.each(function() {
				_this.arr_anchorID.push($(this).attr('id'));
			});

			if (this.isWrap()) {
				this.openbtn.show();
			};

			this.setCustomData();
			this.bindEvent();
		},
		bindEvent: function(){
			var _this = this;

			//绑定滚动
			var realfunc = _this.debounce(function() {
				// console.log('debounce');
				var scrollTop = arguments[0] || 0;
				_this.scrollStop(scrollTop);
			}, 80);

			$(window).scroll(function(){
				// console.log('scrolling')
				var scrollTop = $(this).scrollTop();
				if (scrollTop > _this.offTop) {
					_this.fixed();
				} else {
					_this.collapse();
					_this.static();
				}				
				realfunc(scrollTop);
			});

			//锚点点击事件
			this.eleChild.on('click', 'li', function(index, el) {
				var $li = $(this),
					sData = $li.data('anchors'),
					dataAnchor = _this.getCustomData(sData).top;

				//获取当前选中的li
				_this.activeLI = $li;

				$li.addClass('active').siblings().removeClass('active');

				if (typeof dataAnchor !== 'undefined') {
					setTimeout(function() {
						if (_this.ele.data('open') == 1) {
							//如果展开，点击后就收起
							_this.collapse();
						}
						_this.scrollYTo(0, dataAnchor - _this.iHeight + 2);
					}, 30);
				} else {
					if ($li.find('a').attr('href') === '#') {
						$(window).scrollTop(0);
					}
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
		setCustomData: function(){
			//获取导航的高度
			this.iHeight = this.ele.height();
			//获取导航距顶部的top值
			this.offTop = this.ele.offset().top;
			//更新每个导航的data-anchors值
			this.scrollStop(0);
		},
		getCustomData: function(str){  //传入字符串，输出对象
			if (typeof str !== 'string') return false;
			//这个对象存放锚点和锚点元素相关的数据
			var anchorData = {
				id: null,			//锚点元素ID
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
		scrollStop: function(scrollTop) {
			var _this = this,
				aIndex = -1,	//真实锚点位置,++后第一个为0
				curTop = scrollTop + _this.iHeight,
				floor = _this.getIndex(curTop, _this.arr_anchorPos),	//滚动到的楼层
				curIndex = 0;	//滚动到的锚点元素（范围为所有li的index位置）

			//更新数据前先删除掉上次的数据
			_this.arr_anchorPos = [];

			this.eleChild.find('li').each(function(index, el) {
				var $li = $(this),
					hash = $(this).find('a').attr('href');

				if (hash == _this.curHash) {
					console.log(_this.curHash)
				};

				if (hash.indexOf('#') > -1 && _this.isAnchor(hash)) {  //是锚点链接 && 在当前页面内匹配到锚点id
					aIndex++; //为trueIndex 真实锚点位置
					var thisAnchor = _this.$anchor.eq(aIndex),
						id = thisAnchor.attr('id'),
						top = thisAnchor.offset().top,
						height = thisAnchor.height();

					$li.data('anchors', _this.arr2str([id, index, aIndex, top, height]));
					_this.arr_anchorPos.push(top);

					//找到当前位置 显示对应的锚点状态
					if (floor === aIndex) {
						curIndex = index;
						//上下滚动时切换选项卡
						if (_this.activeLI) {
							//解决锚点元素高度不够高时选项卡切换问题
							if (scrollTop + _this.iHeight < _this.getCustomData(_this.activeLI.data('anchors')).top) {
								$li = _this.activeLI;
								curIndex = _this.getCustomData(_this.activeLI.data('anchors')).index;
							}
						}
					}
				}else{
					//非锚点链接，但是只填了#号
					if (floor === -1 && hash === '#') {
						curIndex = index;
					};
				}
			}).eq(curIndex).addClass('active').siblings().removeClass('active');

			window.myScroll.scrollToElement("li:nth-child(" + (curIndex+1) + ")", 200, true);

			//reset选中状态
			_this.activeLI = null;
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
				dis;

			function move() {
				rafID = requestAnimationFrame(move);
				var st = $(window).scrollTop();
				if (dis <= 0 || st == 0) {
					cancelAnimationFrame(rafID);
				} else {
					dis = (st - y) / 9;
				}
				window.scrollTo(x, st - dis);
			}
			move();
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
			var index = -1;
			for (var i = 0, len = arr.length; i < len; i++) {
				if (cur >= arr[i] && cur < arr[i+1]) {
					index = i;
				};
			};
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

	$.fn.naver = function(options) {
		return new Naver(this, options);
	};

})(Zepto, window);