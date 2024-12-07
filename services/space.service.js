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
      result = result.reduce(
        (acc, item) => {
          if (!acc.content) {
            acc.content = {
              title: item.title,
              content: item.content,
            };
          }

          if (item.comment) {
            acc.comment.push({
              userId: item.usrid,
              name: item.name,
              comment: item.comment,
              createdAt: item.createdAt,
            });
          }

          return acc;
        },
        { content: null, comment: [] }
      );

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
