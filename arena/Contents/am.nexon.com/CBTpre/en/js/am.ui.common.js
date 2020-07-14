var emailVal;

function shareFacebook(){
	var share = {
		method: 'stream.share',
		u: 'http://am.nexon.com'
	};
	FB.ui(share, function(response){
	
	});
}
var linkUrl  = location.href;
var des = 'Thrilling, addictive action! "Arena Masters : Legend Begins" Dominate the arena with pocket-sized warriors';

function shareTwitter(){
	url = "https://twitter.com/intent/tweet?text=" +encodeURIComponent(des)+" : "+linkUrl;
	var retPop = window.open(url,'sns' ,'height=450px, width=650px');
	if(retPop == null ){
		alert( "팝업 차단이 설정되어 있습니다." );
	}
}

//phone & agree check validation
function validationChk(){
	var $email = $("#email").val();
	emailVal = $email;
	var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var check1 = $('#agreeChk1').is(':checked');
	var check2 = $('#agreeChk2').is(':checked');

	if(!$email){
		validationPop(1);
		$("#email").focus();
		return false;
	}
	if(!regEmail.test($email)) {
		validationPop(2);
		$("#email").focus();
		return false;
	}
	if(!check1){
		validationPop(3);
		return false;
	}
	if(!check2){
		validationPop(3);
		return false;
	}
	return true;
};
//popup alert
var alertType;
function validationPop(idx){
	alertType = idx;
	if(alertType == 1){
		//$('.alert_cont > p').text('전화번호를 입력해 주세요!').addClass('alert1');
		alert('Invalid e-mail address.\nPlease check your e-mail address and try again.');
	}
	if(alertType == 2){
		//$('.alert_cont > p').text('유효하지 않은 전화번호입니다. 다시 한번, 정확한 휴대폰번호를 확인 해주세요!').addClass('alert2');
		alert('Invalid e-mail address.\nPlease check your e-mail address and try again.');
	}
	if(alertType == 3){
		//$('.alert_cont > p').text('사전 예약을 신청하기 위해서는 모든 항목에 대한 동의가 필요합니다!').addClass('alert3');
		alert('You must give your consent by checking all the boxes to participate.');
	}
	if(alertType == 4){
		//$('.alert_cont > p').text('이미 등록된 전화번호입니다. 다시 한번, 정확한 휴대폰번호를 확인 해주세요!').addClass('alert4');
		alert('An application already exists for this e-mail.');
	}
	if(alertType == 5){
		//$('.alert_cont > p').text('CBT가 시작되면 신청하신 휴대폰 번호로 문자(LMS)를 보내드립니다.').addClass('alert5');
		alert('Application for “Arena Masters”\nCBT complete!');
	}
	//$('.alertPop').css('display', 'block').stop().animate({'opacity':1}, 300);
}


$(function(){
	//sns
	$('.fbShare').on('click', function(){
		shareFacebook();
	});
	$('.twShare').on('click', function(){
		shareTwitter();
	});
	//regist 사전예약 저장
	$('#btnReg').on('click', function(){
		if(validationChk()){
			//등록
			GameReg.registerPhoneAddress(
				'ArenaMasters_en_20160928',
				emailVal,
				'',
				'',
				function (data, text, xhr) {
					if (data.success) {
						if (data.hasUser) {
							validationPop(4);
						}//정상저장
						else {
							$.userID = data.useridx;
							validationPop(5);
							//저장 성공일때
							//userVal = true;
						}
					}
					else {
						alert(data.message);
					}
				},
				function (xhr, status, e) {
					alert(e);
				}
			);
			return false;
		}
	});
});