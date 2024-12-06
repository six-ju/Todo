const express = require("express");
const userRoutes = require("./userRoute");
const mypage = require("./mypage.route");
const todolist = require("./todolist.route");
const space = require("./space.route");

const router = express.Router();

router.use("/users", userRoutes); // 사용자 라우터
router.use("/todolist", todolist); // 사용자 라우터
router.use("/mypage", mypage); // 마이페이지 라우터
router.use("/space", space); // 게시판 라우터

module.exports = router;
