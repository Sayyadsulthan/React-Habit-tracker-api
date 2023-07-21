const express = require("express");
const app = express();
const passport = require("passport");

const UserController = require("../../controllers/user_controller");

app.post("/create", UserController.createUser);
app.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  UserController.Login
);

module.exports = app;
