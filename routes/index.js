const express = require('express');
const userRoutes = require('./userRoute');

const router = express.Router();

router.use('/users', userRoutes); // 사용자 라우터

module.exports = router;
