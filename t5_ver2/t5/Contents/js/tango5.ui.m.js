
var alertPopup = {};
$(document).ready(function () {
    //�̹��������̵�
    $('.game-slide').slick({
        infinite: true,
        speed: 300,
        fade: false,
        cssEase: 'linear',
        prevArrow: '.slick-prev',
        nextArrow: '.slick-next',
        touchThreshold : 10
    });
    //���ø޴��̵�
    $('.nav a').localLinker({ duration: 100 });
    $('.guide a').localLinker({ duration: 100 });
    //�˾��������
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
    //�˾��������(������¡��)
    $(window).resize(function () {
        if ($('.inner_content').height() >= $(window).innerHeight()) {
            $('.msg_6').css('height', $(window).innerHeight() - 60);
        } else {
            $('.msg_6').css('height', $('.inner_content').height());
        }
        movePositionToMiddle();
    });
    //�����˾�����
    $('.btn_play').click(function (e) {
        var noMovie = $(this).attr('data-toshow');
        var main_video = '<div class="popup_layer"></div><div class="video"><a class="btn_close" href="#"></a><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe></div><div class="wrap_v_close"></div>';
        var dataSrc = $(this).attr('data-src');
        if (noMovie) {
            alertPopup.show(noMovie);
        } else {
            $('.shadow').fadeIn();
            $('.wrap_main_video').html(main_video.replace('{video_src}', dataSrc)).show();
            $('.wrap_main_video').css({ 'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2, 'top': ($(window).height() - $('.wrap_main_video').outerHeight()) / 2 });
        }
        e.preventDefault();
    });
    //�����˾��ݱ�
    $('.wrap_main_video').on('click', '.btn_close', function (e) {
        $('.shadow').fadeOut();
        $('.v_content').empty();
        $('.wrap_main_video').hide();
        e.preventDefault();
    });
    //�˾���
    alertPopup.show = function (_name) {
        $('.popup_layer').fadeIn(300);
        $('.msg').hide();
        $('.' + _name).show();
        $('body,html').css('overflow-y', 'hidden');
        movePositionToMiddle();
    };
    //�˾��ݱ�
    $('.btn_confirm').click(function () {
        var toHide = $(this).attr('data-tohide');
        $("." + toHide).fadeOut();
        $('.popup_layer').fadeOut();
        $('body,html').css('overflow-y', 'auto');
    });
    //üũ�ڽ�������
    $('.agreelist label').click(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        };
    });
    //�����ڽ�������
    $('label.radio_label').click(function () {
        $('.radio_label.checked').removeClass('checked');
        $(this).addClass('checked');
    });
    //üũ�ڽ������� for IE dbclick
    $('.agreelist label').dblclick(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
        };
    });
    //�ε���üũ�ڽ�üŷ
    $('input:checked').next('label').addClass('checked');
    //�Է¹ڽ��÷��̽�Ȧ��������
    $('.input_placeHolder').focus(function () {
        $(this).removeClass($(this).attr('data-placeholderclass'));
    }).focusout(function () {
        if ($.trim($(this).val()) == '') {
            $(this).addClass($(this).attr('data-placeholderclass'));
        } else {
            $(this).removeClass($(this).attr('data-placeholderclass'));
        }
    });
    //�̺�Ʈ����
    $(window).resize(adjustCenter);
    function adjustCenter() {
        var winWidth = $('.inner').width();
        $('.adjustCenter').each(function () {
            var targetWidth = $(this).width();
            $(this).css({ "margin-left": (winWidth - targetWidth) / 2 });
        });
    }
    //�̺�Ʈ���Ľ���
    adjustCenter();
    //�̺�Ʈ ���̾��˾�
    $('.menu5').on('click', function (e) {
        $('.wrap_event_popup').fadeIn();
        alertPopup.show('msg_6');
        if ($('.inner_content').height() >= $(window).innerHeight()) {
            $('.msg_6').css('height', $(window).innerHeight() - 60);
        }
        e.preventDefault();
        movePositionToMiddle();
    });
    //�̺�Ʈ ���̾��˾� �ݱ�
    $('.btn_eventConfirm').click(function () {
        $('.wrap_event_popup').fadeOut();
    });
});