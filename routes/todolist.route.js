const express = require("express");
const router = express.Router();

const toDolistController = require("../controllers/todolist.controller");
const todolistController = new toDolistController();

router.post("/", todolistController.savetoDolist);
router.get("/:id", todolistController.getUserInfo);
router.delete("/:id", todolistController.deletedTodoList);

module.exports = router;
