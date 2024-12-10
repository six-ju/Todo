const express = require("express");
const router = express.Router();

const SpaceController = require("../controllers/space.controller");
const spaceController = new SpaceController();

router.get("/", spaceController.getSpaceList);
router.get("/:id", spaceController.getPostInfo);
router.post("/", spaceController.saveSpace);
router.post("/comment", spaceController.saveComment);
router.patch("/comment", spaceController.deleteComment);

module.exports = router;
