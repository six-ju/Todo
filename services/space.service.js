const SpaceRepository = require("../repositories/space.repository");

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

  getPostInfo = async (id) => {
    try {
      let result = await this.spaceRepository.getPostInfo(id);
      result = result.reduce((acc, item) => {
        if (acc.length === 0) {
          const content = { title: item.title, content: item.content };
          acc.push(content);
        }

        let comment = {
          userId: item.usrid,
          name: item.name,
          comment: item.comment,
          createdAt: item.createdAt,
        };

        acc.push(comment);

        return acc;
      }, []);

      return result;
    } catch (error) {
      throw error;
    }
  };

  saveComment = async (data) => {
    try {
      const result = await this.spaceRepository.saveComment(data);

      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = spaceService;
