
var alertPopup = {};

$(window).load(function () {

    var regPopup = {},
        tl = new TimelineMax();

    regPopup.show = function () {

        var tl2 = new TimelineMax();
        tl2.set('.regPop', { display: 'block' })
        .from('.popup_content', 1, { top: -80, autoAlpha: 0, ease: Power3.easeOut }, '-=2.7')
        .from('.popup_content h3', 0.8, { top: -30, autoAlpha: 0, ease: Power3.easeOut }, '-=2.3')
        .from('.popup_content .phone', 0.8, { top: -30, autoAlpha: 0, ease: Power3.easeOut }, '-=2')
        .from('.popup_content .agreelist', 0.8, { top: -30, autoAlpha: 0, ease: Power3.easeOut }, '-=1.7')
        .from('.popup_content .btn_reg2', 0.8, { top: -30, autoAlpha: 0, ease: Power3.easeOut }, '-=1.7')
        .from('.popup_content .notice', 0.8, { autoAlpha: 0, ease: Power3.easeOut }, '-=1.4')
        .from('.popup_content .btn_close', 0.8, { scale: 0.8, autoAlpha: 0, ease: Power3.easeOut }, '-=1');

        //movePositionToMiddlePop('regPop');
        movePositionToMiddle();
    };

    alertPopup.show = function (_name) {

        var tl3 = new TimelineMax();
        $('.alertPop').attr('id', '').attr('id', _name);
        tl3.set('.alertPop', { display: 'block' })
        .from('.alertPop', 0.3, { top: -50, autoAlpha: 0, ease: Power3.easeOut });

        movePositionToMiddle();

    };

    movePositionToMiddle();

    function movePositionToMiddle() {

        var $target = $('.keep-middle');
        var targetHeight = $target.height();
        var wHeight = $(window).height();
        var topMargin = (wHeight - targetHeight) / 2;

        $('.wrap_main_video').css({ 'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2, 'top': ($(window).height() - $('.wrap_main_video').outerHeight()) / 2 });

        if ($(window).height() < 540) {
            $('html').css({ 'overflow-y': 'auto', 'height': '560' });
        } else {
            $('html').css({ 'overflow-y': 'hidden', 'height': '' });
        }

        $('.top-middle').each(function () {
            var $this = $(this);
            var calculatedTop = (wHeight - $this.height()) / 2;
            $this.css('top', calculatedTop > 0 ? calculatedTop : 0 +40);
        });
    }

    tl.set('.cont_box, #wrap, .logo', { visibility: 'visible' })
   .from('.section', 0.5, { left: 100, autoAlpha: 0 })
   .from('.obj_elf', 3.5, { scale: 1.1, autoAlpha: 0, ease: Power3.easeOut }, "-=0.25")
   .from('.obj_particle', 1.8, { autoAlpha: 0, ease: Power3.easeOut }, "-=3")
   .from('.logo, .cont_box h2', 0.9, { scale: 0.8, autoAlpha: 0, ease: Power3.easeOut }, "-=2.8")
   .from('.btn_play', 0.9, { scale: 0.8, autoAlpha: 0, ease: Power3.easeOut }, "-=2.4")
   .from('.btn_reg', 0.9, { scale: 0.8, autoAlpha: 0, ease: Power3.easeOut }, "-=1.9");

    //--------------------- 이벤트 
    $(window).resize(function () {
        movePositionToMiddle();
    });

    $('.btn_reg').click(function () {
        regPopup.show();
    });

    $('.btn_reg2').click(function () {
        // msg_1::"사전예약 등록이 완료 되었습니다" /  msg_2:: "이미 등록한 번호 입니다"  /   msg_3:: "정확한 번호를 입력해 주세요" / msg_4:: "3가지 동의 체크란에 모두 체크해 주세요" -->
        alertPopup.show('msg_4');
    });

    $('.popup_content .btn_close , .btn_confirm').click(function () {
        var toHide = $(this).attr('data-tohide');
        $("." + toHide).fadeOut();
    });

    $('.btn_play').click(function () {
        var noMovie = $(this).attr('data-toshow');
        var main_video = '<div class="popup_layer"></div><div class="video"><a class="btn_close" href="#"></a><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe></div><div class="wrap_v_close"></div>';
        var dataSrc = $(this).attr('data-src');

        if (noMovie) {
            //alertPopupShow('msg_5'):: "추후에 공개될 예정입니다"
            alertPopup.show(noMovie);
        } else {
            $('.shadow').fadeIn();
            $('.wrap_main_video').html(main_video.replace('{video_src}', dataSrc)).show();
            /*??*/
            $('.wrap_main_video').css({ 'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2, 'top': (($(window).height() - $('.wrap_main_video').outerHeight()) / 2)+10 });
        }
        
    });

    $('.view_detail').click(function () {
        var $toShowName = $(this).attr('data-toshow');

        if ($(this).hasClass('open')) {
            $('.view_detail').removeClass('open');
            $(this).removeClass('open');
            $('.detail').hide();
        } else {
            $('.view_detail').removeClass('open');
            $(this).addClass('open');
            $('.detail').hide();
            $('.detail.' + $toShowName).show();
        }

    });

    $('.checkbox_label').click(function (e) {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        }
    });

    $('.wrap_main_video').on('click', '.btn_close', function (e) {
        $('.shadow').fadeOut();
        $('.v_content').empty();
        $('.wrap_main_video').hide();
        e.preventDefault();
    });

    $('input:checked').next('label').addClass('checked');

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
