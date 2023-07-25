const express = require("express");
const app = express.Router();
const passport = require("passport");
const passport_JWT = require("passport-jwt");

const UserController = require("../../controllers/user_controller");

app.post("/create", UserController.createUser);
app.post("/login", UserController.Login);
app.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  UserController.Dashboard
);

app.use('/habit',  require('./habit'))

module.exports = app;
