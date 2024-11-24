const express = require("express");
const router = express.Router();
const passport = require("passport");

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

// 토큰 받기
router.get("/kakao", authController.kakao);
// 콜백 라우트
router.get("/kakao/callback", authController.kakaoCallback);

// 쿠키 부여
router.get("/login", authController.login);
// 로그아웃(쿠키 삭제)
router.get("/logout", authController.logout);

module.exports = router;
