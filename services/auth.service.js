const AuthRepository = require("../repositories/auth.repository");

class AuthService {
  AuthRepository = new AuthRepository();
  user = async (userInfo) => {
    try {
      // 1. 기존 존재한 유저인지 체크
      const checkUser = await this.AuthRepository.checkUser(userInfo);

      // 1-1 기존 유저이면 세션과 쿠키 굽는다.
      // 1-2 유저페이지로 리다이렉트 시킨다.
      if (checkUser) {
        return checkUser;
      } else {
        // 2. 기존에 가입하지 않은 유저면 DB 저장 및 로그인
        const signIn = await this.AuthRepository.signIn(userInfo);

        if (!signIn) {
          throw new Error("회원가입 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthService;
