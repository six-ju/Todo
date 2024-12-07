const { promisePool } = require("../config/database");

class spaceRepository {
  async getSpaceList() {
    try {
      const [data] = await promisePool.query(
        "select * from SPACE ORDER BY createdAt DESC"
      );

      return data;
    } catch (err) {
      throw err;
    }
  }

  async saveSpace(data) {
    try {
      const [result] = await promisePool.query(
        "insert into SPACE (userid, title, content, createdBy, updatedBy) values (?, ?, ?, ?,?)",
        [data.id, data.title, data.content, data.name, data.name]
      );

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getPostInfo(id) {
    try {
      const [result] = await promisePool.query(
        "select * from SPACE a LEFT  join COMMENT b on a.id = b.spaceid left JOIN USER c on b.usrid = c.id where a.id = ?",
        id
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  async saveComment(data) {
    try {
      const [result] = await promisePool.query(
        "insert into COMMENT (spaceid,usrid,comment,createdBy) values (?,?,?,?)",
        [data.postId, data.id, data.comment, data.name]
      );

      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = spaceRepository;
