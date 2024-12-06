const { promisePool } = require('../config/database');

class spaceRepository {
    async getSpaceList() {
        try {
            const [data] = await promisePool.query('select * from SPACE ');

            return data;
        } catch (err) {
            throw err;
        }
    }

    async saveSpace(data) {
        try {
            const [result] = await promisePool.query(
                'insert into SPACE (userid, title, content, createdBy, updatedBy) values (?, ?, ?, ?,?)',
                [data.id, data.title, data.content, data.name, data.name],
            );

            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = spaceRepository;
