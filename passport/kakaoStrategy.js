const KakaoStrategy = require("passport-kakao").Strategy;
const passport = require("passport");

passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KAKAO_REST_API,
            callbackURL: process.env.KAKAO_REDIRECT_URI,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // 사용자 정보를 처리하는 로직
                const user = {
                    id: profile.id,
                    username: profile.username || profile.displayName,
                    email: profile._json && profile._json.kakao_account.email,
                };
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// 세션을 위한 직렬화 & 역직렬화 설정
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;