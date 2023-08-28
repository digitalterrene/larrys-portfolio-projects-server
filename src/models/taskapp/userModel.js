const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    description: String,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    banner: String,
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
