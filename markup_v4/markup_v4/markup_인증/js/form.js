$(document).ready(function () {
    /*loginandauot*/
    $('#login').focus(function () {
        $(this).removeClass('id');
    });
    $('#login').blur(function () {
        var value = $(this).val();
        var value2 = $.trim(value)
        if (value2) {
        } else {
            $(this).addClass('id');
        }
    });
    $('#pw').focus(function () {
        $(this).removeClass('pw');
    });
    $('#pw').blur(function () {
        var value = $(this).val();
        var value2 = $.trim(value)
        if (value2) {
        } else {
            $(this).addClass('pw');
        }
    });

    $("input[type='text'], input[type='password']").keypress(function (e) {
        if (e.which === 32)
            return false;
    });

    //IE10이 아닐경우
    if (navigator.appVersion.indexOf("MSIE 10") == -1) {
        console.log('This is not IE 10');
        //인풋 클리어 버튼
        $("input[type='text'] ,input[type='password'] ").each(
            function () {
                var str = $('<span class="clearButton"></span>'),
                    wrap_clearbutton_width = $(this).outerWidth();
                $(this).wrap("<div class='wrap_clearbutton'></div>").parent().css('width', wrap_clearbutton_width)
                $(this).after(str);
                //$(this).keypress(function (e) {
                //    if (e.which === 32)
                //        return false;
                //});
                $(this).bind("keyup click focus", function (e) {
                    var text = $(this).val().length;
                    if (e.which === 32) {
                        return false;
                    }
                    $('.clearButton').css('display', 'none');
                    if (text > 0) {
                        $(this).next().css('display', 'block');
                    }
                    else if (text == 0) {
                        $(this).next().css('display', 'none');
                    };
                });
            }
         );
        $('.clearButton').click(function () {
            $(this).css('display', 'none').prev().val("");
        });
    } else { console.log('IE10')}
});