const AuthRepository = require('../repositories/auth.repository');

class AuthService {
    AuthRepository = new AuthRepository();
    user = async (userInfo) => {
        try {
            const checkUser = await this.AuthRepository.checkUser(userInfo);

            if (checkUser != null && checkUser.social !== userInfo.SOCIALTYPE) {
                const error = new Error(`중복된 이메일이 있습니다. 관리자에게 문의해주세요.`);
                error.status = 401;
                error.name = 'EachEmail';
                throw error;
            } else if (checkUser != null) {
                return checkUser;
            } else {
                // 2. 기존에 가입하지 않은 유저면 DB 저장 및 로그인
                const signIn = await this.AuthRepository.signIn(userInfo);

                if (!signIn) {
                    throw new Error('회원가입 중 오류가 발생했습니다.');
                }

                userInfo = {
                    ...userInfo,
                    ID: signIn.insertId,
                };

                return userInfo;
            }
        } catch (error) {
            throw error;
        }
    };
}

module.exports = AuthService;
