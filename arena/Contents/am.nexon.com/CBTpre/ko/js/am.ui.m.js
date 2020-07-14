//var dateObj = new Date();
//var dateYear = dateObj.getFullYear();
//var dateMonth = dateObj.getMonth()+1;
//var dateDate = dateObj.getDate();
//var presentDate= dateYear.toString() + dateMonth.toString() + dateDate.toString();

$(function () {
		$('ul.gnb a').click(function (evt) {
		var targetId = $(this).attr('class').substring(0, 8),
			topNavHeight = $('.section_fix').height(),
			destination = $('#' + targetId).position().top - topNavHeight;
		$("body").animate({ scrollTop: destination }, 200);
		evt.preventDefault();
		});
		var swiperChanging = false;
		var swiper = new Swiper('.swiper-container', {
		   loop :'true',
		   pagination: '.swiper-pagination',
		   paginationClickable: true,
		   nextButton: '.swiper-button-next',
		   prevButton: '.swiper-button-prev',
		   onImagesReady: function (swiper) {
			   var $target = $('.tab_char img').eq(0);
			   $target.attr('src', $target.attr('src').replace('_off', '_on'));
		   },
		   onSlideChangeStart: function (swiper) {
		       swiperChanging = true;
				$('.tab_char img').each(function () {
					$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
				});
		   },
		   onSlideChangeEnd: function (swiper) {
			   var $target = $('.tab_char img').eq((swiper.activeIndex - 1) % 3);
			   $target.attr('src', $target.attr('src').replace('_off', '_on'));
			   swiperChanging = false;
		   }
	   });

 
	$('.pop_close, .shadow').click(function (e) {
		$('.shadow,.wrap_centerpopup').fadeOut();
		e.preventDefault();
	});

	$('.btn_detail').click(function (e) {
		$('.shadow,.termPop1').fadeIn();
		e.preventDefault();
	});
	$('input:checked').next('label').addClass('on')
	$('.checkbox_label').click(function (e) {
		$(this).toggleClass('on');
	});
//	$('.btn_reg').click(function (e) {
//		if(presentDate == 20161010){
//			$('ul.gnb a.content1').click();
//		}else{
//			alert('CBT 사전예약이 종료되었습니다.\n11일 오후부터 구글 다운로드를 통해 플레이 가능합니다.');
//		}
//	});
//	$('.btn_reg').click(function (e) {
//		$('ul.gnb a.content1').click();
//		
//	})
//	$('.btn_reg2').click(function (e) {
//		if (true) {
//			/*제출성공*/
//			$('.complete').fadeIn();
//			/*미동의*/
//			// $('.requirefullagreement').fadeIn();
//			/*이미등록된 번호*/
//			//$('.involvednumber').fadeIn();
//		}
//		else {
//
//		}
//		e.preventDefault();
//	});
	$('.pop_btn_confirm').click(function (e) {
		$('.popup').fadeOut();
		e.preventDefault();
	});
	var main_video = '<div class="video"><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe>' +
				'</div><div class="wrap_v_close"><a class="pop_close" href="#"><img src="Contents/am.nexon.com/CBTPre/ko/images/mobile/pop_close.png" alt="닫기" /></a></div>';
	$('.btn_play').click(function (e) {
		var dataSrc = $(this).attr('data-src');
		$('.shadow').fadeIn();
		$('.wrap_main_video').html(main_video.replace('{video_src}', dataSrc)).show();
		
		centerPosition();
		e.preventDefault();
	});

	$('.wrap_main_video').on('click', '.pop_close', function (e) {
		closeVideo(e);
	});

	function closeVideo(e) {
		$('.shadow').fadeOut();
		$('.v_content').empty();
		$('.wrap_main_video,.wrap_modal_video,.wrap_intro_video').hide();
		e.preventDefault();
	}
	function centerPosition() {
	    var w_width = $(window).width(),
           w_height = $(window).height();
	    $('.wrap_centerpopup').each(function () {
	        var centerPositionTop = ((w_height) - $(this).height()) / 2,
                centerPositionLeft = ((w_width) - $(this).width()) / 2;
	        $(this).css({ 'top': centerPositionTop, 'left': centerPositionLeft });
	    });
	}
	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop(),
			topNavHeight = $('.section_fix').height();

		$('.gnb li a img').each(function () {
			$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
		});
		var section0Top = parseInt($('.section_register').position().top - topNavHeight),
			section1Top = parseInt($('.section_event').position().top - topNavHeight);
		 
		if (scrollTop < section0Top) {
			$('.content1 img').attr('src', $('.content1 img').attr('src').replace('_on', '_off'));
			return;
		}
		if (scrollTop < section1Top) {
			$('.content1 img').attr('src', $('.content1 img').attr('src').replace('_off', '_on'));
			return;
		}

		var section2Top = parseInt($('.section_characterintro').position().top - topNavHeight);
		if (scrollTop >= section1Top && scrollTop < section2Top) {
			$('.content2 img').attr('src', $('.content2 img').attr('src').replace('_off', '_on'));
			return;
		}

		var section3Top = parseInt($('.section_gameintro').position().top - topNavHeight);
		if (scrollTop >= section2Top && scrollTop < section3Top) {
			$('.content3 img').attr('src', $('.content3 img').attr('src').replace('_off', '_on'));
			return;
		}

		if (scrollTop >= section3Top) {
			$('.content4 img').attr('src', $('.content4 img').attr('src').replace('_off', '_on'));
		}
	});

	$('.tab_char img').each(function (index) {
	    $(this).click(function (e) {
	        if (swiperChanging === false) {
	            swiper.slideTo(index + 1);
	        }
			e.preventDefault();
		});
	});

	$('.tab_mode a').each(function (index) {
		$(this).click(function (e) {
			$('.tab_content li').removeClass('active').eq(index).addClass('active');
			$('.tab_mode img').each(function (idx) {
				if (index === idx) {
					$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
				} else {
					$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
				}
			});
			e.preventDefault();
		});
	});

	//$('.tab_content li').bind('touchstart', function (e) {
	//    $('.tab_content li').removeClass('active')
	//})

	$('.gnb a, .btn_goto_reg').click(function (event) {
		$('html, body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
		event.preventDefault();
	});
	$(window).load(function () {
	    centerPosition();
	});
	$(window).resize(function () {
	    centerPosition();
	})
});
