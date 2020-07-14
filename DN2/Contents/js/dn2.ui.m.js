
var alertPopup = {};
$(document).ready(function () {
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
    //비디오팝업열기
    $('.show-video').click(function (e) {
        var main_video = '<div class="popup_layer"></div><div class="video"><a class="btn_close" href="#"></a><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe></div><div class="wrap_v_close"></div>';
        var dataSrc = $(this).attr('data-src');
        $('.shadow').fadeIn();
        $('.wrap_main_video').html(main_video.replace('{video_src}', dataSrc)).show();
        $('.wrap_main_video').css({ 'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2, 'top': ($(window).height() - $('.wrap_main_video').outerHeight()) / 2 });
        e.preventDefault();
    });
    //비디오팝업닫기
    $('.wrap_main_video').on('click', '.btn_close', function (e) {
        $('.shadow').fadeOut();
        $('.v_content').empty();
        $('.wrap_main_video').hide();
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
        //$('body,html').css('overflow-y', 'hidden');
        movePositionToMiddle();
    };
    //팝업닫기
    $('.btn_ok').click(function () {
        var toHide = $(this).attr('data-tohide');
        $("." + toHide).fadeOut();
        $('.popup_layer').fadeOut();
        $('body,html').css('overflow-y', 'auto');
    });
    //체크박스디자인
    $('.agreelist label').click(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        };
    });
    //라디오박스디자인
    $('label.radio_label').click(function () {
        $('.radio_label.checked').removeClass('checked');
        $(this).addClass('checked');
    });
    //체크박스디자인 for IE dbclick
    $('.agreelist label').dblclick(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
        };
    });
    //로딩시체크박스체킹
    $('input:checked').next('label').addClass('checked');
    //입력박스플레이스홀더디자인
    $('.input_placeHolder').focus(function () {
        $(this).removeClass($(this).attr('data-placeholderclass'));
    }).focusout(function () {
        if ($.trim($(this).val()) == '') {
            $(this).addClass($(this).attr('data-placeholderclass'));
        } else {
            $(this).removeClass($(this).attr('data-placeholderclass'));
        }
    });
});