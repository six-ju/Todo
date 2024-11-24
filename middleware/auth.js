const { verify } = require("../util/jwt");
const { SessionExpiredError } = require("../lib/customError");

auth = async (req, res, next) => {
  try {
    const { accessToken } = req.signedCookies;
    const accessTokenVerify = verify(accessToken);

    if (!accessToken || accessTokenVerify.type === false) {
      throw new SessionExpiredError();
    }

    const user = accessTokenVerify.user;
    res.locals.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
