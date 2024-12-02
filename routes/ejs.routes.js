const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

/* View Mapping */
router.get('/login', (req, res) => {
    const accessToken = req.signedCookies.accessToken;
    if (accessToken) {
        return res.redirect('/');
    }
    res.render('index.ejs', { components: 'login' });
});

router.get('/', auth, (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'main-service/index' });
    } catch (error) {
        next(error);
    }
});

router.get('/todo', auth, (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'main-service/index' });
    } catch (error) {   
        next(error);
    }
});

router.get('/mypage', auth, (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'mypage-service/index' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
