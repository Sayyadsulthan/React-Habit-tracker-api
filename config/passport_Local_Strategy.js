const passport = require("passport");
const User = require("../model/user");
const passport_Local = require("passport-local").Strategy;

passport.use(
  new passport_Local(
    {
      usernameField: "email",
      passReqToCallback: false,
    },
    (email, password, done) => {
      User.findOne({ email: email })
        //   IF THE USER FOUND BY EMAIL
        .then((user) => {
          if (!user || user.password != password) {
            return done(null, false);
          }

          return null, user;
        })
        // IF ERROR
        .catch((err) => {
          console.log("Error in Local Strategy : ", err);
          return done(err);
        });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(user.email);
});

// deserialize the user from the key in cookies
passport.deserializeUser(function (email, done) {
  User.findOne({ email: email })
    .then((user) => done(user))
    .catch((err) => done(err));
});

passport.checkAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status.json({ message: "User not Authirized" });
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
