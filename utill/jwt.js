const jwt = require("jsonwebtoken");
const secret = process.env.COOKIE_SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      user: {
        NAME: user.NAME,
        SOCIALTYPE: user.socialType,
        EMAIL: user.EMAIL,
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
          NAME: user.NAME,
          SOCIALTYPE: user.socialType,
          EMAIL: user.EMAIL,
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
