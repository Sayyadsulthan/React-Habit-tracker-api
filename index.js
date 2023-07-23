const express = require("express");
const port = 8000;
const app = express();
const passport = require("passport");
const passport_JWT = require("./config/passport_JWT_Strategy");
const db = require("./config/database");

app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    return console.error("Error in server  listening :", err);
  }

  console.log("server running on port :", port);
});
