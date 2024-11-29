const db = require("../database/db");
const { promisePool } = require("../config/database");

class todolistRepository {
  async getUserInfo(id) {
    try {
      const [data] = await promisePool.query(
        "select * from TODOLIST where userId = ? ",
        id
      );

      return data;
    } catch (err) {
      console.error("Query error:", err);
    }
  }

  async savetoDolist(listData, userName) {
    try {
      const [data] = await promisePool.query(
        "INSERT INTO TODOLIST (userId,content,startDate,createdBy,updatedBy) VALUES (?,?,?,?,?) ",
        [
          listData.userId,
          listData.content,
          listData.startDate,
          userName,
          userName,
        ]
      );

      return data;
    } catch (err) {
      console.error("Query error:", err);
    }
  }

  async deletedTodoList(id) {
    try {
      const [data] = await promisePool.query(
        "DELETE FROM TODOLIST WHERE ID = ? ",
        id
      );

      return data;
    } catch (err) {
      console.error("Query error:", err);
    }
  }

  // CASE 문으로 통한 조건문 작성
  async completetoDo(id) {
    try {
      const [data] = await promisePool.query(
        "UPDATE TODOLIST SET COMPLETEDATE = CASE WHEN COMPLETEDATE IS NULL THEN CURDATE() ELSE NULL END WHERE ID = ? ",
        id
      );

      return data;
    } catch (err) {
      console.error("Query error:", err);
    }
  }
}

module.exports = todolistRepository;
