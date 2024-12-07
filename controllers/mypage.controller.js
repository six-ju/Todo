const MypageService = require('../services/mypage.service');

class MypageController {
    MypageService = new MypageService();

    getuserInfoById = async (req, res, next) => {
      try {
        const { id } = req.params;

        const data = await this.MypageService.getuserInfoById(id)

        return res.status(200).json( data );
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    };

    saveInfoById = async (req, res, next) => {
      try {
        const { id } = req.params;
        const { info } = req.body

        const data = await this.MypageService.saveInfoById(id,info)

        return res.status(200).json( data );
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    };
}

module.exports = MypageController;
