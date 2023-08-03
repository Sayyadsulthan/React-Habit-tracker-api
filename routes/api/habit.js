const express = require("express");
const app = express.Router();

const passport = require("passport");

const habitController = require("../../controllers/habit_Controller");

app.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  habitController.createHabit
);
app.patch(
  "/update/:_id",
  passport.authenticate("jwt", { session: false }),
  habitController.updateStatus
);
app.patch(
  "/updateName/:_id",
  passport.authenticate("jwt", { session: false }),
  habitController.updateHabitNAme
);
app.patch(
  "/updateFavourite/:_id",
  passport.authenticate("jwt", { session: false }),
  habitController.updateFavourite
);

app.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  habitController.deleteHabit
);

module.exports = app;
