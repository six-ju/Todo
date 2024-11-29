const {connection} = require('./database'); // 연결된 MySQL 모듈 가져오기

connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('The solution is:', results[0].solution);
    }
});
