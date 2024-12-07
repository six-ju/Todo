const jwt = require("jsonwebtoken");
const secret = process.env.COOKIE_SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      user: {
        ID : user.id,
        NAME: user.name,
        SOCIALTYPE: user.social,
        EMAIL: user.email,
      },
    };
    return jwt.sign(payload, secret, {
      expiresIn: "1h",
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
