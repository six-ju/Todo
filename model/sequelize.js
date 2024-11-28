const { Sequelize } = require('sequelize');

// SQLite 데이터베이스 연결
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // SQLite 파일 경로
    logging: false, // SQL 쿼리 로깅 비활성화 (필요 시 true로 변경)
});

module.exports = sequelize;