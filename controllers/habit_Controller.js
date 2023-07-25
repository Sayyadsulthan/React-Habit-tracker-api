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
      });

      if (MM <= 9) {
        MM = "0" + MM;
      }
      for (i = 1; i <= lastDay.getDate(); i++) {
        if (i <= 9) {
          habit.status.push({
            completed: "undefined",
            date: `${YY}-${MM}-0${i}`,
          });
        } else {
          habit.status.push({
            completed: "undefined",
            date: `${YY}-${MM}-0${i}`,
          });
        }
      }
      //   habit.status.push({ date: `${DD}/${MM}/${YY}`, completed: "true" });

      habit.save();
      user.habits.push(habit);
      user.save();
      return res.status(200).json({ message: "Habit created successfully..." });
    } else {
      return res.status(201).json({ message: "Please fill the name of habit" });
    }
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

// module.exports.updateStatus = async function(req, res){
//     try{

//         const habit =
//     }catch(err){
//         console.log("err", err);
//         return res.status(500).json({ message: "Internal server Error" });
//     }
// }
