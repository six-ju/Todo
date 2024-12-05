const { promisePool } = require('../config/database');

class todolistRepository {
    async gettoDoList(id, choseDate) {
        try {
            const [data] = await promisePool.query('select * from TODOLIST where userId = ? AND startDate = ?', [id, choseDate]);

            return data;
        } catch (err) {
            console.error('Query error:', err);
        }
    }

    async savetoDolist(listData, userName) {
        try {
            const [data] = await promisePool.query(
                'INSERT INTO TODOLIST (userId,content,startDate,createdBy,updatedBy) VALUES (?,?,?,?,?) ',
                [listData.userId, listData.content, listData.startDate, userName, userName],
            );

            return data;
        } catch (err) {
            console.error('Query error:', err);
        }
    }

    async deletedTodoList(id) {
        try {
            const [data] = await promisePool.query('DELETE FROM TODOLIST WHERE ID = ? ', id);

            return data;
        } catch (err) {
            console.error('Query error:', err);
        }
    }

    async completetoDo(id) {
        try {
            const [data] = await promisePool.query('UPDATE TODOLIST SET completeDate = CASE WHEN completeDate IS NULL THEN CURDATE() ELSE NULL END WHERE ID = ? ', id);

            return data;
        } catch (err) {
            console.error('Query error:', err);
        }
    }
}

module.exports = todolistRepository;
