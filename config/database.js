const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("db connection successfull..."))
  .catch((err) => console.log("Error in DB : ", err));

const DB = mongoose.connection;

DB.on("error", (err) => console.log("Error in connection to DB :", err));
DB.once("open", () => console.log("DB is ready to use..."));

module.exports = DB;
