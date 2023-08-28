// Initializing the Server
const express = require("express");
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("../../controllers/taskapp/taskController");

require("dotenv").config();

// Handling Routing
const router = express.Router();

//Main Routes
router.post("/create-task", createTask);
router.get("/:id", getTask);
router.get("/search-tasks/:object_key", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
