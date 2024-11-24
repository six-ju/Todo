const { verify } = require("../utill/jwt");

auth = async (req, res, next) => {
  try {
    const { accessToken } = req.signedCookies;
    const accessTokenVerify = verify(accessToken);

    const user = accessTokenVerify.user;
    res.locals.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
