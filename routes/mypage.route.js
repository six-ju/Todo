const express = require('express');
const router = express.Router();

const MypageController = require('../controllers/mypage.controller');
const mypageController = new MypageController();

router.get('/:id', mypageController.getuserInfoById);
router.get('/post/:id', mypageController.getMyPostById);
router.patch('/:id', mypageController.saveInfoById);
router.delete('/:id', mypageController.deletePost);

module.exports = router;
