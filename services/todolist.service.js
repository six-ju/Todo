const todolistRepository = require("../repositories/todolist.repository");

class todolistService {
  todolistRepository = new todolistRepository();

  getUserInfo = async (id) => {
    try {
      const data = await this.todolistRepository.getUserInfo(id);
      
      return data
    } catch (error) {
      throw error;
    }
  };

  savetoDolist = async (listData, userName) => {
    try {
      const data = await this.todolistRepository.savetoDolist(listData, userName);

      return data.insertId
    } catch (error) {
      throw error;
    }
  };

  deletedTodoList = async (id) => {
    try {
      const data = await this.todolistRepository.deletedTodoList(id);

      console.log(data)
      return data
    } catch (error) {
      throw error;
    }
  };
}

module.exports = todolistService;
