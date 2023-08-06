const Habit = require("../model/habits");
const User = require("../model/user");

let date = new Date();
let DD = date.getDate();
let MM = date.getMonth() + 1;
let YY = date.getFullYear();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

module.exports.createHabit = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (req.body.name) {
      const habit = await Habit.create({
        name: req.body.name,
        user: req.user._id,
        isFavourite: false,
      });

      if (MM <= 9) {
        MM = parseInt(MM);
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

    const habit = await Habit.findById(req.params._id);

    // find the status array from habit and store in store
    const status = habit.status;

    // find the index of the status to update
    const getIndexOfDate = (index, i) => {
      if (index.date == date) {
        return i;
      }
    };

    let index = 0;
    status.forEach((element, i) => {
      if (element.date == date) {
        console.log("index found", i);
        index = i;
      }
    });

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

module.exports.updateHabitNAme = async function (req, res) {
  try {
    const habit = await Habit.findById(req.params._id);

    if (req.body.name) {
      await habit.updateOne({ name: req.body.name });

      console.log("habit after", habit.name);
      return res.status(200).json({
        message: "Habit Name updated successfully...",
        success: true,
      });
    }

    return res.status(201).json({
      message: "Please try again!!",
      success: false,
    });
  } catch (err) {
    console.log("err", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};
module.exports.updateFavourite = async function (req, res) {
  try {
    const habit = await Habit.findById(req.params._id);

    if (req.body.isFavourite) {
      const favourite = req.body.isFavourite == "false" ? false : true;

      await habit.updateOne({ isFavourite: !favourite });

      if (req.body.isFavourite == "true") {
        return res.status(200).json({
          message: "Habit removed from Favourite",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "Habit added to Favourite",
          success: true,
        });
      }
    }

    return res.status(201).json({
      message: "Please try again!!",
      success: false,
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
