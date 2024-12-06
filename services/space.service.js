const SpaceRepository = require('../repositories/space.repository');

class spaceService {
    spaceRepository = new SpaceRepository();

    getSpaceList = async () => {
        try {
            const data = await this.spaceRepository.getSpaceList();

            return data;
        } catch (error) {
            throw error;
        }
    };

    saveSpace = async (data) => {
        try {
            const result = await this.spaceRepository.saveSpace(data);

            return result;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = spaceService;
