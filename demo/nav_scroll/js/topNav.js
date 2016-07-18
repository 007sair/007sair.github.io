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

	function isApp() {
		var href = window.location.href;
		var re = href.indexOf('_app');
		if (navigator.userAgent.indexOf('miyabaobei_') > -1 || re !== -1) {
			return true;
		}
		return false;
	}

	//打开更多
	function changeOpen(open) {
		if (open) {
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
	}

	//切换导航元素
	function tag(curnum) {
		var th = this;
		var $li = th.elem.find('li');
		$li.removeClass('active');
		$li.eq(curnum).addClass('active').find('a').attr('href', 'javascript:;');
		th.scrollNav(curnum, 0);
	};

	//导航是否多于1行
	function isWrap() {
		var th = this;
		var $ul = th.elem.find('ul');
		if ($ul.width() - 44 > $(window).width()) {
			return true;
		}
		return false;
	}

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

	//获取当前导航的索引位置
	function getCurrent() {
		var th = this;
		var index = 0;
		th.elem.find("li").each(function(idx, el) {
			var $a = $(this).find("a");
			var $a_href = $a.attr('href');
			// var path = parseURL($a.attr('href')).path;
			// var href = href.substring(0, href.lastIndexOf('/'));
			if (window.location.href.match($a_href)) {
				index = idx;
			};
		});
		return index;
	}

	//导航更多绑定事件
	var bindMoreEvent = function(th) {
		//当未fixed的时候
		var isa = th.getDateElem(0) - $(window).scrollTop() > th.settings.mTop;
		if (isa) {
			//跳到第一个容器位置
			$(window).scrollTop(th.getDateElem(0) - th.settings.mTop);
			clearTapCheck();
		}
		var $this = $(this);
		if (!$this.data('isopen')) {
			$this.data('isopen', '1');
			changeOpen.call(th, true);
		} else {
			$this.data('isopen', '');
			changeOpen.call(th, false);
		}
	};

	function Plugin(element, options) {

		this.settings = $.extend({}, defaults, options);

		//这里因为是m_nav加载的，所以要替换elem为#navscroll的元素
		this.elem = element.find('#navscroll');
		this.elemParent = element; //.parent();
		this._defaults = defaults;
		this._name = pluginName;
		this.dataElem = $('.' + this.settings.dataClass);
		this.dataLen = this.dataElem.length;
		this.openbtn = this.elem.find('.openbtn');
		this.place = $('#navscrollplace');
		this.mask = $('#navscrollmask');
		this.offsetTop = this.elemParent.offset().top;

		if ($('header').length) {
			this.settings.mTop = this.settings.listTop;
		} else {
			this.settings.mTop = 0;
		}

		this.init();
		$('body').data('ismnav', '1');
	}

	$.extend(Plugin.prototype, {
		init: function() {
			var th = this;
			var opt = th.settings;
			window.myScroll = new IScroll('#' + this.elem.attr('id'), opt.iscrollJson);

			var navtop = this.elem.offset().top; //导航条距离顶部最初始值。

			//更多按钮(click)
			th.openbtn.on('click', function() {
				bindMoreEvent.call(this, th);
			});

			//点击背景关闭
			th.mask.on('click', function() {
				th.openbtn.data('isopen', '');
				changeOpen.call(th, false);
			});

			// $(window).on('touchmove', $.proxy(th.bindScroll, this, navtop));

			if (isWrap.call(th)) {
				th.openbtn.show();
			};

			tag.call(this, getCurrent.call(th)); //默认加载跳到的地方

			//滚动时加载导航条状态
			$(window).scroll(function() {
				var scrolltop = $(window).scrollTop();
				if (scrolltop > (th.offsetTop - th.settings.mTop)) {
					th.elemParent.css({
						'position': 'fixed',
						'top': th.settings.mTop
					});
					if ($('#navscrollplace').length > 0) {
						$('#navscrollplace').show();
					} else {
						th.elemParent.after('<div id="navscrollplace" style="height:' + th.settings.listTop + 'px;display:block"></div><div id="navscrollmask" class="m_navmask" style="display:none"></div>');
					}
				} else {
					th.elemParent.css({
						'position': 'relative',
						'top': 0
					});
					$('#navscrollplace').hide();
					if ($('.openbtn').data('isopen')) {
						$('.openbtn').data('isopen', '');
						changeOpen.call(th, false);
					}
				}
			})
		},
		bindScroll: function(navtop) {
			//导航栏设置定位
			var scrolltop = $(window).scrollTop();
			if (scrolltop == 0) {
				DataPosIndex = 0;
			}
			if (WasNavTapped) return false; //当点击导航时，禁止运行此事件
			//滚动到相应位置事件
			this.loadNav(window.myScroll);
		},
		getDateElem: function(index) {
			if (index >= this.dataLen) return this.dataElem.eq(0).offset().top;
			return this.dataElem.eq(index).offset().top;
		},
		scroll: function(scrollTo, time, callback) {
			var scrollFrom = $(window).scrollTop(),
				i = 0,
				runEvery = 5; // run every 5ms
			scrollTo = parseInt(scrollTo);
			scrollFrom = scrollTo + (scrollTo > scrollFrom ? -100 : 100);
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
			var mh = $(window).scrollTop() + th.settings.mTop;
			if (mh < this.getDateElem(0))
				return false;
			var dlpprev = DataPosIndex > 0 ? this.getDateElem(DataPosIndex) : this.getDateElem(0),
				dlpnext = DataPosIndex < th.dataLen - 1 ? this.getDateElem(DataPosIndex + 1) : this.getDateElem(th.dataLen - 1);
			if (mh > dlpnext && DataPosIndex < th.dataLen - 1) {
				DataPosIndex++;
			}
			if (mh < dlpprev && DataPosIndex > 0) {
				DataPosIndex--;
			}
			if (_indexPos != DataPosIndex) {
				tag.call(th, DataPosIndex);
			}
		},
		scrollNav: function(toindex, ms) {
			toindex += 1;
			if (isWrap.call(this)) {
				window.myScroll.scrollToElement("li:nth-child(" + toindex + ")", ms >= 0 ? ms : 200, true);
			}
		}
	});

	$.fn[pluginName] = function(options) {
		return new Plugin(this, options);
	};

})(Zepto, window, document);