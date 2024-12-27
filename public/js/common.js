$(function () {
  // 구글 애널리틱스 
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-LBKS6BPJ7C');

  $(document).on("removeClass", ".flatpickr-calendar", function () {});
  // 모달 닫기 이벤트
  $(".alert-close, .alert-btn.cancel").on("click", function () {
    $(".custom-alert").hide();
  });

  $(".logout-icon").click(function () {
    warningAlert("로그아웃 하시겠습니까?", function () {
      location.href = "/auth/logout";
    });
  });

  $("input").keydown(function (e) {
    // 엔터 키 눌렀을때
    if (e.keyCode === 13) {
      $(".enter").trigger("click");
    }
  });

  // 헤더 이동
  $(".header").click(function () {
    const page = $(this).data("page");
    $(this).removeClass("active");
    location.href = `/${page}`;
  });

  const pathName = location.pathname.split("/").pop();
  if (pathName) {
    $(".header").removeClass("active");
  }
  $(`.${pathName}`).addClass("active");
});

// 모달 일반 알림 (취소 버튼 미포함)
function generalAlert(text, confirmCallback, isWarning = false) {
  $(".alert-btn.confirm").off("click");
  $(".alert-content").html(text);
  $(".custom-alert").show();

  if (!isWarning) {
    $(".alert-btn.cancel").hide();
  }

  if (confirmCallback) {
    $(".alert-btn.confirm").on("click", function () {
      confirmCallback();
      $(".custom-alert").hide();
    });
  } else {
    $(".alert-btn.confirm").on("click", function () {
      $(".custom-alert").hide();
    });
  }
}

// 모달 경고 알림 (취소 버튼 포함)
function warningAlert(text, confirmCallback) {
  $(".alert-btn.cancel").show();
  generalAlert(text, confirmCallback, true);
}

// 연속적인 api 호출 방지
function callApi() {
  if (isCooldown) {
    generalAlert("잠시후 다시 시도해주세요.");
  }

  console.log("API 호출");
  isCooldown = true;

  setTimeout(() => {
    isCooldown = false;
  }, 1000); // 1초 대기
}
