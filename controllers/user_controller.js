const User = require("../model/user");
const jwt = require("jsonwebtoken");

module.exports.createUser = function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  if (!email || !password || !name || !confirm_password) {
    return res.status(400).json({
      message: "Please Fill the required fileds to create an Account",
    });
  }

  if (password != confirm_password) {
    return res.status(400).json({
      message: "PAssword and confirm password not Match..",
    });
  }

  User.create(req.body)
    .then(() => {
      console.log("User created successfully :");
      return res.status(200).json({ message: "Account created successfully" });
    })
    .catch((err) => {
      console.log("error in creatig user: ", err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports.Login = async function (req, res) {
  try {
    const user = User.findOne({ email: req.body.email });
    if (user) {
      const Token = jwt.sign(user.toJSON(), "PassportJwt", {
        expiresIn: 10000,
      });

      console.log("token created successfullly ", Token);

      return res.status(200).json({
        message:
          "Login successfully Please keep the Token safe and use this to make req",
        Token,
      });
    }

    return res.status(400).json({
      message: "User not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
