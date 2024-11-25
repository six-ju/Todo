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

router.get('/', auth,(req, res, next) => {
    const accessToken = req.signedCookies.accessToken;
    if (!accessToken) {
        return res.redirect('/login');
    }
    res.render('index.ejs', { components: 'user' });
});

module.exports = router;
