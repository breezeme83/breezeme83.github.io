//append data
var textData =
{
    'ko': [
        {//text
            refreshTxt1: '달성현황 갱신 버튼을 누른 후<br> 참여해 주세요.', //새로고침 필요
            refreshTxt2: '갱신이 완료되었습니다.', //새로고침 완료
            rewardTxt: '보상이 지급 되었습니다.<br>우편함을 확인 부탁 드립니다.', //아이템 지급
            alreadyTxt: '이미 수령하셨습니다.', //이미받음
            shortageTxt:'아직 목표를 달성하지 못했어요.', //조건 미달성
            errorTxt: '오류가 발생했습니다.<br> 다시 시도해 주세요.'
        }
    ],
    'en': [
        {
            refreshTxt1: 'Please try again after pushing<br>‘Update Achievement Status’ Button.', //새로고침 필요
            refreshTxt2: 'Status Updated.', //새로고침 완료
            rewardTxt: 'Rewards delivered.<br>Please check your inbox.', //아이템 지급
            alreadyTxt: 'You have already claimed<br>the rewards.', //이미받음
            shortageTxt:'Didn’t accomplish<br>the achievement yet.', //조건 미달성
            errorTxt: 'An error occurred.<br>Please try again.'
        }
    ],
    'zh': [
        {
            refreshTxt1: '請按下<br>更新達成現況按鈕後參加。', //새로고침 필요
            refreshTxt2: '更新完成。', //새로고침 완료
            rewardTxt: '獎勵已發送。<br>請確認信箱。', //아이템 지급
            alreadyTxt: '已領取。', //이미받음
            shortageTxt: '未達成目標。', //조건 미달성
            errorTxt: '發生錯誤。<br>請重新嘗試。'
        }
    ],
    'th': [
        {
            refreshTxt1: 'โปรดลองอีกครั้งหลังจากกดปุ่ม<br>‘อัพเดทสถานะความสำเร็จ’', //새로고침 필요
            refreshTxt2: 'อัพเดทสถานะ', //새로고침 완료
            rewardTxt: 'มีการส่งรางวัลไปแล้ว<br>โปรดเช็คกล่องจดหมายของคุณ', //아이템 지급
            alreadyTxt: 'คุณได้รับรางวัลไปแล้ว', //이미받음
            shortageTxt: 'ยังไม่ได้ทำตามเงื่อนไขความสำเร็จ', //조건 미달성
            errorTxt: 'เกิดความขัดข้อง<br>โปรดลองใหม่อีกครั้ง'
        }
    ],
}

//alert Popup
function openAlertPop() {
    $('.alertPop').css('display', 'block').stop().animate({ 'opacity': 1 });
}

var lang = 'ko';
var reStatus = true; //새로고침 상태

$(function () {
    lang = $('html').attr('lang');
    $('body').addClass(lang);

    //새로고침 완료
    $('.btn_refresh').on('click', function () {
        $('.alertPop .cont p').html(textData[lang][0].refreshTxt2);
        reStatus = true;
        openAlertPop();
    });

    //event1, 2 보상 버튼 클릭이벤트(공통)
    $('.reward_list button').on('click', function () {
        if (reStatus == true) { //새로고침 완료
            if ($(this).is('.active')) { //아이템지급
                $('.alertPop .cont p').html(textData[lang][0].rewardTxt);
            } else if ($(this).is('.done')) { //이미받음
                $('.alertPop .cont p').html(textData[lang][0].alreadyTxt);
            }else { //조건 미달성(기본상태)
				$('.alertPop .cont p').html(textData[lang][0].shortageTxt);
			}
        } else { //새로고침 먼저
            $('.alertPop .cont p').html(textData[lang][0].refreshTxt1);
        }
        openAlertPop();
    });
    //popup 닫기
    $('.btn_close, .layer').on('click', function () {
        $(this).parents('.popup').stop().animate({ 'opacity': 0 }, function () {
            $(this).css('display', 'none');
        });
    });
});