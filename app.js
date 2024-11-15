const express = require('express');
const { sequelize } = require('./model');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes');
const ejsRouter = require('./routes/ejs.routes');

app.use(express.json());
app.use('/api', routes);
app.use(ejsRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// DB 연결
// sequelize
//     .sync({ force: true }) // force: true이면 기존 데이터 삭제 후 재생성
//     .then(() => console.log('DB 연결 성공'))
//     .catch((err) => console.error('DB 연결 실패:', err));

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
