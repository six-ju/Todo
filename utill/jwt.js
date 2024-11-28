const jwt = require("jsonwebtoken");
const secret = process.env.COOKIE_SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      user: {
        ID : user[0].id,
        NAME: user[0].name,
        SOCIALTYPE: user[0].social,
        EMAIL: user[0].email,
      },
    };
    return jwt.sign(payload, secret, {
      expiresIn: "1d",
      algorithm: "HS256",
    });
  },
  verify: (token) => {
    try {
      const decoded = jwt.verify(token, secret);
      return {
        type: true,
        user: {
          ID : decoded.user.ID,
          NAME: decoded.user.NAME,
          SOCIALTYPE: decoded.user.SOCIALTYPE,
          EMAIL: decoded.user.EMAIL,
        },
      };
    } catch (err) {
      return {
        type: false,
        message: err.message,
      };
    }
  },
};
