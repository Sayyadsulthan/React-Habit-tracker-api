const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
  },
  completedDays: [{ type: Number }],
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
