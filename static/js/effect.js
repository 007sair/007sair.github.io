$(function(){

    var srcTop = $('.anchorList').offset().top;

    $(window).scroll(function() {
        var curTop = $(window).scrollTop();
        if (curTop > srcTop) {
            $('.anchorList').addClass("anchorListFix")
        } else {
            $('.anchorList').removeClass("anchorListFix")
        }
        /*
        for (var i = 0; i < arrPos.length; i++) {
            if (curTop > arrPos[i]) {
                $('.anchorList li').removeClass('active');
                $('.anchorList a').eq(i).parent().addClass("active");
            };
        };
        */

    });

    if ($('.lotus-post h3').length === 0) {
        $('.lotus-post h4').each(function(index, el) {
            $('.anchorList').children('ul').append('<li><a>' + $(this).html() + '</a></li>');
        });
    };

    $('.lotus-post h3').each(function(index, el) {

        $('.anchorList').children('ul').append('<li><a>' + $(el).html() + '</a></li><li style="list-style-type:none"><ul></ul></li>');

        var $tags = $(this).nextUntil('h3');

        $tags.each(function(i, el) {
            var $h4 = $(this)[0].tagName.toLowerCase();
            if ($h4 === 'h4') {
                $('.anchorList').find('li[style] ul').eq(index).append('<li><a href="">' + $(this).html() + '</a></li>')
                //console.log($(this), i, index)
            };
        });
        //console.log('---------------');
    });

    $('.lotus-post').find('h3,h4').each(function(index, el) {
        $(this).attr({
            'class': 'anchor',
            'id': 'anchor' + index
        });
    });

    $('.anchorList').find('a').each(function(index, el) {
        $(this).attr('href', '#anchor' + index);
    }).on('click', function() {
        $('.anchorList li').removeClass('active');
        $(this).parent().addClass("active")
    });

    var arrPos = [];
    $('.anchor').each(function(index, el) {
        arrPos.push($(this).offset().top);
    });

})