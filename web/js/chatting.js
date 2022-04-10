var cookie_name = "";
var page = 15;
$(document).ready(function() {
    // 쿠키 설정
    document.cookie = "user_name=이석민;"
    var cookies = document.cookie.split(";");
    for (var i in cookies) {
        cookie_name += cookies[i].replace("user_name=", "");
    } // 쿠키 가져오기
    $('.chat').append('<p>' + cookie_name + '</p>');

    // 초기 채팅 조회
    select_chat(list_scroll());

    // 리스트 맨위 감지 후, 20개 더 조회
    $('.chat_content').scroll(function() {
        var list_top = $('.chat_content').scrollTop();
        if (list_top == 0) {
            $('#loader').css('display', 'block');
            page += 20;
        }
    })
})
// 채팅 조회 ajax
var select_chat_time;
function select_chat() {
    $.ajax({
        url: "../../php/select_chat.php",
        type: "GET",
        cache: false,
        data: {
            page: page
        },
        dataType: "json",
        error: function() {
            alert("서버에서 데이터를 가져오는데 실패했습니다. 새로고침 해주세요.");
        },
        success: function(data) {
            var result = "";
            for (var i in data) {
                var user_name = data[i].user_name;
                var content = data[i].content;
                var time = data[i].time;

                if (user_name == cookie_name) {
                    result += '<li class="chatting_row" style="justify-content: flex-end;">';
                    result += '<span class="time" style="margin-right: 5px;">' + time + '</span>';
                    result += '<div class="chatting_main">';
                    result += '<div class="chatting_content" style="background-color: #FFE402">';
                    result += '<span>' + content + '</span>';
                    result += '</div>';
                    result += '</div>';
                } else {
                    result += '<li class="chatting_row">';
                    result += '<div class="chatting_side">';
                    result += '<img src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png" alt="W3Schools.com" width="32" height="32">';
                    result += '</div>';
                    result += '<div class="chatting_main">';
                    result += '<td>' + user_name + '</td>';
                    result += '<div class="chatting_content" style="background-color: #ffffff;">';
                    result += '<span>' + content + '</span>';
                    result += '</div>';
                    result += '</div>';
                    result += '<span class="time" style="margin-left: 5px;">' + time + '</span>';
                }
                result += '</li>';

                $('.chat_content').html(result);
            }
        }
    });
    select_chat_time = setTimeout("select_chat()", 2000);
    $('#loader').css('display', 'none');
}
// 채팅 보내기 ajax
function send_chat() {
    if ($('#chat_input').val() == '') {
            return;
    } else {
        $.ajax({
            url: "../../php/send_chat.php",
            type: "GET",
            data: {
                content: $('#chat_input').val(),
                user_name: cookie_name
            },
            cache: false,
            error: function() {
                alert("통신에러! 관리자에게 문의하세요.");
            },
            success: function(data) { 
                // alert(data);
                list_scroll();
            }
        });
        $('#chat_input').val('');
    }
}
// 리스트 스크롤 맨 밑에 내리기
function list_scroll() {
    var chat_content = document.getElementById('chat_content');
    setTimeout(function() {
        chat_content.scrollTop = chat_content.scrollHeight;
    }, 1000);
}
// 엔터 키 누르면 채팅 보내기
function submit() {
    if (window.event.keyCode == 13) {
        send_chat();   
    }
}