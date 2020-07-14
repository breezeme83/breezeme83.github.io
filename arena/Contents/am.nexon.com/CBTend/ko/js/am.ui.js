
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
	//$('.region').css({ 'left': -((1920 - $(window).width()) / 2), 'top': -((1072 - $(window).height()) / 2) });
	$('.cover_vplayer,.section_main').height($(window).height());

	$('.pop_close').click(function (e) {
		$('.shadow,.wrap_centerpopup').fadeOut();
		e.preventDefault();
	});


var main_video = '<div class="video"><a class="pop_close" href="#"><img src="/Contents/am.nexon.com/CBTend/ko/images/pc/pop_close.png" alt="" /></a><iframe width="" height="" src="{video_src}" frameborder="0" allowfullscreen=""></iframe>' +
				'</div>';

	$('.btn_play').click(function (e) {
		var dataSrc = $(this).attr('data-src');
		$('.shadow').fadeIn();
		$('.wrap_main_video').append(main_video.replace('{video_src}', dataSrc)).show().css({ 'left': -(($('.wrap_main_video').width() - $(window).width()) / 2), 'top': -(($('.wrap_main_video').height() - $(window).height()) / 2) });

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
		//$('.region').css({ 'left': -((1920 - $(window).width()) / 2), 'top': -((1072 - $(window).height()) / 2) });

		$('.cover_vplayer,.section_main').height($(window).height());
		$(".bg_top_bar").height($('.top_bar').outerHeight());
		centerPosition();
		if (w_height <= 700) {
		    $('.section_main .txt_maintitle').addClass('under700');
		} else {
		    $('.section_main .txt_maintitle').removeClass('under700');
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

});
 




