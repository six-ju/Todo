const { promisePool } = require('../config/database');

// db.get : 한행 데이터를 검색 SELECT
// db.run : 데이터를 추가하거나 수정 할경우 INSERT, UPDATE, DELETE
class AuthRepository {
    // 기존에 존재했던 유저인지 체크
    async checkUser(userInfo) {
        try {
            const [data] = await promisePool.query(
                'SELECT * FROM USER WHERE EMAIL = ?',
                userInfo.EMAIL,
            );
            return data[0];
        } catch (error) {
            throw error;
        }
    }

    async signIn(userInfo) {
        try {
            const [data] = await promisePool.query(
                'insert into USER (name, social, email, instaUrl, createdBy) VALUES (?,?,?,NULL,"SYSTEM" )',
                [userInfo.NAME, userInfo.SOCIALTYPE, userInfo.EMAIL],
            );

            return data
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthRepository;
