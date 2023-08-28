const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: String,
    description: String,
    employees: [],
    tasks: [],
    image: String,
    banner: String,
  },
  { timestamps: true }
);
companySchema.plugin(uniqueValidator);
const companyModel = mongoose.model(app + "-company", companySchema);

module.exports = companyModel;
