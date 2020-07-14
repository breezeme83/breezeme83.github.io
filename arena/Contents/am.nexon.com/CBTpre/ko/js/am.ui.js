//var dateObj = new Date();
//var dateYear = dateObj.getFullYear();
//var dateMonth = dateObj.getMonth()+1;
//var dateDate = dateObj.getDate();
//var presentDate= dateYear.toString() + dateMonth.toString() + dateDate.toString();

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ytplayerMain,
	ytplayers = [],
	heroVideos = [],
	timerIds = [];

function onYouTubePlayerAPIReady() {
	ytplayerMain = new YT.Player('vplayer', {
		height: '1245',
		width: '2600',
		videoId: 'CzB6XoXV1l4',
		playerVars: { 
			'autoplay': 1, 
			'controls': 0, 
			'playlist': 'CzB6XoXV1l4',
			'showinfo': 0, 
			'loop': 1,
			'vq': '720',
			'rel': 0,
			'mute': 1
		}
	});
	ytplayerMain.getIframe().setAttribute('data-keepplaying', 1);

	var $ytplayer = $('.swiper-container .ytplayer').eq(0),
		elementId = $ytplayer.attr('id'),
		videoId = $ytplayer.data('videoid');

	var ytplayer = new YT.Player(elementId, {
		videoId: videoId,
		playerVars: {
			'showinfo': 0,
			'rel': 0,
			'autoplay': 0
		},
		events: {
			//'onReady': onPlayerReady,
			'onStateChange': function(e) {
				if(e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING) {
					timerIds.forEach(function(timerId){
						clearTimeout(timerId);
					});
					if(ytplayerMain) ytplayerMain.pauseVideo();
				} else {
					timerIds.push(setTimeout(function() {
						if(ytplayerMain) ytplayerMain.playVideo();
					}, 1500));
				}
			}
		}
	});
	ytplayers[0] = ytplayer;
}

$(function () {
	$('#vplayer').css({ 'left': -((2600 - $(window).width()) / 2), 'top': -((1245 - $(window).height()) / 2) });
	$('.cover_vplayer,.section_main').height($(window).height());

	$('#fullpage').fullpage({
		fitToSection: false,
		scrollingSpeed: 400,
		afterLoad: function (anchorLink, index) {
		    if (index === 1) {
		        $('.maintitle_left').addClass('animation');
				setTimeout(function () {
					$(".bg_top_bar").height($('.wrap_top_bar').height());
				}, 1);
			}
			if (index !== 2) {
				$('.ball_left, .bombgirl_right').removeClass('active');
				$('.section_register').unbind('mousemove');
			}

			if (index !== 3) {
				$('.fox, .bear').removeClass('active');
				$('.section_event').unbind('mousemove');
			}
		},
		onLeave: function (index, nextIndex, direction) {
			if (nextIndex < 2) {
			    $('.fixed_unit').fadeOut('fast');
			    $('.maintitle_left').addClass('animation');
				if(ytplayerMain) ytplayerMain.playVideo();
			} else {
			    $('.fixed_unit').fadeIn('fast');
			    $('.maintitle_left').removeClass('animation');
				$indexers.each(function (idx) {
					if ((nextIndex - 2) === idx) {
						$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
						$(this).addClass('active')
					} else {
						$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
						$(this).removeClass('active');
					}
					if(ytplayerMain) ytplayerMain.pauseVideo();
				});
			}
			if (nextIndex === 2) {
			    $('.bombgirl_right').addClass('active', 1200, 'easeOutQuart', function () {
					$('.section_register').bind('mousemove', function(e){
						var px = e.pageX,
							py = e.pageY,
							wx = $(this).width() / 2,
							wy = $(this).height() / 2;
						$('.bombgirl_right').css('transform', 'translate(' + ((px - wx) / -50) + 'px,' + ((py - wy) / -50) + 'px');
					});
				});
				setTimeout(function () {
				    $('.ball_left').addClass('active', 1200, 'easeOutQuart', function () {
						$('.section_register').bind('mousemove', function(e){
							var px = e.pageX,
								py = e.pageY,
								wx = $(this).width() / 2,
								wy = $(this).height() / 2;
							$('.ball_left').css('transform', 'translate(' + ((px - wx) / 50) + 'px,' + ((py - wy) / 50) + 'px');
						});
					});
				}, 300);
			}
			if (nextIndex === 3) {
			    $('.fox').addClass('active', 1200, 'easeOutQuart', function () {
					$('.section_event').bind('mousemove', function(e){
						var px = e.pageX,
							py = e.pageY,
							wx = $(this).width() / 2,
							wy = $(this).height() / 2;
						$('.fox').css('transform', 'translate(' + ((px - wx) / -50) + 'px,' + ((py - wy) / -50) + 'px');
					});
				});
				setTimeout(function () {
				    $('.bear').addClass('active', 1200, 'easeOutQuart', function () {
					    $('.section_event').bind('mousemove', 'easeOutQuart', function (e) {
							var px = e.pageX,
								py = e.pageY,
								wx = $(this).width() / 2,
								wy = $(this).height() / 2;
							$('.bear').css('transform', 'translate(' + ((px - wx) / 70) + 'px,' + ((py - wy) / 70) + 'px');
						});
					});
				}, 300);
			}
			if (nextIndex === 5) {
				$('.skel').stop().fadeIn(1000, 'swing', function(){
					$('.section_gameintro').bind('mousemove', function(e){
						var px = e.pageX,
							py = e.pageY,
							wx = $(this).width() / 2,
							wy = $(this).height() / 2;
						$('.skel').css('transform', 'translate(' + ((px - wx) / -120) + 'px,' + ((py - wy) / -120) + 'px');
					});
				});
				setTimeout(function() {
				    $('.kid').addClass('active', 1000, 'easeOutQuart', function () {
						$('.section_gameintro').bind('mousemove', function(e){
							var px = e.pageX,
								py = e.pageY,
								wx = $(this).width() / 2,
								wy = $(this).height() / 2;
							$('.kid').css('transform', 'translate(' + ((px - wx) / 90) + 'px,' + ((py - wy) / 90) + 'px');
						});
					});	
				}, 500);
			} else {
				$('.skel').stop().hide();
				$('.section_gameintro').unbind('mousemove');
			}
		}
	});
	$(".grouped_elements").fancybox({
		padding: 0,
		scrollOutside: false,
		scrolling: 'no',
		nextEffect: 'fade',
		prevEffect: 'fade',
		helpers: {
			overlay: {
				locked: true,
				scrollOutside: false
			}
		},
		afterLoad  : function(current, previous) {
			var videoId = $(this.element[0]).data('videoid'),
				elementId = $(this.element[0]).data('videocontainer');
			if(previous) {
				if(heroVideos[previous.index].pauseVideo){
					heroVideos[previous.index].pauseVideo();
				}
			}
			var player = new YT.Player(elementId, {
				videoId: videoId,
				playerVars: {
					'showinfo': 0,
					'rel': 0
				},
				events: {
					'onStateChange': function(e){
						if(e.data === YT.PlayerState.PLAYING) {
							timerIds.forEach(function(timerId){
								clearTimeout(timerId);
							});
							//if(ytplayerMain) ytplayerMain.pauseVideo();
						} else {
							timerIds.push(setTimeout(function() {
								//if(ytplayerMain) ytplayerMain.playVideo(); 
							}, 1500));
						}
					}
				}
			});
			heroVideos[current.index] = player;
		},
//		afterClose: function(){
//			if(ytplayerMain) ytplayerMain.playVideo();
//		}
	});
	var $indexers = $('.page_navigation li a img');
	$('.page_navigation li a').each(function (idx) {
		$(this).click(function () {
			$.fn.fullpage.moveTo(idx + 2);
		});
	});
	$('.btn_reg').click(function () { $.fn.fullpage.moveTo(2); })
	$indexers.on('mouseenter', function() {
		$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
	});
	$indexers.on('mouseleave', function() {
		if(!$(this).is('.active')){
			$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
		}
	});
	$('.btn_top').on('click', function(){
		$.fn.fullpage.moveTo(1);
	});

	$('.agree_list input[type=checkbox]').click(function () {
		$labelSpan = $(this).next().find('span');
		if ($labelSpan.hasClass('btn_checked')) {
			$labelSpan.removeClass('btn_checked');
		} else {
			$labelSpan.addClass('btn_checked');
		}
	});
	$(".input_placeHolder").val('');
	$('.input_placeHolder').focus(function () {
		$(this).removeClass($(this).attr('data-placeholderclass'));
	}).focusout(function () {
		if ($.trim($(this).val()) == '') {
			$(this).addClass($(this).attr('data-placeholderclass'));
		} else {
			$(this).removeClass($(this).attr('data-placeholderclass'));
		}
	});

	//var swiper = new Swiper('.swiper-container', {
	//	pagination: '.swiper-pagination',
	//	paginationClickable: true,
	//	calculateHeight: true,
	//	nextButton: '.swiper-button-next',
	//	prevButton: '.swiper-button-prev',
	//	onSlideChangeStart: function (swiper) {
	//		$('.tab img').each(function (index) {
	//			if (index === swiper.activeIndex) {
	//				$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
	//			} else {
	//				$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
	//			} 
	//		});
	//		$('.tab_comt img').attr('src', $('.tab_comt img').data('image') + swiper.activeIndex + '.gif');
	//		var $ytplayer = $('.swiper-container .ytplayer').eq(swiper.activeIndex),
	//			elementId = $ytplayer.attr('id'),
	//			videoId = $ytplayer.data('videoid');

	//		var ytplayer = new YT.Player(elementId, {
	//			videoId: videoId,
	//			playerVars: {
	//				'showinfo': 0,
	//				'rel': 0,
	//				'autoplay': 1
	//			},
	//			events: {
	//				'onStateChange': function(e) {
	//					if(e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING) {
	//						timerIds.forEach(function(timerId){
	//							clearTimeout(timerId);
	//						});
							 
	//					} else {
	//						timerIds.push(setTimeout(function() {
	//						}, 1500));
	//					}
	//				}
	//			}
	//		});
	//		ytplayers[swiper.activeIndex] = ytplayer;

	//		ytplayers[swiper.previousIndex].destroy();
	//	}
	//});

	var slider = $('.slide_gameinfo').unslider({
        arrows: false
	});
//	$('.btn_reg').click(function (e) {
//		if(presentDate == 20161010){
//			$('.gnb1 a').click();
//			e.preventDefault();
//		}else{
//			alert('CBT 사전예약이 종료되었습니다.\n11일 오후부터 구글 다운로드를 통해 플레이 가능합니다.');
//		}
//	});

//	$('.wrap_agr input[type=checkbox]').click(function () {
//		$labelSpan = $(this).next().find('span');
//		if ($labelSpan.hasClass('checked')) {
//			$labelSpan.removeClass('checked');
//		} else {
//			$labelSpan.addClass('checked');
//		}
//	});

	//agree checkbox styling
//	$('.wrap_agr label').on('click', function(){
//		var thisFor = $(this).attr('for');
//		var $thisInput = $('input#'+thisFor);
//		if($($thisInput).is(':checked') == false){
//			$(this).addClass('chk');
//		}else{
//			$(this).removeClass('chk');
//		}
//	});

	$('.txt_detail').click(function (e) {
		$('.shadow,.detailrule').fadeIn();
		centerPosition();
		e.preventDefault();
	});
	$('.txt_note').click(function (e) {
		$('.shadow,.notice').fadeIn();
		centerPosition();
		e.preventDefault();
	});
	/*폼제출하기*/
//	$('.btn_reg2').click(function (e) {
//		if (true) {
//			/*제출성공*/
//			//$('.complete').fadeIn();
//			//$('.wrongnumber').fadeIn();
//			//$('.requirefullagreement').fadeIn();
//			//$('.involvednumber').fadeIn();
//		}
//		else {
//
//		}
//		e.preventDefault();
//	});

	$('.pop_close').click(function (e) {
		$('.shadow,.wrap_centerpopup').fadeOut();
		e.preventDefault();
	});

	$('.pop_btn_confirm').click(function (e) {
		$('.shadow,.popup').fadeOut();
		e.preventDefault();
	});

var main_video = '<div class="video"><a class="pop_close" href="#"><img src="/Contents/am.nexon.com/CBTPre/ko/images/pc/pop_close.png" alt="" /></a><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe>' +
				'</div>';

	$('.btn_play').click(function (e) {
		var dataSrc = $(this).attr('data-src');
		$('.shadow').fadeIn();
		$('.wrap_main_video').append(main_video.replace('{video_src}', dataSrc)).show().css({ 'left': -(($('.wrap_main_video').width() - $(window).width()) / 2), 'top': -(($('.wrap_main_video').height() - $(window).height()) / 2) });
		$(this).animate({ 'opacity': '0' }, 1000);
		if(ytplayerMain) ytplayerMain.pauseVideo();
		centerPosition();
		e.preventDefault();
	});

	$('.wrap_main_video').on('click', '.pop_close', function (e) {
		$('.btn_play').animate({ 'opacity': '1' }, 1000);
		if(ytplayerMain) ytplayerMain.playVideo();
		closeVideo(e);
	});

	$(window).resize(function () {
		var w_width = $(window).width(),
			w_height = $(window).height();
		$('.wrap_bg_video').css('left', -((2600 - w_width) / 2));
		$('.wrap_main_video').css({ 'left': -(($('.wrap_main_video').width() - w_width) / 2), 'top': -(($('.wrap_main_video').height() - w_height) / 2) });
		$('#vplayer').css({ 'left': -((2600 - $(window).width()) / 2), 'top': -((1245 - $(window).height()) / 2) });
		$('.cover_vplayer,.section_main').height($(window).height());
		$(".bg_top_bar").height($('.top_bar').outerHeight());
		centerPosition();
		if (w_width <= 1100) {
			$('.c_max_1024').addClass('w_small');
		} else {
			$('.c_max_1024').removeClass('w_small');
		}

		if (w_height <= 660) {
			$('.c_max_1024').addClass('h_small');
		} else {
			$('.c_max_1024').removeClass('h_small');
		}
	});

	function closeVideo(e) {
		$('.shadow').fadeOut();
		$('.v_content').empty();
		$('.wrap_main_video').hide();
		e.preventDefault();
	}
	function centerPosition() {
		var w_width = $(window).width(),
			w_height = $(window).height();
		$('.wrap_centerpopup').each(function () {
			var centerPositionTop = ((w_height) - $(this).outerHeight()) / 2,
				centerPositionLeft = ((w_width) - $(this).outerWidth()) / 2;
			$(this).css({
				'top': centerPositionTop, 'left': centerPositionLeft
			});
		});
	};

	$('.char1, .char2, .char3').mouseenter(function () {
		$('.char1, .char2, .char3').not($(this)).stop().animate({
			//'opacity': '0.6'
		}, 50);

		$(this).stop().animate({
			'opacity': '1'
		}, 100);

	}).mouseleave(function () {
		$('.char1, .char2, .char3').stop().animate({
			'opacity': '1'
		}, 100);
	});

	$('.gnb li a').click(function () {
		$.fn.fullpage.moveTo($(this).data('slideto'));

	});

	$('.tab li a').each(function(index){
		$(this).click(function(){
		    slider.unslider('animate:' + index);
            
		});


	});
	$('.unslider-arrow').click(function () {
	    console.log('s')
	    if ($(this).hasClass('next')) {
	        slider.unslider('next');
	    } else {
	        slider.unslider('prev');
	    }
	})
	slider.on('unslider.change', function (event, slideIndex, slide) {
	    $('.tab li a img').each(function (index) {
	        if (index == slideIndex) {
	            $(this).attr('src', $(this).attr('src').replace('_off', '_on')).addClass('animation')
	           
	        } else {
	            $(this).attr('src', $(this).attr('src').replace('_on', '_off')).removeClass('animation')
	            console.log('off');
	        }
	    });
	    //$('.tab li a img').eq(index).attr('src', $('.tab li a img').eq(index).attr('src').replace('_off', '_on'));
	    $('.tab_comt img').attr('src', $('.tab_comt img').data('image') + slideIndex + '.gif');

	});

	$(window).resize();
});




