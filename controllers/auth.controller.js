class AuthController {
    kakao = (req, res, next) => {
        console.log(123);

        const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
        res.redirect(kakaoAuthURL);
    };

    kakaoCallback = (req, res, next) => {
        const code = req.query.code; // 카카오 서버에서 전달된 인증 코드

        try {
            // 1. Access Token 요청
            const tokenResponse = axios.post(
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
            const userInfoResponse = axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const kakaoUser = userInfoResponse.data.kakao_account.profile.nickname;

            console.log('Kakao User Info:', kakaoUser);
            if (kakaoUser) {
                res.redirect('/');
            }
            //res.send(`<h1>Welcome, ${kakaoUser.kakao_account.profile.nickname}!</h1>`);
        } catch (error) {
            console.error('Error during Kakao login:', error);
            res.status(500).send('Kakao login failed!');
        }
    };
}

module.exports = AuthController;
