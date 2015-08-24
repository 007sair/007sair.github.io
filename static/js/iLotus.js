$(document).ready(function() {
    //为什么我会写这个呢？
    var iLotus = {
        Version: "1.0",
        Author: "PIZn"
    };
    /**
     *  goTop
     */
    iLotus.goTop = {
        nodeName: "J-backTop",
        scrollHeight: "100",
        linkBottom: "40px",
        linkRight: 30,
        linkWidth: 32,
        contentWidth: 720,
        contenBigtWidth: 1024,
        _scrollTop: function() {
            if(jQuery.scrollTo) {
                jQuery.scrollTo(0, 800, {queue:true});
            }
        },
        _scrollScreen: function() {
            var that = this, topLink = $('#' + that.nodeName);
            if(jQuery(document).scrollTop() <= that.scrollHeight) {
                topLink.hide();
                return true;
            }  else {
                topLink.fadeIn();
            }
        },
        _resizeWindow: function(right) {
            var that = this, topLink = $('#' + that.nodeName);
            topLink.css({
                'right' : right + 'px',
                'bottom': that.linkBottom
            });
        },
        _changeRight: function() {
            var that = this, right;
            if(jQuery(window).width() > 1440) {
                //right = parseInt((jQuery(window).width() - that.contenBigtWidth + 1)/2 - that.linkWidth - that.linkRight, 10);
                right = 10;
            } else {

                right = parseInt((jQuery(window).width() - that.contentWidth + 1)/2 - that.linkWidth - that.linkRight, 10);
            }
            if( right < 20 ) {
                right = 10;
            }
            return right;
        },
        run: function() {
            var that = this, 
            	topLink = $('<a id="' + that.nodeName + '" href="#" class="backTop"><i class="icon-circle-arrow-up"></i></a>');
            topLink.appendTo($('body'));
            topLink.css({
                'display': 'none',
                'position': 'fixed',
                'right': that._changeRight() + 'px',
                'bottom': that.linkBottom
            });
            if(jQuery.scrollTo) {
                topLink.click(function() {
                    that._scrollTop();
                    return false;
                });
            }
            jQuery(window).resize(function() {
                that._resizeWindow(that._changeRight());
            });
            jQuery(window).scroll(function() {
                that._scrollScreen();

            });

        }
    }
    iLotus.goTop.run();
});