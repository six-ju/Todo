const express = require("express");
const router = express.Router();
const passport = require("passport");

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

// 토큰 받기
router.get("/kakao", authController.kakao);
// 콜백 라우트
router.get("/kakao/callback", authController.kakaoCallback);

// 토큰 받기
router.get("/naver", authController.naver);
// 콜백 라우트
router.get("/naver/callback", authController.naverCallback);

// 토큰 받기
router.get("/google", authController.google);
// 콜백 라우트
router.get("/google/callback", authController.googleCallback);

// admin 로그인 체크 라우트
router.post("/admin", authController.admin);

// 쿠키 부여
router.get("/login", authController.login);
// 로그아웃(쿠키 삭제)
router.get("/logout", authController.logout);

module.exports = router;
