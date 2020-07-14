
var alertPopup = {};
$(document).ready(function () {
    //lazy image
    $(".lazy").lazyload({
        effect: "fadeIn"


    });
    //로컬메뉴이동
    $('.nav a').localLinker({ duration: 100 });
    //팝업가운데정렬
    function movePositionToMiddle() {
        var $target = $('.keep-middle');
        var wHeight = $(window).height();
        var wWidth = $(window).width();

        $target.each(function () {
            var $this = $(this);
            var calculatedTop = (wHeight - $this.height()) / 2;
            var calculatedLeft = (wWidth - $this.width()) / 2;
            $this.css({ 'top': calculatedTop, 'left': calculatedLeft });
        });
    }
    $('.btn_play').click(function (e) {
        var dataSrc = $(this).attr('data-src');
        $('.popup_layer').fadeIn();
        $('.video').html('<iframe id="videoFrame" width="" height="" src="' + dataSrc + '" frameborder="0" allowfullscreen=""></iframe>');
        $('.wrap_main_video').show().css({
            'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2,
            'top': ($(window).height() - $('.wrap_main_video').outerHeight()) / 2
        });
        movePositionToMiddle();
        e.preventDefault();
    });
    $('.btn_movie1').click(function () {
        $('.video').html('<iframe id="videoFrame" width="" height="" src="https://www.youtube.com/embed/DAndSThJlNU?showinfo=0&autoplay=1&loop=1&playlist=DAndSThJlNU" frameborder="0" allowfullscreen=""></iframe>');
    });
    $('.btn_movie2').click(function () {
        $('.video').html('<iframe id="videoFrame" width="" height="" src="https://www.youtube.com/embed/FCCGRX4Flwg?showinfo=0&autoplay=1&loop=1&playlist=FCCGRX4Flwg" frameborder="0" allowfullscreen=""></iframe>');
    });
    $('.wrap_main_video').on('click', '.btn_close', function (e) {
        $('.popup_layer').fadeOut();
        $('.video').empty();
        $('.wrap_main_video').hide();
        $('body, #videoFrame').off();
        e.preventDefault();
    });
    $(window).resize(function () {
        movePositionToMiddle();
    });
    //팝업쇼
    alertPopup.show = function (_name) {
        $('.popup_layer').fadeIn(300);
        $('.msg').hide();
        $('.' + _name).show();
        movePositionToMiddle();
    };
    //팝업닫기
    $('.btn_close').click(function (e) {
        var toHide = $(this).attr('data-tohide');
        $("." + toHide).fadeOut();
        $('.popup_layer').fadeOut();
        e.preventDefault();
    });
});