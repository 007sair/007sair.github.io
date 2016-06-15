/**
 * 功能：顶部导航，内部跳转
 * 修改：126行加入body添加标示，表示当前页面存在上导航，iscroll存入window，对外可实现接口
 * 2015.7.9修改106行，如果item项有为空的，导航上会保留此高度但不会有该模块的导航
 * 用法：
 *     HTML调用：<nav class="m_nav"></nav>
 *     外部调用：
 *         $('.m_nav').mnav({
 *             items: ['明星清单', '免税店', '纸尿裤', '奶粉', '洗护', '喂养', '辅食', '玩具', '服装', '辣妈', '百货家居', '出行']
 *         });
 */
;(function($, window, document, undefined) {

	var pluginName = "mnav",
		defaults = {
			dataClass: 'anchor', //数据列表分组容器的class
			listTop: 44, //list的top，需要scrolltop+此值
			mTop: 44,
			items: [],
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
			this.elem.addClass('m_open').prepend('<div class="m_navtext">切换楼层</div>');
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
		$li.eq(curnum).addClass('active');
		th.scrollNav(null, 0);
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

	//导航按钮绑定事件
	var bindNavEvent = function(th) {
		if (WasNavTapped) return false;
		WasNavTapped = true;
		changeOpen.call(th, false);
		var isopen = false;
		if (th.openbtn.data('isopen')) {
			isopen = true;
		}
		th.openbtn.data('isopen', '');
		var $this = $(this);
		DataPosIndex = $this.index(); //第几个元素
		var offTop = th.getDateElem(DataPosIndex) - th.settings.mTop;

		$this.addClass('active').siblings().removeClass('active');
		//屏幕滚动到商品组
		th.scroll(offTop + 'px', 100, function() {
			th.scrollNav();
			clearTapCheck();
		});
	};

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

	//加载导航条
	var initNav = function(element) {
		element.after('<div id="navscrollplace" style="height:' + this.settings.listTop + 'px;display:block"></div><div id="navscrollmask" class="m_navmask" style="display:none"></div>');
		var html = '<div class="m_iscoll" id="navscroll"><ul></ul><a href="javascript:;" class="openbtn"></a></div>';
		element.html(html);
		html = '';
		$.each(this.settings.items, function(i, item) {
			if (!item) {
				html += '<li style="display:none"></li>';
			} else {
				if (i == 0)
					html += '<li class="active"><span>' + item + '</span></li>';
				else
					html += '<li><span>' + item + '</span></li>';
			}
		});
		element.find('ul').html(html);
	}

	function Plugin(element, options) {
		this.settings = $.extend({}, defaults, options);
		//加载html
		initNav.call(this, element);

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

		if (!$('header').length) {
			this.settings.mTop = this.settings.listTop;
			this.elemParent.css({
				'position': 'fixed',
				'top': 0,
				'-webkit-transform': 'translateZ(0)',
				'left': '0'
			});
		} else {
			this.settings.mTop += this.settings.listTop;
			this.elemParent.css({
				'position': 'fixed',
				'top': '44px',
				'-webkit-transform': 'translateZ(0)',
				'left': '0'
			});
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

			//绑定导航按钮事件(click)
			th.elem.find('li').on('click', function() {
				bindNavEvent.call(this, th);
			});
			//更多按钮(click)
			th.openbtn.on('click', function() {
				bindMoreEvent.call(this, th);
			});
			//点击背景关闭
			th.mask.on('click', function() {
				th.openbtn.data('isopen', '');
				changeOpen.call(th, false);
			});

			$(window).on('scroll', $.proxy(th.bindScroll, this, navtop));

			if (isWrap.call(th)) {
				th.openbtn.show();
			};
		},
		bindScroll: function(navtop) {
			//导航栏设置定位
			var scrolltop = $(window).scrollTop();
			if (scrolltop == 0) {
				DataPosIndex = 0;
			}

			if (WasNavTapped) return false; //当点击导航时，禁止运行此事件
			//滚动到相应位置事件
			this.loadNav();
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
			toindex = toindex || DataPosIndex + 1;
			window.myScroll.scrollToElement("li:nth-child(" + toindex + ")", ms >= 0 ? ms : 200, true);
		}
	});

	$.fn[pluginName] = function(options) {
		return new Plugin(this, options);
	};

})(Zepto, window, document);