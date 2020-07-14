
var alertPopup = {};
var actionPopup = {};
$(document).ready(function () {
    //이미지슬라이드
    $('.img-slide').slick({
        dots: true,
        arrows : false,
        infinite: true,
        speed: 500,
        cssEase: 'linear',

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
    //팝업가운데정렬(리사이징시)
    $(window).resize(function () {
        if ($('.inner_content').height() >= $(window).innerHeight()) {
            $('.msg_6').css('height', $(window).innerHeight() - 60);
        } else {
            $('.msg_6').css('height', $('.inner_content').height());
        }
        movePositionToMiddle();
    });
    //비디오팝업열기
    $('.btn_play').click(function (e) {
 
        var main_video = '<div class="popup_layer"></div><div class="video"><button class="btn_close" href="javascript;"></button><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe></div><div class="wrap_v_close"></div>';
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

    $('.btn_close').click(function (e) {
        $('.popup_layer, .popup_inner, .msg, .shadow').fadeOut(300);
       // $('body,html').css('overflow-y', 'auto');
        e.preventDefault();
    });

    //팝업쇼
    alertPopup.show = function (_name) {
        $('.popup_layer, .popup_inner').fadeIn(300);
        $('.msg').hide();
        $('.' + _name).show();
       // $('body,html').css('overflow-y', 'hidden');
        movePositionToMiddle();
    };
    //팝업닫기
    $('.btn_ok').click(function () {
        $('.msg, .popup_layer').fadeOut();
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
    //이벤트정렬
    $(window).resize(adjustCenter);
    function adjustCenter() {
        var winWidth = $('.inner').width();
        $('.adjustCenter').each(function () {
            var targetWidth = $(this).width();
            $(this).css({ "margin-left": (winWidth - targetWidth) / 2 });
        });
    }
    //이벤트정렬실행
    adjustCenter();
    
    //이벤트 레이어팝업 닫기
    $('.btn_eventConfirm').click(function () {
        $('.wrap_event_popup').fadeOut();
    });
    //게임소개 탭
    $('.tabs a').click(function (e) {
        var targetName = $(this).parent('li').attr('class');
        $('.show_sceen > li').hide();
        $('#' + targetName).show();
        $('.tabs a').removeClass('on');
        $(this).addClass('on');
        e.preventDefault();
    });
    //캐릭터소개 탭
    $('.tabs_c a').click(function (e) {
        var targetName = $(this).parent('li').attr('class');
        $('.intro_char li').fadeOut();
        $('#' + targetName).fadeIn();
        $('.tabs_c a').removeClass('on');
        $(this).addClass('on');
        e.preventDefault();
    });
    //액션팝업쇼
    actionPopup.show = function (_name) {
        $('.shadow').fadeIn();
        $('.pop_action').fadeIn(300);
        $('.msg').hide();
        $('.' + _name).show();
        //$('body,html').css('overflow', 'hidden');
        movePositionToMiddle();


    };

    $('.banner').click(function(e){
        $('html, body').stop().animate({ scrollTop: $('.section_2').offset().top }, 1000);
        e.preventDefault();
    });
    $('.cards li a').click(function(e){
        $(this).toggleClass('on');

        $('.cards li a').not($(this)).removeClass('on');

        if($('.cards li a.on').length === 1) {
            $('.btn_result').addClass('on');
        } else {
            $('.btn_result').removeClass('on');
        }
        e.preventDefault();
    });

    $('.btn_result').click(function(){
        if($('.cards li a.on').length !== 1) return;
        actionPopup.show('charactor_' + $('.cards li a.on').data('charactor'));
    });
});