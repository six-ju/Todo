const axios = require("axios");
const qs = require("qs");
const AuthService = require("../services/auth.service");
const jwt = require("../utill/jwt");

class AuthController {
  AuthService = new AuthService();

  kakao = (req, res, next) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
    res.redirect(kakaoAuthURL);
  };

  kakaoCallback = async (req, res, next) => {
    const code = req.query.code; // 카카오 서버에서 전달된 인증 코드
    try {
      // 1. Access Token 요청
      const tokenResponse = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        qs.stringify({
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_REST_API,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code: code,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const accessToken = tokenResponse.data.access_token;

      // 2. 사용자 정보 요청
      const userInfoResponse = await axios.get(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const kakaoUser = userInfoResponse.data.kakao_account;

      // 3. SQLite에 사용자 이름 저장
      if (kakaoUser) {
        const userInfo = {
          NAME: kakaoUser.profile.nickname,
          EMAIL: kakaoUser.email,
          socialType: "KAKAO",
        };

        await this.AuthService.user(userInfo);
        await this.login(req, res, userInfo);
      }
    } catch (error) {
      res.status(401).send("Kakao login failed!");
    }
  };

  login = async (req, res, userInfo) => {
    const accessToken = jwt.sign(userInfo);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      signed: true,
    });
    res.redirect("/");
  };

  logout = async (req, res) => {
    req.logout((err) => {
      res.clearCookie("accessToken");
      res.redirect("/login");
    });
  };
}

module.exports = AuthController;
