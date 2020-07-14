$(function () {
	$('.pop_close, .shadow').click(function (e) {
		$('.shadow,.wrap_centerpopup').fadeOut();
		e.preventDefault();
	});
	var main_video = '<div class="video"><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe>' +
				'</div><div class="wrap_v_close"><a class="pop_close" href="#"><img src="/Contents/am.nexon.com/CBTend/ko/images/mobile/pop_close.png" alt="닫기" /></a></div>';
	$('.btn_play').click(function (e) {
		var dataSrc = $(this).attr('data-src');
		$('.shadow').fadeIn();
		$('.wrap_main_video').append(main_video.replace('{video_src}', dataSrc)).show();
		
		var w_width = $(window).width(),
			w_height = $(window).height();
		$('.wrap_centerpopup').each(function () {
			var centerPositionTop = ((w_height) - $(this).height()) / 2,
				centerPositionLeft = ((w_width) - $(this).width()) / 2;
			$(this).css({ 'top': centerPositionTop, 'left': centerPositionLeft });
		});
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

 
});
 
