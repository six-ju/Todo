const express = require('express');
const router = express.Router();
//const { auth, ac } = require('../middleware/auth');
const app = express();

/* View Mapping */
router.get('/login', (req, res) => {
    res.render('index.ejs', { components: 'login' });
});

module.exports = router;
