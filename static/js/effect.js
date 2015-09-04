$(function(){

    //目录滚动悬浮
    var srcTop = $('.block-catalog').offset().top;
    $(window).scroll(function() {
        var curTop = $(window).scrollTop();
        if (curTop > srcTop) {
            $('.block-catalog').addClass("fixed");
        } else {
            $('.block-catalog').removeClass("fixed");
        }
    });
    
    //目录链接加锚点
    $('.block-catalog').find('a').each(function(index, el) {
        $(this).attr('href', '#anchor' + index);
    }).on('click', function() {
        $('.block-catalog li').removeClass('active');
        $(this).parent().addClass("active");
    });

    //创建目录树
    var tree = [];
    function unique(arr) {
        var result = [],
            hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }
    var H = '.lotus-post h2,.lotus-post h3,.lotus-post h4,.lotus-post h5,.lotus-post h6';

    $(H).each(function(index, val) {
        var tag = $(this)[0].tagName;
        tree.push(tag);
        $(this).attr('id','anchor'+index);
    });

    tree.sort();
    tree = unique(tree);

    $(H).each(function(index, val) {
        var tag = $(this)[0].tagName;
        switch(tag){
            case tree[0] :
                $('.tree').append('<li><a href="#anchor'+index+'">' + $(this).html() + '</a></li>');
                break;
            case tree[1] :                
                $('.tree').append('<li class="sub"><a href="#anchor'+index+'">' + $(this).html() + '</a></li>');
                break;
        }
    });

});