const express = require('express');
const router = express.Router();
const passport = require("passport");

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

// 토큰 받기
router.get('/kakao', passport.authenticate("kakao"));
// 콜백 라우트
// router.get('/kakao/callback', authController.kakaoCallback);

// Kakao 로그인 콜백 처리
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/", // 로그인 실패 시 리다이렉트 경로
    }),
    (req, res) => {
        // 로그인 성공 시 리다이렉트 경로
        res.redirect("/profile");
    }
);
module.exports = router;
