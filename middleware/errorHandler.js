module.exports = (err, req, res, next) => {
    return res.render('alert.ejs', { message: err.message, href: '/login' });
};
