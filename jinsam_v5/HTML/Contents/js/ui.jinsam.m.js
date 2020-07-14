var regPopup = {};
$(function () {
    var lang = $("html").attr("lang");
    var alertTxt =
	{
	    "en": [
			   "<strong>You did not enter an email address.</strong> Please enter your email address.",
			   "<strong>The email address you<br> entered is not available.</strong> Please verify your email address.",
			   "<strong>Your registration is complete!</strong> Join the Vanguard on Facebook and stay tuned<br> for the latest news and launch schedule!",
			   "<strong>Uh oh...</strong> You are lost in the 404 battlefield.<br/>Please reload the page and try again.",
			   "<strong>Uh oh… There’s one more thing!</strong> Please agree to the privacy policy and try again.",
			   "<strong>You are already registered!</strong> Thank you!",
			   "<div class='warning'><strong>The page is not available!</strong></div>"
	    ],
	    "de": [
			   "<strong>Du hast deine Mail-Adresse<br/> noch nicht angegeben.</strong>Bitte gib diese zuerst ein.",
			   "<strong>Die eingegebene Mail-Adresse<br/>ist nicht verfügbar. </strong>Bitte prüfe deine Eingabe nochmals.",
			   "<strong>Deine Registrierung ist abgeschlossen! </strong>Wir empfehlen dir zudem, dich dem Vorhutslager<br/> unserer Facebook-Seite anzuschließen!",
			   "<strong>Eine weitere verlorene Seele <br/>auf dem Schlachtfeld 404.</strong>Bitte lade die Seite neu <br/>und versuche es erneut.",
			   "<strong>Oh oh... Etwas fehlt noch! </strong>Bitte stimme den Datenschutzrichtlinien zu<br/>und versuche es erneut..",
			   "<strong>Du hast dich bereits registriert!</strong>Vielen Dank!",
			   "<div class='warning'><strong>Diese Seite ist nicht verfügbar!</strong></div>"
	    ],
	    "tw": [
               "<strong>沒有輸入E-MAIL。</strong> 請輸入E-MAIL。",
               "<strong>輸入的E-MAIL是無效的E-MAIL。</strong> 請輸入正確的郵件地址。",
               "<strong>事前登錄已完成!</strong>加入粉絲團先鋒營，時時關注最新消息與上市時程！",
		       "<strong>哎呀 , 您在404副本迷路了. </strong> 請重新整理頁面後執行一次.",
               "<strong>喔… 還漏掉一件事情! </strong>請勾選同意蒐集個人資訊！",
               "<strong>已加入騎士團!</strong>感激不盡！",
               "<div class='warning'><strong>該頁面無效!</strong></div>"
	    ],
	    "th": [
			   "<strong>คุณไม่ได้ป้อนที่อยู่อีเมลของคุณ</strong> โปรดป้อนที่อยู่อีเมลของคุณ",
			   "<strong>ที่อยู่อีเมลที่คุณป้อนไม่สามารถใช้งานได้</strong> โปรดตรวจสอบที่อยู่อีเมลของคุณ",
			   "<strong>การลงทะเบียนเสร็จสมบูรณ์</strong>ติดตามข่าวสารอัพเดทล่าสุด และกำหนดการเปิดตัวพร้อมกันบน Facebook",
			   "<strong>โอ๊ะโอ เกิดความผิดพลาด 404</strong> โปรดรีโหลดหน้าซ้ำและลองอีกครั้ง",
			   "<strong>โอ๊ะโอ.. มีอะไรขาดไปแน่ะ!</strong> โปรดยอมรับเงื่อนไข และนโยบายความเป็นส่วนตัว<br/>และลองอีกครั้ง",
			   "<strong>คุณได้ลงทะเบียนแล้ว</strong> ขอบคุณ!",
			   "<div class='warning'><strong>หน้าดังกล่าวไม่สามารถใช้งานได้</strong></div>"
	    ],
	    "vn": [
			   "<strong>Chưa nhập địa chỉ email.</strong> Vui lòng nhập địa chỉ email.",
               "<strong>Địa chỉ email đã nhập không hợp lệ.</strong>Vui lòng xác minh địa chỉ email.",
               "<strong>Hoàn tất đăng ký!</strong> Gia nhập quân tiên phong trên Facebook và tiếp tục theo dõi <br/>tin tức mới nhất và kế hoạch ra mắt!",
               "<strong>Rất tiếc,<br/> các hạ đã thua trên chiến trường 404.</strong> Vui lòng tải lại trang và thử lại.",
               "<strong>Ồ... Còn một điều nữa!</strong> Vui lòng chọn đồng ý với chính sách bảo mật và thử lại.",
               "<strong>Đã đăng ký!</strong> Xin cảm ơn!",
               "<div class='warning'><strong>Trang không hợp lệ!</strong></div>"
	    ],
	    "fr": [
			   "<strong>Vous n'avez saisi aucune adresse e-mail. </strong> Veuillez saisir votre adresse e-mail.",
			   "<strong>L'adresse e-mail saisie n'est pas valide. </strong>Veuillez vérifier votre adresse e-mail.",
			   "<strong>Votre inscription a été effectuée !</strong> Rejoignez l'Avant-garde sur Facebook <br/>et tenez-vous au courant des dernières nouvelles<br/>et du programme de lancement !",
			   "<strong>Êtes-vous perdu, guerrier ?<br/>(Erreur 404)</strong> Veuillez recharger la page et réessayer.",
			   "<strong>Oh-oh... Encore une chose!</strong> Veuillez accepter les termes de la <br/>Politique de confidentialité et réessayer.",
			   "<strong>Vous êtes déjà inscrit(e) !</strong>Merci !",
			   "<div class='warning'><strong>Cette page n'est pas disponible !</strong></div>"
	    ]
	};

    //registration 팝업 내용
    regPopup.show = function (_type_) {
        console.dir(alertTxt[lang][_type_]);
        $('.alertPop p').html(alertTxt[lang][_type_]);
        $('.alertPop').fadeIn();
    };
    //registration 팝업
    $('#btnReg').click(function () {
        regPopup.show('0');
    });
    //플러그인::갤러리슬라이드
    var swiper1 = new Swiper('#s1', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        onSlideChangeEnd: function (swiper) {
            $('.swiper-indexer .active').html(swiper.activeIndex + 1);
        }

    });
    //플러그인::동영상슬라이드
    var swiper2 = new Swiper('#s2', {
        nextButton: '.btn_next',
        prevButton: '.btn_prev',
        loop: true,
        spaceBetween: 0,
        pagination: '.paging',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<button type="button" class="' + className + " num" + (index + 1) + '">' + (index + 1) + '</button>';
        }
    });
    //동영상열기 
    $('.btn_play, .btn_video').click(function (e) {
        var movUrl = $(this).data('video');
        var main_video = '<div class="popup_layer"></div><div class="video"><a class="btn_close" href="#"></a><iframe width="" height="" src="https://www.youtube.com/embed/' + movUrl + '?autoplay=1&amp;controls=0&amp;rel=0&amp;showinfo=0&amp;wmode=transparent&amp;vq=720" frameborder="0" allowfullscreen=""></iframe></div><div class="wrap_v_close"></div>';
        $('.shadow').fadeIn();
        $('.wrap_main_video').html(main_video).show();
        $('.wrap_main_video').css({
            'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2,
            'top': (($(window).height() - $('.wrap_main_video').outerHeight()) / 2) + 10
        });
        e.preventDefault();
    });
    //동영상닫기
    $('.wrap_main_video').on('click', '.btn_close', function (e) {
        $('.wrap_main_video').fadeOut();
        $('.shadow').fadeOut();
        $('.wrap_main_video').html('');
        e.preventDefault();
    });
    //팝업닫기
    $('.btn_close').click(function () {
        var toHide = $(this).attr('data-tohide');
        $("#" + toHide).fadeOut();
    });
    $(window).resize(function () {
        movePositionToMiddle();
    });
    //체크박스디자인
    $('.agree label').click(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).parent().removeClass('checked');
        } else {
            $(this).parent().addClass('checked');
        };
    });
    //체크박스디자인 for IE dbclick
    $('.agree label').dblclick(function () {
        if ($('#' + $(this).attr('for')).is(':checked') === true) {
            $(this).parent().addClass('checked');
        } else {
            $(this).parent().removeClass('checked');
        };
    });
    //엘리먼트가운데정렬
    function movePositionToMiddle() {
        var $target = $('.keep-middle');
        var targetHeight = $target.height();
        var wHeight = $(window).height();
        var topMargin = (wHeight - targetHeight) / 2;
        $('.wrap_main_video').css({
            'left': ($(window).width() - $('.wrap_main_video').outerWidth()) / 2,
            'top': ($(window).height() - $('.wrap_main_video').outerHeight()) / 2
        });
    }
    //우측네비게이션
    $('.locallinker li').localLinker();
    //맨위로가기앵커
    $('.totop').click(function (e) {
        $('html, body').stop().animate({ scrollTop: 0 }, 1000);
        e.preventDefault();
    });
    //SNS리스트 팝업 보여주기
    $('.share').click(function () {
        $('#shareSNS').fadeIn();
    });
});