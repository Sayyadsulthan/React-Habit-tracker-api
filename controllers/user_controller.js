const jwt = require("jsonwebtoken");

const User = require("../model/user");
const Habit = require("../model/habits");

let date = new Date();
let DD = date.getDate();
let MM = date.getMonth() + 1;
let YY = date.getFullYear();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

module.exports.createUser = async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  if (!email || !password || !name || !confirm_password) {
    return res.status(400).json({
      message: "Please Fill the required fileds to create an Account",
      required_data: "name, email, password, confirm_password",
      success: false,
    });
  }

  if (password != confirm_password) {
    return res.status(400).json({
      message: "PAssword and confirm password not Match..",
      success: false,
    });
  }

  let findUser = await User.findOne({ email: req.body.email });
  if (findUser) {
    return res.status(403).json({
      message: "user exist",
      success: false,
    });
  }

  User.create(req.body)
    .then(() => {
      return res
        .status(200)
        .json({ message: "Account created successfully", success: true });
    })
    .catch((err) => {
      console.log("error in creatig user: ", err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    });
};

module.exports.Login = async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const key = "codeial";
      const populatedUser = await user.populate("habits");

      const Token = await jwt.sign(populatedUser.toJSON(), key);

      return res.status(200).json({
        message:
          "Login successfully Please keep the Token safe and use this to make req",
        Token,
        success: true,
      });
    }

    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  } catch (err) {
    console.log("error ", err);
    return res.status(404).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.Dashboard = async function (req, res) {
  try {
    const currentHabits = await Habit.find({ user: req.user._id });

    if (currentHabits) {
      return res.status(200).json({
        message: "This month habit",
        habits: currentHabits,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  });

  return res
    .status(200)
    .json({ message: "You have logged out !", success: true });
};
