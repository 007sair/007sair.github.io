/**
 * 功能：顶部导航，页面跳转
 * 用法：
 * 		HTML调用：
 * 			<nav class="m_nav">
 *				<div class="m_iscoll" id="navscroll">
 *					<ul><li><a href="加入跳转链接"><span>导航名</span></a></li></ul>
 *					<a href="javascript:;" class="openbtn"></a>
 *				</div>
 *			</nav>
 * 		外部调用：$('.m_nav').mnav();
 */
;(function($, window, document, undefined) {

	var pluginName = "mnav",
		defaults = {
			dataClass: 'anchor', //数据列表分组容器的class
			listTop: 44, //list的top，需要scrolltop+此值
			mTop: 44,
			scroller: true,
			iscrollJson: {
				fixedScrollBar: true,
				bindToWrapper: true,
				eventPassthrough: true,
				scrollX: true,
				scrollY: false,
				preventDefault: false
			}
		};

	//当前导航元素对应的索引
	var DataPosIndex = 0,
		//是否点击了导航
		WasNavTapped = false;

	//清除点击导航的标识
	var clearTapCheck = function() {
		setTimeout(function() {
			WasNavTapped = false;
		}, 200);
	};

	//获取url各部分链接的方法
	function parseURL(url) {
		var a = document.createElement('a');
		a.href = url;
		return {
			source: url,
			protocol: a.protocol.replace(':', ''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: (function() {
				var ret = {},
					seg = a.search.replace(/^\?/, '').split('&'),
					len = seg.length,
					i = 0,
					s;
				for (; i < len; i++) {
					if (!seg[i]) {
						continue;
					}
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
			hash: a.hash.replace('#', ''),
			path: a.pathname.replace(/^([^\/])/, '/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
			segments: a.pathname.replace(/^\//, '').split('/')
		};
	}

	function Plugin(element, options) {
		var th = this;
		this.settings = $.extend({}, defaults, options);

		//这里因为是m_nav加载的，所以要替换elem为#navscroll的元素
		this.elem = element.find('#navscroll');
		this.elemParent = element;
		this._defaults = defaults;
		this._name = pluginName;
		
		this.openbtn = this.elem.find('.openbtn');
		this.place = $('#navscrollplace');
		this.mask = $('#navscrollmask');
		this.li = this.elem.find('li');
		this.offsetTop = this.elemParent.offset().top;
		this.currentPage = -1;

		this.w_href = location.href;
		this.w_hash = location.hash || 0;
		this.$hash  = this.w_hash && $(this.w_hash);

		if ($('header').length) {
			this.settings.mTop = this.settings.listTop;
		} else {
			this.settings.mTop = 0;
		}

		this.objIndex = this.setIndex();
		this.dataElem = $('.' + this.settings.dataClass);
		this.dataLen = this.dataElem.length;

		this.init();
		$('body').data('ismnav', '1');
	}

	$.extend(Plugin.prototype, {
		init: function() {
			var th = this;
			var opt = th.settings;
			window.myScroll = new IScroll('#' + this.elem.attr('id'), opt.iscrollJson);

			//绑定导航按钮事件(click)
			th.li.on('click', function() {
				th.bindNavEvent(this);
			});

			//更多按钮(click)
			th.openbtn.on('click', function() {
				th.bindMoreEvent(this);
			});

			//点击背景关闭
			th.mask.on('click', function() {
				th.openbtn.data('isopen', '');
				th.changeOpen(false);
			});

			if (th.isWrap()) {
				th.openbtn.show();
			};

			//滚动时加载导航条状态
			$(window).on('scroll',function() {
				var scrolltop = $(window).scrollTop();
				th.fixNav(scrolltop);
				th.loadNav();
			});
			$(window).on('touchmove',function() {
				var scrolltop = $(window).scrollTop();
				th.fixNav(scrolltop);
			});

			var hash_index = th.getHashIndex(th.getCurrent());
			if (th.w_hash && th.$hash.length) {
				var offTop = th.$hash.offset().top;
				setTimeout(function() {
					th.switchNav(hash_index);
					th.scroll((offTop - 44) + 'px', 100, function() {});
				}, 250)
			}else{
				th.switchNav(hash_index);
			}

		},
		bindNavEvent: function(obj){
			var th = this;
			var $this = $(obj);
			if (WasNavTapped) return false;
			WasNavTapped = true;
			th.changeOpen(false);
			var isopen = false;
			if (th.openbtn.data('isopen')) {
				isopen = true;
			}
			th.openbtn.data('isopen', '');
			DataPosIndex = $this.data('index');
			$this.addClass('active').siblings().removeClass('active');
			if (DataPosIndex == -1){
				clearTapCheck();
				return false;
			}

			if (th.settings.scroller) {
				//屏幕滚动到商品组
				var a = 44;	//这个值决定滚动的位置
				var offTop = th.getDateElem(DataPosIndex) - a;
				if($('header').length) offTop -= a;
				setTimeout(function(){
					th.scrollNav(th.getTrueIndex(DataPosIndex), 0);
					th.scroll(offTop + 'px', 100, function() {
						clearTapCheck();
					});
				},250)
			}else{
				th.scrollNav(DataPosIndex);
				clearTapCheck();
			}
		},
		bindMoreEvent: function(obj){
			var th = this;
			var $this = $(obj);
			//当未fixed的时候
			var isa = th.offsetTop - $(window).scrollTop() > th.settings.mTop;
			if (isa) {
				//跳到第一个容器位置
				$(window).scrollTop(th.offsetTop);
				clearTapCheck();
			}
			if (!$this.data('isopen')) {
				$this.data('isopen', '1');
				th.changeOpen(true);
			} else {
				$this.data('isopen', '');
				th.changeOpen(false);
			}
			// th.scrollNav(DataPosIndex);
		},
		changeOpen: function(open){
			if (open) {
				// this.elem.addClass('m_open').prepend('<div class="m_navtext">切换楼层</div>');
				this.elem.addClass('m_open');
				this.elem.find('ul').addClass('mnavtransno');
				this.mask.css('display', 'block');
				window.myScroll.disable();
			} else {
				this.elem.removeClass('m_open').find('.m_navtext').remove();
				this.elem.find('ul').removeClass('mnavtransno');
				this.mask.css('display', 'none');
				window.myScroll.enable();
			}
		},
		fixNav: function(st){
			var th = this;
			var fixed = th.elemParent.data('fixed');
			if (st > (th.offsetTop - th.settings.mTop - 4)) {
				if (fixed == 1) return false;
				th.elemParent.css({
					'position': 'fixed',
					'top': th.settings.mTop
				}).data('fixed',1);
				if ($('#navscrollplace').length > 0) {
					$('#navscrollplace').show();
				} else {
					th.elemParent.after('<div id="navscrollplace" style="height:' + th.settings.listTop + 'px;display:block"></div><div id="navscrollmask" class="m_navmask" style="display:none"></div>');
				}
			} else {
				if (fixed == 0) return false;
				th.elemParent.css({
					'position': 'relative',
					'top': 0,
					'background': 'rgba(239,75,75,0.9);'
				}).data('fixed',0);
				$('#navscrollplace').hide();
				if ($('.openbtn').data('isopen')) {
					$('.openbtn').data('isopen', '');
					th.changeOpen(false);
				}
			}
		},
		setIndex: function(){
			var th = this;
			var arr_index = [];
			var count = 0;
			this.li.each(function(index, el) {
				var obj = {};
				var href = $(this).find("a").attr('href');
				var hash = parseURL(href).hash;
				if (href.indexOf('#') !== -1) {
					var hash = href.split('#')[1];
					if ($('#'+hash).length) {
						$(this).data('index', count);
						$('#'+hash).addClass(th.settings.dataClass);
						obj.hashIndex = count++;	
					}else{
						obj.hashIndex = -1;	
					}
				}else{
					obj.hashIndex = -1;
				}
				obj.trueIndex = index;
				arr_index.push(obj);
			});
			return arr_index;
		},
		getHashIndex: function(num){
			var arr = this.objIndex;
			return arr[num].hashIndex;
		},
		getTrueIndex: function(num){
			var arr = this.objIndex;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].hashIndex == num) {
					return arr[i].trueIndex;
				};
			};
		},
		getCurrent: function(){
			var th = this;
			var index = 0;

			this.li.each(function(idx, el) {
				var a_href = $(this).find('a').attr('href');
				if (th.w_hash && (th.w_hash == '#'+parseURL(a_href).hash) ) {
					index = idx;
				}else{
					var reg = /module\/index\/\d+/;
					var reg_exec = reg.exec(th.w_href);
					if (reg_exec && reg_exec[0] && a_href.indexOf(reg_exec[0]) !== -1) {
						index = idx;
						th.currentPage = idx;
					};
				}
			});
			return index;
		},
		switchNav: function(curnum) {
			var th = this;
			curnum = (curnum < 0) ? th.currentPage : th.getTrueIndex(curnum);
			if (curnum<0) curnum = 0;
			th.li.eq(curnum).addClass('active').siblings().removeClass('active');
			th.scrollNav(curnum, 200);
		},
		isWrap: function(){
			var ww = this.elem.find('ul').width();
			if (ww - 44 > $(window).width() || ww - 44 > 640) {
				return true;
			}
			return false;
		},
		getDateElem: function(index) {
			if (this.dataElem.length == 0) return 0;
			if (index >= this.dataLen) return this.dataElem.eq(0).offset().top;
			return this.dataElem.eq(index).offset().top;
		},
		scroll: function(scrollTo, time, callback) {
            var scrollFrom = $(window).scrollTop(),
                i = 0,
                runEvery = 5; // run every 5ms
            scrollTo = parseInt(scrollTo);
            scrollFrom = scrollTo+(scrollTo>scrollFrom?-100:100);
            $(window).scrollTop(scrollFrom);
            time /= runEvery;
            var interval = setInterval(function() {
                i++;
                $(window).scrollTop((scrollTo - scrollFrom) / time * i + scrollFrom);
                if (i >= time) {
                    if ($.isFunction(callback)) callback();
                    clearInterval(interval);
                }
            }, runEvery);
        },
		loadNav: function() {
			var th = this,
				_indexPos = DataPosIndex;
			var scroll_num = th.settings.scroller ? 60 : 0;			
			var mh = $(window).scrollTop() + th.settings.mTop;
			if (th.elemParent.data('fixed') !== 1) {
				//校正导航在banner图未完全渲染时的top值不正确问题
				DataPosIndex = -1;
				th.offsetTop = th.elemParent.offset().top;
 			}
			var dlpprev = DataPosIndex > 0 ? this.getDateElem(DataPosIndex) : this.getDateElem(0),
				dlpnext = DataPosIndex < th.dataLen - 1 ? this.getDateElem(DataPosIndex + 1) : this.getDateElem(th.dataLen - 1);
			if (mh+scroll_num > (dlpnext) && DataPosIndex < th.dataLen - 1) {
				DataPosIndex++;
			}
			if (mh+scroll_num < (dlpprev) && DataPosIndex > 0) {
				DataPosIndex--;
			}
			if (_indexPos != DataPosIndex) {
				th.switchNav(DataPosIndex);
				_indexPos = DataPosIndex;
			}
		},
		scrollNav: function(toindex, ms) {
			toindex = (toindex > -1) ? toindex : DataPosIndex+1;
			var th = this;
			window.myScroll.scrollToElement("li:nth-child(" + (toindex+1) + ")", ms >= 0 ? ms : 200, true);
		}
	});

	$.fn[pluginName] = function(options) {
		return new Plugin(this, options);
	};

})(Zepto, window, document);