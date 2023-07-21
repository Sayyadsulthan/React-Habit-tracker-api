const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/react_habit_tracker_api")
  .then(() => console.log("db connection successfull..."))
  .catch((err) => console.log("Error in DB : ", err));

const DB = mongoose.connection;

DB.on("error", (err) => console.log("Error in connection to DB :", err));
DB.once("open", () => console.log("DB is ready to use..."));

module.exports = DB;
