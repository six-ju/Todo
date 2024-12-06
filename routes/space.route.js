const express = require("express");
const router = express.Router();

const SpaceController = require("../controllers/space.controller");
const spaceController = new SpaceController();

router.get("/", spaceController.getSpaceList);
router.post("/", spaceController.saveSpace);

module.exports = router;
