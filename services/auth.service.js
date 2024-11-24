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
        await this.AuthRepository.signIn(userInfo);
      }
      // 2. 기존에 가입하지 않은 유저면 DB 저장 및 로그인
      // 3. 이전에 가입한여 같은 소셜 같은 이름으로 로그인한기록이 있으면 로그인
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthService;
