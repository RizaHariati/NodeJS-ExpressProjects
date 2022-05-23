const { StatusCodes } = require("http-status-codes");
const Task = require("../model/Task");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(StatusCodes.OK).json({ tasks });
  } catch (error) {
    res.send(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `Can not find task with id ${taskID}` });
    }
    res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "violin" });
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      params: { id: taskID },
      body: data,
    } = req;
    const task = await Task.findOneAndUpdate({ _id: taskID }, data);
    if (!task) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `Can not find task with id ${taskID}` });
    }
    res.status(StatusCodes.CREATED).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      res.status(StatusCodes.NOT_FOUND).json(error);
      res.end();
    }
    res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
