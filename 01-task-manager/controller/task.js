const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");
const { CustomAPIError, createCustomError } = require("../error/custom-error");
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

const getTask = async (req, res, next) => {
  try {
    const { id: taskID } = await req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      const error = new BadRequestError(`Task with id ${taskID} is not found`);
      return next(error);
    }
    return res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    next(error);
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "violin" });
  }
};

// const getTask = async (req, res) => {
//   try {
//     const { id: taskID } = await req.params;
//     const task = await Task.findOne({ _id: taskID });
//     await console.log(task);
//     if (!task) {
//       await console.log("I tried 3");
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ msg: `Can not find task with id ${taskID}` });
//     }
//     return res.status(StatusCodes.OK).json({ task });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "violin" });
//   }
// };

const updateTask = async (req, res) => {
  try {
    const {
      params: { id: taskID },
      body: data,
    } = req;
    const task = await Task.findOneAndUpdate({ _id: taskID }, data, {
      new: true,
      runValidators: true,
      // supaya ga masukin nilai kosong persyaratan validators dijalankan
    });
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
    }
    res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
