const Database = require('better-sqlite3');

// SQLite 데이터베이스 연결
const db = new Database('./database.sqlite', {
    verbose: console.log, // SQL 실행 로그
});


module.exports = db;
