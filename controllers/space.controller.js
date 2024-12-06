const SpaceService = require('../services/space.service');

class SpaceController {
    SpaceService = new SpaceService();

    getSpaceList = async (req, res, next) => {
      try {
        const data = await this.SpaceService.getSpaceList()

        return res.status(200).json( data );
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    };

    saveSpace = async (req, res, next) => {
      try {
        const data = req.body;
        const result = await this.SpaceService.saveSpace(data)

        return res.status(200).json( result );
      } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error });
      }
    };
}

module.exports = SpaceController;
