const AuthRepository = require("../repositories/auth.repository");

class AuthService {
  AuthRepository = new AuthRepository();
  user = async (userInfo) => {
    try {
      // 1. 기존 존재한 유저인지 체크
      const checkUser = await this.AuthRepository.checkUser(userInfo);

      if (checkUser.length > 0) {
        return checkUser;
      } else {
        // 2. 기존에 가입하지 않은 유저면 DB 저장 및 로그인
        const signIn = await this.AuthRepository.signIn(userInfo);

        if (!signIn) {
          throw new Error("회원가입 중 오류가 발생했습니다.");
        }

        userInfo = {
          ...userInfo,
          ID : signIn.lastInsertRowid
        }

        return userInfo
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthService;
