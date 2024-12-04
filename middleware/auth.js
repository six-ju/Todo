const { verify } = require('../utill/jwt');

auth = async (req, res, next) => {
    try {
        const { accessToken } = req.signedCookies;
        if (!accessToken) {
            res.clearCookie('accessToken');
            const error = new Error();
            error.status = 401;
            error.name = 'CookieNotExistError';
            throw error;
        }

        const accessTokenVerify = verify(accessToken);
        if (!accessToken || accessTokenVerify.type === false) {
            res.clearCookie('accessToken');
            const error = new Error('세션이 만료되어 로그인 페이지로 이동합니다.');
            error.status = 401;
            error.name = 'SessionExpiredError';
            throw error;
        }

        const user = accessTokenVerify.user;
        res.locals.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { auth };
