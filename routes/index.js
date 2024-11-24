const express = require("express");
const userRoutes = require("./userRoute");
const mypage = require("./mypage.route");

const router = express.Router();

router.use("/users", userRoutes); // 사용자 라우터
router.use("/mypage", mypage); // 사용자 라우터

module.exports = router;
