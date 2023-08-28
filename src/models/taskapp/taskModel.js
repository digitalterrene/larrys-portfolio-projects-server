const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: String,
    text: { type: String, required: true },
    user_id: { type: String, required: true },
    company_id: { type: String, required: true },
    image: String,
  },
  { timestamps: true }
);
taskSchema.plugin(uniqueValidator);
const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
