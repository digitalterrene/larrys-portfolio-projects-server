const taskModel = require("../../models/taskapp/taskModel");

require("dotenv").config();

//create task
const createTask = async (req, res) => {
  const {  text, user_id } = req.body;
  //checking if email and password is supplied
  if (!user_id) {
    res
      .status(400)
      .json({ error: "Please provide the user this task belongs to" });
  } else if (!text) {
    res.status(400).json({ error: "Please write the actual task" });
  } else {
    try {
      const task = await taskModel.create(req.body);
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

//get task
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      //requested task not found
      res.status(404).json({ error: "Requested task not found" });
    }
  } catch (error) {
    //server crashed || something went wrong with the server
    res.status(500).json({ error: error.message });
  }
};
//search tasks
const getTasks = async (req, res) => {
  const { object_key } = req.params;
  const { skip, key_value, limit } = req.body;
  if (!key_value ) {
try{
    const tasks = await taskModel.find({})
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
    if(tasks){
    res.status(200).json(tasks);
    }else{
              //requested task not found
        res
          .status(404)
          .json({ error: `No tasks belonging to the provided${object_key}` });
      }
} catch (error) {
    //server crashed || something went wrong with the server
    res.status(500).json({ error: error.message });
}
    }
  } else {
    try {
      const tasks = await taskModel
        .find({
          $and: [
            {
              [object_key]: { $regex: req.body.key_value, $options: "i" },
            },
          ],
        })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit)
        .exec();
      if (tasks) {
        res.status(200).json(tasks);
      } else {
        //requested task not found
        res
          .status(404)
          .json({ error: `No tasks belonging to the provided${object_key}` });
      }
    } catch (error) {
      //server crashed || something went wrong with the server
      res.status(500).json({ error: error.message });
    }
  }
};
//update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const filteredBody = Object.keys(req.body).reduce(
      (key_requested_for_update, key) => {
        if (req.body[key].length > 0) {
          key_requested_for_update[key] = req.body[key];
        }
        return key_requested_for_update;
      },
      {}
    );
    const task = await taskModel.findByIdAndUpdate(id, filteredBody, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await taskModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "task successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  getTasks,
  deleteTask,
};
