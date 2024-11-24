const express = require("express");
const router = express.Router();

const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

router.get("/", mypageController.getUserInfo);

module.exports = router;
