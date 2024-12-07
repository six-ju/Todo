const checkAccessToken = (req, res, next) => {
    const accessToken = req.signedCookies.accessToken;
    if (!accessToken) {
        return res.redirect('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
    }
    next(); // 토큰이 있으면 다음 미들웨어로 진행
};

module.exports = { checkAccessToken };
