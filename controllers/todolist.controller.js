const todolistService = require('../services/todolist.service');

class todolistController {
    todolistService = new todolistService();

    getUserInfo = async (req, res, next) => {
        try {
            const { id } = req.params;

            const data = await this.todolistService.getUserInfo(id);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };

    savetoDolist = async (req, res, next) => {
        try {
            const { listData } = req.body;
            const userName = res.locals.user.NAME;

            const data = await this.todolistService.savetoDolist(listData, userName);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };

    deletedTodoList = async (req, res, next) => {
        try {
            const { id } = req.params;

            const data = await this.todolistService.deletedTodoList(id);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    };
}

module.exports = todolistController;
