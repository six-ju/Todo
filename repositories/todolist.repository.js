const db = require('../database/db');

// db.get : 한행 데이터를 검색 SELECT
// db.run : 데이터를 추가하거나 수정 할경우 INSERT, UPDATE, DELETE
class todolistRepository {
    // 기존 유저 체크
    getUserInfo = async (id) => {
        try {
            const query = `SELECT * FROM todolist WHERE userid = ?`;
            const row = db.prepare(query).all(id); // 즉시 실행하여 데이터 반환

            return row;
        } catch (error) {
            throw error;
        }
    };

    savetoDolist = async (listData, userName) => {
        try {
            const query = `INSERT INTO todolist ('userId','content','startDate','createdAt','updatedAt') 
                            VALUES (?,?,?,?,?)                
                            `;
            const row = db
                .prepare(query)
                .run(listData.userId, listData.content, listData.startDate, userName, userName); 

            return row;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = todolistRepository;
