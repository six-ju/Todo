const MypageRepository = require('../repositories/mypage.repository');

class mypageService {
    mypageRepository = new MypageRepository();

    getuserInfoById = async (id) => {
        try {
            const data = await this.mypageRepository.getuserInfoById(id);

            return data;
        } catch (error) {
            throw error;
        }
    };

    saveInfoById = async (id, info) => {
        try {
            const data = await this.mypageRepository.saveInfoById(id, info);

            return data;
        } catch (error) {
            throw error;
        }
    };

    getMyPostById = async (id) => {
        try {
            const data = await this.mypageRepository.getMyPostById(id);

            return data;
        } catch (error) {
            throw error;
        }
    };

    deletePost = async (id,userId) => {
        try {
            const data = await this.mypageRepository.deletePost(id, userId);

            return data;
        } catch (error) {
            throw error;
        }
    };

    secessionUser = async (id) => {
        try {
            const data = await this.mypageRepository.secessionUser(id);

            return data;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = mypageService;
