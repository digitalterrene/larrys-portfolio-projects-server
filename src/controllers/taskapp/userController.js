const userModel = require("../../models/taskapp/userModel");

require("dotenv").config();

//create user
const signupUser = async (req, res) => {
  const { username, password } = req.body;
  //checking if email and password is supplied
  if (!username) {
    res.status(400).json({ error: "User username is required" });
  } else if (!password) {
    res.status(400).json({ error: "User password is required" });
  } else {
    try {
      const user = await userModel.create(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

//get user
const signinUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username: username });
    if (user) {
      if (user.password === password) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: "Incorrect Password" });
      }
    } else {
      //requested user not found
      res.status(404).json({ error: "Requested user not found" });
    }
  } catch (error) {
    //server crashed || something went wrong with the server
    res.status(500).json({ error: error.message });
  }
};
//update user
const updateUser = async (req, res) => {
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
    const user = await userModel.findByIdAndUpdate(id, filteredBody, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  signinUser,
  updateUser,
  deleteUser,
};
