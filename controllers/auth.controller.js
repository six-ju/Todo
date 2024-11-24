const passport = require("passport");

class AuthController {
  // kakao = (req, res, next) => {
  //     const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
  //     res.redirect(kakaoAuthURL);
  // };

  kakao = (req, res, next) => {
    passport.authenticate("kakao")(req, res, next);
  };

  kakaoCallback = (req, res, next) => {
    const code = req.query.code; // 카카오 서버에서 전달된 인증 코드
    try {
      passport.authenticate("kakao", {
        // 로그인에대한 결과를 GET /auth/kakao/callback 로 받는다.
        failureRedirect: "/",
      }),
        (req, res,next) => {
          res.redirect("/");
        };
    } catch (error) {
      console.error("Error during Kakao login:", error);
      res.status(500).send("Kakao login failed!");
    }
  };
}

module.exports = AuthController;
