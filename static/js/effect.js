$(function(){

    var srcTop = $('.block-catalog').offset().top;

    $(window).scroll(function() {
        var curTop = $(window).scrollTop();
        if (curTop > srcTop) {
            $('.block-catalog').addClass("fixed");
        } else {
            $('.block-catalog').removeClass("fixed");
        }
    });

    

    $('.block-catalog').find('a').each(function(index, el) {
        $(this).attr('href', '#anchor' + index);
    }).on('click', function() {
        $('.block-catalog li').removeClass('active');
        $(this).parent().addClass("active")
    });

    var arrPos = [];
    $('.anchor').each(function(index, el) {
        arrPos.push($(this).offset().top);
    });

});