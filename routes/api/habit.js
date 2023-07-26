const express = require("express");
const app = express.Router();

const passport = require("passport");

const habitController = require("../../controllers/habit_Controller");

app.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  habitController.createHabit
);
app.put(
  "/update:_id",
  passport.authenticate("jwt", { session: false }),
  habitController.updateStatus
);
app.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  habitController.deleteHabit
);

module.exports = app;
