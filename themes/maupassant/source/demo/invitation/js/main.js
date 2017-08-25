// for scroll pic
function swipe(){
    var slider = Swipe(document.getElementById('slider'), {
        auto: 3000,
        continuous: true,
        callback: function(pos) {

            var i = bullets.length;
            while (i--) {
                bullets[i].className = ' ';
            }
            bullets[pos].className = 'on';
        }
    });
    var bullets = document.getElementById('position').getElementsByTagName('li');
}

var music = document.getElementById('music');
var audio = document.getElementById('music-src');

define("main",[],function(require,exports,module){
    var pages = require("pages"),
        preload = pages.preload,//预加载组件，用于预加载图片
        pageslide = pages.pageslide;//这个组件用于控制页面滑动。

    var pSlide = {};

    function startShow(){
        document.addEventListener("touchmove", function(e) {
            e.preventDefault()
        });
        var loader = document.getElementById('loader');
        var pages = document.getElementById('pages');
        pSlide = new pageslide(pages, "Y");//Y表示上下滑动。X水平滑动
        setTimeout(function() {
            loader.style.display = "none";//当图片加载完成时，隐藏加载条。
        }, 1000)
        pages.classList.remove("none");
        swipe();
        audio.setAttribute('src','music.m4a');
    }

    // 判断是否 iPhone 或者 iPod
    if((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
        // 判断系统版本号是否大于 4
        if (Boolean(navigator.userAgent.match(/OS [6-9]_\d[_\d]* like Mac OS X/i))) {
            //非4
            //alert('1');
            //预加载图片，加载完成时实例化页面滑动组件。
            setTimeout(function(){
                (new preload(o("#progress"), ["bg.jpg","marry01.png", "marry02.png", "marry03.png"], {prefix: "images/",complete: startShow})).load();
            },2000)
        }else{
            //4
            //alert('4');
            document.getElementById('loader').style.display = "none";
            document.getElementById('pages').className = 'pages i4';
            swipe();
        }
    }else{
        (new preload(o("#progress"), ["bg.jpg","marry01.png", "marry02.png", "marry03.png"], {prefix: "images/",complete: startShow})).load();
    }

	
    function o(e) {
        return document.querySelector(e)
    }

    function u(e) {
        return document.querySelectorAll(e)
    }

    !function() {
        var styleSheet = function() {
            function add(cssText) {
                var r = cssText.split("\r\n");
                var i = !!styleSheet.cssRules ? styleSheet.cssRules.length : 0;
                for (var s = 0; s < r.length; ++s) {
                    styleSheet.insertRule(r[s], i++)
                }
                return i
            }
            var styleSheet = function() {
                var head = document.getElementsByTagName("head")[0];
                var style = document.createElement("style");
                style.type = "text/css";
                head.appendChild(style);
                return document.styleSheets[document.styleSheets.length - 1]
            }();
            return {add: add}
        }();
        var t = function() {
            var e = document.createElement("div");
            e.style.cssText = "-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;";
            if (e.style.webkitTransition) {
                return "-webkit-"
            } else if (e.style.mozTransition) {
                return "-moz-"
            } else if (e.style.oTransition) {
                return "-o-"
            } else if (e.style.msTransition) {
                return "-ms-"
            } else {
                return ""
            }
        }();
        var n = function() {
            var n = document.createElement("div"), r = document.createElement("i"), i = document.createElement("div");

            i.style.cssText = "position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0; z-index:9999; background-color:#df3031; display:none;",
                n.style.cssText = "position:absolute; left:50%; top:50%; width:250px; height:150px; margin:-75px 0 0 -125px; text-align:center; color:#ffffff;",
                r.style.cssText = "position:relative; display:block; width:74px; height:110px; background:url(images/phone.png) 0 0 no-repeat; background-size:100%; margin:0 auto; " + t + "transform:rotate(-90deg); " + t + "animation:TOUCH_DRAG_IPHONE 1.6s ease-in infinite;";
            styleSheet.add("@" + t + "keyframes TOUCH_DRAG_IPHONE{0%{" + t + "transform:rotate(-90deg);}25%{" + t + "transform:rotate(0deg);}50%{" + t + "transform:rotate(0deg);}75%{" + t + "transform:rotate(-90deg);}100%{" + t + "transform:rotate(-90deg);}}");
            document.body.appendChild(i), i.appendChild(n), n.appendChild(r);
            var s = document.createTextNode("为了更好的体验，请使用竖屏浏览");
            n.appendChild(document.createElement("br")), n.appendChild(s);
            var setCssText = function(e, t, i) {
                if (typeof e == "string")
                    n.style.cssText = e;
                if (typeof t == "string")
                    r.style.cssText = t;
                if (typeof i == "string")
                    s.nodeValue = i
            };
            var show = function() {
                i.style.display = "block"
            };
            var hide = function() {
                i.style.display = "none"
            };
            return {show: show,hide: hide,setCssText: setCssText}
        }();
        var r = "onorientationchange" in window;
        var i = document.documentElement.clientHeight, s = document.documentElement.clientWidth;
        if (r) {
            if (window.orientation != "0")
                n.show();
            window.addEventListener("orientationchange", function() {
                if (window.orientation != "0") {
                    n.show()
                } else {
                    n.hide()
                }
            }, false)
        } else {
            if (i < s)
                n.show()
        }
        window.addEventListener("resize", function() {
            i = document.documentElement.clientHeight, s = document.documentElement.clientWidth;
            if (!r) {
                if (i < s) {
                    n.show()
                } else {
                    n.hide()
                }
            }
        }, false);
        
    }();
});
define("pages",[],function(require,exports,module){
    "use strict";
    if ("document" in self && !("classList" in document.createElement("_"))) {
        (function(e) {
            if (!("Element" in e))
                return;
            var t = "classList", n = "prototype", r = e.Element[n], Obj = Object, s = String[n].trim || function() {
                return this.replace(/^\s+|\s+$/g, "")
            }, o = Array[n].indexOf || function(e) {
                var t = 0, n = this.length;
                for (; t < n; t++) {
                    if (t in this && this[t] === e) {
                        return t
                    }
                }
                return -1
            }, u = function(e, t) {
                this.name = e;
                this.code = DOMException[e];
                this.message = t
            }, a = function(e, t) {
                if (t === "") {
                    throw new u("SYNTAX_ERR", "An invalid or illegal string was specified")
                }
                if (/\s/.test(t)) {
                    throw new u("INVALID_CHARACTER_ERR", "String contains an invalid character")
                }
                return o.call(e, t)
            }, f = function(e) {
                var t = s.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, i = n.length;
                for (; r < i; r++) {
                    this.push(n[r])
                }
                this._updateClassName = function() {
                    e.setAttribute("class", this.toString())
                }
            }, l = f[n] = [], c = function() {
                return new f(this)
            };
            u[n] = Error[n];
            l.item = function(e) {
                return this[e] || null
            };
            l.contains = function(e) {
                e += "";
                return a(this, e) !== -1
            };
            l.add = function() {
                var e = arguments, t = 0, n = e.length, r, i = false;
                do {
                    r = e[t] + "";
                    if (a(this, r) === -1) {
                        this.push(r);
                        i = true
                    }
                } while (++t < n);
                if (i) {
                    this._updateClassName()
                }
            };
            l.remove = function() {
                var e = arguments, t = 0, n = e.length, r, i = false;
                do {
                    r = e[t] + "";
                    var s = a(this, r);
                    if (s !== -1) {
                        this.splice(s, 1);
                        i = true
                    }
                } while (++t < n);
                if (i) {
                    this._updateClassName()
                }
            };
            l.toggle = function(e, t) {
                e += "";
                var n = this.contains(e), r = n ? t !== true && "remove" : t !== false && "add";
                if (r) {
                    this[r](e)
                }
                return !n
            };
            l.toString = function() {
                return this.join(" ")
            };
            if (Obj.defineProperty) {
                var h = {get: c,enumerable: true,configurable: true};
                try {
                    Obj.defineProperty(r, t, h)
                } catch (p) {
                    if (p.number === -2146823252) {
                        h.enumerable = false;
                        Obj.defineProperty(r, t, h)
                    }
                }
            } else if (Obj[n].__defineGetter__) {
                r.__defineGetter__(t, c)
            }
        })(self)
    }
    var preload = function(progress, items, config) {
        if (!items || !Array.isArray(items) || !items.length)
            return;
        this.progress = progress;
        this.items = items;
        this.prefix = config.prefix || "";
        this.complete = config.complete || false
    };
    preload.prototype.load = function() {
        var e = 0;
        var items = this.items;
        var n = this.items.length;
        var r = this.complete;
        var that = this;
        items.forEach(function(cell) {
            var img = new Image;
            img.onload = img.onerror = img.onabort = function() {
                if (++e === n && typeof r === "function")
                    r.call(that);
                that.progress.innerText = Math.floor(100 * e / n) + "%"
            };
            img.src = that.prefix + cell
        })
    };
    var pageslide = function(pages, swipe, options) {
        this.options = options || {};
        this.current = 0;
        this.pageX;
        this.pageY;
        this.height;
        this.width;
        this.flag;
        this.move;
        this.$el = pages;
        this.swipe = swipe || "X";
        this.resize().init().bindEvents()
    };
    pageslide.prototype.init = function(e) {
        var t = e ? this.$el.children[e] : this.$el.firstElementChild;
        if (!t)
            throw "ERROR";
        t.classList.add("moving");
        t.style.webkitTransform = "translate3d(0,0,0)";
        setTimeout(function() {
            t.classList.remove("moving");
            t.classList.add("play");
        }, 300);
        return this
    };
    pageslide.prototype.bindEvents = function() {
        var e = this;
        window.addEventListener("resize orientationchange", this.resize.bind(this), false);
        "touchstart touchmove touchend touchcancel".split(" ").forEach(function(t) {
            e.$el.addEventListener(t, e[t].bind(e), false)
        })
    };
    pageslide.prototype.getCurrent = function() {
        return this.$el.children[this.current]
    };
    pageslide.prototype.resize = function() {
        this.width = this.$el.parentNode.clientWidth;
        this.height = this.$el.parentNode.clientHeight;
        return this
    };
    pageslide.prototype.random = function() {
        var e = this.$el.children.length;
        var t = this.current;
        var n = [];
        var r;
        for (var i = 0; i < e; i++) {
            if (i !== t)
                n.push(i.toString())
        }
        r = Math.floor(Math.random() * n.length);
        this.go(+n[r])
    };
    pageslide.prototype.touchstart = function(e) {
        var t = e.touches[0];
        this.flag = null;
        this.move = 0;
        this.pageX = t.pageX;
        this.pageY = t.pageY
    };
    pageslide.prototype.touchmove = function(e) {
        var t = e.touches[0];
        var n = t.pageX - this.pageX;
        var r = t.pageY - this.pageY;
        var i = this.getCurrent();
        var s = i.nextElementSibling;
        var o = i.previousElementSibling;
        if (!this.flag) {
            this.flag = Math.abs(n) > Math.abs(r) ? "X" : "Y";
            if (this.flag === this.swipe) {
                i.classList.add("moving");
                s && s.classList.add("moving");
                o && o.classList.add("moving")
            }
        }
        if (this.flag === this.swipe) {
            e.preventDefault();
            e.stopPropagation();
            switch (this.swipe) {
                case "X":
                    this.move = n;
                    this.setX(i, n);
                    s && this.setX(s, n + this.width);
                    o && this.setX(o, n - this.width);
                    break;
                case "Y":
                    this.move = r;
                    this.setY(i, r);
                    s && this.setY(s, r + this.height);
                    o && this.setY(o, r - this.height);
                    break
            }
        }
    };
    pageslide.prototype.touchend = function(e) {
        var t = 50;
        var n = this.move;
        var r = this.getCurrent();
        var i = r.nextElementSibling;
        var s = r.previousElementSibling;
        r.classList.remove("moving");
        i && i.classList.remove("moving");
        s && s.classList.remove("moving");
        if (!this.flag)
            return;
        e.preventDefault();
        if (n < -t && i)
            return this.next();
        if (n > t && s)
            return this.prev();
        this.reset()
    };
    pageslide.prototype.touchcancel = function(e) {
        var t = this.getCurrent();
        var n = t.nextElementSibling;
        var r = t.previousElementSibling;
        t.classList.remove("moving");
        n && n.classList.remove("moving");
        r && r.classList.remove("moving");
        this.reset()
    };
    pageslide.prototype.setX = function(e, t, n) {
        e && (e.style.webkitTransform = "translate3d(" + t + (n || "px") + ",0,0)")
    };
    pageslide.prototype.setY = function(e, t, n) {
        e && (e.style.webkitTransform = "translate3d(0," + t + (n || "px") + ",0)")
    };
    pageslide.prototype.setCurrent = function(e, t) {
        e && (e.style.webkitTransform = "translate3d(0,0,0)");
        if (t) {
            this.current = t;
            this.$current = this.$el.children[t]
        }
    };
    pageslide.prototype.next = function() {
        this.go(this.current + 1)
    };
    pageslide.prototype.prev = function() {
        this.go(this.current - 1)
    };
    pageslide.prototype.reset = function() {
        var e = this.width;
        var t = this.height;
        var n = this.swipe;
        var r = this.getCurrent();
        var i = r.previousElementSibling;
        var s = r.nextElementSibling;
        this.setCurrent(r);
        i && this["set" + n](i, -(n === "X" ? e : t));
        s && this["set" + n](s, n === "X" ? e : t)
    };
    pageslide.prototype.go = function(e) {
        var t = this.options.onFinish;
        var n = this.getCurrent();
        var r = this.$el.childElementCount;
        var i = this.$el.children[e];
        var s = e < this.current ? -1 : 1;
        if (e === this.current || e < 0 || e >= r)
            return;
        if (t && typeof t === "function")
            t.call(this, e);
        this.current = e;
        this["set" + this.swipe](n, -s * (this.swipe === "X" ? this.width : this.height));
        this.setCurrent(i, e);
        this.finish(n, i)
    };
    pageslide.prototype.finish = function(e, t) {
        this.flag = null;
        setTimeout(function() {
            e && e.classList.remove("play");
            t && t.classList.add("play");
        }, 300)
    };
    module.exports = {preload: preload,pageslide: pageslide}
});



window.onload = function(){
    music.onclick = function(){
        (!this.className) ? this.className = 'off' : this.className = '';
        var method = audio.paused ? 'play' : 'pause';
        audio[method] && audio[method]();
    };
}


