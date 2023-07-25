const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  status: [
    {
      completed: String,
      date: String,
    },
  ],
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
