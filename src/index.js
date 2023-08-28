// Initializing the Server
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
// Managing Environmental Variables
require("dotenv").config();

// Importing TaskApp Routes
const userRoutes = require("./routes/taskapp/userRoutes");
const taskRoutes = require("./routes/taskapp/taskRoutes");

// Handling Middleware
app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));

// TaskApp Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

//configuring mongoose
mongoose.set("strictQuery", true);
//connecting the database and starting the app
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("app listening at PORT: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
