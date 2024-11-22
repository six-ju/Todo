$(function () {
        // 모달 닫기 이벤트
        $('.alert-close, .alert-btn.cancel').on('click', function () {
            $('.custom-alert').hide();
        });
})

// 모달 일반 알림 (취소 버튼 미포함)
function generalAlert(text, confirmCallback, isWarning = false) {
    $('.alert-btn.confirm').off('click');
    $('.alert-content').html(text);
    $('.custom-alert').show();

    if (!isWarning) {
        $('.alert-btn.cancel').hide();
    }

    if (confirmCallback) {
        $('.alert-btn.confirm').on('click', function () {
            confirmCallback();
            $('.custom-alert').hide();
        });
    } else {
        $('.alert-btn.confirm').on('click', function () {
            $('.custom-alert').hide();
        });
    }
}

// 모달 경고 알림 (취소 버튼 포함)
function warningAlert(text, confirmCallback) {
    $('.alert-btn.cancel').show();
    generalAlert(text, confirmCallback, true);
}