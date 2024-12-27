const { promisePool } = require('../config/database');

class mypageRepository {
    async getuserInfoById(id) {
        try {
            const [data] = await promisePool.query('select * from USER where id = ?', id);

            return data;
        } catch (err) {
            throw err;
        }
    }

    async saveInfoById(id, info) {
        try {
            const [data] = await promisePool.query(
                'update USER set name = ? ,instaUrl = ? , remark = ? where id = ?',
                [info.name, info.insta, info.remark, id],
            );

            return data;
        } catch (err) {
            throw err;
        }
    }

    async getMyPostById(id) {
        try {
            const [data] = await promisePool.query('select * from SPACE where userId = ? ', id);

            return data;
        } catch (err) {
            throw err;
        }
    }

    async deletePost(id, userId) {
        try {
            const [data] = await promisePool.query(
                'delete from SPACE where userId = ? AND id = ?',
                [userId, id],
            );

            return data;
        } catch (err) {
            throw err;
        }
    }

    async secessionUser(id) {
        try {
            const [data] = await promisePool.query(
                'delete from USER where id = ?',
                id,
            );

            return data;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = mypageRepository;
