// Initializing the Server
const express = require("express");
const {
  signupUser,
  signinUser,
  updateUser,
  fetchUsers,
  deleteUser,
} = require("../../controllers/taskapp/userController");
require("dotenv").config();

// Handling Routing
const router = express.Router();

//Main Routes
router.post("/signup", signupUser);
router.get("/", fetchUsers);
router.post("/signin", signinUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
