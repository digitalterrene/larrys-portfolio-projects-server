// Initializing the Server
const express = require("express");
const {
  signupUser,
  signinUser,
  updateUser,
  deleteUser,
} = require("../../controllers/taskapp/userController");
require("dotenv").config();

// Handling Routing
const router = express.Router();

//Main Routes
router.post("/signup", signupUser);
router.get("/signin", signinUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
