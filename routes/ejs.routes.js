const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');
//const { auth, ac } = require('../middleware/auth');
require('dotenv').config();

/* View Mapping */
router.get('/login', (req, res) => {
    // if (req) {
    //     return res.redirect('/');
    // }
    res.render('index.ejs', { components: 'login' });
});

router.get('/auth/kakao', (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
    res.redirect(kakaoAuthURL);
});

// Kakao 로그인 콜백 라우트
router.get('/auth/kakao/callback', async (req, res) => {
    const code = req.query.code; // 카카오 서버에서 전달된 인증 코드

    try {
        // 1. Access Token 요청
        const tokenResponse = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            qs.stringify({
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_REST_API,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code: code,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        );

        const accessToken = tokenResponse.data.access_token;
        // 2. 사용자 정보 요청
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const kakaoUser = userInfoResponse.data.kakao_account.profile.nickname;

        // 사용자 정보를 처리 (DB 저장 등)
        console.log('Kakao User Info:', kakaoUser);
        if (kakaoUser) {
            res.redirect('/');
        }
        //res.send(`<h1>Welcome, ${kakaoUser.kakao_account.profile.nickname}!</h1>`);
    } catch (error) {
        console.error('Error during Kakao login:', error);
        res.status(500).send('Kakao login failed!');
    }
});

router.get('/', (req, res) => {
    res.render('index.ejs', { components: 'user' });
});

module.exports = router;
