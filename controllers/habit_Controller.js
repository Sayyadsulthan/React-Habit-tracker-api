const Habit = require("../model/habits");
const User = require("../model/user");

let date = new Date();
let DD = date.getDate();
let MM = date.getMonth() + 1;
let YY = date.getFullYear();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

// function getWeekdayOfMonth(dateString) {
//   const weekdays = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   // Create a new Date object using the given dateString
//   const date = new Date(dateString);

//   // Get the day of the week as a numeric value (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
//   const dayOfWeek = date.getDay();

//   // Return the weekday name corresponding to the numeric value
//   return weekdays[dayOfWeek];
// }

// const date = "2023-07-25";
// const weekday = getWeekdayOfMonth(date);
// console.log(weekday); // Output: "Tuesday"

module.exports.createHabit = async function (req, res) {
  try {
    console.log("User ", req.user);
    const user = await User.findOne({ email: req.user.email });

    if (req.body.name) {
      const habit = await Habit.create({
        name: req.body.name,
        user: req.user._id,
      });

      if (MM <= 9) {
        MM = "0" + MM;
      }
      for (i = 1; i <= lastDay.getDate(); i++) {
        if (i <= 9) {
          habit.status.push({
            completed: "undefined",
            date: YY + "-" + MM + "-" + "0" + i,
            // date: `${YY}-${MM}-0${i}`,
          });
        } else {
          habit.status.push({
            completed: "undefined",
            date: `${YY}-${MM}-${i}`,
          });
        }
      }
      //   habit.status.push({ date: `${DD}/${MM}/${YY}`, completed: "true" });

      habit.save();
      user.habits.push(habit);
      user.save();
      return res
        .status(200)
        .json({ message: "Habit created successfully...", success: true });
    } else {
      return res
        .status(201)
        .json({ message: "Please fill the name of habit", success: true });
    }
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

module.exports.updateStatus = async function (req, res) {
  try {
    if (!req.body.status || !req.body.date) {
      return res
        .status(200)
        .json({ message: "please try again...", success: false });
    }
    const date = req.body.date;
    await date.toString();
    console.log("date", date);
    const habit = await Habit.findById(req.params._id);
    // console.log("habit", habit)
    // find the status array from habit and store in store
    const status = habit.status;
    // console.log("status", status);
    // find the index of the status to update
    const getIndexOfDate = (index, i) => {
      // console.log(index.date, i);
      if (index.date == date) {
        // console.log("index found");
        return i;
      }
    };
    // const index = status.findIndex(getIndexOfDate);
    let index = 0;
    status.forEach((element, i) => {
      if (element.date == date) {
        console.log("index found", i);
        index = i;
      }
    });

    // console.log("getIndex :", getIndexOfDate);
    console.log("index", index);
    console.log(status[index]);
    console.log(status);

    switch (status[index].completed) {
      case "true":
        // update the status of that index
        status[index].completed = "false";

        await Habit.findByIdAndUpdate(habit._id, { $set: { status: status } });
        break;
      case "false":
        // update the status of that index
        status[index].completed = "undefined";

        await Habit.findByIdAndUpdate(habit._id, { $set: { status: status } });
        break;
      default:
        // update the status of that index
        // console.log(status)
        status[index].completed = "true";

        await Habit.findByIdAndUpdate(habit._id, { $set: { status: status } });
        break;
    }

    return res.status(200).json({
      message: "Status updated successfully...",
      success: true,
    });
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

module.exports.deleteHabit = async function (req, res) {
  try {
    // await Habit.findByIdAndDelete(req.params._id);
    const habit = Habit.findOne({ _id: req.params._id });
    const user = await User.findById(req.user._id);
    if (habit) {
      const updatedHabits = user.habits.filter(
        (habit) => req.params._id != habit._id
      );
      await habit.deleteOne();
      user.habits = updatedHabits;
      user.save();
    }
    return res.status(200).json({
      message: "Habit deleted successfully...",
      success: true,
    });
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};
