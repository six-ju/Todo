const SpaceService = require("../services/space.service");

class SpaceController {
  SpaceService = new SpaceService();

  getSpaceList = async (req, res, next) => {
    try {
      const data = await this.SpaceService.getSpaceList();

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  saveSpace = async (req, res, next) => {
    try {
      const data = req.body;
      const result = await this.SpaceService.saveSpace(data);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  };

  getPostInfo = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await this.SpaceService.getPostInfo(id);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  };

  saveComment = async (req, res, next) => {
    try {
      const total = req.body;

      const result = await this.SpaceService.saveComment(total);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const {commentId} = req.body;

      const result = await this.SpaceService.deleteComment(commentId);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  };
}

module.exports = SpaceController;
