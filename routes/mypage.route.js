const express = require("express");
const router = express.Router();

const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

router.get("/:id", mypageController.getuserInfoById);
router.patch("/:id", mypageController.saveInfoById);

module.exports = router;
