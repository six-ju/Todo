//const MypageService = require("../services/mypage.service");

class MypageController {
  //MypageService = new MypageService();

  getUserInfo = (req, res, next) => {
    const info = res.locals.user;
    return res.status(200).json({ info });
  };
}

module.exports = MypageController;
