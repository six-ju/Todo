module.exports = (err, req, res, next) => {
    if(err.name == 'CookieNotExistError') {
        return res.redirect('/login');
    }
    if(err.name == 'SessionExpiredError') {
        return res.render('alert.ejs', { message: err.message, href: '/login' });
    }
    
};
