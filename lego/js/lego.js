$(function () {
    var poster = 'http://akstatic.plaync.com/rk/v1/img/main/preorder_bg.jpg';
    var movieUrl;
    var movieWidth;
    var movieHeight;
    var isSmallViewMode;

    decideViewMode();

    if (isSmallViewMode) {
        movieUrl = "http://mintbb02.com/lego/video_smallsize/GstarBG.mp4";
        movieWidth = 1920,
        movieHeight = 1080
    } else {
        movieUrl = "http://mpimage.nexon.com/durango/pc/GstarBG.mp4";
        movieWidth = 960,
        movieHeight = 540
    }
    var videoTag = '<video class="video" muted="true" loop="true" autoplay="true" poster=""><source src="' + movieUrl + '" type="video/mp4"></video>';
    var canvasTag = '<canvas style="display: none;" class="canvas"></canvas>'

    var $video = $(videoTag);
    $('#bgMovie').append($video);

    var $canvas = $(canvasTag);
    $('#bgMovie').append($canvas);

    var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
    var video = $video.get(0);
    var canvasContext;
    var videoHeight = 0;
    var videoWidth = 0;
    var nowPlaying = false;
    var paused = false;


    if (isIOS) {
        if (video.load) {
            video.load();
        }
        $video.attr('poster', poster);
        $video.hide();
        $canvas.show();
        canvasContext = $canvas.get(0).getContext('2d');
    } else {
        $canvas.hide();
    }
    $('.input_placeHolder').focus(function () {
        $(this).removeClass($(this).attr('data-placeholderclass'));
    }).focusout(function () {
        if ($.trim($(this).val()) == '') {
            $(this).addClass($(this).attr('data-placeholderclass'));
        } else {
            $(this).removeClass($(this).attr('data-placeholderclass'));
        }
    });
    var winWidth;
    var winHeight;



    $(window).resize(function () {
        winWidth = $(window).width();
        winHeight = $(window).height();

        decideViewMode();
        adjustVideo();
        adjustResponsibleElements();
        initPreorder();
    });

    //비디오 팝업_sora

    $('.btn_play,.popup_video_play').click(function (e) {
        var main_video = '<div class="video"><a class="pop_close" href="#"><img src="images/pop_close.png" alt="닫기" /></a><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe></div><div class="wrap_v_close"></div>';
        var dataSrc = $(this).attr('data-src');
        $('.shadow').fadeIn();
        $('.wrap_main_video').html(main_video.replace('{video_src}', dataSrc)).show();
        $('.wrap_main_video').css({ 'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2, 'top': ($(window).height() - $('.wrap_main_video').outerHeight()) / 2 });
        e.preventDefault();
    });

    $('.wrap_main_video').on('click', '.pop_close', function (e) {
        $('.shadow').fadeOut();
        $('.v_content').empty();
        $('.wrap_main_video').hide();
        e.preventDefault();
    });

    if (isIOS) {
        video.addEventListener('timeupdate', function () {
            drawFrame();
        });

        video.addEventListener('canplay', function () {
            drawFrame();
        });

        if (video.readyState >= 2) {
            drawFrame();
        }

        $(document).bind('webkitvisibilitychange', function () {
            if (!window._checkVisibilityChange) return;

            if (document['webkitHidden']) {
                pause();
            } else {
                loop();
            }
        });
        play();
    }

    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 2000,
        loop: true,
        autoplayDisableOnInteraction: false,
        onImagesReady: function (swiper) {
            $('.swiper-label').addClass('endPosition', 600, 'easeInOutExpo');
            $('.small-slide-label').eq(0).show().addClass('endPosition', 550);
            $('.label_text').show().addClass('endPosition', 550);
        },
        onSlideChangeStart: function (swiper) {
            $('.swiper-label, .label_text').removeClass('endPosition');
            $('.small-slide-label').hide().removeClass('endPosition');
            $('.label_text').hide();
        },
        onSlideChangeEnd: function (swiper) {
            $('.swiper-label').addClass('endPosition', 1200, 'easeOutQuart');
            $('.small-slide-label').eq((swiper.activeIndex - 1) % 3).show().addClass('endPosition', 550);
            $('.label_text').show().addClass('endPosition', 450);
        }
    });

    $('.gnb_button').localLinker({ imageSrcChangeWhenScrollInSection: true });
    $('.wrap-jump').localLinker();

    $('#agreeChk4').bind('click', function (event) {
        var $popupContenttoShow = $(this).data('toshow');
        if ($(this).is(':checked')) $('.dimmed').fadeIn(); $("." + ($popupContenttoShow)).fadeIn();
        event.preventDefault();
    });

    $('.showPopup').bind('click', function (event) {
        var $popupContenttoShow = $(this).data('toshow');
        $('.popup').fadeOut();
        $('.dimmed').fadeIn(); $("." + ($popupContenttoShow)).fadeIn();
        event.preventDefault();
    });
    $('.popup_close,.shadow,.btn_ok,.btn_close').bind('click', function (event) {
        $('.dimmed,.popup,.wrap_main_video,.shadow').fadeOut();

        event.preventDefault();
    });

    $('.wrap-jump').bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {

        } else {
            var $anchor = $(this);
            var margin = $anchor.data('margin');

            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top + (margin ? margin : 0)
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        }
    });

    //메인높이값구하기
    function initPreorder() {
        $('.section-main').css('height', $(window).height());
    }


    var isfloatingObjAnimating = false;
    $(window).scroll(function () {
        var $dragon = $('.ch_dragon');
        var $block1 = $('.obj_event2_1');
        var $block2 = $('.obj_event2_2');
        var scrollTop = $(window).scrollTop();
        var sectionTop = $('#sectionEvent2').position().top;
        var sectionHeight = $('#sectionEvent2').height();
        var nextSectionTop = $('#sectionSystem').position().top;
        var isAnimatePosition = scrollTop >= sectionTop - (sectionHeight * 0.25) && scrollTop < nextSectionTop - (sectionHeight * 0.25);

        if (isAnimatePosition) {
            if (isfloatingObjAnimating === true || $block1.hasClass('active')) {
                return;
            }
            isfloatingObjAnimating = true;

            $block1.addClass('active', 1000, 'easeInOutExpo');
            $block2.addClass('active', 1200, 'easeInOutExpo');
            setTimeout(function () {
                $dragon.addClass('active', 1600, "easeInOutExpo", function () {
                    isfloatingObjAnimating = false;
                });
            }, 50);
        } else {
            isfloatingObjAnimating = false;
            $block1.removeClass('active');
            $block2.removeClass('active');
            $dragon.removeClass('active');
        }
 
    });

    $(window).resize();


    function decideViewMode() {
        isSmallViewMode = winWidth < 960;
    }

    function adjustVideo() {

        //video size
        videoHeight = Math.ceil(winHeight);
        videoWidth = Math.ceil(videoHeight * movieWidth / movieHeight);
        if (videoWidth < winWidth) {
            videoHeight = Math.ceil(winHeight + (winWidth - videoWidth) * 9 / 16);
            videoWidth = Math.ceil(videoHeight * movieWidth / movieHeight);
        }

        if (isIOS) {
            canvasContext.canvas.width = videoWidth;
            canvasContext.canvas.height = videoHeight;
            $canvas.attr('width', videoWidth);
            $canvas.attr('height', videoHeight);
        } else {
            $video.width(videoWidth).height(videoHeight);
        }

        //video position
        var left = -(videoWidth - winWidth) / 2;
        var top = -(videoHeight - winHeight) / 2;

        if (isIOS) {
            $canvas.css({ position: 'absolute', left: left, top: top });
            drawFrame();
            play();
        } else {
            $video.css({ position: 'absolute', left: left, top: top });
        }
    }

    function adjustResponsibleElements() {
        if (isSmallViewMode) {
            $('.appendTo').detach().appendTo('.insert_elm');
            $('.repositioning').width('100%').css('left', '0');
        } else {
            $('.appendTo').detach().appendTo('.agreelist > tbody > tr');
            $('.repositioning').width(winWidth).css('left', -($('.wrap_event2').offset().left));
        }
        $('.popup').each(function () {
            $(this).css({ 'left': (winWidth - $(this).outerWidth()) / 2, 'top': (winHeight - $(this).outerHeight()) / 2 });
        })
        $('.wrap_main_video').css({ 'left': (winWidth - $('.wrap_main_video').outerWidth()) / 2, 'top': (winHeight - $('.wrap_main_video').outerHeight()) / 2 });
    }

    function play() {
        if (!nowPlaying) {
            nowPlaying = true;
            paused = false;
            loop();
        }
    }

    function pause() {
        if (nowPlaying) {
            paused = true;
        }
    }

    var animationFrame;
    function loop() {
        if (paused) {
            return;
        }

        if (paused) {
            cancelAnimationFrame(animationFrame);
        } else {
            animationFrame = requestAnimationFrame(function () {
                setTimeout(function () {
                    video.currentTime = video.currentTime + 0.015;
                    if (video.currentTime >= video.duration) {
                        video.currentTime = 0;
                    }
                    loop();
                }, 1);
            });
        }

    }
    function drawFrame() {
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
    }
    $("#inputAge").focus();
    $(window).scrollTop(0)
    $('#blockReg').css({ 'top': ($('.section-reg').outerHeight() - $('#blockReg').outerHeight()) / 2, 'left': ($(window).width() - $('#blockReg').outerWidth()) / 2 })

    $('.realignmentContent').bind('click', function () {
        $('.pop_input_age,.bg_pop_input_age').fadeOut();
        var useAge = $('.input_age input').val();
        if (useAge <= 14) {
            $('body').removeClass('user_age_over14').addClass('user_age_under14');

        } else {
            $('body').removeClass('user_age_under14').addClass('user_age_over14');
            
            $('.wrap_txt_notice img').attr('src', $('.wrap_txt_notice img').attr('src').replace('txt_notice_user_age_under14', 'txt_notice'));
            $('.wrap_txt_notice_small img').attr('src', $('.wrap_txt_notice_small img').attr('src').replace('txt_notice_user_age_under14', 'txt_notice'));

        }
    })
    $('#inputAge').keypress(function( event ) {
        if (event.which == 13) {
            event.preventDefault();
            $('.btn_ok2').click();
        }
    })

});

