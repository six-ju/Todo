const db = require('../database/db');

// db.get : 한행 데이터를 검색 SELECT
// db.run : 데이터를 추가하거나 수정 할경우 INSERT, UPDATE, DELETE
class AuthRepository {
    // 기존 유저 체크
    checkUser = async (userInfo) => {
        try {
            const query = `SELECT * FROM USER WHERE EMAIL = ? AND SOCIAL = ?`;
            const row = db.prepare(query).all(userInfo.EMAIL, userInfo.SOCIALTYPE); // 즉시 실행하여 데이터 반환

            return row;
        } catch (error) {
            throw error;
        }
    };

    signIn = async (userInfo) => {
        try {
            const query = `INSERT INTO USER (name, social, email, instaUrl, createdBy) VALUES (?,?,?,NULL,'SYSTEM' )`
            const row = db.prepare(query).run(userInfo.NAME, userInfo.SOCIALTYPE,userInfo.EMAIL); 

            return row
        } catch (error) {
            throw error;
        }
    };
}

module.exports = AuthRepository;
