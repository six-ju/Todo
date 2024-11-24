const db = require("../database/db");

// db.get : 한행 데이터를 검색 SELECT
// db.run : 데이터를 추가하거나 수정 할경우 INSERT, UPDATE, DELETE
class AuthRepository {
  // 기존 유저 체크
  checkUser = async (userInfo) => {
    try {
      return await new Promise((resolve, reject) => {
        db.get(
          `SELECT * FROM LOGIN WHERE EMAIL = ? AND SOCIALTYPE = ?`,
          [userInfo.EMAIL, userInfo.socialType],
          (err, row) => {
            resolve(row ? true : false);
          }
        );
      });
    } catch (error) {
      throw error;
    }
  };

  signIn = async (userInfo) => {
    try {
      return await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO LOGIN (NAME, SOCIALTYPE, EMAIL) 
                VALUES (? , ? , ?)`,
          [userInfo.NAME, userInfo.socialType, userInfo.EMAIL],
          function () {
            resolve(this.lastID ? true : false);
          }
        );
      });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthRepository;
