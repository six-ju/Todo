const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { User } = require("./models"); // Sequelize 모델 가져오기

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_REST_API, // Kakao REST API 키
        callbackURL: process.env.KAKAO_REDIRECT_URI, // 리다이렉트 URI
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Kakao profile:", profile);

          // 사용자 정보 처리 (DB 저장 로직 추가 가능)
          let user = await User.findOne({ where: { kakaoId: profile.id } });

          if (!user) {
            user = await User.create({
              kakaoId: profile.id,
              nickname: profile.username,
              // 추가 필드 저장 가능
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
