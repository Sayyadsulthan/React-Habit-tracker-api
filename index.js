const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8001;
const app = express();
const passport = require("passport");
const passport_JWT = require("./config/passport_JWT_Strategy");
const db = require("./config/database");

app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    return console.error("Error in server  listening :", err);
  }

  console.log("server running on port :", port);
});
