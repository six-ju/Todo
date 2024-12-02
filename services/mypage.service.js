const MypageRepository = require("../repositories/mypage.repository");

class mypageService {
  mypageRepository = new MypageRepository();

  getuserInfoById = async (id) => {
    try {
      const data = await this.mypageRepository.getuserInfoById(id);
      
      return data
    } catch (error) {
      throw error;
    }
  };

  saveInfoById = async (id,info) => {
    try {
      const data = await this.mypageRepository.saveInfoById(id,info);
      
      return data
    } catch (error) {
      throw error;
    }
  };
}

module.exports = mypageService;
