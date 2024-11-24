const express = require("express");
const session = require("express-session");
const { sequelize } = require("./model");
const passport = require("passport");
const path = require("path");
const db = require("./database/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({ secret: "defalt", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");
const authRouter = require("./routes/auth.routes");
const ejsRouter = require("./routes/ejs.routes");

app.use("/auth", authRouter);
app.use("/api", routes);
app.use(ejsRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// DB 연결
// sequelize
//     .sync({ force: true }) // force: true이면 기존 데이터 삭제 후 재생성
//     .then(() => console.log('DB 연결 성공'))
//     .catch((err) => console.error('DB 연결 실패:', err));

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
