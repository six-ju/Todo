const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

// 토큰 받기
router.get("/kakao", authController.kakao);
// 콜백 라우트
router.get("/kakao/callback", authController.kakaoCallback);

module.exports = router;
