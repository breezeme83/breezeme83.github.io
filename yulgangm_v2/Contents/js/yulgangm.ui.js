var alertPopup = {};
var actionPopup = {};
// youtube controll
function YTController(obj) {
    var video;
    var defaultOps = {
        width: null,
        height: null,
        videoId: null,
        loop: true,
        mute: true
    };
    var options = {};

    function _init() {
        //init api js
        var videoMain;
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    function _setOpts() {
        options = $.extend({}, defaultOps, obj);
    }
    function _videoReady(e) {
        if (options.loop) videoMain.playVideo();
        if (options.mute) videoMain.mute();
    }
    function _videoStateChange(e) {
        if (e.data == 0 && options.loop) videoMain.playVideo();
    }
    function _setVideo() {
        window.onYouTubePlayerAPIReady = function () {
            videoMain = new YT.Player('videoMain', {
                width: options.width,
                height: options.width,
                videoId: options.videoId,
                playerVars: {
                    controls: 0,
                    disablekb: 0,
                    enablejsapi: 1,
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': _videoReady,
                    'onStateChange': _videoStateChange
                }
            });
            $('#videoMain').attr('data-keepplaying', 'true');
        }
    }
    // constructor
    (function () {
        _init();
        _setOpts();
        _setVideo();
    })();
}
$(document).ready(function () {
    // youtube
    var mainVideo = new YTController({
        width: '100%',
        height: '100%',
        videoId: 'WKBpvznP9DE',
        loop: true,
        mute: true
    });

    
    

    $('.img-slide').hide();
    $('#fullpage').fullpage({
        loopHorizontal: false,
        //scrollHorizontally: true,
        verticalCentered: false,
        scrollingSpeed:700,
        //extension license key code for nexon.com 
        //scrollHorizontallyKey:"33E2E081-AAFF4852-B5DC2130-6A9FDE42",
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            var isLaseSlide = slideIndex === 4;
            var isFirstSlide = slideIndex === 0;
            if (isFirstSlide) {
                $('.fp-prev').fadeOut();
            } else {
                $('.fp-prev').fadeIn();           
            }
            if (isLaseSlide) {
                $('.fp-next').fadeOut();
                $('.obj_flower_left2 ').fadeIn();
                $('.obj_flower_right2').delay(100).fadeIn();
            } else {
                $('.fp-next').fadeIn();
                $('.obj_flower_left2 , .obj_flower_right2').fadeOut();
            }
            $('#locallinker ul li a').removeClass('on').eq(slideIndex).addClass('on');
            if (slideIndex !== 1) {
                $('input').focusout();
            }
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {

            var isLaseSlide = slideIndex === 4;
            var isFirstSlide = slideIndex === 0;


            if (nextSlideIndex !== 0) {
                $('.obj_main').stop().animate({ right: '-123%' });
            } else {
                $('.obj_main').show().stop().animate({ right: '-83%' }, 700, 'easeInOutCubic');
            }

            if (nextSlideIndex === 3) {
                $('.obj_ch1').stop().animate({ left: '-62%' }, 800, 'easeInOutQuad');
                $('.obj_ch2').stop().delay(200).animate({ right: '-94%' }, 900, 'easeOutQuad', function () {
                    $('.obj_flower_left , .obj_flower_right').fadeIn();
                });

            } else {
                $('.obj_ch1').stop().animate({ left: '-102%' }, 1000, 'easeInOutQuad');
                $('.obj_ch2').stop().animate({ right: '-124%' }, 600, 'easeInOutQuad');
                $('.obj_flower_left , .obj_flower_right').fadeOut();
            }
        }
    });

    $('.jump_reg').click(function (event) {
        event.preventDefault();
        $.fn.fullpage.moveTo(1, 1);
    });
    
    $('.agreelist label').click(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        }
        ;
    });
    $('label.radio_label').click(function () {
        $('.radio_label.checked').removeClass('checked');
        $(this).addClass('checked');
    });
    $('.agreelist label').dblclick(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
        }
        ;
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
    $('.tabs a').click(function () {
        var targetName = $(this).parent('li').attr('class');
        console.log(targetName);
        $('.show_sceen > li').hide();
        $('#' + targetName).show();
        $('.tabs a').removeClass('on');
        $(this).addClass('on');
    });
    $('.tabs_c a').click(function () {
        var targetName = $(this).parent('li').attr('class');
        $('.intro_char li').stop().fadeOut();
        $('#' + targetName).stop().fadeIn();
        $('.tabs_c a').removeClass('on');
        $(this).addClass('on')
    });
    $('.btn_play').click(function (e) {
        var main_video = '<div class="popup_layer"></div><div class="video"><a class="btn_close" href="#"></a><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe></div><div class="wrap_v_close"></div>';
        var dataSrc = $(this).attr('data-src');
        $('.shadow').fadeIn();
        $('.wrap_main_video').html(main_video.replace('{video_src}', dataSrc)).show();
        $('.wrap_main_video').css({
            'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2,
            'top': ($(window).height() - $('.wrap_main_video').outerHeight()) / 2
        });
        e.preventDefault();
    });
    $('.wrap_main_video').on('click', '.btn_close', function (e) {
        $('.shadow').fadeOut();
        $('.v_content').empty();
        $('.wrap_main_video').hide();
        e.preventDefault();
    });
    function movePositionToMiddle() {
        var $target = $('.keep-middle');
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        $target.each(function () {
            var $this = $(this);
            var calculatedTop = (wHeight - $this.height()) / 2;
            var calculatedLeft = (wWidth - $this.width()) / 2;
            $this.css({
                'top': calculatedTop,
                'left': calculatedLeft
            });
        });
    }
    $(window).resize(function () {
        if ($('.inner_content').height() >= $(window).innerHeight()) {
            $('.msg_6').css('height', $(window).innerHeight() - 60);
        } else {
            $('.msg_6').css('height', $('.inner_content').height());
        }
        movePositionToMiddle();
    });
    $('.btn_close').click(function (e) {
        $('.popup_layer, .popup_inner, .msg, .shadow').fadeOut(300);
        $('body,html').css('overflow-y', 'auto');
        e.preventDefault();
    })
    alertPopup.show = function (_name) {
        $('.shadow').fadeIn();
        $('.popup_inner').fadeIn(300);
        $('.msg').hide();
        $('.' + _name).show();
        movePositionToMiddle();
    };
 
    actionPopup.show = function (_name) {
        $('.shadow').fadeIn();
        $('.pop_action').fadeIn(300);
        $('.msg').hide();
        $('.' + _name).show();
        //$('body,html').css('overflow', 'hidden');
        movePositionToMiddle();


    };
    var slickInitialized = false;
    $('.tab_2').click(function () {
        if (slickInitialized === true)
            return;
        $('.img-slide').show();
        $('.img-slide').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
        });
        slickInitialized = true;
    });

    
    $('#locallinker ul li a').each(function(index){
        $(this).click(function(e){
            $.fn.fullpage.moveTo(1, index);
            e.preventDefault();
        });
    });

    $('.cards li a').click(function (e) {
        $('.cards li a').not($(this)).removeClass('on');
        $(this).addClass('on');
        //$('.cards li a').not($(this)).removeClass('on');

        if($('.cards li a.on').length === 1) {
            $('.btn_result').addClass('on');
        } else {
            $('.btn_result').removeClass('on');
        }
        e.preventDefault();
    });
    $('.btn_result').click(function () {
        console.log('s');
        if ($('.cards li a.on').length !== 1) return;
        actionPopup.show('charactor_' + $('.cards li a.on').data('charactor'));
    });

    $('body').mousewheel(function (event) {
        if (event.deltaY > 0) {
            $.fn.fullpage.moveSlideLeft();

        }
        else {
            $.fn.fullpage.moveSlideRight();
        }
    });

    
    $('.links a').hover(function () {
        var targetBackground = $(this).attr('id');
        $('.wrap_movie > div').addClass(targetBackground);

    }, function () {
        $('.wrap_movie > div').removeClass()
    });

    setTimeout(function () {
        $('.obj_main').show().stop().animate({ right: '-83%' }, 700, 'easeInOutCubic');
    }, 500);
});
