var dateObj = new Date();
var dateYear = dateObj.getFullYear();
var dateMonth = dateObj.getMonth()+1;
var dateDate = dateObj.getDate();
var phoneNumber;

//facebook share
//window.fbAsyncInit = function() {
//	FB.init({
//		appId: '1105163022877731',
//		xfbml: true,
//		version: 'v2.7'
//	});
//};
function shareFacebook(){
	var share = {
		method: 'stream.share',
		u: 'http://am.nexon.com'
	};
	FB.ui(share, function(response){
	
	});
}
var linkUrl  = location.href;
var des = '슈퍼 라이브 배틀! <아레나 마스터즈> CBT 드디어 시작! 11일~14일까지 맘껏 달려볼까요!';

function shareTwitter(){
	url = "https://twitter.com/intent/tweet?text=" +encodeURIComponent(des)+" : "+linkUrl;
	var retPop = window.open(url,'sns' ,'height=450px, width=650px');
	if(retPop == null ){
		alert( "팝업 차단이 설정되어 있습니다." );
	}
}

//phone & agree check validation
function validationChk(){
	var phone1 = $('#phoneNum1').val();
	var phone2 = $('#phoneNum2').val();
	phoneNumber = phone1 + phone2;
	var check1 = $('#agreeChk1').is(':checked');
	var check2 = $('#agreeChk2').is(':checked');
	var check3 = $('#agreeChk3').is(':checked');
	if(phone1 == ''){
		validationPop(1);
		return false;
	}
	if(phone2 == ''){
		validationPop(1);
		return false;
	}
	if(phoneNumber.length < 10 || phoneNumber.length > 11){
		validationPop(2);
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
	if(!check3){
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
		alert('휴대폰 번호가 유효하지 않습니다.\n다시 입력해주세요.');
	}
	if(alertType == 2){
		//$('.alert_cont > p').text('유효하지 않은 전화번호입니다. 다시 한번, 정확한 휴대폰번호를 확인 해주세요!').addClass('alert2');
		alert('휴대폰 번호가 유효하지 않습니다.\n다시 입력해주세요.');
	}
	if(alertType == 3){
		//$('.alert_cont > p').text('사전 예약을 신청하기 위해서는 모든 항목에 대한 동의가 필요합니다!').addClass('alert3');
		alert('개인 정보 수집/이용 및 취급 위탁과\n 광고 문자 수신에 대해 모두 동의하셔야만\n참여하실 수 있습니다.');
	}
	if(alertType == 4){
		//$('.alert_cont > p').text('이미 등록된 전화번호입니다. 다시 한번, 정확한 휴대폰번호를 확인 해주세요!').addClass('alert4');
		alert('이미 신청 완료된 전화 번호입니다.');
	}
	if(alertType == 5){
		//$('.alert_cont > p').text('CBT가 시작되면 신청하신 휴대폰 번호로 문자(LMS)를 보내드립니다.').addClass('alert5');
		alert('심장 관통 쾌감 액션, 「아레나 마스터즈」\nCBT 신청 완료!\n동의를 철회하고 싶을 경우,\n홈페이지 고객센터에서 모바일게임>아레나 마스터즈를 선택하여 문의를 등록해주세요.');
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
	//only number
	$('input:text[data-numberonly]').on('keyup', function(){
		$(this).val($(this).val().replace(/[^0-9]/gi, ''));
	});
	//regist 사전예약 저장
	$('#btnReg').on('click', function(){
		alert('CBT 사전예약이 종료되었습니다.\n11일 오후부터 구글 다운로드를 통해 플레이 가능합니다.');
//		if(validationChk()){
//			//등록
//			GameReg.registerPhoneAddress(
//				'ArenaMasters_ko_20160928',
//				phoneNumber,
//				'',
//				'',
//				function (data, text, xhr) {
//					if (data.success) {
//						if (data.hasUser) {
//							validationPop(4);
//						}//정상저장
//						else {
//							$.userID = data.useridx;
//							validationPop(5);
//							//저장 성공일때
//							//userVal = true;
//						}
//					}
//					else {
//						alert(data.message);
//					}
//				},
//				function (xhr, status, e) {
//					alert(e);
//				}
//			);
//			return false;
//		}
	});
	$('.phone, .wrap_agr label, .user_input label').on('click', function(){
		alert('CBT 사전예약이 종료되었습니다.\n11일 오후부터 구글 다운로드를 통해 플레이 가능합니다.');
	});
//	//수신동의 체크/미체크 얼럿
//	$('#agreeChk3').on('change', function(){
//		if($(this).is(':checked')){
//			alert('넥슨\n오늘날짜('+dateYear+'년'+dateMonth+'월'+dateDate+'일)\n수신동의 처리 되었습니다.');
//		}else{
//			alert('넥슨\n오늘날짜('+dateYear+'년'+dateMonth+'월'+dateDate+'일)\n수신동의 철회 처리 되었습니다.');
//		}
//	});
});