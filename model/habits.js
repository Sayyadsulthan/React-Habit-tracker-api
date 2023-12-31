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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isFavourite: Boolean,
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
