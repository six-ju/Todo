const axios = require('axios');
const qs = require('qs');
const AuthService = require('../services/auth.service');
const jwt = require('../utill/jwt');
const crypto = require('crypto');

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

            const kakaoUser = userInfoResponse.data.kakao_account;

            // 3. SQLite에 사용자 이름 저장
            if (kakaoUser) {
                let userInfo = {
                    NAME: kakaoUser.profile.nickname,
                    EMAIL: kakaoUser.email,
                    SOCIALTYPE: 'KAKAO',
                };

                userInfo = await this.AuthService.user(userInfo);
                await this.login(req, res, userInfo);
            }
        } catch (error) {
            console.log(error);
            res.status(401).send('Kakao login failed!');
        }
    };

    naver = async (req, res, next) => {
        const state = crypto.randomBytes(16).toString('hex');
        const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&state=${state}`;
        res.redirect(api_url);
    };

    naverCallback = async (req, res, next) => {
        try {
            const { code, state } = req.query;

            const tokenResponse = await axios.get('https://nid.naver.com/oauth2.0/token', {
                params: {
                    grant_type: 'authorization_code',
                    client_id: process.env.NAVER_CLIENT_ID,
                    client_secret: process.env.NAVER_CLIENT_SECRET,
                    redirect_uri: process.env.NAVER_REDIRECT_URI,
                    code: code,
                    state: state,
                },
            });

            const { access_token, token_type } = tokenResponse.data;

            // 사용자 정보 요청
            const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                },
            });

            const data = userInfoResponse.data;
            if (data.message === 'success') {
                let userInfo = {
                    NAME: data.response.name,
                    EMAIL: data.response.email,
                    SOCIALTYPE: 'NAVER',
                };

                userInfo = await this.AuthService.user(userInfo);
                await this.login(req, res, userInfo);
            }
        } catch (error) {
            next(error);
        }
    };

    google = async (req, res, next) => {
        const state = crypto.randomBytes(16).toString('hex');
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&state=${state}`;

        res.redirect(googleAuthUrl);
    };

    googleCallback = async (req, res, next) => {
        const { code } = req.query;

        const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code', // 정확한 grant_type 설정
                code: code,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // 반드시 설정
                },
            },
        );

        const { access_token, id_token } = tokenResponse.data;

        // 사용자 정보 요청
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const data = userInfoResponse.data;
        if (data.name) {
            let userInfo = {
                NAME: data.name,
                EMAIL: data.email,
                SOCIALTYPE: 'GOOGLE',
            };

            userInfo = await this.AuthService.user(userInfo);
            await this.login(req, res, userInfo);
        }
    };

    login = async (req, res, userInfo) => {
        const accessToken = jwt.sign(userInfo);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            signed: true,
        });

        res.redirect('/');
    };

    logout = async (req, res) => {
        req.logout((err) => {
            res.clearCookie('accessToken');
            res.redirect('/login');
        });
    };
}

module.exports = AuthController;
