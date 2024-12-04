module.exports = (err, req, res, next) => {
    console.log(213)
    if(err.name == 'CookieNotExistError') {
        return res.redirect('/login');
    }
    if(err.name == 'SessionExpiredError') {
        return res.render('alert.ejs', { message: err.message, href: '/login' });
    }
    if(err.name == 'EachEmail') {
        return res.render('alert.ejs', { message: err.message, href: '/login' });
    }
};
