const express = require("express");
const app = express.Router();

const passport = require('passport')

const habitController = require("../../controllers/habit_Controller")

app.post("/create",passport.authenticate('jwt', {session:false}), habitController.createHabit);


module.exports = app;